const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "addprevious",
    aliases: ["pp"],
    category: "Music",
    description: "To add the previously played song to the queue.",
    args: false,
    usage: "addprevious",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {
        const player = client.manager.get(message.guild.id);
        const track = player.queue.previous;

        if (!player.queue.previous) {
            let nosong = new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(`No Previous Track Found`);
            return message.reply({ embeds: [nosong] });
        }

        player.queue.add(player.queue.previous, 0);
        let addpre = new MessageEmbed()
        .setDescription(`Added [${track.title}](${track.uri}) To The Queue` )
        .setColor(client.embedColor);
        message.reply({ embeds: [addpre] });
    },
};
