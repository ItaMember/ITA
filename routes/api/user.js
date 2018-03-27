var keystone = require('keystone');
var User = keystone.list('User');

exports.list = function(req, res) {
  console.log("get all");
  User.model.find(function(err, items) {

    if (err) return res.json({ err: err });

    res.json({
      users: items
    });

  });
}

exports.get = function(req, res) {
  console.log("getOne");
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
  console.log("create");
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
  console.log("update");
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

exports.login = function(req, res) {
  console.log('login');
  console.log(req.body);
  var em = req.body.email;
  var ps = req.body.password;
  if (!em || !ps) return res.json({ success: false });
  keystone.list('User').model.findOne({ email: em }).exec(function(err, user) {
  console.log(user);
    if (err || !user) {
      return res.json({
        message: (err && err.message ? err.message : false) || 'Sorry, there was an issue signing you in, please try again.'
      });
    }
    
    keystone.session.signin({ email: user.email, password: ps }, req, res, function(user) {
      return res.json({
        first_name :user.first_name,
        last_name : user.last_name,
        email : user.email,
        image : user.image,
        address : user.address,
        phone_number :user.phone_number
      });
      
    }, function(err) { 
      return res.json({
        message: (err && err.message ? err.message : false) || 'Sorry, there was an issue signing you in, please try again.'
      });
    });
  });
}


/**
 * Delete People by ID
 */
exports.remove = function(req, res) {
  console.log("remove");
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