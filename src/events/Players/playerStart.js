const { MessageEmbed, Client } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');

module.exports = {
	name: "playerStart",
	/**
	 * 
	 * @param {Client} client 
	 * @param {*} player 
	 * @param {*} track 
	 */
	run: async (client, player, track) => {

		const emojiplay = client.emoji.play;

		const main = new MessageEmbed()
			.setAuthor({ name: track.requester.tag, iconURL: track.requester.displayAvatarURL() })
			.setDescription(`${emojiplay} Now Playing - [${track.title}](${track.uri}) - \`[ ${track.isStream ? '[**◉ LIVE**]' : convertTime(player.current.length)} ]\``)
			.setColor(client.embedColor)
			.setTimestamp()
			.setThumbnail(`${track.thumbnail ? track.thumbnail : `https://img.youtube.com/vi/${player.current.identifier}/hqdefault.jpg`}`)
           client.channels.cache.get(player.text).send({ embeds: [main] }).then(x => player.data.set("message", x));
	
	}
};