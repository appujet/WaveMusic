const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
  name: "equalizer",
  category: "Filters",
  aliases: ["eq", "equalizer"],
  description: "Set Equalizer Filter",
  args: false,
  usage: "",
  permission: [],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const player = message.client.manager.get(message.guild.id);

    if (!player.queue.current) {
        let thing = new MessageEmbed()
            .setColor("RED")
            .setDescription("There is no music playing.");
        return message.reply({embeds: [thing]});
    }

    const emojiequalizer = message.client.emoji.filter;

    let thing = new MessageEmbed()
        .setColor(client.embedColor)

        if (args[0] === "On" || args[0] == 'on') {
          await player.setEqualizer(true);
          thing.setDescription(`${emojiequalizer} Equalizer Mode Is Enabled`);
         

      }else if (args[0] === "Off" || args[0] == 'off') {
        thing.setDescription(`${emojiequalizer} Equalizer Mode Is Disabled`);
        await player.clearEffects();
    }
    return message.reply({embeds: [thing]});
}
};
