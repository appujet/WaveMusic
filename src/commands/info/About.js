const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Command } = require('../../structures/index.js');
class About extends Command {
    constructor(client) {
        super(client, {
            name: 'about',
            description: {
                content: 'Shows information about the bot',
                examples: ['about'],
                usage: 'about',
            },
            category: 'info',
            aliases: ['ab'],
            cooldown: 3,
            args: false,
            player: {
                voice: false,
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
        const row = new ActionRowBuilder().addComponents(new ButtonBuilder()
            .setLabel('Invite WaveMusic')
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=875635121770889257&permissions=8&scope=bot%20applications.commands`), new ButtonBuilder()
                .setLabel('Support Server')
                .setStyle(ButtonStyle.Link)
                .setURL('https://discord.gg/ns8CTk9J3e'));
        const embed = this.client
            .embed()
            .setAuthor({
                name: 'WaveMusic',
                iconURL: 'https://media.discordapp.net/attachments/876035356460462090/888434725235097610/20210820_124325.png',
            })
            .setThumbnail('https://media.discordapp.net/attachments/876035356460462090/888434725235097610/20210820_124325.png')
            .setColor(this.client.color.main)
            .addFields([
                {
                    name: 'Creator',
                    value: '[Blacky#9125](https://github.com/brblacky)',
                    inline: true,
                },
                {
                    name: 'Repository',
                    value: '[Here](https://github.com/brblacky/WaveMusic)',
                    inline: true,
                },
                {
                    name: 'Support',
                    value: '[Here](https://discord.gg/ns8CTk9J3e)',
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: `He really wanted to make his first open source project ever for more coding experience. In this project, he was challenged to make a project with less bugs. Hope you enjoy using WaveMusic!`,
                    inline: true,
                },
            ]);
        return await ctx.sendMessage({
            content: '',
            embeds: [embed],
            components: [row],
        });
    }
}

module.exports = About;