const { Command } = require('../../structures/index.js');


class GuildLeave extends Command {
    constructor(client) {
        super(client, {
            name: 'guildleave',
            description: {
                content: 'Leave a guild',
                examples: ['guildleave'],
                usage: 'guildleave',
            },
            category: 'dev',
            aliases: ['gl'],
            cooldown: 3,
            args: false,
            player: {
                voice: false,
                dj: false,
                active: false,
                djPerm: null,
            },
            permissions: {
                dev: true,
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: [],
            },
            slashCommand: false,
            options: [],
        });
    }
    async run(client, ctx, args) {
        const guild = this.client.guilds.cache.get(args[0]);
        if (!guild)
            return await ctx.sendMessage('Guild not found');
        try {
            await guild.leave();
            ctx.sendMessage(`Left guild ${guild.name}`);
        }
        catch (e) {
            ctx.sendMessage(`Failed to leave guild ${guild.name}`);
        }
    }
}

module.exports = GuildLeave;