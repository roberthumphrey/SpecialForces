const ServerSettings = require('../models/Server');

exports.run = (client, message, [action, key, ...value]) => {
    ServerSettings.findOne({ ServerID: message.guild.id }, (error, result) => {
        if (action === "view") {
            message.channel.send(`SERVER SETTINGS FOR SERVER: **${message.guild.id}**\nPrefix: ${result.Prefix}\nModLog: ${result.ModLog}\nModRole: ${result.ModRole}\nAdminRole: ${result.AdminRole}\nSystemNotice: ${result.SystemNotice}\nWelcomeChannel: ${result.WelcomeChannel}\nWelcomeMessage: ${result.WelcomeMessage}\nWelcomeActive: ${result.WelcomeActive}`);
        } else if (action === "edit") {
            if (!key) return message.reply('Please specify a value to edit');
            if (value.length < 1) return message.reply('Please specify a new value');

            if (key === "Prefix") {
                ServerSettings.updateOne({ Prefix: value }, (error, raw) => {
                    if (error) return handleError(error);

                    message.channel.send('Prefix successfully set');
                });
            } else if (key === "ModLog") {
                ServerSettings.updateOne({ ModLog: value }, (error, raw) => {
                    if (error) return handleError(error);

                    message.channel.send('ModLog successfully set');
                });
            } else if (key === "ModRole") {
                ServerSettings.updateOne({ ModRole: value }, (error, raw) => {
                    if (error) return handleError(error);

                    message.channel.send('ModRole successfully set');
                });
            } else if (key === "AdminRole") {
                ServerSettings.updateOne({ AdminRole: value }, (error, raw) => {
                    if (error) return handleError(error);

                    message.channel.send('AdminRole successfully set');
                });
            } else if (key === "SystemNotice") {
                ServerSettings.updateOne({ SystemNotice: value }, (error, raw) => {
                    if (error) return handleError(error);

                    message.channel.send('SystemNotice successfully set');
                });
            } else if (key === "WelcomeChannel") {
                ServerSettings.updateOne({ WelcomeChannel: value }, (error, raw) => {
                    if (error) return handleError(error);

                    message.channel.send('WelcomeChannel successfully set');
                });
            } else if (key === "WelcomeMessage") {
                ServerSettings.updateOne({ WelcomeMessage: value.join(" ") }, (error, raw) => {
                    if (error) return handleError(error);

                    message.channel.send('WelcomeMessage successfully set');
                });
            } else if (key === "WelcomeActive") {
                ServerSettings.updateOne({ WelcomeActive: value }, (error, raw) => {
                    if (error) return handleError(error);

                    message.channel.send('WelcomeActive successfully set');
                });
            } else {
                message.channel.send(`The value you're trying to set is nonexistent.`);
            }
        } else if (action === "reset") {
            ServerSettings.updateMany({
                ServerID: message.guild.id,
                Prefix: client.config.DefaultSettings.Prefix,
                ModLog: client.config.DefaultSettings.ModLog,
                ModRole: client.config.DefaultSettings.ModRole,
                AdminRole: client.config.DefaultSettings.AdminRole,
                SystemNotice: client.config.DefaultSettings.SystemNotice,
                WelcomeChannel: client.config.DefaultSettings.WelcomeChannel,
                WelcomeMessage: client.config.DefaultSettings.WelcomeMessage,
                WelcomeActive: client.config.DefaultSettings.WelcomeActive
            }, (error, raw) => {
                if (error) return handleError(error);
            });
        }
    });
}

exports.conf = {
    enabled: true,
    PermissionLevel: "Override",
    GuildOnly: true
};
  
exports.help = {
    name: "settings",
    category: "System",
    description: "View or change settings for your server.",
    usage: "settings <view/edit/reset> <key> <value>"
};