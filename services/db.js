const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/NseStockApp',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    })

 const User=   mongoose.model('User',{
   uID:Number,
   Username:String,
   password:String,
   stockDetails:[]
})


 module.exports={
User
 }

