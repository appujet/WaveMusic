const { MessageEmbed, CommandInteraction, Client } = require("discord.js")
const { convertTime } = require('../../utils/convert.js');
const { progressbar } = require('../../utils/progressbar.js')

module.exports = {
    name: "nowplaying",
    description: "Show now playing song",
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
          ephemeral: false
        });
         const player = interaction.client.manager.get(interaction.guildId);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
            return interaction.editReply({embeds: [thing]});
        }

        const song = player.queue.current
        const emojimusic = client.emoji.music;
        var total = song.duration;
        var current = player.position;

        let embed = new MessageEmbed()
            .addField(`${emojimusic} **Now Playing**`,`[${song.title}](${song.uri})`)
            .addField(`Duration`,`\`[ ${convertTime(total)} ]\``, true)
            .addField(`Author`,`${player.queue.current.author}`, true)
            .addField(`Requested by`,`[ ${song.requester} ]`,true)
            .setThumbnail(`https://img.youtube.com/vi/${song.identifier}/mqdefault.jpg`)
            .setColor(client.embedColor)
            .addField(`**Progress Bar**`, `**[ ${progressbar(player)}** ] \n\`${convertTime(player.position)}  ${convertTime(total)}\``)
            return interaction.editReply({embeds: [embed]})
            
    }
};
