const { MessageEmbed, CommandInteraction, Client, Permissions } = require('discord.js');

module.exports = {
  name: 'join',
  description: 'Join voice channel',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });
    const { channel } = interaction.member.voice;
    const player = client.manager.players.get(interaction.guild.id);
    if (player) {
      return await interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`I'm already connected to <#${player.voice}> voice channel!`),
        ],
      });
    } else {
      if (
        !interaction.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])
      )
        return interaction.editReply({
          embeds: [
            new MessageEmbed()
              .setColor(client.embedColor)
              .setDescription(
                `I don't have enough permissions to execute this command! please give me permission \`CONNECT\` or \`SPEAK\`.`,
              ),
          ],
        });

      if (
        !interaction.guild.me
          .permissionsIn(channel)
          .has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])
      )
        return interaction.editReply({
          embeds: [
            new MessageEmbed()
              .setColor(client.embedColor)
              .setDescription(
                `I don't have enough permissions connect your vc please give me permission \`CONNECT\` or \`SPEAK\`.`,
              ),
          ],
        });

      const emojiJoin = interaction.client.emoji.join;

      await client.manager.createPlayer({
        guildId: interaction.guild.id,
        voiceId: interaction.member.voice.channel.id,
        textId: interaction.channel.id,
        deaf: true,
      });

      let thing = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(
          `${emojiJoin} **Join the voice channel**\nJoined <#${channel.id}> and bound to <#${interaction.channel.id}>`,
        );
      return interaction.editReply({ embeds: [thing] });
    }
  },
};
