const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const db = require("../../schema/setup");
const db2 = require("../../schema/autoReconnect");

module.exports = {
    name: "playerDestroy",
    run: async (client, player) => {

        let name = client.guilds.cache.get(player.guildId).name;

        client.logger.log(`Player Destroy in ${name} [ ${player.guildId} ]`, "log");

        if (player.data.get('message') && player.data.get('message').deletable ) player.data.get('message').delete().catch(() => null);

        if (player.data.get("autoplay")) try { player.data.delete("autoplay") } catch (err) { client.logger.log(err.stack ? err.stack : err, "log") };

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
        let disabled = true;
        if (player && player.queue && player.queue.current) disabled = false;
        let embed1 = new MessageEmbed().setColor(client.embedColor).setTitle(`Nothing playing right now in this server!`).setDescription(`[Invite](${client.config.links.invite}) - [Support Server](${client.config.links.support})`).setImage(client.config.links.bg);
        const but1 = new MessageButton().setCustomId(`${message.guildId}pause`).setEmoji(`⏸️`).setStyle('SECONDARY').setDisabled(disabled)
        const but2 = new MessageButton().setCustomId(`${message.guildId}previous`).setEmoji(`⏮️`).setStyle('SECONDARY').setDisabled(disabled)
        const but3 = new MessageButton().setCustomId(`${message.guildId}skip`).setEmoji(`⏭️`).setStyle('SECONDARY').setDisabled(disabled)
        const but4 = new MessageButton().setCustomId(`${message.guildId}voldown`).setEmoji(`🔉`).setStyle('SECONDARY').setDisabled(disabled)
        const but5 = new MessageButton().setCustomId(`${message.guildId}volup`).setEmoji(`🔊`).setStyle('SECONDARY').setDisabled(disabled)

        const row = new MessageActionRow().addComponents(but4, but2, but1, but3, but5)

        await message.edit({
            content: "__**Join a voice channel and queue songs by name/url**__\n\n",
            embeds: [embed1],
            components: [row]
        });
        const vc = await db2.findOne({Guild: player.guildId})
        if(vc) await client.manager.createPlayer({
            guildId: vc.Guild,
            voiceId: vc.VoiceId,
            textId: vc.TextId,
            deaf: true,
          });
    }

};
