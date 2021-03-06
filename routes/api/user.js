var keystone = require('keystone');
var User = keystone.list('User');
//password generator
var generator = require('generate-password');
//email sender
var nodemailer = require('nodemailer');

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

exports.forgetpassword = function(req, res){
  var em = req.query.email;
  keystone.list('User').model.findOne({ email: em }).exec(function(err, user) {
    if (err) return res.json({ err: err });

    if (!user){
      return res.json({ 
        status : false,
        message : "Your email is not registered please enter a valid email"
      });
    }

    var smtpConfig = {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
          user: 'itamember18@gmail.com',
          pass: 'developer128'
      }
    };
    var transporter = nodemailer.createTransport(smtpConfig);
    var randompassword = generator.generate( {
        length: 8,
        strict: true,
        numbers:true
    });
    var newPassword = randompassword;
    req.query.password = randompassword;
    var data = req.query;
    user.getUpdateHandler(req).process(data, function(err) {
      if (err) {
        return res.json({ err: err });
      }
      else{
        var mailOptions = {
          from: 'ita@gmail.com',
          to: em,
          subject: 'change password request for ita application',
          text: 'your new password is '+ newPassword
        };
          transporter.sendMail(mailOptions, function(error, response){
            if(error){
              console.log(error);
            }else{
              return res.json({ 
                status : true,
                message : "Your new password already sent to your email"
              });
            }
          });
        }
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
    if (err)
    {
      // console.log(err);
      if(err.error == "validation errors"){
        return res.json({ 
          status : false,
          message : "Sorry, there was an issue, please try again."
        });
      }else if(err.error == "database error"){
        return res.json({
          status : false,
          message : "The email address is already in use. Please try another email address."
        })
      }
    } 
    else{
      return res.json({
        first_name :item.first_name,
        last_name : item.last_name,
        email : item.email,
        image : item.image,
        address : item.address,
        phone_number :item.phone_number
      });
    }
  });
}

/**
 * Patch People by ID
 */
exports.update = function(req, res) {
  console.log("update");
  console.log(req.query);
  User.model.findOne({email:req.query.email}).exec(function(err, item) {
    console.log(item);
    if (err) return res.json({ err: err });
    if (!item) return res.json({ err: 'not found' });
    var data = req.query;
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
  if (!em || !ps) return res.json({ 
    status: false,
    message: "Please fill email and password!" 
  });
  keystone.list('User').model.findOne({ email: em }).exec(function(err, user) {
  console.log(user);
    if (err || !user) {
      return res.json({
        status: false,
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
        status: false,
        message: (err && err.message ? err.message : false) || 'Sorry, there was an issue signing you in, please try again.'
      });
    });
  });
}

exports.upload = function(req, res) {
  console.log('upload');
  console.log(req);
  var em = req.body.email;
  console.log(em);
  User.model.findOne({ email: em }).exec(function(err, user) {
    if (err) return res.json({ err: err });
    if (!user) return res.json({ err: 'not found' });
    user.getUpdateHandler(req).process(req.files, {fields: 'image'}, function(err) {
      if (err) {
          return res.status(500).json({ message: err.message || '', code: 10 });
      }
      else{
        return res.json(
          {
            status:true,
            message:"upload success"  
          }
        )
      }
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
        status: true
      });
    });

  });
}