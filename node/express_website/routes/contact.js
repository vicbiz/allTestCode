var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req, res, next){
  var transporter = nodemailer.createTransport({
    service: 'GMail',
    auth: {
      user: 'jm3628@gmail.com',
      pass: 'jae@vicbiz1'
    }
  });

  var mailOptions = {
    // from: 'Jae Moon <jmoon@live.com>',
    from: req.body.name+' <'+req.body.email+'>',
    to: 'jm3628@gmail.com',
    subject: 'Webiste Submission Test',
    text: 'You have a new submission with the following details.... Name: '+req.body.name+' Email: '+req.body.email+' Message: '+req.body.message,
    html: '<p>You have a new submission with the following details....</p><ul><li>Name: '+req.body.name+'</li><li> Email: '+req.body.email+'</li><li> Message: '+req.body.message+'</li>',
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      res.redirect('/');
    } else {
      console.log('Message Sent: '+info.response);
      res.redirect('/');
    }
  });



});
module.exports = router;
