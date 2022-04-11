const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { convertTime } = require("../../utils/convert.js");

module.exports = {
  name: "rewind",
  aliases: ["backward"],
  category: "Music",
  description: "To rewind the current playing song 10s as default.",
  args: false,
  usage: "rewind [position]",
  permission: [],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: false,
  execute: async (message, args, client, prefix) => {
    const player = client.manager.get(message.guild.id);
    const { duration } = player.queue.current;

    if (!args[0])
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(
              `Do \`${prefix}\`**rewind/backward** \`[ 10/20/30 ]\``
            ),
        ],
      });

    let seektime = Number(player.position) - Number(args[0]) * 1000;
    //if the userinput is smaller then 0, then set the seektime to just the player.position
    if (seektime < 0)
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(`Cannot rewind any further more.`)
            .setColor(client.embedColor),
        ],
      });
    if (player.paused)
      return message.reply({
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
    let amount = args[0]
    //Send Success Message
    message.reply({
      embeds: [
        new MessageEmbed()
          .setDescription(
            `Rewinded \`[ ${amount}s ]\` to \`[ ${convertTime(
              Number(player.position)
            )} / ${convertTime(Number(duration))} ]\``
          )
          .setColor(client.embedColor),
      ],
    });
  },
};
