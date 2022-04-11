const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
    name: "addprevious",
    description: "To add the previously played song to the queue.",
	
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: false
          });
        const player = interaction.client.manager.get(interaction.guild.id);
        const track = player.queue.previous;

        if (!player.queue.previous) {
            let nosong = new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(`No Previous Track Found`);
            return interaction.editReply({ embeds: [nosong] });
        }

        player.queue.add(player.queue.previous, 0);
        let addpre = new MessageEmbed().setDescription(
            `Added [${track.title}](${track.uri}) To The Queue`
        ).setColor(client.embedColor);
        interaction.editReply({ embeds: [addpre] });
    },
};
