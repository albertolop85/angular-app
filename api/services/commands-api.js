const express = require('express');
const bodyParser = require('body-parser');

// Creates Express app with JSON body parser
const api = new express();
api.use(bodyParser.json());

// Defines REST API (HTTP methods)
api.get('/api/getCommandsText', getCommandsText);
api.get('/api/getCommands', getCommands);
api.post('/api/applyCommand', applyCommand);
api.delete('/api/undoCommand', undoCommand);

// Exports Express API
module.exports = api;

// GET Endpoint
function getCommandsText(req, res) {
  res.send('Get Commands');
}

// GET Endpoint
function getCommands(req, res) {
  res.send({ type: 'commandsList', commands: [ { command: 'g r56' }, { command: 'g att5 d 13' }, {command: 'g r6 d 14' } ] } );
}

// POST Endpoint
function applyCommand(req, res) {

}

// DELETE Endpoint
function undoCommand(req, res) {

}


