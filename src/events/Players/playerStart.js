const { MessageEmbed, Client, MessageButton, MessageActionRow } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
const { trackStartEventHandler } = require("../../utils/functions");
const db = require("../../schema/setup");
const { KazagumoPlayer, KazagumoTrack } = require("kazagumo");

module.exports = {
	name: "playerStart",
	/**
	 * 
	 * @param {Client} client 
	 * @param {KazagumoPlayer} player 
	 * @param {KazagumoTrack} track 
	 */


	run: async (client, player, track) => {

		let guild = client.guilds.cache.get(player.guildId);
		if (!guild) return;

		let channel = guild.channels.cache.get(player.textId);
		if (!channel) return;
		
		let data = await db.findOne({ Guild: guild.id });

		if (data && data.Channel) {
			let textChannel = guild.channels.cache.get(data.Channel);
			let voiceChannel = guild.channels.cache.get(data.voiceChannel);
			if ( !textChannel || !voiceChannel ) {
				return data.deleteOne();
			}
			const id = data.Message;
			if (channel === textChannel) {
				return await trackStartEventHandler(id, textChannel, player, track, client);
			} else {
				await trackStartEventHandler(id, textChannel, player, track, client);
			};
		}

		const emojiplay = client.emoji.play;

		const main = new MessageEmbed()
			.setTitle(`${emojiplay} Now Playing`)
			.setDescription(`[${track.title}](${track.uri})`)
			.setColor(client.embedColor)
			.setTimestamp()
			.setThumbnail(`${track.thumbnail ? track.thumbnail : `https://img.youtube.com/vi/${track.identifier}/hqdefault.jpg`}`)
			.addFields([
				{
				  name: 'Duration',
				  value: `\`${track.isStream ? '◉ LIVE' : convertTime(player.queue.current?.length)}\``,
				  inline: true,
				},
				{
				  name: 'Author',
				  value: `${track.author}`,
				  inline: true,
				},
				{
				  name: 'Requested by',
				  value: `${track.requester ? track.requester : `<@${client.user.id}>`}`,
				  inline: true,
				},
			  ])
			
		client.channels.cache.get(player.textId)?.send({embeds: [main]}).then(x => player.data.set("message", x));

		await player.data.set("autoplaySystem", track.identifier);
	}
};
