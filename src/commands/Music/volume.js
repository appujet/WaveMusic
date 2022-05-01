const { MessageEmbed } = require('discord.js');
const Wait = require('util').promisify(setTimeout);
module.exports = {
  name: 'volume',
  aliases: ['v', 'vol'],
  category: 'Music',
  description: 'Change volume of currently playing music',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  dj: true,
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const player = client.manager.players.get(message.guild.id);

    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('There is no music playing.');
      return message.reply({ embeds: [thing] });
    }
    const volumeEmoji = client.emoji.volumehigh;

    if (!args.length) {
      let thing = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`Player Current Volume: \`[ ${player.player.filters.volume * 100}% ]\``);
      return message.reply({ embeds: [thing] });
    }

    const volume = Number(args[0]);

    if (!volume || volume < 0 || volume > 100) {
      let thing = new MessageEmbed()
        .setColor('RED')
        .setDescription(`Usage: ${prefix}volume <Number of volume between 0 - 100>`);
      return message.reply({ embeds: [thing] });
    }

    await player.setVolume(volume / 1);
    Wait(500);
    if (volume > player.volume) {
      var emojivolume = client.emoji.volumehigh;
      let thing = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`${emojivolume} Volume set to: \`[ ${volume}% ]\``);
      return message.reply({ embeds: [thing] });
    } else if (volume < player.volume) {
      var emojivolume = message.client.emoji.volumelow;
      let thing = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`${emojivolume} Volume set to: \`[ ${volume}% ]\``);
      return message.reply({ embeds: [thing] });
    } else {
      let thing = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`${volumeEmoji} Volume set to: \`[ ${volume}% ]\``);
      return message.reply({ embeds: [thing] });
    }
  },
};
