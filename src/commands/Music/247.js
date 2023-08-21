const { MessageEmbed } = require('discord.js');
const db = require("../../schema/autoReconnect");

module.exports = {
    name: '247',
    category: 'Music',
    description: 'Joins the voice channel for 24/7.',
    args: false,
    usage: '',
    userPrams: [],
    botPrams: ['EMBED_LINKS'],
    owner: false,
    player: true,
    dj: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {

        const player = client.manager.players.get(message.guild.id);

        let data = await db.findOne({Guild: message.guild.id})
        if (data) {
            await data.deleteOne();
            let thing = new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(` 247 Mode is Disabled`);
            message.reply({ embeds: [thing] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
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
            message.reply({ embeds: [thing] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
        }
    }
} 
