var http = require('http');
var nodemailer = require('nodemailer');
var formidable = require('formidable');
var static = require('node-static');
var file = new static.Server('static');

http.createServer(function(req, res) {

  console.log("[501] " + req.method + " to " + req.url);
  if (req.url == "/submit" && req.method == "POST") {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      console.log(fields.email);
      var transporter = nodemailer.createTransport('smtps://mail%40gmail.com:password@smtp.gmail.com');
      // setup e-mail data with unicode symbols
      var mailOptions = {
        from: '"Anton" <nottna@gmail.com>', // sender address
        to: fields.email, // list of receivers
        subject: 'Hello', // Subject line
        text: 'Hello world', // plaintext body
        html: '<b>Hello World!</b>' // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, function(error, info){
        if(error){
          return console.log(error);
        }
        console.log('Message sent: ' + info.response);
        res.writeHead(200);
        res.end('Hello World');
      });
    });
  } else {
    file.serve(req, res);
  }

}).listen(8080);
console.log('Server running on port 8080');