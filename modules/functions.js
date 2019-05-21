const Command = require('../models/Command');

module.exports = (client) => {
    client.PermissionLevel = message => {
        let PermissionLevel = 0;
        const PermissionOrder = client.config.PermissionLevels.slice(0).sort((p,c) => p.Level < c.Level ? 1 : -1);

        while (PermissionOrder.length) {
            const CurrentLevel = PermissionOrder.shift();
            if (message.guild && CurrentLevel.guildOnly) continue;
            if (CurrentLevel.check(message)) {
                PermissionLevel = CurrentLevel.Level;
                break;
            }
        }
        return PermissionLevel;
    }
}