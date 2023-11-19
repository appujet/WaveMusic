const { Command } = require('../../structures/index.js');

class Reset extends Command {
    constructor(client) {
        super(client, {
            name: 'reset',
            description: {
                content: 'Resets the active filters',
                examples: ['reset'],
                usage: 'reset',
            },
            category: 'filters',
            aliases: ['reset'],
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
                user: ['ManageGuild'],
            },
            slashCommand: true,
            options: [],
        });
    }
    async run(client, ctx) {
        const player = client.queue.get(ctx.guild.id);
        player.player.clearFilters();
        player.filters = [];
        return await ctx.sendMessage({
            embeds: [
                {
                    description: 'Filters have been reset',
                    color: client.color.main,
                },
            ],
        });
    }
}

module.exports = Reset;