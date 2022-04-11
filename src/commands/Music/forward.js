const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { convertTime } = require("../../utils/convert.js");
const { progressbar } = require('../../utils/progressbar.js')
module.exports = {
  name: "forward",
  aliases: ["f"],
  category: "Music",
  description: "To foward the current playing song 10s as default.",
  args: true,
  usage: "forward [position]",
  permission: [],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: false,
  execute: async (message, args, client, prefix) => {
    const player = client.manager.get(message.guild.id);
    const { duration } = player.queue.current;
    let color = client.embedColor;

    if (!duration)
      return message.reply({ embed: [new MessageEmbed().setColor(color).setDescription(`There Is No Music Playing`)] })

    let seektime = Number(player.position) + Number(args[0]) * 1000;
    //if the userinput is smaller then 0, then set the seektime to just the player.position
    if (seektime >= duration)
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(`Cannot forward any further more.`)
            .setColor(client.embedColor),
        ],
      });
    if (player.paused)
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(
              `Cannot forward because the player is currently paused.`
            )
            .setColor(client.embedColor),
        ],
      });

    //if the userinput is smaller then 0, then set the seektime to just the player.position
    if (Number(args[0]) <= 0) seektime = Number(player.position);
    //if the seektime is too big, then set it 1 sec earlier
    if (Number(seektime) >= player.queue.current.duration)
      seektime = player.queue.current.duration - 1000;
    //seek to the new Seek position
    player.seek(Number(seektime));
    let amount = args[0]
    message.reply({
      embeds: [
        new MessageEmbed()
          .setDescription(
            `Forwarded \`[ ${amount}s ]\` to \`[ ${convertTime(
              Number(player.position)
            )} / ${convertTime(Number(duration))} ]\``
          )
          .setColor(client.embedColor),
      ],
    });
  },
};
