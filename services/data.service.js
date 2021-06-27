const db=require('./db');
let currentUser="";
const login=(req,Username,password)=>{
return db.User.findOne({Username,password})
   .then(user=>
     {
       if(user){
         req.session.currentUser=user.uID
        return{
           statusCode:200,
           status:true,
           name:user.Username,
           uID:req.session.currentUser,
           message:"Successfully login"
       } 
       }
       else{
     
         return {
           statusCode:422,
           status:false,
          message:"invalid user id"
         }
       }
     })
   }
   const createStock=(req,uID,Name,CurrentMarketPrice,MarketCap,StockPE,DividendYield,ROCE,ROEPreviousAnnum,DebtToEquity,EPS,Reserves,Debt)=>{
    // let uID= req.session.currentUser
    //  console.log(uID);
      return db.User.findOne({uID})
      .then(user=>{
       if(!user){
           return {
             statusCode:422,
             status:false,
             message:"Failed to add"
         }
       }
       else{
           
           user.stockDetails.push({
            Name:Name,
            CurrentMarketPrice:CurrentMarketPrice,
            MarketCap:MarketCap,
            StockPE:StockPE,
            DividendYield:DividendYield,
            ROCE:ROCE,
            ROEPreviousAnnum:ROEPreviousAnnum,
            DebtToEquity:DebtToEquity,
            EPS:EPS,
            Reserves:Reserves,
            Debt:Debt
           })
           user.save();
        return {
           statusCode:200,
           status:true,
           message:`Event added successfully.... `
       }
       }
      })
    }
    const SearchStock=(req,uID)=>{
        
         
          return  db.User.findOne({uID})
          .then(user=>{
           if(!user){
               return {
                 statusCode:422,
                 status:false,
                 message:"error"
             }
           }
           else{
               
              console.log(user.stockDetails) 
             return {
              statusCode:200,
              status:true,
              message:user.stockDetails
          }
           }
          })
        }
        const showItems=(req,uID)=>{
        
         
          return  db.User.findOne({uID})
          .then(user=>{
           if(!user){
               return {
                 statusCode:422,
                 status:false,
                 message:"error"
             }
           }
           else{
               
              console.log(user.stockDetails) 
             return {
              statusCode:200,
              status:true,
              message:user.stockDetails
          }
           }
          })
        }


   module.exports={
    login,
    createStock,
    SearchStock
    
   }