const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const db = require("../../schema/dj");

module.exports = {
    name: "removedj",
    description: "Delete Dj roles.",
    userPrams: ['ADMINISTRATOR'],
    botPrams: ['EMBED_LINKS'],
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
            await data.deleteOne();
            return interaction.editReply({ embeds: [new MessageEmbed().setDescription(`Successfully Removed All DJ Roles.`).setColor("BLURPLE")] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
        } else return interaction.editReply({ embeds: [new MessageEmbed().setDescription(`Don't Have Dj Setup In This Guild`).setColor("BLURPLE")] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });

    }
}