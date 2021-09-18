const Message = require('../database/contactSchema');

exports.contactMessage = async (req,res) =>{
    const { name,email,phone,city,message } = req.body;

    try {
        const userMessage = new Message({
            name,email,phone,city,message
        });

        await userMessage.save();
        res.status(200).json({
            msg:"Message sent successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            msg:"Something went Wrong !!!"
        });
    }
}