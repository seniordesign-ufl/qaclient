const express = require('express');
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

const mysql = require("mysql");
const fs = require('fs');
const knex = require('knex')({
    client: 'mysql',
    version: '5.7',
    connection: {
      host : '35.196.27.6',
      ssl: {
        ca: fs.readFileSync('./server-ca.pem'),
        key: fs.readFileSync('./client-key.pem'),
        cert: fs.readFileSync('./client-cert.pem'),
      },
      user : 'smoll-talk',
      password : 'Pbeq0hcDejpO12cN',
      database : 'smol_talk',
    },
});

const app = express();

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react/build')));

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react/build', 'index.html'));
    knex('users')
    .insert({name: 'john', groupID: '1'})
});

app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
});