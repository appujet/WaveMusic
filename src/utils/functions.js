const { Message, MessageEmbed, Client, TextChannel, MessageButton, MessageActionRow } = require("discord.js");
const db = require("../schema/setup");
const { convertTime } = require("./convert");
const { KazagumoPlayer, KazagumoTrack } = require("kazagumo");

/**
 * 
 * @param {TextChannel} channel 
 * @param {String} args 
 */

async function oops(channel, args) {
    try {
        let embed1 = new MessageEmbed().setColor("RED").setDescription(`${args}`);

        const m = await channel.send({
            embeds: [embed1]
        });

        setTimeout(async () => await m.delete().catch(() => { }), 12000);
    } catch (e) {
        return console.error(e)
    }
};


/**
 * 
 * @param {String} query 
 * @param {KazagumoPlayer} player 
 * @param {Message} message 
 * @param {Client}  client
 */

function neb(embed, player, client) {
    const config = require("../config")
    let icon = config.links.bg;

    return embed.setDescription(`[${player.queue.current.title}](${player.queue.current.uri}) • \`[ ${player.queue.current.isStream ? '[**◉ LIVE**]' : convertTime(player.queue.current.length)} ]\``).setImage(icon).setFooter({ text: `Requested by ${player.queue.current.requester.tag}`, iconURL: player.queue.current.requester.displayAvatarURL({ dynamic: true }) });
};
/**
 * 
 * @param {KazagumoPlayer} player 
 * @param {Client} client
 * @returns 
 */
async function autoplay(player, client) {

    const searched = `https://www.youtube.com/watch?v=${player.data.get("autoplaySystem")}&list=RD${player.data.get("autoplaySystem")}`;
    let requester = player.data.get("requester");
    if (!searched[0]) {
        return message.channel.send({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`Unable to autoplay from the previous track. Destroyed the player.`)] });
    }
    const { tracks } = await player.search(searched, { requester: requester });
    await player.queue.add(tracks[1]);
    await player.queue.add(tracks[2]);
    return player.play();
}
/**
 * 
 * @param {String} query 
 * @param {KazagumoPlayer} player 
 * @param {Message} message 
 * @param {Client}  client
 */

async function playerhandler(query, player, message) {
    let m;
    const emojiaddsong = message.client.emoji.addsong;
    const emojiplaylist = message.client.emoji.playlist;
    let d = await db.findOne({ Guild: message.guildId });
    let n = new MessageEmbed().setColor(message.client.embedColor);

    try {
        if (d) m = await message.channel.messages.fetch(d.Message, { cache: true });
    } catch (e) { };

    if (!message.guild.members.me.voice.channel || player.state !== "CONNECTED") player = await message.client.manager.createPlayer({
        guildId: message.guild.id,
        voiceId: message.member.voice.channel.id,
        textId: message.channel.id,
        deaf: true,
    });

    const result = await player.search(query, { requester: message.author });
    if (!result.tracks.length) return message.reply({ content: 'No result was found' });
    const tracks = result.tracks;
    if (result.type === 'PLAYLIST') for (let track of tracks) player.queue.add(track);
    else player.queue.add(tracks[0]);
    if (!player.playing && !player.paused) await player.play();
    return message.channel.send(
        result.type === 'PLAYLIST'
            ? {
                embeds: [
                    new MessageEmbed()
                        .setColor(message.client.embedColor)
                        .setDescription(
                            `${emojiplaylist} Queued ${tracks.length} from ${result.playlistName}`,
                        ),
                ],
            }
            : {
                embeds: [
                    new MessageEmbed()
                        .setColor(message.client.embedColor)
                        .setDescription(`${emojiaddsong} Queued [${tracks[0].title}](${tracks[0].uri})`),
                ],
            },
    ).then((a) => setTimeout(async () => await a.delete().catch(() => { }), 5000)).catch(() => { });

};

/**
 * 
 * @param {String} msgId
 * @param {TextChannel} channel 
 * @param {KazagumoPlayer} player 
 * @param {KazagumoTrack} track 
 * @param {Client} client
 */

async function trackStartEventHandler(msgId, channel, player, track, client) {
    try {

        let icon = `${track.thumbnail ? track.thumbnail : `https://img.youtube.com/vi/${player.queue.current.identifier}/hqdefault.jpg`}` || client.config.links.bg;

        let message;
        try {

            message = await channel.messages.fetch(msgId, { cache: true });

        } catch (error) { };


        if (!message) {

            let embed1 = new MessageEmbed().setColor(client.embedColor).setDescription(`[${track.title}](${track.uri}) - \`[ ${track.isStream ? '[**◉ LIVE**]' : convertTime(player.queue.current.length)} ]\``).setImage(icon).setFooter({ text: `Requested by ${player.queue.current.requester.tag}`, iconURL: player.queue.current.requester.displayAvatarURL({ dynamic: true }) });

            const but1 = new MessageButton().setCustomId(`${player.guildId}pause`).setEmoji(`⏸️`).setStyle('SECONDARY')
            const but2 = new MessageButton().setCustomId(`${player.guildId}previous`).setEmoji(`⏮️`).setStyle('SECONDARY')
            const but3 = new MessageButton().setCustomId(`${player.guildId}skip`).setEmoji(`⏭️`).setStyle('SECONDARY')
            const but4 = new MessageButton().setCustomId(`${player.guildId}voldown`).setEmoji(`🔉`).setStyle('SECONDARY')
            const but5 = new MessageButton().setCustomId(`${player.guildId}volup`).setEmoji(`🔊`).setStyle('SECONDARY')

            const row = new MessageActionRow().addComponents(but4, but2, but1, but3, but5)

            const m = await channel.send({
                content: "__**Join a voice channel and queue songs by name/url.**__\n\n",
                embeds: [embed1],
                components: [row]
            });

            return await db.findOneAndUpdate({ Guild: channel.guildId }, { Message: m.id });
        } else {

            let embed2 = new MessageEmbed().setColor(message.client.embedColor).setDescription(`[${track.title}](${track.uri}) - \`[ ${track.isStream ? '[**◉ LIVE**]' : convertTime(player.queue.current.length)} ]\``).setImage(icon).setFooter({ text: `Requested by ${player.queue.current.requester.tag}`, iconURL: player.queue.current.requester.displayAvatarURL({ dynamic: true }) });

            await message.edit({
                content: "__**Join a voice channel and queue songs by name/url.**__\n",
                embeds: [embed2]

            });
        };
    } catch (error) {
        return console.error(error);
    }
};
/**
 * 
 * @param {ButtonInteraction} int 
 * @param {String} args 
 * @param {Client} client 
 */

async function buttonReply(int, args, client) {

    if (int.replied) {
        await int.editReply({ embeds: [new MessageEmbed().setColor(int.client.embedColor).setAuthor({ name: int.member.user.tag, iconURL: int.member.user.displayAvatarURL() }).setDescription(args)] })
    } else {
        await int.editReply({ embeds: [new MessageEmbed().setColor(int.client.embedColor).setAuthor({ name: int.member.user.tag, iconURL: int.member.user.displayAvatarURL() }).setDescription(args)] })
    };

    setTimeout(async () => {
        if (int && !int.ephemeral) {
            await int.deleteReply().catch(() => { });
        };
    }, 2000);
};

module.exports = {
    playerhandler,
    trackStartEventHandler,
    buttonReply,
    oops,
    autoplay
}