const ServerSettings = require('../models/Server');

module.exports = (client, message) => {
    ServerSettings.findOne({ ServerID: message.guild.id }, (error, result) => {
        if (message.author.bot) return;
        if (message.channel.dm) return;
        if (message.content.indexOf(result.Prefix) !== 0) return;

        const args = message.content.slice(result.Prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        const cmd = client.commands.get(command);

        const level = client.PermissionLevel(message);
        
        if (cmd && !message.guild && cmd.conf.GuildOnly)
            return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");

        if (level < client.levelCache[cmd.conf.PermissionLevel]) {
            if (result.SystemNotice === "true") {
                return message.channel.send(`You do not have permission to use this command.
                    Your permission level is ${level} (${client.config.PermissionLevel.find(l => l.level === level).name})
                    This command requires level ${client.levelCache[cmd.conf.PermissionLevel]} (${cmd.conf.PermissionLevel})`);
            } else {
                return;
            }
        }

        message.author.PermissionLevel = level;
        
        cmd.run(client, message, args, level);
    });
}