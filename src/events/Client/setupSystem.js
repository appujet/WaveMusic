const { PermissionsBitField, TextChannel } = require('discord.js');
const { Event } = require('../../structures/index.js');
const { oops, setupStart } = require('../../utils/SetupSystem.js');

class SetupSystem extends Event {
    constructor(client, file) {
        super(client, file, {
            name: 'setupSystem',
        });
    }

    async run(message) {
        let channel = message.channel;
        if (!(channel instanceof TextChannel))
            return;
        if (!message.member.voice.channel) {
            await oops(channel, `You are not connected to a voice channel to queue songs.`);
            if (message)
                await message.delete().catch(() => { });
            return;
        }
        if (!message.member.voice.channel
            .permissionsFor(this.client.user)
            .has(PermissionsBitField.resolve(['Connect', 'Speak']))) {
            await oops(channel, `I don't have enough permission to connect/speak in <#${message.member.voice.channel.id}>`);
            if (message)
                await message.delete().catch(() => { });
            return;
        }
        if (message.guild.members.cache.get(this.client.user.id).voice.channel &&
            message.guild.members.cache.get(this.client.user.id).voice.channelId !==
            message.member.voice.channelId) {
            await oops(channel, `You are not connected to <#${message.guild.members.cache.get(this.client.user.id).voice.channelId}> to queue songs`);
            if (message)
                await message.delete().catch(() => { });
            return;
        }
        let player = this.client.queue.get(message.guildId);
        if (!player) {
            player = await this.client.queue.create(
                message.guild,
                message.member.voice.channel,
                message.channel,
                this.client.shoukaku.getNode()
            );
        }
        await setupStart(this.client, message.content, player, message);
        if (message)
            await message.delete().catch(() => { });
    }
}

module.exports = SetupSystem;
