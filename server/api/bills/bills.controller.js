var Bill = require('./bills.model');
/**
 * Get list of bills
 */
exports.index = function(req, res) {
  Bill.find(function (err, bills) {
    if(err) return handleError(res, err);
    return res.status(200).json(bills);
  });
};

exports.findByUser = function(req, res) {
  Bill.find({"group.userEmail" :req.params.userEmail},function (err, bills) {
    if(err) { return handleError(res, err); }
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

exports.create = function(req, res) {
  Bill.create(req.body, function(err, bill) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(bill);
  });
};

exports.update = function(req, res) {
  if(req.body._id) {
	  delete req.body.id;
  }
  var p = new Bill(req.body);
  Bill.findOneAndUpdate(req.params.id, p, {upsert: true}, function(err, doc){
	  p._id = doc._id;
	  if(err){
		  return handleError(res, err);
	  }
	  return res.status(200).json(p);
  });
};

exports.destroy = function(req, res) {
  Bill.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.status(500).send(err);
    return res.status(204).send('No Content');
  });
};

exports.list = function(req, res){
	console.log('Do the DB stuff here');
	res.send("OK");
}

function handleError(res, err) {
  return res.status(500).send(err);
}