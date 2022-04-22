const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
  name: 'about',
  category: 'Information',
  aliases: ['botinfo'],
  description: 'See description about this project',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {
    const row = new MessageActionRow().addComponents(
      new MessageButton().setLabel('Invite').setStyle('LINK').setURL(client.config.links.invite),
      new MessageButton()
        .setLabel('GitHub')
        .setStyle('LINK')
        .setURL('https://github.com/brblacky/WaveMusic'),
      new MessageButton().setLabel('Support').setStyle('LINK').setURL(client.config.links.support),
    );
    const mainPage = new MessageEmbed()
      .setAuthor({
        name: 'WaveMusic',
        iconURL:
          'https://media.discordapp.net/attachments/966675680907657256/966675755453018133/20220411_160253.png',
      })
      .setThumbnail(
        'https://media.discordapp.net/attachments/966675680907657256/966675755453018133/20220411_160253.png',
      )
      .setColor('#303236')
      .addField(
        'Creator',
        '[Blacky](https://github.com/brblacky), [Venom#9718](https://github.com/Venom9718/) and [AkAbhijit](https://github.com/AkAbhijit)',
        true,
      )
      .addField('Organization', '[Blacky](https://github.com/brblacky)', true)
      .addField('Repository', '[Here](https://github.com/brblacky/WaveMusic)', true)
      .addField(
        '\u200b',
        `[WaveMusic](https://github.com/brblacky/WaveMusic/) is [Blacky](https://github.com/brblacky)'s Was created by blacky and Venom. He really wants to make his first open source project ever. Because he wants more for coding experience. In this project, he was challenged to make project with less bugs. Hope you enjoy using WaveMusic!`,
      );
    return message.reply({ embeds: [mainPage], components: [row] });
  },
};