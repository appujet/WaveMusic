const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const db = require("../../schema/dj");

module.exports = {
    name: "adddj",
    description: "Setup Dj role.",
    userPrams: ['ADMINISTRATOR'],
    botPrams: ['EMBED_LINKS'],
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
                Roles: [role],
                Mode: true
            })
            await data.save();
            return await interaction.editReply({ embeds: [new MessageEmbed().setDescription(`Successfully Added DJ Role <@&${role}>.`).setColor(client.embedColor)] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
        } else {
            let rolecheck = data.Roles.find((x) => x === role);
            if (rolecheck) return interaction.editReply({ embeds: [new MessageEmbed().setDescription(`Role Already Exists in List.`).setColor(client.embedColor)] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
            data.Roles.push(role);
            await data.save();
            return await interaction.editReply({ embeds: [new MessageEmbed().setDescription(`Successfully Added New DJ Role <@&${role}>.`).setColor(client.embedColor)] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });

        }
    }
}