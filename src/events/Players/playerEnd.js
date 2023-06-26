const { MessageEmbed } = require('discord.js');
const db = require("../../schema/setup");

module.exports = {
	name: "playerEnd",
	run: async (client, player) => {
		
		if (player.data.get("message") && player.data.get("message").deletable ) player.data.get("message").delete().catch(() => null);
		
		let guild = client.guilds.cache.get(player.guildId);
		if (!guild) return;
		const data = await db.findOne({ Guild: guild.id });
		if (!data) return;
		let channel = guild.channels.cache.get(data.Channel);
		if (!channel) return;

		let message;

		try {

			message = await channel.messages.fetch(data.Message, { cache: true });

		} catch (e) { };

		if (!message) return;
		await message.edit({ embeds: [new MessageEmbed().setColor(client.embedColor).setTitle(`Nothing playing right now in this server!`).setDescription(`[Invite](${client.config.links.invite}) - [Support Server](${client.config.links.support})`).setImage(client.config.links.bg)] }).catch(() => { });

	}
};