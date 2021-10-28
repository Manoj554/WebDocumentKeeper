const mongoose = require('mongoose');

const uri = process.env.MongoURI;

mongoose.connect(uri,{
    // useCreateIndex:true,
    // useNewUrlParser:true,
    // useUnifiedTopology:true,
    // useFindAndModify:false
}).then(res=>{console.log('Database connected sucessfully\n'+res.connection.host)
}).catch(err=>{console.log(err);});