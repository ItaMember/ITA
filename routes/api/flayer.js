var keystone = require('keystone');
var Flayer = keystone.list('Flayer');

exports.list = function(req, res) {
  if(req.query.page == undefined && req.query.limit == undefined)
  {
    console.log("get all");
    Flayer.model.find().exec(function(err, items) {

      if (err) return res.json({ err: err });

      res.json({
        flayers: items
      });

    });
  }else{
    console.log("get pages");
    Flayer.paginate({
      page: req.query.page,
      perPage: req.query.limit
    }).exec(function(err, results) {
      if(err){
        console.log(err);
      }
      res.json({
        flayers : results.results
      });
    });
  }
}


exports.pagelist = function(req, res) {
  limit = req.body.page;
 
}

exports.get = function(req, res) {
  console.log("getOne");
  Flayer.model.findById(req.params.id).exec(function(err, item) {
    console.log(req.params.id);
    if (err) return res.json({ err: err });
    if (!item) return res.json('not found');

    res.json({
      flayer: item
    });

  });
}


/**
 * Create a People
 */
exports.create = function(req, res) {
  console.log("create");
  var item = new Flayer.model(),
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
  Flayer.model.findById(req.params.id).exec(function(err, item) {

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
  Flayer.model.findById(req.params.id).exec(function (err, item) {

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