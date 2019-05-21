exports.run = (client, message, args, level) => {
    message.channel.send("help me");
};

exports.conf = {
    enabled: true,
    PermissionLevel: "User",
    GuildOnly: false
};
  
exports.help = {
    name: "help",
    category: "System",
    description: "View the help",
    usage: "help"
};