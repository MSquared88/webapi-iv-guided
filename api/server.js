const express = require('express');
const helmet = require('helmet');

const Shoutouts = require('../data/shoutouts-model.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send(
    "<h1>Welcome to Matthew's Shouts use endpoint api/shouts to post shouts<h1>"
    
  )
})

server.get('/api/shouts', (req, res) => {
  Shoutouts.find()
  .then(shoutouts => {
    shoutouts.length
    ?
    res.status(200).json(shoutouts)
    :
    res.status(404).json({messge: "no shoutouts"})
  })
  .catch (error => {
    console.error('\nERROR', error);
    res.status(500).json({ error: 'Cannot retrieve the shoutouts' });
  });
});

server.post('/api/shouts', (req, res) => {
  Shoutouts.add(req.body)
  .then(shoutout => {
    res.status(201).json(shoutout);
  })
  .catch (error => {
    console.error('\nERROR', error);
    res.status(500).json({ error: 'Cannot add the shoutout' });
  });
});

module.exports = server;
