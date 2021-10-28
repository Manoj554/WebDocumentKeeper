const Users = require('../database/mainSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.Home = (req,res) =>{
    res.status(200).json({
        Name:'Manoj Kumar Mondal',
        CollegeId:'B318029',
        Branch:'EEE',
        College:'IIIT Bhubaneswar',
        Location:'Bhubaneswar',
        Website:'https://manojkumar.herokuapp.com',
        Interest:['MERN Stack development','Web-Technologies','Website-Hosting'],
        Contacts:{
            Email:['manojmark554@gmail.com','b318029@iiit-bh.ac.in'],
            Phone:['+91 8144607288', '+91 9078454554'],
            HomeTown:'Santoshi Nagar Umerkote Odisha, India'
        },
        Achivments:'Best paper Award (Online-Based Smart Energy Meter) in a Session in EPREC Conference 2021 ,Jamshedpur',
        Resume:"https://manojkumar.herokuapp.com/documents/ManojKumarMondal-B318029.pdf"
    })
}

exports.Signup = async (req,res) =>{
    const {firstName,lastName,email,password,rpassword} = req.body;

    try {
            const findUser = await Users.findOne({email:email});
            if(findUser){
                res.status(422).json({msg:'Already Registered, Please login to Continue'});
            }else{
                    if(password !== rpassword){
                        return res.status(422).json({msg:'Password not Matched'});
                    }

                    const hashPassword = await bcrypt.hash(password, 10);
                    const newUser = new Users({
                        firstName,lastName,email,hashPassword
                    });
                    await newUser.save();
                    res.status(200).json({data:newUser,msg:'You have Successfully Registered | Login to Continue'});
            }
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error});
    }
}

exports.Signin = async (req,res) =>{
    const {email,password} = req.body;
    try {
        const findUser = await Users.findOne({email:email});

        if(findUser){
            if(await findUser.authenticate(password)){
                const userToken = jwt.sign({_id:findUser._id},process.env.SECRET_TOKEN,{expiresIn:'1h'});
                res.cookie('token', userToken, {expiresIn:'1h'});
                
                const { fullName } = findUser;

                res.status(200).json({
                    token:userToken,
                    fullName:fullName,
                    msg:'Login successful'
                });
            }else{
                res.status(422).json({msg:'Invalid-Credentials'});
            }      
        }else{
            res.status(422).json({msg:'Invalid-Credentials'});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error});
    }
}

exports.Signout = (req,res) =>{
    res.clearCookie('token');
    res.status(200).json({msg:'Logout successful'});
}