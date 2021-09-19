const User = require('../database/mainSchema');
const upload = require('../middleware/multer');

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

exports.downloadFile = async (req, res) => {
    const id = req.body.Id;
    const user_id = req.id;
    try {
        const doc = await User.findOne({ _id: user_id }).select({ documents: { $elemMatch: { _id: id } } });
        const {docurl,docName} = doc.documents[0].document
        res.status(200).json({ document: {docurl,docName}, msg: "Successful download" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

exports.addDocument = async (req, res) => {
    const user_id = req.id;
    try {
        await upload(req, res);

        if (!req.file) {
            return res.status(400).json({ msg: 'Please select a file' });
        }

        const documentName = req.file;

        const docurl = `${process.env.API}/public/${user_id}/${documentName.filename}`;
        const mimetype = documentName.mimetype;
        const docname = documentName.filename.substring(0, documentName.filename.lastIndexOf('_'));
        const document = {
            docName: docname,
            mimetype: mimetype,
            docurl: docurl
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
            return res.status(400).json({ msg: "FileSize should be less than 2Mb" });
        }
        return res.status(500).json({ msg: 'Internal Server error' });
    }
}


exports.deleteDocument = async (req, res) => {
    const user_id = req.id;
    const id = req.body.id;
    // console.log(filename);
    try {

        const doc = await User.findOne({ _id: user_id }).select({ documents: { $elemMatch: { _id: id } } });
        // console.log(doc);
        const docurl = doc.documents[0].document.docurl;
        const filename = docurl.slice(docurl.lastIndexOf('/'));

        // console.log(del);
        const filepath = './uploads/' + user_id + filename;
        if (fs.existsSync(filepath)) {
            await fs.unlinkSync(filepath);
        }

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


