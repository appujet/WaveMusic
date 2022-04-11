const { MessageEmbed, CommandInteraction, Client } = require("discord.js");
const { convertTime } = require("../../utils/convert.js");

module.exports = {
  name: "forward",
  description: "To foward the current playing song 10s as default.",

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

    let seektime = Number(player.position) + 10000;
    //if the userinput is smaller then 0, then set the seektime to just the player.position
    if (seektime >= duration)
      return interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setDescription(`Cannot forward any further more.`)
            .setColor(client.embedColor),
        ],
      });
      if (player.paused)
        return interaction.editReply({
            embeds:[new MessageEmbed()
            .setDescription(`Cannot forward because the player is currently paused.`)
            .setColor(client.embedColor)
          ]
          })
    if (10 <= 0) seektime = Number(player.position);
    //if the seektime is too big, then set it 1 sec earlier
    if (Number(seektime) >= player.queue.current.duration)
      seektime = player.queue.current.duration - 1000;
    //seek to the new Seek position
    player.seek(Number(seektime));
    //Send Success Message
    interaction.editReply({
      embeds: [
        new MessageEmbed()
          .setDescription(
            `Forwarded \`[ 10s ]\` to \`[ ${convertTime(
              Number(player.position)
            )} / ${convertTime(Number(duration))} ]\``
          )
          .setColor(client.embedColor),
      ],
    });
  },
};
