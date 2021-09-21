const User = require('../database/mainSchema');
const path = require('path');
const upload = require('../middleware/multertoCloudinary');
const cloudinary = require('../middleware/cloudinary');

const Alldocuments = async (id) => {
    const data = await User.findById(id);
    if (data) {
        const documents = data.documents.slice(0).reverse().map(val => { return val });
        return documents;
    }
    return [];

}

exports.getDocuments = async (req, res) => {
    const user_id = req.id;
    try {
        const documents = await Alldocuments(user_id);
        res.status(200).json({ documents: documents });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server error' });
    }

}


exports.addDocument = async (req, res) => {
    const user_id = req.id;
    try {
        await upload(req, res);

        if (!req.file) {
            return res.status(400).json({ msg: "Plz upload a file" });
        }

        const result = await cloudinary.uploader.upload(req.file.path, { folder: `WebDocumentkeeper/uploads/${user_id}/` });

        const document = {
            docName : result.original_filename,
            docurl : result.secure_url,
            mimetype : req.file.mimetype,
            cloudinary_public_id : result.public_id

        }

        await User.findByIdAndUpdate(user_id, {
            $push: {
                documents: {
                    document: document
                }
            }
        });

        const documents = await Alldocuments(user_id);
        res.status(200).json({ documents: documents });

    } catch (error) {
        console.log(error);

        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ msg: "FileSize should be less than 3Mb" });
        }
        return res.status(500).json({ error:error,msg: 'Only image and pdf files are allowed' });
    }
}

exports.deleteDocument = async (req, res) => {
    const user_id = req.id;
    const id = req.body.id;
    try {

        const doc = await User.findOne({ _id: user_id }).select({ documents: { $elemMatch: { _id: id } } });

        const public_id = doc.documents[0].document.cloudinary_public_id;

        await cloudinary.uploader.destroy(public_id);

        await User.findByIdAndUpdate(user_id, {
            $pull: {
                documents: {
                    _id: id
                }
            }
        });

        const documents = await Alldocuments(user_id);
        res.status(200).json({ documents: documents });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Internal Server error' });
    }
}


exports.downloadFile = async (req, res) => {
    const id = req.body.Id;
    const user_id = req.id;

    try {
        const doc = await User.findOne({ _id: user_id }).select({ documents: { $elemMatch: { _id: id } } });
        const { docurl,docName } = doc.documents[0].document;

        res.status(200).json({ document: {docurl,docName} , msg: "Successful download" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}
