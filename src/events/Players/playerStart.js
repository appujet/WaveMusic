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
		client.channels.cache.get(player.text)?.send({embeds: [new MessageEmbed()
			.setAuthor({name: `Now Playing`})
			.setDescription(`[${track.title}](${track.uri})`)
			.setColor(client.embedColor)
			.setThumbnail(`${track.thumbnail ? track.thumbnail : `https://img.youtube.com/vi/${player.current.identifier}/hqdefault.jpg` }`)
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
		]})
			.then(x => player.data.set("message", x));
	}
};