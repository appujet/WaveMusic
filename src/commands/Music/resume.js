const { Command } = require('../../structures/index.js');

class Resume extends Command {
    constructor(client) {
        super(client, {
            name: 'resume',
            description: {
                content: 'Resumes the current song',
                examples: ['resume'],
                usage: 'resume',
            },
            category: 'music',
            aliases: ['r'],
            cooldown: 3,
            args: false,
            player: {
                voice: true,
                dj: false,
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
        if (!player.paused)
            return await ctx.sendMessage({
                embeds: [
                    embed
                        .setColor(this.client.color.red)
                        .setDescription('The player is not paused.'),
                ],
            });
        player.pause();
        return await ctx.sendMessage({
            embeds: [embed.setColor(this.client.color.main).setDescription(`Resumed the player`)],
        });
    }
}


module.exports = Resume;