const { MessageEmbed, Client, MessageActionRow, MessageButton } = require("discord.js");
const { noop } = require("lodash");
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

		const main = new MessageEmbed()
			.setAuthor({ name: `Now Playing` })
			.setDescription(`[${track.title}](${track.uri})`)
			.setColor(client.embedColor)
			.setThumbnail(`${track.thumbnail ? track.thumbnail : `https://img.youtube.com/vi/${player.current.identifier}/hqdefault.jpg`}`)
			.addFields([
				{
					name: "Requested By",
					value: `[${track.requester}]`,
					inline: true
				},
				{
					name: "Duration",
					value: `\`[ ${track.isStream ? '[**◉ LIVE**]' : convertTime(player.current.length)} ]\``,
					inline: true
				}
			])
           client.channels.cache.get(player.text).send({ embeds: [main] }).then(x => player.data.set("message", x));
	
	}
};