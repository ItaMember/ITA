var keystone = require('keystone');
var User = keystone.list('User');

exports.list = function(req, res) {
  User.model.find(function(err, items) {

    if (err) return res.json({ err: err });

    res.json({
      users: items
    });

  });
}

exports.get = function(req, res) {
  User.model.findById(req.params.id).exec(function(err, item) {

    if (err) return res.json({ err: err });
    if (!item) return res.json('not found');

    res.json({
      user: item
    });

  });
}


/**
 * Create a People
 */
exports.create = function(req, res) {

  var item = new User.model(),
    data = (req.method == 'POST') ? req.body : req.query;

  item.getUpdateHandler(req).process(data, function(err) {

    if (err) return res.json({ error: err });

    res.json({
      user: item
    });

  });
}

/**
 * Patch People by ID
 */
exports.update = function(req, res) {

  User.model.findById(req.params.id).exec(function(err, item) {

    if (err) return res.json({ err: err });
    if (!item) return res.json({ err: 'not found' });

    var data = (req.method == 'PUT') ? req.body : req.query;

    item.getUpdateHandler(req).process(data, function(err) {

      if (err) return res.json({ err: err });

      res.json({
        user: item
      });

    });

  });
}

/**
 * Delete People by ID
 */
exports.remove = function(req, res) {
  User.model.findById(req.params.id).exec(function (err, item) {

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