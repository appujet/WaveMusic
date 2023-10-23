const { Command } = require('../../structures/index.js');

class GuildList extends Command {
    constructor(client) {
        super(client, {
            name: 'guildlist',
            description: {
                content: 'List all guilds the bot is in',
                examples: ['guildlist'],
                usage: 'guildlist',
            },
            category: 'dev',
            aliases: ['glt'],
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
    async run(client, ctx) {
        const guilds = this.client.guilds.cache.map(g => `${g.name} (${g.id})`);
        let chunks = client.utils.chunk(guilds, 10);
        if (chunks.length === 0)
            chunks = 1;
        const pages = [];
        for (let i = 0; i < chunks.length; i++) {
            const embed = this.client
                .embed()
                .setColor(this.client.color.main)
                .setDescription(chunks[i].join('\n'))
                .setFooter({ text: `Page ${i + 1} of ${chunks.length}` });
            pages.push(embed);
        }
        return await client.utils.paginate(ctx, pages);
    }
}

module.exports = GuildList;