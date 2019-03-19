var express= require("express");
var userModel= require.main.require("./model/user-model");
var path=require("path");
var fs= require("fs");
// var dataPath=path.dirname(require.main)+"/dataHouse";
var pathString="";
var router=express.Router();
// const { readdirSync, statSync } = require('fs')
// const { join } = require('path')

function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
      return fs.statSync(path+'/'+file).isDirectory();
    });
  }

router.get("/",(req,res)=>{
        pathString=path.dirname("../")+"/dataHouse/"+req.session.uid;   
       var filesArray=[];
       var fi=0;
       console.log(req.session.uid);
       var dirs=getDirectories(pathString);
       fs.readdirSync(pathString).forEach(file => {
        filesArray[fi]=file;
        fi++;
      });
      console.log(dirs);
      var data={
            files:filesArray,
            dirs:dirs
      };
       res.render("home/index",data);
});

router.get("/download/:name",(req,res,next)=>{
	var pathString2=pathString+"/"+req.params.name;
	console.log(pathString2);

	res.download(pathString2);
	
});



module.exports=router;


