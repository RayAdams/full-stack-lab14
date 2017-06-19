var path = require('path');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var clientPath = path.join(__dirname, '../client');
var dataPath = path.join(__dirname, 'data.json');
app.use(express.static(clientPath));
app.use(bodyParser.json());

app.get('/api/chirps', function(req, res){
    res.sendFile(dataPath);
});

app.post('/api/chirps', function(req,res){
    fs.readFile(dataPath, 'utf8', function (err, data){
        var currentChirps = JSON.parse(data);
        var newChirp = req.body;
        currentChirps.push(newChirp);
    fs.writeFile(dataPath, JSON.stringify(currentChirps), function (err){
        if (err){
            res.sendStatus(500);
        }
        else {
            res.sendStatus(201);
        }
        });
    });
});

app.listen(3000);