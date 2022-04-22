require("dotenv").config();

module.exports = {
  token: process.env.TOKEN || 'OTU5NjkyMTM5MDQ0OTU4Mjc4.Ykfk9A.xhLURUiyB0f2w_MfNYOYPTXbzjg', // your discord bot token
  prefix: process.env.PREFIX || '.', // bot prefix
  ownerID: process.env.OWNERID || ['959276033683628122', '952560202635427841'], //your discord id
  SpotifyID: process.env.SPOTIFYID || '69ebbd15cba9474a9d46e5aa95733b15', // spotify client id
  SpotifySecret: process.env.SPOTIFYSECRET || '185da21de3904b7db61d4d12c455c166', // spotify client secret
  mongourl:
    process.env.MONGO_URI || 'mongodb+srv://AkAbhijit:6291@apera.rucws.mongodb.net/aperaBETA', // MongoDb URL
  embedColor: process.env.COlOR || '#3366ff', // embed colour
  logs: process.env.LOGS || '', // Discord channel id 
  links: {
    support: 'https://discord.gg/ns8CTk9J3e',
    invite: '',
    vote: '',
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
