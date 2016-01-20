var User = require('./user.model');

exports.checkUser = function(req, res, next){
	var email = req.body.email;
	var password = req.body.password;
	if(!email || !password){
		res.send('Incorrect parameters');
		return ;
	} else {
		User.findOne({ email: email }, function(err, user){
			if(err || !user || !user.checkPassword(password)){
				res.status(403);
				res.send('No user found');
			} else {
				next();
			}
		});
	}
}

exports.updateToken = function(req, res){
	User.findOne({ email: req.body.email }, function(err, user){
		if(user){
			var token = User.generateToken();
			user.token = token;
			user.save();
			res.send({'token': token});
		}
	});
}

exports.isTokenValid = function(req, res, next){
	if(!req.headers["authorization"]){
		res.status(403);
		res.send("Missing Authorization header");
	} else {
		User.findOne({ token: req.headers["authorization"] }, function(err, user){
		if(user){
			console.log(user.token);
			next();
		} else {
			res.status(403);
			res.send("Invalid credentials.")
		}
	});
	}
}

exports.createUser = function(req, res, next){
	User.findOne({ email: req.body.email }, function(err, user){
		if(user){
			res.status(403);
			res.send("An account already exists with this email address.");
		} else {
			if(req.body.email && req.body.password && req.body.name){
				User.create({email: req.body.email, password: User.encryptPassword(req.body.password), name: req.body.name});
				next();
			} else {
				res.status(403);
				res.send("Incomplete field(s).");
			}
		}
	});
}