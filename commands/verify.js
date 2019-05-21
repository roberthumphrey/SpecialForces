const Command = require('../models/Command');
const Verification = require('../models/Verification');
const snekfetch = require('snekfetch');
const randomWords = require('random-words')

exports.run = (client, message, args, level) => {
    let username = args[0];
    if (!username) {
        message.channel.send('You need to supply a username.');
    } else {
        Command.findOne({ robloxUser: username }, (error, user) => {
            if (!user) {
                Verification.findOne({ robloxUser: username }, (error, user) => {
                    if (!user) {
                        snekfetch.get(`https://api.roblox.com/users/get-by-username?username=${username}`)
                        .then(result => {
                            if (result.body.success == false) {
                                message.channel.send(`Username ${username} was not found.`);
                            } else {
                                var code = randomWords({ min: 3, max: 6}).join(" ");

                                var robloxUser = result.body.Username;
                                var userId = result.body.Id;

                                message.channel.send(`Hey, ${robloxUser}, put this code in your **Profile Description** and then say !check\n"**${code}**"`);

                                Verification.create({
                                    discordId: message.author.id,
                                    robloxUser: robloxUser,
                                    userId: userId,
                                    verCode: code
                                });
                            }
                        });
                    }
                });
            } else {
                message.channel.send(`User ${username} is already verified.`);
            }
        });
    }
};

exports.conf = {
    enabled: true,
    PermissionLevel: "User",
    GuildOnly: false
};
  
exports.help = {
    name: "verify",
    category: "System",
    description: "View the bot's ping",
    usage: "ping"
};