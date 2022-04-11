const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
  name: "earrape",
  category: "Filters",
  aliases: ["er"],
  description: "Set EarRape Filter",
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
          
          thing.setDescription(`${emojiequalizer} EarRape Mode Is Enabled`);
          var earrape = [
            500
        ];
        await player.setVolume(earrape);

      }else if (args[0] === "Off" || args[0] == 'off') {
        thing.setDescription(`${emojiequalizer} EarRape Mode Is Disabled`);
        let defaultvolume = 100;
        await player.setVolume(defaultvolume);
    }
    return message.reply({embeds: [thing]});
}
};
   