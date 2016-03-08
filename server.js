var http = require('http');
var static = require('node-static');
var nodemailer = require('nodemailer');
var file = new static.Server('Static');
var formidable = require('formidable');

http.createServer(function(req, res) {
    if (req.url == '/submit' && req.method.toLowerCase() == 'post') {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields) {
            console.log(fields.email);

            var transporter = nodemailer.createTransport('smtps://account%40gmail.com:password@smtp.gmail.com');// setup e-mail data with unicode symbols
            var mailOptions = {
                from: '"Anton" <account@gmail.com>', // sender address
                to: fields.email, // list of receivers
                subject: 'Hello', // Subject line
                text: 'Hello world', // plaintext body
                html: '<b>Hello world</b>' // html body
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
        return;
    }

    file.serve(req, res);
}).listen(8080);
console.log('Server running on port 8080');

