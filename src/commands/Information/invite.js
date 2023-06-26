const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'invite',
  category: 'Information',
  aliases: ['addme'],
  description: 'invite WaveMusic',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {

    var invite = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`;
    
    const row = new MessageActionRow().addComponents(
      new MessageButton().setLabel('Invite').setStyle('LINK').setURL(invite),
    );
    const mainPage = new MessageEmbed()
      .setDescription(`Click [Here](${invite}) To Invite Me Or Click Below `)
      .setColor(client.embedColor);
    message.reply({ embeds: [mainPage], components: [row] });
  },
};
