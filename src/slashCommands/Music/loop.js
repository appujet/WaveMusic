const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'loop',
  description: 'Toggle music loop',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  dj: true,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  options: [
    {
      name: 'input',
      description: 'The looping input (track, queue or off).',
      type: 'STRING',
      required: true,
      choices: [
        {
          name: 'track',
          value: 'track',
        },
        {
          name: 'queue',
          value: 'queue',
        },
        {
          name: 'off',
          value: 'off',
        },
      ],
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    if (!interaction.replied) await interaction.deferReply().catch(() => {});
    
    const input = interaction.options.getString('input');

    let player = client.manager.players.get(interaction.guildId);
    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('There is no music playing.');
      return message.channel.send({ embeds: [thing] });
    }
    const emojiloop = client.emoji.loop;

    if (input === 'track') {
      await player.setLoop('track');
      return await interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`${emojiloop} Loop track is now **enable**`),
        ],
      });
    } else if (input === 'queue') {
      await player.setLoop('queue');
      return await interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`${emojiloop} Loop queue is now **enable**`),
        ],
      });
    } else if (input === 'off') {
      await player.setLoop('off');
      return await interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`${emojiloop} Loop is now **disabled**`),
        ],
      });
    }
  },
};
