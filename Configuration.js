const ServerSettings = require('./models/Server');

module.exports = {
    OwnerID: "112329563849117696",
    DiscordToken: "NTc2OTk5NDgxNTY5MDUwNjM0.XONTYw.kC1TkiuAe8Kz8hljLdeEXzYJ7LY",
    DatabaseUri: "mongodb://admin:admin1@ds058508.mlab.com:58508/strategiccommanddb",
    Dashboard: {
        OAuthSecret: "",
        CallbackURL: "http://localhost:5000/callback",
        SessionSecret: "",
        Domain: "localhost",
        Port: 5000
    },
    DefaultSettings: {
        Prefix: "!",
        ModLog: "mod_log",
        ModRole: "Moderator",
        AdminRole: "Administrator",
        SystemNotice: "true",
        WelcomeChannel: "welcome",
        WelcomeMessage: "Welcome to the server, {{ user }}",
        WelcomeActive: "false",
        MaxSuspensions: 2
    },
    SpecialForces: {
        GroupID: 4747632,
        Aura: [
            { name: "L | Conscript", requirement: 0 },
            { name: "L | Spector", requirement: 6 },
            { name: "L | Auxiliary", requirement: 12 },
            { name: "L | Legionary", requirement: 20 },
            { name: "L | Vindicator", requirement: 28 },
            { name: "L | Hyperion", requirement: 36 },
            { name: "M | Emissary", requirement: 46 },
            { name: "M | Centurion", requirement: 56 },
            { name: "M | Vanguard", requirement: 66 },
            { name: "M | Luminary", requirement: 78 },
            { name: "M | Primus", requirement: 90 }
        ]
    },
    PermissionLevels: [
        {
            Level: 0,
            Name: "User",
            check: () => true
        },
        {
            Level: 2,
            Name: "Bot Command",
            check: (message) => {
                ServerSettings.findOne({ ServerID: message.guild.id }, (error, result) => {
                    try {
                        const ModRole = message.guild.roles.find(r => r.name.toLowerCase() === result.ModRole.toLowerCase());
                        if (ModRole && message.member.roles.has(ModRole.id)) return true;
                    } catch (error) {
                        return false;
                    }
                });
            }
        },
        {
            Level: 3,
            Name: "Override",
            check: (message) => {
                ServerSettings.findOne({ ServerID: message.guild.id }, (error, result) => {
                    try {
                        const AdminRole = message.guild.roles.find(r => r.name.toLowerCase() === result.AdminRole.toLowerCase());
                        if (AdminRole && message.member.roles.has(AdminRole.id)) return true;
                    } catch (error) {
                        return false;
                    }
                });
            }
        },
        {
            Level: 4,
            Name: "Server Owner",
            check: (message) => message.channel.type === "text" ? (message.guild.owner.user.id === message.author.id ? true : false) : false
        },
        {
            Level: 8,
            Name: "Bot Owner",
            check: (message) => message.author.id === "112329563849117696"
        }
    ]
}