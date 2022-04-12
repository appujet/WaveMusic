const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "clear",
    aliases: ["c"],
    category: "Music",
    description: "Clear Music Queue",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {

        const player = client.manager.players.get(message.guild.id);
        if (!player.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("No Music Is Playing");
            return message.reply({ embeds: [thing] });
        }
        if (!player.queue[0]) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There Is Nothing In The Queue");
            return message.reply({ embeds: [thing] });
        }
        var size = player.queue[0];
        player.queue = [];
        player.queue.push(size);
        const embed = new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Successfully Clear Queue `)
        await message.reply({ embeds: [embed] })

    }
}