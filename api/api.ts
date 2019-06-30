var express = require('express')
var app = express()

app.get('/', function(req: Express.Request, res: Express.Response){
    res.json({"message": "Hi!"})
});

app.listen(3000, function() {
    console.log("Authenticatron server started on port 3000")
});