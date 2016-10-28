var express = require('express');
var http = require('http');
var Twitter = require('twitter');
var router = express.Router();

var FCM = require('fcm').FCM;

var apiKey = 'AIzaSyC4pkUBo3rreT7YmdHn0O12bz-TU9_2brI';
var fcm = new FCM(apiKey);

var message = {
  registration_id: 'Device registration id', // required
  collapse_key: 'Collapse key',
  'data.key1': 'value1',
  'data.key2': 'value2'
};



var client = new Twitter({
  consumer_key: 'Y5ylxpNdXqqSSdw03KACS6p7e',
  consumer_secret: 'WVOJBVeAKO6mAKTJnc1SBTBHcEuW0so7WunvYfUMakUNfmka47',
  access_token_key: '791922672074534912-CZ6G1TX12UhHRKfs6qAP7PZj7RDH68K',
  access_token_secret: 'EdPLfQ7kAaequp7bVAGR2wTavjMnadj2KBlnZCRLrgaQx'
});

client.post('statuses/update', {status: 'I am a tweet'}, function(error, tweet, response) {
  if (!error) {
    console.log(tweet);
  }
});


var status;

/* GET home page. */
router.get('/', function(req, res, next) {
  client.post('statuses/update', {status: 'I am a tweet'}, function(error, tweet, response) {
    if (!error) {
      console.log(tweet);
    }
  });
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
