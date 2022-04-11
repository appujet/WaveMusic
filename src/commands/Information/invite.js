const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "invite",
  category: "Information",
  aliases: ["addme"],
  description: "invite LavaMusic",
  args: false,
  usage: "",
  permission: [],
  owner: false,
  execute: async (message, args, client, prefix) => {
    var invite = client.config.links.invite;
    var color = client.embedColor
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel("Invite")
          .setStyle("LINK")
          .setURL(invite)
      );

    const mainPage = new MessageEmbed()
      .setDescription(`Click [Here](${invite}) To Invite Me Or Click Below `)
      .setColor(color)
    message.reply({ embeds: [mainPage], components: [row] })
  }
}
