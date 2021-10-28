
const jwt = require('jsonwebtoken');

exports.Authorization = (req,res,next) =>{
    try{
    if(req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1];
        // console.log(token);
        const user = jwt.verify(token,process.env.SECRET_TOKEN);
        // console.log(user);
        req.user = user;
        req.id = user._id;
    }else{
        return res.status(401).json({
            msg:'Authorization Required'
        });
    }}
    catch(err){
        let error = err.name;
        console.log(err.name);
        if(error === "TokenExpiredError"){
            return res.status(401).json({
                msg:"Jwt token expired"
            })
        }
    }
    next();
}