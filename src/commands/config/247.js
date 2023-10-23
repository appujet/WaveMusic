const ServerData = require('../../database/server.js');
const { Command } = require('../../structures/index.js');

class _247 extends Command {
    constructor(client) {
        super(client, {
            name: '247',
            description: {
                content: 'set the bot to stay in the vc',
                examples: ['247'],
                usage: '247',
            },
            category: 'config',
            aliases: ['stay'],
            cooldown: 3,
            args: false,
            player: {
                voice: true,
                dj: false,
                active: false,
                djPerm: null,
            },
            permissions: {
                dev: false,
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: ['ManageGuild'],
            },
            slashCommand: true,
            options: [],
        });
    }
    async run(client, ctx) {
        const embed = client.embed();
        let player = client.shoukaku.players.get(ctx.guild.id);
        const data = await client.prisma.stay.findFirst({
            where: {
                guildId: ctx.guild.id,
            },
        });
        const vc = ctx.member;
        if (!data) {
            await ServerData.set_247(ctx.guild.id, ctx.channel.id, vc.voice.channelId);
            if (!player)
                player = await client.queue.create(ctx.guild, vc.voice.channel, ctx.channel, client.shoukaku.getNode());
            return await ctx.sendMessage({
                embeds: [
                    embed
                        .setDescription(`**247 mode has been enabled**`)
                        .setColor(client.color.main),
                ],
            });
        }
        else {
            await client.prisma.stay.delete({
                where: {
                    guildId: ctx.guild.id,
                },
            });
            return await ctx.sendMessage({
                embeds: [
                    embed
                        .setDescription(`**247 mode has been disabled**`)
                        .setColor(client.color.red),
                ],
            });
        }
    }
}

module.exports = _247;