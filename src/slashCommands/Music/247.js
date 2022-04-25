const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: 'clear',
    description: 'Clear Queue',
    userPrams: [],
    botPrams: ['EMBED_LINKS'],
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {

        const player = client.manager.players.get(interaction.guild.id);

        const data = await player.data.get('247');
        const TwoFourSeven = `247`;
        if (data) {
            await player.data.delete('247')
            let thing = new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(` 247 Mode is Disabled`);
            interaction.editReply({ embeds: [thing] })
        } else {
            await player.data.set("247", TwoFourSeven)
            let thing = new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(`247 Mode is Enabled`);
            interaction.editReply({ embeds: [thing] })
        }

    }
}