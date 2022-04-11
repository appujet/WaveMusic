const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
    name: "playprevious",
    description: "Plays the previously played track.",
	
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {

        await interaction.deferReply({
            ephemeral: false
          });

        const play = interaction.client.manager.get(interaction.guild.id);

        if (!play.queue.previous) {
            let nosong = new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(`There Is No Previous Song To Play`);
            return interaction.editReply({ embeds: [nosong] });
        }

        play.queue.add(play.queue.previous, 0);

        const previous = new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Playing The Previous Song`)
            interaction.editReply({ embeds: [previous] });

        await play.stop()

    }
}