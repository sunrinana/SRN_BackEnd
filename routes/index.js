var express = require('express');
var router = express.Router();

var status;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('send/',function (req,res){
  if (req.body.id ==null||req.body.status==null) {
      res.end("query error");
  }
  status = req.body.status;
});

router.get('now/',function (req,res){
  res.end(status);
});

module.exports = router;
