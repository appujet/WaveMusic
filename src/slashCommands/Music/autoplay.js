const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: "autoplay",
    description: "Toggle music autoplay",
    userPrams: [],
    botPrams: ['EMBED_LINKS'],
    player: true,
    dj: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: false,
        });
        const player = client.manager.players.get(interaction.guild.id);
        const emojireplay = client.emoji.autoplay;
        player.data.set("autoplay", !player.data.get("autoplay"));
        player.data.set("requester", interaction.user);
        let thing = new MessageEmbed()
            .setColor(client.embedColor)
            .setTimestamp()
            .setDescription(`${emojireplay} Autoplay is now ${player.data.get("autoplay") ? "**Enabled**" : "**Disabled**"}.`)
        return interaction.editReply({ embeds: [thing] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
    }
}