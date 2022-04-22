const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'return websocket ping',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });
    await interaction.editReply({ content: 'Pining...' }).then(async () => {
      const ping = Date.now() - interaction.createdAt;
      const api_ping = client.ws.ping;

      await interaction.editReply({
        content: ' ',
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(
              `\`\`\`ini\n[ Bot Latency ] :: ${ping}ms \n[ API Latency ] :: ${api_ping}ms \`\`\``,
            ),
        ],
      });
    });
  },
};
