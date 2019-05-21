const ServerSettings = require('../models/Server');

module.exports = (client, guild) => {
    let settings = new ServerSettings({
        ServerID: guild.id,
        Prefix: client.config.DefaultSettings.Prefix,
        ModLog: client.config.DefaultSettings.ModLog,
        ModRole: client.config.DefaultSettings.ModRole,
        AdminRole: client.config.DefaultSettings.AdminRole,
        SystemNotice: client.config.DefaultSettings.SystemNotice,
        WelcomeChannel: client.config.DefaultSettings.WelcomeChannel,
        WelcomeMessage: client.config.DefaultSettings.WelcomeMessage,
        WelcomeActive: client.config.DefaultSettings.WelcomeActive
    });
    settings.save();
}