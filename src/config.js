require("dotenv").config();

module.exports = {
  token: process.env.TOKEN || '', // your discord bot token
  prefix: process.env.PREFIX || '.', // bot prefix
  ownerID: process.env.OWNERID?.split(',') || ['990100068759666758','445624020675592212'], //your discord id
  SpotifyID: process.env.SPOTIFYID || '', // spotify client id
  SpotifySecret: process.env.SPOTIFYSECRET || '', // spotify client secret
  mongourl: process.env.MONGO_URI || 'mongodb+srv://', // MongoDb URL
  embedColor: process.env.COlOR || '#3366ff', // embed colour
  logs: process.env.LOGS || '', // Discord channel id 
  links: {
    support: process.env.SUPPORT || 'https://discord.gg/ns8CTk9J3e',
    invite: process.env.INVITE || 'https://discord.gg/ns8CTk9J3e',
    vote: process.env.VOTE || 'https://discord.gg/ns8CTk9J3e',
    bg: process.env.BG || 'https://media.discordapp.net/attachments/966675680907657256/967789748699668480/flat-landscape-lake-sunset-deer-wallpaper-preview.jpg'
  },

  nodes: [
    {
      url: process.env.NODE_URL || 'lavalink-coders.ml:80',
      name: process.env.NODE_NAME || 'Main',
      auth: process.env.NODE_AUTH || 'coders',
      secure: parseBoolean(process.env.NODE_SECURE || 'false'),
    },
  ],
};

function parseBoolean(value){
    if (typeof(value) === 'string'){
        value = value.trim().toLowerCase();
    }
    switch(value){
        case true:
        case "true":
            return true;
        default:
            return false;
    }
}
