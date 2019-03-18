var express= require("express");
var userModel = require.main.require('./model/user-model');
var router= express.Router();

var errData="";

router.get("/",function(req,res){
    res.render("signUp/index"); 
});

router.get("/error",function(req,res){
       var data={
           errData:errData
       };
          res.render("signUp/index-error",data); 
});


router.post("/",function(req,res){
     var passWord=(req.body.password).trim();
     var repassWord=(req.body.cp).trim();
    
    if(passWord===repassWord){
    
        userModel.isOldUser(req.body.email,function(result){
            
          if(result!=[])
            {
                var user={
                    uname:req.body.fName+" "+req.body.lName,
                    email:req.body.email,
                    pass:passWord,
                    phn:req.body.ph1+req.body.ph2,
                    dob:req.body.dob,
                    gender:req.body.gender,
                    type:req.body.types
                };
                
                console.log(user);
              userModel.addUser(user,function(result){
                  res.redirect("/login");
               });
             }
         else{
             errData="This mail is used by another user";
             res.redirect("/signUp/error");
         }
     });
    
    }
    else{
             errData="Password Not Matched";
             res.redirect("/signUp/error");
         }
});

module.exports=router;