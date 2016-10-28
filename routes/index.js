var express = require('express');
var Twitter = require('twitter');
var http = require('http');
var url = require('url');
var router = express.Router();
var app = express();

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

var status;
var isWorking = false;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/send',function (req,res){
  console.log(req.body.statuscode);
  status = Number(req.body.statuscode);
  switch (status){
    case 1:
        client.post('statuses/update',{status: '개발자가 일안해요!'},function (error,tweet,response) {
          if (!error){
            console.log(tweet);
          }
        });
          break;
    case 2:
        client.post('statuses/update',{status: '개발자가 일하고 있어요!'},function (error,tweet,response) {
          if (!error){
            console.log(tweet);
          }
        });
          break;
    case 3:
      client.post('statuses/update',{status: '개발자가 쉰데요!'},function (error,tweet,response) {
        if (!error){
          console.log(tweet);
        }
      });
          break;
  }
  res.end("hello");
});

router.get('/now',function (req,res){
  res.end(status);
});

module.exports = router;
