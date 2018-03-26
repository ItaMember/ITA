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