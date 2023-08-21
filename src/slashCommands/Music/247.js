const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const db = require("../../schema/autoReconnect");

module.exports = {
    name: '247',
    description: 'Joins the voice channel for 24/7.',
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

        let data = await db.findOne({Guild: interaction.guild.id})
        if (data) {
            await data.deleteOne();
            let thing = new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(` 247 Mode is Disabled`);
            interaction.editReply({ embeds: [thing] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
        } else {
            data = new db({
                Guild: player.guildId,
                TextId: player.textId,
                VoiceId: player.voiceId
            })
            await data.save();
            let thing = new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(`247 Mode is Enabled`);
            interaction.editReply({ embeds: [thing] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
        }

    }
}
