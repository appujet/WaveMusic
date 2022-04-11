
const { MessageEmbed, CommandInteraction, Client } = require("discord.js");
const {  version, MessageActionRow, MessageButton } = require("discord.js");
const Discord = require("discord.js")
const moment = require("moment");
require("moment-duration-format");
const os = require('os')
const si = require('systeminformation');

module.exports = {
    name: "status",
    description: "Show status bot",
    run: async (client, interaction) => {

        await interaction.deferReply({
            ephemeral: false
        });
        const row = new MessageActionRow().addComponents(
          new MessageButton()
              .setLabel("Invite")
              .setStyle("LINK")
              .setURL(
                  client.config.links.invite
              ),

          new MessageButton()
              .setLabel("Support Server")
              .setStyle("LINK")
              .setURL(client.config.links.support)
      );
      let totalSeconds = interaction.client.uptime / 1000;
      let days = Math.floor(totalSeconds / 86400);
      totalSeconds %= 86400;
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = Math.floor(totalSeconds % 60);
      let x = new Date()
      let y = x.getTime() - Math?.floor(client.uptime);
      let uptime = `${days}d ${hours}h ${minutes}m ${seconds}s `;
      const cpu = await si.cpu();

      let connectedchannelsamount = 0;
      let guilds = client.guilds.cache.map((guild) => guild);
      for (let i = 0; i < guilds.length; i++) {
          if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
      }
      if (connectedchannelsamount > client.guilds.cache.size)
          connectedchannelsamount = client.guilds.cache.size;
      var color = client.embedColor

      const statsEmbed = new MessageEmbed()
          .setColor(color)
          .setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL() })
          .setDescription(
              `I'm A Discord Music Bot, Sustains a Plethora Of Audio Sources\n And A Wide  Assortment Of Commands.`
          )
          .addFields(
              { name: `  **Birthday**`, value: "<t:" + parseInt(client.user.createdTimestamp / 1000) + ">", inline: true },
              { name: `  **Verified**`, value: `<t:1648228380>`, inline: true },
              {
                  name: `  **Developer(s)**`,
                  value: `[ Team Apera ](https://github.com/team-apera)`,
                  inline: false,
              },
              { name: `  **Platform**`, value: `\`[ ${os.type} ]\``, inline: true },
              {
                  name: `  **Cores**`,
                  value: `\`[ ${cpu.cores} ]\``,
                  inline: true,
              },
              {
                  name: `  **Total Memory**`,
                  value: `\`[ ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} Gb ]\``,
                  inline: true,
              },
              {
                  name: `  **Free Memory**`,
                  value: `\`[ ${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} Gb ]\``,
                  inline: true,
              },
              {
                  name: `  **Speed**`,
                  value: `\`[ ${os.cpus()[0].speed} MHz ]\``,
                  inline: true,
              },
              { name: `  **Uptime**`, value: "<t:" + parseInt(Math?.floor(y / 1000)) + ":R>", inline: true },
              {
                  name: `  **Message Commands**`,
                  value: `\`[ ${client.commands.size} ]\``,
                  inline: true,
              },
              {
                  name: `  **Slash Commands**`,
                  value: `\`[ ${client.slashCommands.size} ]\``,
                  inline: true,
              },
              {
                  name: `  **Node**`,
                  value: `\`[ ${process.version} ]\``,
                  inline: true,
              },
              {
                  name: `  **Discord.js**`,
                  value: `\`[ v${version} ]\``,
                  inline: true,
              },
              {
                  name: `  **Cached Server(s)**`,
                  value: `\`[ ${client.guilds.cache.size} ]\``,
                  inline: true,
              },
              {
                  name: `  **Cached Channel(s)**`,
                  value: `\`[ ${client.channels.cache.size} ]\``,
                  inline: true,
              },
              {
                  name: `  **Cached User(s)**`,
                  value: `\`[ ${client.users.cache.size} ]\``,
                  inline: true,
              },
              {
                  name: `  **Total Users**`,
                  value: `\`[ ${client.guilds.cache.reduce(
                      (acc, guild) => acc + guild.memberCount,
                      0
                  )} ]\``,
                  inline: true,
              },
              {
                  name: `  **Total Player(s)**`,
                  value: `\`[ ${connectedchannelsamount} ]\``,
                  inline: true,
              }

          );
              interaction.followUp({ embeds: [statsEmbed], components: [row] });
            

    }
}