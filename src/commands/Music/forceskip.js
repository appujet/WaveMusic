const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "forceskip",
    aliases: ["fs"],
    category: "Music",
    description: "To force skip the current playing song.",
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
            return message.reply({ embeds: [thing] });
        }
        const song = player.queue.current;

        player.stop();

        const emojiskip = message.client.emoji.skip;

        let thing = new MessageEmbed()
            .setDescription(`Skipped [${song.title}](${song.uri})`)
            .setColor(client.embedColor)
        return message.reply({ embeds: [thing] })

    }
};