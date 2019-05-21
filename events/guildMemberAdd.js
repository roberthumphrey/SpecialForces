const ServerSettings = require('../models/Server');

module.exports = (client, member) => {
    ServerSettings.findOne({ ServerID: member.guild.id }, (error, result) => {    
        if (result.WelcomeActive !== "true") return;

        const WelcomeMessage = result.WelcomeMessage.replace("{{ user }}", member.user.tag);
        member.guild.channels.find("name", result.WelcomeChannel).send(WelcomeMessage);
    });
};