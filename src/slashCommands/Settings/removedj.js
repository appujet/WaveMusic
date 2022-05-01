const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const db = require("../../schema/dj");

module.exports = {
    name: "removedj",
    description: "Delete Dj role.",
    userPrams: ['ADMINISTRATOR'],
    botPrams: ['MANAGE_GUILD'],
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    */

    run: async (client, interaction, prefix) => {

        await interaction.deferReply({
            ephemeral: false
        });

        let data = await db.findOne({ Guild: interaction.guildId });
        if (data) {
            await data.delete()
            return interaction.editReply({ embeds: [new MessageEmbed().setDescription(`Successfully Removed All DJ Roles.`).setColor("BLURPLE")] })
        } else return interaction.editReply({ embeds: [new MessageEmbed().setDescription(`Don't Have Dj Setup In This Guild`).setColor("BLURPLE")] })

    }
}