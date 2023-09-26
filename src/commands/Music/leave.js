const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "leave",
    aliases: ["dc"],
    category: "Music",
    description: "Leave voice channel",
    args: false,
    usage: "",
    userPrams: [],
    botPrams: ["EMBED_LINKS"],
    dj: true,
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {

        const player = client.manager.players.get(message.guild.id);
        
        const emojiLeave = message.client.emoji.leave;

        await player.destroy();

        let thing = new MessageEmbed()
            .setColor(message.client.embedColor)
            .setDescription(`${emojiLeave} **Left the voice channel**`);
        return message.reply({ embeds: [thing] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
    },
};