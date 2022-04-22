const { MessageEmbed, version } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const os = require('os');
const si = require('systeminformation');

module.exports = {
  name: 'status',
  description: 'Show status bot',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });
   const duration1 = moment
     .duration(client.uptime)
     .format(' D [days], H [hrs], m [mins], s [secs]');
   const cpu = await si.cpu();
   const about = client.emoji.about;
   let ccount = client.channels.cache.size;
   let scount = client.guilds.cache.size;
   let mcount = 0;
   client.guilds.cache.forEach((guild) => {
     mcount += guild.memberCount;
   });
   const embed = new MessageEmbed()
     .setColor(client.embedColor)
     .setThumbnail(client.user.displayAvatarURL()).setDescription(`${about} **Status**
**= STATISTICS =**
**• Servers** : ${scount}
**• Channels** : ${ccount}
**• Users** : ${mcount}
**• Discord.js** : v${version}
**• Node** : ${process.version}
**= SYSTEM =**
**• Platfrom** : ${os.type}
**• Uptime** : ${duration1}
**• CPU** :
> **• Cores** : ${cpu.cores}
> **• Model** : ${os.cpus()[0].model} 
> **• Speed** : ${os.cpus()[0].speed} MHz
**• MEMORY** :
> **• Total Memory** : ${(os.totalmem() / 1024 / 1024).toFixed(2)} Mbps
> **• Free Memory** : ${(os.freemem() / 1024 / 1024).toFixed(2)} Mbps
> **• Heap Total** : ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} Mbps
> **• Heap Usage** : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} Mbps
`);
    interaction.editReply({ embeds: [embed] });
  },
};
