const { MessageEmbed } = require("discord.js");

module.exports = {
  	name: "replay",
    category: "Music",
  	description: "To Repeat The currently playing song",
	  args: false,
    usage: "<Number of song in queue>",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
	 execute: async (message, args, client, prefix) => {

        const player =  client.manager.get(message.guild.id);

        player.seek(0);
        //send informational message
        message.reply({content:`<a:playing:919580939720482816> Repeated The Current Playing Song`}).then(msg => { setTimeout(() => { msg.delete() }, 10000) });
       
      }
    };