const { MessageEmbed, Client, ButtonInteraction, Permissions } = require("discord.js");
const { convertTime } = require("../../utils/convert");
const { buttonReply } = require("../../utils/functions");
const db = require("../../schema/dj");
const { KazagumoTrack } = require("kazagumo")

module.exports = {
    name: "playerButtons",

    /**
     * 
     * @param {Client} client 
     * @param {ButtonInteraction} interaction 
     * @param {*} data 
     */

    run: async (client, interaction, data) => {

        if (!interaction.replied) await interaction.deferReply().catch(() => { });
        const color = client.embedColor;
        const emojipause = client.emoji.pause;
        const emojiresume = client.emoji.resume;
        const emojiskip = client.emoji.skip;
        const volumeEmoji = client.emoji.volumehigh;
        const previousEmoji = client.emoji.previous;
        let data2 = await db.findOne({ Guild: interaction.guildId })
        let pass = false;
        if (data2) {
            if (data2.Mode) {
                if (data2.Roles.length > 0) {
                    interaction.member.roles.cache.forEach((x) => {
                        let role = data2.Roles.find((r) => r === x.id);
                        if (role) pass = true;
                    });
                };
                if (!pass && !interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return await buttonReply(interaction, `You don't have dj role to use this command`, color)
            };
        };
        if (!interaction.member.voice.channel) return await buttonReply(interaction, `You are not connected to a voice channel to use this button.`, color);
        if (interaction.guild.members.me.voice.channel && interaction.guild.members.me.voice.channelId !== interaction.member.voice.channelId) return await buttonReply(interaction, `You are not connected to ${interaction.guild.members.me.voice.channel} to use this buttons.`, color);
        const player = client.manager.players.get(interaction.guildId);

        if (!player) return await buttonReply(interaction, `Nothing is playing right now.`, color);
        if (!player.queue) return await buttonReply(interaction, `Nothing is playing right now.`, color);
        if (!player.queue.current) return await buttonReply(interaction, `Nothing is playing right now.`, color);


        let message;
        try {

            message = await interaction.channel.messages.fetch(data.Message, { cache: true });

        } catch (e) { };

        let icon = `${player.queue.current.thumbnail ? player.queue.current.thumbnail : `https://img.youtube.com/vi/${player.queue.current.identifier}/hqdefault.jpg`}`;

        let nowplaying = new MessageEmbed().setColor(color).setDescription(`[${player.queue.current.title}](${player.queue.current.uri}) • \`[ ${player.queue.current.isStream ? '[**◉ LIVE**]' : convertTime(player.queue.current.length)} ]\``).setImage(icon).setFooter({ text: `Requested by ${player.queue.current.requester.username}`, iconURL: player.queue.current.requester.displayAvatarURL({ dynamic: true }) });

        if (interaction.customId === `${interaction.guildId}pause`) {
            if (player.shoukaku.paused) {
                await player.pause(false);
                await buttonReply(interaction, `${emojiresume} [${player.queue.current.title}](${player.queue.current.uri}) is now unpaused/resumed.`, color);
                if (message) await message.edit({
                    embeds: [nowplaying]
                }).catch(() => { });
            } else {
                await player.pause(true);
                await buttonReply(interaction, `${emojipause} [${player.queue.current.title}](${player.queue.current.uri}) is now paused.`, color);
                if (message) await message.edit({
                    embeds: [nowplaying]
                }).catch(() => { });
            };
        } else if (interaction.customId === `${interaction.guildId}skip`) {
            if (player.queue.length === 0) return await buttonReply(interaction, `No more songs left in the queue to skip.`, color);
            await player.skip();
            if (message) await message.edit({
                embeds: [nowplaying]
            }).catch(() => { });
            return await buttonReply(interaction, `${emojiskip} Skipped - [${player.queue.current.title}](${player.queue.current.uri})`, color)

        } else if (interaction.customId === `${interaction.guildId}previous`) {
            if (!player.queue.previous) {
                return await buttonReply(interaction, `No Previous song found`, color);
            }

            if (player.queue.previous) {
                player.queue.unshift(player.queue.previous);
                await player.skip();
            }
            await buttonReply(interaction, `${previousEmoji} Previous [${player.queue.previous.title}](${player.queue.previous.uri})`, color);
            if (message) await message.edit({
                embeds: [nowplaying]
            }).catch(() => { });


        } else if (interaction.customId === `${interaction.guildId}voldown`) {
            let amount = Number(player.volume * 100 - 10);
            if (amount <= 9) return await buttonReply(interaction, `Volume Cannot Decread \`[ 10% ]\`.`, color);
            if (message) await message.edit({
                embeds: [nowplaying]
            }).catch(() => { });
            await player.setVolume(amount / 1);
            await buttonReply(interaction, `${volumeEmoji} Volume set to: \`[ ${player.volume * 100}% ]\``, color);
            if (message) await message.edit({
                embeds: [nowplaying]
            }).catch(() => { });

        } else if (interaction.customId === `${interaction.guildId}volup`) {
            let amount = Number(player.volume * 100 + 10);
            if (amount >= 100) return await buttonReply(interaction, `Volume Cannot Exceed \`[ 100% ]\``, color);
            await player.setVolume(amount / 1);
            await buttonReply(interaction, `${volumeEmoji} Volume set to: \`[ ${player.volume * 100}% ]\``, color);
            if (message) await message.edit({
                embeds: [nowplaying]
            }).catch(() => { });
        } else {
            if (message) await message.edit({
                embeds: [nowplaying]
            }).catch(() => { });

            return await buttonReply(interaction, `You've choosen an invalid button!`, color);
        };
    }
}

