const Command = require('../models/Command');

exports.run = (client, message, args, level) => {
    let mention = message.mentions.users.first().id;
    let type = args[1];
    let action = args[2];
    let value = args[3];

    if (type === "aura") {
        if (action === "add") {
            Command.findOneAndUpdate({ discordId: mention }, { $inc: { aura: value }}, (error, result) => {
                if (error) return;
                
                if (!result) {
                    message.channel.send(`User doesn't exist`);
                } else {
                    message.channel.send(`User has gained ${value} Aura`);
                }
            });
        } else if (type === "remove") {
            Command.findOneAndUpdate({ discordId: mention }, { $inc: { aura: -value }}, (error, result) => {
                if (error) return;
                
                if (!result) {
                    message.channel.send(`User doesn't exist`);
                } else {
                    message.channel.send(`User has lost ${value} Aura`);
                }
            });
        }
    } else if (type === "glory") {
        if (action === "add") {
            Command.findOneAndUpdate({ discordId: mention }, { $inc: { glory: value }}, (error, result) => {
                if (error) return;
                
                if (!result) {
                    message.channel.send(`User doesn't exist`);
                } else {
                    message.channel.send(`User has gained ${value} Glory`);
                }
            });
        } else if (type === "remove") {
            Command.findOneAndUpdate({ discordId: mention }, { $inc: { glory: -value }}, (error, result) => {
                if (error) return;
                
                if (!result) {
                    message.channel.send(`User doesn't exist`);
                } else {
                    message.channel.send(`User has lost ${value} Glory`);
                }
            });
        }
    } else if (type === "prestige") {
        if (action === "add") {
            Command.findOneAndUpdate({ discordId: mention }, { $inc: { prestige: value }}, (error, result) => {
                if (error) return;
                
                if (!result) {
                    message.channel.send(`User doesn't exist`);
                } else {
                    message.channel.send(`User has gained ${value} Prestige`);
                }
            });
        } else if (type === "remove") {
            Command.findOneAndUpdate({ discordId: mention }, { $inc: { prestige: -value }}, (error, result) => {
                if (error) return;
                
                if (!result) {
                    message.channel.send(`User doesn't exist`);
                } else {
                    message.channel.send(`User has lost ${value} Prestige`);
                }
            });
        }
    }
};

exports.conf = {
    enabled: true,
    PermissionLevel: "Bot Command",
    GuildOnly: false
};
  
exports.help = {
    name: "award",
    category: "System",
    description: "View the help",
    usage: "help"
};