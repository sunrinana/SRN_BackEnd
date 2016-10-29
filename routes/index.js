var express = require('express');
var Twitter = require('twitter');
var http = require('http');
var url = require('url');
var router = express.Router();
var app = express();
var Sender = require('node-xcs').Sender;
var Result = require('node-xcs').Result;
var Message = require('node-xcs').Message;
var Notification = require('node-xcs').Notification;

var apiKey = 'AIzaSyD77o7ROigCo1lxzME8i92rR6IMGUvaR7U';
var to = 'cud20fn1J2k:APA91bEMjTTvqcIN40pMpGRWXPtGcWV1NGV2Qbwd_0PjaCPUHN4nzivLS11ddipivsw4tPxdAomrlGkoknbAxZ2cmHJM3VpfwwqSf5uSbellcQf_BT4f5GZpMVBT3IOI09ioCqKMmbnW';
var xcs = new Sender('66970132501', apiKey);

var notification_1 = new Notification("ic_launcher")
    .title("Working!")
    .body("개발자가 일안하고있어요!")
    .build();
var notification_2 = new Notification("ic_launcher")
    .title("Working!")
    .body("개발자가 일하고있어요!")
    .build();
var notification_3 = new Notification("ic_launcher")
    .title("Working!")
    .body("개발자가 쉰데요")
    .build();

var message = new Message("messageId_1046")
    .priority("high")
    .dryRun(false)
    .addData("node-xcs", true)
    .addData("anything_else", false)
    .addData("awesomeness", 100)
    .deliveryReceiptRequested(true)
    .notification(notification_1)
    .build();
var message_2 = new Message("messageId_1046")
    .priority("high")
    .dryRun(false)
    .addData("node-xcs", true)
    .addData("anything_else", false)
    .addData("awesomeness", 100)
    .deliveryReceiptRequested(true)
    .notification(notification_2)
    .build();
var message_3 = new Message("messageId_1046")
    .priority("high")
    .dryRun(false)
    .addData("node-xcs", true)
    .addData("anything_else", false)
    .addData("awesomeness", 100)
    .deliveryReceiptRequested(true)
    .notification(notification_3)
    .build();

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
          }else{
            console.log(error);
          }});
        xcs.sendNoRetry(message, to, function (result) {
          if (result.getError()) {
            console.error(result.getErrorDescription());
          } else {
            console.log("message sent: #" + result.getMessageId());
          }
        });
          break;
    case 2:
        client.post('statuses/update',{status: '개발자가 일하고 있어요!'},function (error,tweet,response) {
          if (!error){
            console.log(tweet);
          }
        });
        xcs.sendNoRetry(message_2, to, function (result) {
          if (result.getError()) {
            console.error(result.getErrorDescription());
          } else {
            console.log("message sent: #" + result.getMessageId());
          }
        });
          break;
    case 3:
      client.post('statuses/update',{status: '개발자가 쉰데요!'},function (error,tweet,response) {
        if (!error){
          console.log(tweet);
        }
      });
      xcs.sendNoRetry(message_3, to, function (result) {
        if (result.getError()) {
          console.error(result.getErrorDescription());
        } else {
          console.log("message sent: #" + result.getMessageId());
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
