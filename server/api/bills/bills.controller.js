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

exports.findByGroup = function(req, res) {
  Bill.find({"group.groupName" :req.params.groupName},function (err, bills) {
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
  Bill.findOneAndUpdate(req.params.id, function(err, bill){
	  if(err){
		  return handleError(res, err);
	  }
    if(!bill){ 
      return res.status(404).send('Not Found'); 
    }
    var updated = _.merge(bill, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(bill);
    });
  });
};

exports.destroy = function(req, res) {
  Bill.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.status(500).send(err);
    return res.status(204).send('No Content');
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}