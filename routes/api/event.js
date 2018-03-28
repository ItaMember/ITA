var keystone = require('keystone');
var Event = keystone.list('Event');

exports.list = function(req, res) {
  console.log("get all");
  Event.model.find().populate("_id","name").exec(function(err, items) {

    if (err) return res.json({ err: err });

    res.json({
      events: items
    });

  });
}

exports.get = function(req, res) {
  console.log("getOne");
  Event.model.findById(req.params.id).exec(function(err, item) {
    console.log(req.params.id);
    if (err) return res.json({ err: err });
    if (!item) return res.json('not found');

    res.json({
      event: item
    });

  });
}


/**
 * Create a People
 */
exports.create = function(req, res) {
  console.log("create");
  var item = new Event.model(),
    data = (req.method == 'POST') ? req.body : req.query;

  item.getUpdateHandler(req).process(data, function(err) {

    if (err) return res.json({ error: err });

    res.json({
      message:"success"
    });

  });
}

/**
 * Patch People by ID
 */
exports.update = function(req, res) {
  console.log("update");
  Event.model.findById(req.params.id).exec(function(err, item) {

    if (err) return res.json({ err: err });
    if (!item) return res.json({ err: 'not found' });

    var data = (req.method == 'PUT') ? req.body : req.query;

    item.getUpdateHandler(req).process(data, function(err) {

      if (err) return res.json({ err: err });

      res.json({
        message:success
      });

    });

  });
}

/**
 * Delete People by ID
 */
exports.remove = function(req, res) {
  console.log("remove");
  Event.model.findById(req.params.id).exec(function (err, item) {

    if (err) return res.json({ dberror: err });
    if (!item) return res.json('not found');

    item.remove(function (err) {
      if (err) return res.json({ dberror: err });

      return res.json({
        success: true
      });
    });

  });
}