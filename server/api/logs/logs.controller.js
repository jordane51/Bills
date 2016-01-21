var Logs = require('./logs.model');

exports.showLogsForUser = function(req, res){
	Logs.find({'group.userId': req.params.id}, function(err, logs){
		if(logs && !err){
			res.json(logs)
		} else {
			res.status(500);
			res.send('Error');
		}
	})
};

exports.addLog = function(req, res){
	if(!req.billsLog){
		console.log('Error while creating log');
	} else {
		Logs.create({
			billTitle: req.billsLog.billTitle,
			userName: req.billsLog.userName,
			action: req.billsLog.action,
			amountBefore: req.billsLog.amountBefore,
			amountAfter: req.billsLog.amountAfter,
			group: req.billsLog.group
		}, function(err, res){
			if(err){
				console.log('Error while creating log.');
			}
		});
	}
}
