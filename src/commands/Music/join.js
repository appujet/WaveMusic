const { Command } = require('../../structures/index.js');

class Join extends Command {
    constructor(client) {
        super(client, {
            name: 'join',
            description: {
                content: 'Joins the voice channel',
                examples: ['join'],
                usage: 'join',
            },
            category: 'music',
            aliases: ['j'],
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
                user: [],
            },
            slashCommand: true,
            options: [],
        });
    }
    async run(client, ctx) {
        let player = client.queue.get(ctx.guild.id);
        const embed = this.client.embed();
        if (!player) {
            const vc = ctx.member;
            player = await client.queue.create(ctx.guild, vc.voice.channel, ctx.channel, client.shoukaku.getNode());
            return await ctx.sendMessage({
                embeds: [
                    embed
                        .setColor(this.client.color.main)
                        .setDescription(`Joined <#${player.player.connection.channelId}>`),
                ],
            });
        }
        else {
            return await ctx.sendMessage({
                embeds: [
                    embed
                        .setColor(this.client.color.main)
                        .setDescription(`I'm already connected to <#${player.player.connection.channelId}>`),
                ],
            });
        }
    }
}

module.exports = Join;