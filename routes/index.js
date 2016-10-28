var express = require('express');
var http = require('http');
var router = express.Router();

var status;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/send',function (req,res){
  console.log(req.body);
  if (req.body.status==null) {
      res.end("query error");
  }
  status = req.body.status;
  if (status == 2)
  {

  }
  res.end("query");
});

router.get('/now',function (req,res){
  res.end(status);
});

module.exports = router;
