const { Command } = require('../../structures/index.js');

class Autoplay extends Command {
    constructor(client) {
        super(client, {
            name: 'autoplay',
            description: {
                content: 'Toggles autoplay',
                examples: ['autoplay'],
                usage: 'autoplay',
            },
            category: 'music',
            aliases: ['ap'],
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
        const autoplay = player.autoplay;
        if (!autoplay) {
            embed.setDescription(`Autoplay has been enabled`).setColor(client.color.main);
            player.setAutoplay(true);
        }
        else {
            embed.setDescription(`Autoplay has been disabled`).setColor(client.color.main);
            player.setAutoplay(false);
        }
        ctx.sendMessage({ embeds: [embed] });
    }
}

module.exports = Autoplay;