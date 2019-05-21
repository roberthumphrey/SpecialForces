exports.run = (client, message, args, level) => {
    message.channel.send("pong!");
};

exports.conf = {
    enabled: true,
    PermissionLevel: "User",
    GuildOnly: false
};
  
exports.help = {
    name: "ping",
    category: "System",
    description: "View the bot's ping",
    usage: "ping"
};