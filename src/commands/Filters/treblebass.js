const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
  name: "treblebass",
  category: "Filters",
  aliases: ["tb"],
  description: "Set TrebleBass Filter",
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
          var bands = [
            { band: 0, gain: 0.6 },
            { band: 1, gain: 0.67 },
            { band: 2, gain: 0.67 },
            { band: 3, gain: 0 },
            { band: 4, gain: -0.5 },
            { band: 5, gain: 0.15 },
            { band: 6, gain: -0.45 },
            { band: 7, gain: 0.23 },
            { band: 8, gain: 0.35 },
            { band: 9, gain: 0.45 },
            { band: 10, gain: 0.55 },
            { band: 11, gain: 0.6 },
            { band: 12, gain: 0.55 },
            { band: 13, gain: 0 },
            { band: 14, gain: 0 },
          ];
          await player.setEQ(...bands);
          thing.setDescription(`${emojiequalizer} Equalizer Mode Is Enabled`);
         

      }else if (args[0] === "Off" || args[0] == 'off') {
        thing.setDescription(`${emojiequalizer} Equalizer Mode Is Disabled`);
        await player.clearEffects();
    }
    return message.reply({embeds: [thing]});
}
};
 
