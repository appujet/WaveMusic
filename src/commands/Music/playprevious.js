const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "playprevious",
    aliases: ["pp"],
    category: "Music",
    description: "Plays the previously played track.",
    args: false,
    usage: "<Number of song in queue>",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {

        const play = message.client.manager.get(message.guild.id);

        if (!play.queue.previous) {
            let nosong = new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(`There Is No Previous Song To Play`);
            return message.reply({ embeds: [nosong] });
        }

        play.queue.add(play.queue.previous, 0);

        const previous = new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Playing The Previous Song`)
        message.reply({ embeds: [previous] }).then(msg => { setTimeout(() => {msg.delete()}, 3000);
    })

        await play.stop()

    }
}