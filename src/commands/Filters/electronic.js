const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
  name: "electronic",
  category: "Filters",
  aliases: ["bb"],
  description: "Set Electronic Filter.",
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
            { band: 0, gain: 0.375 },
            { band: 1, gain: 0.350 },
            { band: 2, gain: 0.125 },
            { band: 3, gain: 0 },
            { band: 4, gain: 0 },
            { band: 5, gain: -0.125 },
            { band: 6, gain: -0.125 },
            { band: 7, gain: 0 },
            { band: 8, gain: 0.25 },
            { band: 9, gain: 0.125 },
            { band: 10, gain: 0.15 },
            { band: 11, gain: 0.2 },
            { band: 12, gain: 0.250 },
            { band: 13, gain: 0.350 },
            { band: 14, gain: 0.400 }
        ]
        await player.setEQ(...bands);
          thing.setDescription(`${emojiequalizer} Electronic Mode Is Enabled`);
         

      }else if (args[0] === "Off" || args[0] == 'off') {
        thing.setDescription(`${emojiequalizer} Electronic Mode Is Disabled`);
        await player.clearEffects();
    }
    return message.reply({embeds: [thing]});
}
};
