var db = require('./db');


module.exports = {
	get: function(userId, callback){
		var sql = "select * from user where id="+userId;
		db.getResults(sql, function(result){

			if(result.length >0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
	getLastId:function(callback){
		  var sql="select max(id) as lid from user";
		  db.getResults(sql, function(result){
				callback(result[0]);
		});
	},
    
    // if the email is used by another user...
    isOldUser:function(email,callback){
         var sql="select * from user where email='"+email+"'";  
        db.getResults(sql, function(result){

			if(result.length >0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
       
    },
	getAll: function(callback){
		var sql = "select * from user";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	validate: function(user, callback){
		var sql = "select * from user where email='"+user.uname+"' and password='"+user.password+"'";
		db.getResults(sql, function(result){
			if(result.length > 0 ){
				
				callback(result[0]);
			}else{
				callback([]);
			}
		})
	},
    addUser:function(user,callback){
        var sql = "insert into user values(null, '"+ user.uname+"','"+ user.email+"', '"+ user.pass+"','"+ user.dob+"','"+ user.gender+"','"+ user.phn+"', '"+ user.type+"')"
		db.execute(sql, function(success){
			callback(success);
		});
    },
	insert: function(user, callback){
		var sql = "insert into user values(null, '"+ user.uname+"', '"+ user.password+"', '"+ user.type+"')"
		db.execute(sql, function(success){
			callback(success);
		});
	},
	update: function(user, callback){
		var sql = "update user set username='"+user.uname+"', password='"+user.password+"', type='"+user.type+"' where id="+user.id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(user, callback){
		var sql = "delete from user where id="+user.id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}