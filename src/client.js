const { GatewayIntentBits } = require('discord.js');
const config = require('./config.js');
const WaveClient = require('./structures/Client.js');

const {
    GuildMembers,
    MessageContent,
    GuildVoiceStates,
    GuildMessages,
    Guilds,
    GuildMessageTyping,
} = GatewayIntentBits;

const clientOptions = {
    intents: [
        Guilds,
        GuildMessages,
        MessageContent,
        GuildVoiceStates,
        GuildMembers,
        GuildMessageTyping,
    ],
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: false,
    },
};

const client = new WaveClient(clientOptions);
client.start(config.token);