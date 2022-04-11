const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
  name: "party",
  category: "Filters",
  aliases: ["paty"],
  description: "Set Party Filter",
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
            { band: 0, gain: -1.16 },
            { band: 1, gain: 0.28 },
            { band: 2, gain: 0.42 },
            { band: 3, gain: 0.5 },
            { band: 4, gain: 0.36 },
            { band: 5, gain: 0 },
            { band: 6, gain: -0.3 },
            { band: 7, gain: -0.21 },
            { band: 8, gain: -0.21 },
          ];
          await player.setEQ(...bands);
          thing.setDescription(`${emojiequalizer} Party Mode Is Enabled`);
         

      }else if (args[0] === "Off" || args[0] == 'off') {
        thing.setDescription(`${emojiequalizer} Party Mode Is Disabled`);
        await player.clearEffects();
    }
    return message.reply({embeds: [thing]});
}
};

    