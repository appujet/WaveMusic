const { MessageEmbed } = require('discord.js');

module.exports = {
    name: '247',
    category: 'Music',
    description: 'To force skip the current playing song.',
    args: false,
    usage: '',
    userPrams: [],
    botPrams: ['EMBED_LINKS'],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {

        const player = client.manager.players.get(message.guild.id);

        const data = await player.data.get('247');
        const TwoFourSeven = player.voice;
        if (data) {
            await player.data.delete('247')
            let thing = new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(` 247 Mode is Disabled`);
            message.reply({ embeds: [thing] })
        } else {
            await player.data.set("247", TwoFourSeven)
            let thing = new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(`247 Mode is Enabled`);
            message.reply({ embeds: [thing] })
        }
    }
} 
