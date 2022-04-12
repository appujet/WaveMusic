const { MessageEmbed } = require("discord.js");
const Wait = require('util').promisify(setTimeout);

module.exports = {
    name: "stop",
    category: "Music",
    description: "Stops the music",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {

        const player = client.manager.players.get(message.guild.id);
        if (!player.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
            return message.reply({ embeds: [thing] });
        }
        player.queue.length = 0;
        player.repeat = 'off';
        player.stopped = true;
        player.player.stopTrack();
        Wait(500);
        const emojistop = client.emoji.stop;
        let thing = new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`${emojistop} Stopped the music`)
        message.reply({ embeds: [thing] });

    }
};