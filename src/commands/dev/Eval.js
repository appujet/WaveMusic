const { Command } = require('../../structures/index.js');

class Eval extends Command {
    constructor(client) {
        super(client, {
            name: 'eval',
            description: {
                content: 'Evaluate code',
                examples: ['eval'],
                usage: 'eval',
            },
            category: 'dev',
            aliases: ['ev'],
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
        const code = args.join(' ');
        try {
            let evaled = eval(code);
            if (typeof evaled !== 'string')
                evaled = require('node:util').inspect(evaled);
            ctx.sendMessage(`\`\`\`js\n${evaled}\n\`\`\``);
        }
        catch (e) {
            ctx.sendMessage(`\`\`\`js\n${e}\n\`\`\``);
        }
    }
}

module.exports = Eval;