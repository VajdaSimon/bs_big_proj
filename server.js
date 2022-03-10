//sudo apt install nodejs
//npm install express --save

const express = require('express')
const request = require('request');
const app = express()
const port = 6006
var fs = require('fs');

const szavazas = [0, 0] //v6,v7

app.use(express.static("."));

app.get('/api/status', (req, res) => {
    request('http://192.168.0.21:4568/status', function (error, response, body) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(body);
        return res.end();
    });
});

app.get('/api/mindustry-szavazas', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(String(szavazas));
    return res.end();
});

app.get('/api/mindustry-szavazas-uj-v6', (req, res) => {
    szavazas[0]++;
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("okes");
    return res.end();
});

app.get('/api/mindustry-szavazas-uj-v7', (req, res) => {
    szavazas[1]++;
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("okes");
    return res.end();
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})