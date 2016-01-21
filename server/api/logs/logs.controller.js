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
		res.status(500);
		res.send('Error');
	} else {
		Logs.create({
			billId: req.billsLog.billBeforeBillId,
			group: req.billsLog.billBeforeGroup,
			userId: req.billsLog.userId,
			action: req.billsLog.action,
			amountBefore: req.billsLogs.amountBefore,
			amountAfter: req.billsLogs.amountAfter
		})
	}
}
