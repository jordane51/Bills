var Group = require('./group.model');
/**
 * Get list of Groups
 */
exports.index = function(req, res) {
  Group.find(function (err, groups) {
    if(err) return handleError(res, err);
    return res.status(200).json(groups);
  });
};

exports.show = function (req, res) {
  Group.findById(req.params.id, function (err, group) {
    if(err) { return handleError(res, err); }
    if(!group) { return res.status(404).send('Not Found'); }
    return res.json(group);
  });
};

exports.create = function(req, res) {
  Group.create(req.body, function(err, group) {
    if(err) { return handleError(res, err); }
    console.log("group created")
    return res.status(201).json(group);
  });
};
/*
exports.update = function(req, res) {
  if(req.body._id) {
    delete req.body.id;
  }
  var p = new Group(req.body);
  Group.findOneAndUpdate(req.params.id, p, {upsert: true}, function(err, doc){
    p._id = doc._id;
    if(err){
      return handleError(res, err);
    }
    return res.status(200).json(p);
  });
};
*/

exports.update = function(req, res) {
  if(req.body._id) {
    delete req.body.id;
  }
  Bill.findOneAndUpdate(req.params.id, function(err, group){
    if(err){
      return handleError(res, err);
    }
    if(!group){ 
      return res.status(404).send('Not Found'); 
    }
    var updated = _.merge(group, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(group);
    });
  });
};

exports.destroy = function(req, res) {
  Group.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.status(500).send(err);
    return res.status(204).send('No Content');
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}