const express = require('express');
const bodyParser = require('body-parser');

// Business Logic
cmds = [ { command: 'g r56' }, { command: 'g att5 d 13' }, {command: 'g r6 d 14' } ]
undoCmds = []

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
  res.send({ type: 'commandsList', commands: cmds } );
}

// POST Endpoint
function applyCommand(req, res) {

  if (req.body.command) {
    cmd = { command: req.body.command };
    cmds.push(cmd);
    res.send({ appliedCommand: cmd.command, commands: cmds });
  } else {
    res.status(400);
    res.send({ error: 'Attribute \'command\' was not specified'});
  }
}

// DELETE Endpoint
function undoCommand(req, res) {

  if (cmds.length > 0) {
    undoCmd = cmds.pop();
    undoCmds.push(undoCmd);
    res.send({ undoCommand: undoCmd.command, commands: cmds });
  } else {
    res.status(404);
    res.send({ error: 'There are no more commands to undo'});
  }
}
