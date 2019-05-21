exports.run = (client, message, args, level) => {
    let mention = message.mentions.users.first().id;
    let disciplineType = args[1];
    let value = args[2];
    
    if (type1 === "suspend") {

    };
};

exports.conf = {
    enabled: true,
    PermissionLevel: "Bot Command",
    GuildOnly: false
};
  
exports.help = {
    name: "discipline",
    category: "System",
    description: "View the bot's ping",
    usage: "ping"
};