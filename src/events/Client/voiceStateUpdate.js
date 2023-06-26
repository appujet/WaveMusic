const { Client, VoiceState, MessageEmbed } = require("discord.js")
const { KazagumoPlayer } = require("kazagumo")

/** 
 *
 * @param {Client} client
 * @param {VoiceState} oldState
 * @param {VoiceState} newState
 * @param {KazagumoPlayer} player
 * @returns {Promise<void>}
 */

module.exports = {
    name: "voiceStateUpdate",
    run: async (client, oldState, newState) => {

        let guildId = newState.guild.id;
        const player = client.manager.players.get(guildId);
        if (!player) return;
        
        if (!newState.guild.members.cache.get(client.user.id).voice.channelId) {
            const text = player?.textId;
            await player.destroy(player.guildId);
            let emb = new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription("I've been Disconnected")
            client.channels.cache.get(text).send({ embeds: [emb] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) });

        }
    }
}