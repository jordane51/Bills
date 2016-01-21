var Bill = require('./bills.model');
var user = require('../users/user.controller');
/**
 * Get list of bills
 */
exports.index = function(req, res) {
  Bill.find(function (err, bills) {
    if(err) return handleError(res, err);
    return res.status(200).json(bills);
  });
};

exports.findByGroup = function(req, res) {
  Bill.find({"group.groupName" :req.params.groupName},function (err, bills) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(bills);
  });
};

exports.findByUserId = function(req, res){
	Bill.find({"group.userId": req.params.id}, function(err, bills){
		if(err) { 
			return handleError(res, err);
		}
		return res.status(200).json(bills);
	});
};

exports.show = function (req, res) {
  Bill.findById(req.params.id, function (err, bill) {
    if(err) { return handleError(res, err); }
    if(!bill) { return res.status(404).send('Not Found'); }
    return res.json(bill);
  });
};

exports.create = function(req, res, next) {
  Bill.create(req.body, function(err, bill) {
    if(err) { return handleError(res, err); }
    
    // for the logs
    user.connectedUser(req, bill, function(req, bill, user){
	    req.billsLog = {};
	    req.billsLog.action = 'create';
	    req.billsLog.billTitle = bill.title;
	    req.billsLog.userName = user.name;
	    req.billsLog.group = bill.group;
	    
	    next();
    });
    
    return res.status(201).json(bill);
  });
};

exports.update = function(req, res, next) {
  if(req.body._id) {
	  delete req.body._id;
  }
  Bill.findOneAndUpdate({'_id': req.params.id}, req.body, {'new': true}, function(err, doc){
	  if(err){
		  return handleError(res, err);
	  }
	  
	// for the logs
	var bill = doc;
    user.connectedUser(req, bill, function(req, bill, user){
	    req.billsLog = {};
	    req.billsLog.action = 'reimburse';
	    req.billsLog.billTitle = bill.title;
	    req.billsLog.userName = user.name;
	    req.billsLog.group = bill.group;
	    req.billsLog.amountBefore = req.body.amount;
	    req.billsLog.amountAfter = bill.amount;
	    
	    next();
    });
	  
	  return res.status(200).json(doc);
  });
};

exports.destroy = function(req, res, next) {
  Bill.findByIdAndRemove(req.params.id, function(err, bill) {
    if(err) return res.status(500).send(err);
    
    // for the logs
    user.connectedUser(req, bill, function(req, bill, user){
	    req.billsLog = {};
	    req.billsLog.action = 'delete';
	    req.billsLog.billTitle = bill.title;
	    req.billsLog.userName = user.name;
	    req.billsLog.group = bill.group;
	    
	    next();
    });
    
    res.status(204).send('No Content');
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}