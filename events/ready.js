const chalk = require('chalk');

module.exports = (client) => {
    console.log(chalk.bgBlue('[ READY ]'), 'InfiniSim Client: Online');
    client.user.setActivity(`Say ${client.config.DefaultSettings.Prefix}help for help`, {
        type: 'PLAYING'
    });
}