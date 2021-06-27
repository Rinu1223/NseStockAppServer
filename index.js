const express=require('express'); //import express
const app=express();
const dataservice=require('./services/data.service'); // import data.service
const cors=require('cors'); //import cors
app.use(cors({
  origin:'http://localhost:4200', //client path 
  credentials:true  //to use cookies
}))

const session=require('express-session');//import session
// app.use(session({
//   secret:'randomsecurestring',
//   resave:false,
//   saveUninitialzed:false
// }));


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        maxAge: null,
        // allow the cookie to be sent via HTTP ("true" means "HTTPS only)
        secure: false, 
        sameSite: 'none'
    }
    
}));

app.use(express.json()); //parsing json format to object
app.listen(3000,()=>{
    console.log("server started");
})
const authMiddleware=(req,res,next)=>{
    if(!req.session.currentUser){
      return res.json({
        statusCode:401,
        status:false,
        message:"please login"
      })
    }
    else{
      next();
    }
  }
app.post('/login',(req,res)=>{
    
    dataservice.login(req,req.body.Username,req.body.password)
    .then(result=>{
      res.status(result.statusCode).json(result); 
    })
       
    });

    app.post('/createStock',(req,res)=>{
        //console.log(req.body.acno,req.body.password,req.body.amount);
        dataservice.createStock(req,req.body.uID,req.body.Name,req.body.CurrentMarketPrice,req.body.MarketCap,req.body.StockPE,req.body.DividendYield,req.body.ROCE,req.body.ROEPreviousAnnum,req.body.DebtToEquity,req.body.EPS,req.body.Reserves,req.body.Debt)
          .then(result=>{
            res.status(result.statusCode).json(result);
          })
             
          });
          

          app.post('/SearchStock',(req,res)=>{
            //console.log(req.body.acno,req.body.password,req.body.amount);
            dataservice.SearchStock(req,req.body.uID)
              .then(result=>{
                res.status(result.statusCode).json(result);
              })
                 
              }); 
               
                 