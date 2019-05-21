const Command = require('../models/Command');

exports.run = (client, message, args, level) => {
    Command.find({}, (error, personnel) => {
        if (error) return;

        personnel.map(user => {
            message.channel.send(`User: ${user.robloxUser}\nAura: ${user.aura}\nGlory: ${user.glory}\nPrestige: ${user.prestige}`);
        });
    });
};

exports.conf = {
    enabled: true,
    PermissionLevel: "User",
    GuildOnly: false
};
  
exports.help = {
    name: "currentusers",
    category: "System",
    description: "View the help",
    usage: "help"
};