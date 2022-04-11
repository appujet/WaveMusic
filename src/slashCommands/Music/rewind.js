const { MessageEmbed, CommandInteraction, Client } = require("discord.js");
const { convertTime } = require("../../utils/convert.js");

module.exports = {
  name: "rewind",
  description: "To rewind the current playing song 10s as default.",

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });

    const player = interaction.client.manager.get(interaction.guild.id);
    const { duration } = player.queue.current;

    let seektime = Number(player.position) - 10000;
    //if the userinput is smaller then 0, then set the seektime to just the player.position
    if (seektime < 0)
      return interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setDescription(`Cannot rewind any further more.`)
            .setColor(client.embedColor),
        ],
      });
    if (player.paused)
      return interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setDescription(
              `Cannot rewind because the player is currently paused.`
            )
            .setColor(client.embedColor),
        ],
      });

    if (
      seektime >= player.queue.current.duration - player.position ||
      seektime < 0
    ) {
      seektime = 0;
    }
    //seek to the new Seek position
    player.seek(Number(seektime));
    //Send Success Message
    interaction.editReply({
      embeds: [
        new MessageEmbed()
          .setDescription(
            `Rewinded \`[ 10s ]\` to \`[ ${convertTime(
              Number(player.position)
            )} / ${convertTime(Number(duration))} ]\``
          )
          .setColor(client.embedColor),
      ],
    });
  },
};
