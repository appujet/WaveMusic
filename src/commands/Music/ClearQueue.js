const { Command } = require('../../structures/index.js');

class ClearQueue extends Command {
    constructor(client) {
        super(client, {
            name: 'clearqueue',
            description: {
                content: 'Clears the queue',
                examples: ['clearqueue'],
                usage: 'clearqueue',
            },
            category: 'music',
            aliases: ['cq'],
            cooldown: 3,
            args: false,
            player: {
                voice: true,
                dj: true,
                active: true,
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
        const player = client.queue.get(ctx.guild.id);
        const embed = this.client.embed();
        if (!player.queue.length)
            return await ctx.sendMessage({
                embeds: [
                    embed
                        .setColor(this.client.color.red)
                        .setDescription('There are no songs in the queue.'),
                ],
            });
        player.queue = [];
        return await ctx.sendMessage({
            embeds: [embed.setColor(this.client.color.main).setDescription(`Cleared the queue`)],
        });
    }
}

module.exports = ClearQueue;