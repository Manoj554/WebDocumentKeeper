const User = require('../database/mainSchema');
const path = require('path');
const fs = require('fs');
const upload = require('../middleware/multer');
const fileSaver = require('file-saver');

const Alldocuments = async (id) =>{
    const data = await User.findById(id);
    if(data){
        const documents =  data.documents.slice(0).reverse().map(val=>{return val});
        return documents;
    }
    return [];
    
}

exports.addDocument = async (req,res) =>{
    const user_id = req.id;
    try {
        await upload(req,res);

        if(req.file == undefined){
            return res.status(400).json({msg:'Please choose a file'});
        }

        const documentName = req.file;
        // console.log(req.file);
        // const docurl = process.env.API + '/public/' +  documentName.filename;
        const docurl = `${process.env.API}/public/${user_id}/${documentName.filename}`;
        const mimetype = documentName.mimetype;
        const docname = documentName.filename.substring(0,documentName.filename.lastIndexOf('_'));
        const document = {
            docName:docname,
            mimetype:mimetype,
            docurl:docurl
        }

        await User.findByIdAndUpdate(user_id,{
            $push:{
                documents:{
                    document:document
                }
            }
        });

        const documents = await Alldocuments(user_id);
        res.status(200).json({documents:documents});
        
    } catch (error) {
        console.log(error);

        if(error.code === "LIMIT_FILE_SIZE"){
            return res.status(400).json({msg:"FileSize should be less than 2Mb"});
        }
        return res.status(500).json({msg:'Internal Server error',error:error});
    }
}

exports.getDocuments = async (req,res) =>{
    const user_id = req.id;
    // console.log(user_id);
    try {
        const documents = await Alldocuments(user_id);
        // console.log(documents);
        res.status(200).json({documents:documents});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'Internal Server error',error:error});
    }
    
}

exports.deleteDocument = async (req,res) => {
    const user_id = req.id;
    const id = req.body.id;

    
    // console.log(filename);
    try {

        const doc = await User.findOne({_id:user_id}).select({documents:{$elemMatch:{_id:id}}});
        // console.log(doc);
        const docurl = doc.documents[0].document.docurl;
        const filename = docurl.slice(docurl.lastIndexOf('/'));

        // console.log(del);
        const filepath = './uploads/'+user_id+filename;
        if(fs.existsSync(filepath))
        {
            await fs.unlinkSync(filepath);
        }


        await User.findByIdAndUpdate(user_id,{
            $pull:{
                documents:{
                    _id:id
                }
            }
        });

        const documents = await Alldocuments(user_id);
        res.status(200).json({documents:documents});

    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'Internal Server error',error:error});
    }

}

exports.downloadFile = async (req,res) =>{
    const id = req.body.Id;
    // console.log(id);
    const user_id = req.id;
    try{
        const doc = await User.findOne({_id:user_id}).select({documents:{$elemMatch:{_id:id}}});
        // console.log(doc);
        const docurl = doc.documents[0].document.docurl;
        res.status(200).json({document:docurl,msg:"Successful download"});
    }catch(error){
        console.log(error);
        return res.status(500).json({error:error});
    }
}