const commands = require('./services/commands-api');
const commands_port = 3000;

commands.listen(commands_port, () => console.log(`Commands API listening on ${commands_port}`));
