const { MessageEmbed, version } = require('discord.js');
const os = require('os');
let cpuStat = require("cpu-stat");
module.exports = {
  name: 'status',
  category: 'Information',
  aliases: ['stats'],
  description: 'Show status bot',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {

    let uptime = await os.uptime();

    let d = Math.floor(uptime / (3600 * 24));
    let h = Math.floor(uptime % (3600 * 24) / 3600);
    let m = Math.floor(uptime % 3600 / 60);
    let s = Math.floor(uptime % 60);
    let dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
    let hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    let mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    let sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    let ccount = client.channels.cache.size;
    let scount = client.guilds.cache.size;
    let mcount = 0;
    client.guilds.cache.forEach((guild) => {
      mcount += guild.memberCount;
    });
    cpuStat.usagePercent(function (err, percent, seconds) {
      if (err) {
        return console.log(err);
      }
    const embed = new MessageEmbed()
      .setDescription(`__**${client.user.username} Information**__`)
      .setThumbnail(client.user.displayAvatarURL())
      .addFields([
        { name: "**Client**", value: `\`\`\`Servers: ${scount}\nChannels: ${ccount}\nUsers: ${mcount}\`\`\``,inline: false },
        { name: "**CPU**", value: `\`\`\`Cpu: ${os.cpus().map((i) => `${i.model}`)[0]}\nLoad: ${percent.toFixed(2)}%\nPlatform: ${os.platform()}\`\`\``, inline: false },
        { name: "**DISK**", value: `\`\`\`Disk Used: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${( os.totalmem() / 1024 / 1024).toFixed(2)} MB\`\`\``, inline: false },
        { name: "**Discord**", value: `\`\`\`Discord.js: v${version}\nNode: ${process.version}\nAPI websocket ping: ${Math.round(client.ws.ping)}ms\`\`\``, inline: false },
        { name: "**System**", value: `\`\`\`Uptime: ${dDisplay + hDisplay + mDisplay + sDisplay}\`\`\``, inline: true }
      ])
      .setColor(client.embedColor)
      .setTimestamp(Date.now());
    message.reply({ embeds: [embed] });
    });
}
};
