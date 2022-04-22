const { MessageEmbed, CommandInteraction, Client, MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
  name: "invite",
  description: "Get The Bot Invite Link",
  userPrams: [],
  botPrams: ['EMBED_LINKS'],

  /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false
    });

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
    interaction.editReply({ embeds: [mainPage], components: [row] })
  }
}