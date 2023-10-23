const { Command } = require('../../structures/index.js');


class Stop extends Command {
    constructor(client) {
        super(client, {
            name: 'stop',
            description: {
                content: 'Stops the music and clears the queue',
                examples: ['stop'],
                usage: 'stop',
            },
            category: 'music',
            aliases: ['sp'],
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
        player.queue = [];
        player.stop();
        return await ctx.sendMessage({
            embeds: [
                embed
                    .setColor(this.client.color.main)
                    .setDescription(`Stopped the music and cleared the queue`),
            ],
        });
    }
}


module.exports = Stop;