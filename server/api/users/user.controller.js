var User = require('./user.model');

exports.connectedUser = function(req, bill, callback){
	User.findOne({'token': req.headers["authorization"]}, '_id email name token', function(err, user){
		if(user && !err){
			callback(req, bill, user);
		} else {
			callback(req, bill, null);
		}
	})
}

exports.show = function(req, res){
	User.findOne({'token': req.headers["authorization"]}, '_id email name token', function(err, user){
		if(user && !err){
			res.send(user)
		} else {
			res.status(500);
			res.send('Error');
		}
	})
};

exports.user = function(req, res){
	User.findOne({'_id': req.params.id}, '_id email name', function(err, user){
		if(user && !err){
			res.send(user)
		} else {
			res.status(500);
			res.send('Error');
		}
	})
};

exports.findByMail = function(req, res){
	User.findOne({'email': req.params.email}, '_id email name', function(err, user){
		if(user && !err){
			res.send(user)
		} else {
			res.status(500);
			res.send('Error');
		}
	})
};

exports.updatePassword = function(req, res){
	if(!req.body.password){
		res.status(500);
		res.send('Missing parameter: password');
	} else {
		User.findOne({'token': req.headers["authorization"]}, function(err, user){
			if(user && !err){
				user.password = User.encryptPassword(req.body.password);
				user.save();
				res.send('OK');
			} else {
				res.status(500);
				res.send('Error');
			}
		})
	}
};
