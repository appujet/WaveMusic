const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const db = require("../../schema/dj");

module.exports = {
    name: "adddj",
    description: "Setup Dj role.",
    userPrams: ['ADMINISTRATOR'],
    botPrams: ['MANAGE_GUILD'],
    options: [
        {
            name: "role",
            description: "Mention a Role.",
            required: true,
            type: "ROLE"
        }
    ],
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    */

    run: async (client, interaction, prefix) => {

        await interaction.deferReply({
            ephemeral: false
        });

        let data = await db.findOne({ Guild: interaction.guildId });
        const role = interaction.options.getRole('role').id;
        if (!data) {
            data = new db({
                Guild: interaction.guildId,
                Roles: [role.id],
                Mode: true
            })
            await data.save();
            return await interaction.editReply({ embeds: [new MessageEmbed().setDescription(`Successfully Added DJ Role ${role}.`).setColor(client.embedColor)] })
        } else {
            let rolecheck = data.Roles.find((x) => x === role.id);
            if (rolecheck) return interaction.editReply({ embeds: [new MessageEmbed().setDescription(`Role Already Exists in List.`).setColor(client.embedColor)] })
            data.Roles.push(role.id);
            await data.save();
            return await interaction.editReply({ embeds: [new MessageEmbed().setDescription(`Successfully Added New DJ Role ${role}.`).setColor(client.embedColor)] })

        }
    }
}