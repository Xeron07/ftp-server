var express= require("express");
var userModel= require.main.require("./model/user-model");
var router= express.Router();
var errMsg="";
router.get("/",function(req,res){
    res.render("login/index"); 
});

router.post("/",function(req,res){
    var user={
        uname:req.body.email,
        password:req.body.password
    };
    userModel.validate(user,function(result){
          if(result)
          {
              res.redirect("/signUp");
          }
          else{
              errMsg="Wrong email or password";
              res.redirect("/login/invalid");
          }
    });
});

router.get("/invalid",function(req,res){
       var data={
           errData:errMsg
       };
       res.render("login/index-error",data);
});

module.exports=router;