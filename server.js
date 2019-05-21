const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
const fs = require('fs');
const mongoose = require('mongoose');
const roblox = require('noblox.js');
const Command = require('./models/Command');

client.config = require('./Configuration');
require("./modules/functions.js")(client);
client.commands = new Discord.Collection();

mongoose.Promise = global.Promise;
mongoose.connect(client.config.DatabaseUri, { useNewUrlParser: true })
.then(() => {
   console.log(chalk.bgBlue('[ DATABASE ]'), 'Database connection is successful.');
}, (error) => {
   console.log(chalk.bgRed('[ DATABASE ]'), `Error when connecting to the database ${error}`);
});

const init = async () => {
   fs.readdir('./events/', (error, files) => {
      if (error) return console.log(chalk.bgRed('ERROR'), error);

      files.forEach(file => {
         const event = require(`./events/${file}`);
         let eventName = file.split(".")[0];
         client.on(eventName, event.bind(null, client));
      });
   });

   fs.readdir('./commands/', (error, files) => {
      if (error) return console.log(chalk.bgRed('ERROR'), error);

      files.forEach(file => {
         if (!file.endsWith(".js")) return;

         let props = require(`./commands/${file}`);
         let commandName = file.split(".")[0];
         console.log(chalk.bgBlue('[ CMDLOAD ]'), `Attempting to load command: ${commandName}`);

         client.commands.set(commandName, props);
      });
   });

   client.levelCache = {};
   for (let i = 0; i < client.config.PermissionLevels.length; i++) {
      const thisLevel = client.config.PermissionLevels[i];
      client.levelCache[thisLevel.name] = thisLevel.Level;
   }

   client.login(client.config.DiscordToken);
   roblox.cookieLogin('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_625D6D667DE48E30486B9CCDAFBE4F99B3022144927765A8ED08E7F696E2457934C5DB08EB71173A43AEEC9DCE9A20AD3006ADA7464B309AC1D1AA83A528025818C801DDBCFA49E87F393235AA87AD894581F62FCCA283C6DFF3CDAE8510B0AAFD26AB9F7E5EE4E7150679482976989EB2520A08422280EE388CD00948171747AF0C6B9D0EA8F1D06AF8808B35A8E5D7E229133D3253485486E6D41B39AF8638806004808AF3FBB70DB6D15CEE644E1230173D4521B53607F1CAB466AF002C7BB9B4411E241AB9B45CFAB10D1C12C651D935F75E97258467077462E0D338B21DAD8078B21E634B4CFB87794A9C1039C777DE43727484B25F3302D805086C40DD02D1A4021B49C8A7121B76FA7989A404B4447977FF04D87A705791F2FDC5985EE664CD693DD873F643BBEA9261BEA4EE5363E069');

   setInterval(() => {
      Check();
   }, 60000);
}

init();

client.on("error", (e) => console.error(e));

function Check() {
   Command.find({}, (error, personnel) => {
      if (error) return;

      personnel.map(user => {
         for (let i = 0; i < client.config.SpecialForces.Aura.length; i++) {
            const rank = client.config.SpecialForces.Aura[i];

            if (user.aura >= rank.requirement) {
               Promote(user.userId, rank.name);
            }
         }
      });
   });
}

function Promote(user, rank) {
   let options = {
      group: 4288093,
      target: user,
      name: rank
   };

   roblox.getRankNameInGroup(options.group, options.target)
   .then(rank => {
      if (rank === options.name) {
         console.log(`uh can't do that chief.`);
      } else {
         roblox.setRank(options)
         .then(newRole => {
            console.log(`${newRole}`);
         });
      }
   });
}