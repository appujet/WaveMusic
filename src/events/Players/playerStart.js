const { MessageEmbed, Client, MessageButton, MessageActionRow } = require("discord.js");
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

		const but1 = new MessageButton().setCustomId(`${player.guild}pause`).setEmoji(`⏸️`).setStyle('PRIMARY')
		const but2 = new MessageButton().setCustomId(`${player.guild}previous`).setEmoji(`⏮️`).setStyle('PRIMARY')
		const but3 = new MessageButton().setCustomId(`${player.guild}skip`).setEmoji(`⏭️`).setStyle('PRIMARY')
		const but4 = new MessageButton().setCustomId(`${player.guild}voldown`).setEmoji(`🔉`).setStyle('PRIMARY')
		const but5 = new MessageButton().setCustomId(`${player.guild}volup`).setEmoji(`🔊`).setStyle('PRIMARY')

		const row = new MessageActionRow().addComponents(but4, but2, but1, but3, but5 )

		const main = new MessageEmbed()
			.setAuthor({ name: track.requester.tag, iconURL: track.requester.displayAvatarURL() })
			.setDescription(`${emojiplay} Now Playing - [${track.title}](${track.uri}) - \`[ ${track.isStream ? '[**◉ LIVE**]' : convertTime(player.current.length)} ]\``)
			.setColor(client.embedColor)
			.setTimestamp()
			.setThumbnail(`${track.thumbnail ? track.thumbnail : `https://img.youtube.com/vi/${player.current.identifier}/hqdefault.jpg`}`)
           client.channels.cache.get(player.text).send({ embeds: [main] , components: [row] }).then(x => player.data.set("message", x));
	}
};
