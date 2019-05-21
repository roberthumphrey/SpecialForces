const request = require('snekfetch');
const cheerio = require('cheerio');
const Command = require('../models/Command');
const Verification = require('../models/Verification');

exports.run = (client, message, args, level) => {
    Verification.findOne({ discordId: message.author.id }, function (err, result) {
        if (result) {
            verifyBlurb(result.userId, result.verCode)
            .then(function(found) {
                if (found != -1) {
                    message.member.setNickname(`${result.robloxUser}`);
                    message.member.addRole(message.guild.roles.find('id', '549736726512533504'));

                    Command.create({
                        discordId: result.discordId,
                        robloxUser: result.robloxUser,
                        userId: result.userId,
                        aura: 0,
                    });

                    Verification.findOneAndDelete({ discordId: message.author.id });
                    message.channel.send('**SUCCESS** || Your account has been verified.');
                } else {
                    message.channel.send('**ERROR** || Verification code not found.');
                }
            });
        } else {
            message.channel.send('**ERROR** || It seems you haven\'t started a verification process yet. Please do so now.');
        }
    });
};

exports.conf = {
    enabled: true,
    PermissionLevel: "User",
    GuildOnly: false
};
  
exports.help = {
    name: "check",
    category: "System",
    description: "View the bot's ping",
    usage: "check"
};

function verifyBlurb(id, code) {
	return request.get(`https://roblox.com/users/${id}/profile`)
	.then(r => {
		$ = cheerio.load(r.body);
		var blurb = $('meta[name=description]').attr('content');	
		var codePos = blurb.indexOf(code);
	
        return codePos;
	});
}