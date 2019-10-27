var express = require('express')
var app = express()

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function(req: Express.Request, res){
    res.json({"message": "Hi!"})
});

app.post('/v1/signin', function(req: Express.Request, res: Express.Response) {



});

app.listen(3000, function() {
    console.log("Authenticatron server started on port 3000")
});
