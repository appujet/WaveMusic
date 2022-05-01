const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const db = require("../../schema/dj");

module.exports = {
    name: "toggledj",
    description: "Toggle Dj role.",
    userPrams: ['ADMINISTRATOR'],
    botPrams: ['MANAGE_GUILD'],
    options: [
        {
            name: 'toggledj',
            description: 'Enable Disable Dj Roles.',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'enable',
                    value: `dj_on`,
                },
                {
                    name: 'disable',
                    value: `dj_off`,
                },
            ],
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
        const input = interaction.options.getString('toggledj')

        if (!data) return interaction.editReply({ embeds: [new MessageEmbed().setDescription(`Don't have any dj role(s) setuped.`).setColor(client.embedColor)] })
        if (input === `dj_on`) {
            let mode = false;
            if (!data.Mode) mode = true;
            data.Mode = mode;
            await data.save();
            const thing = new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(`DJ mode is successfully \`Enabled.\``)
            await interaction.editReply({ embeds: [thing] })
        }

        if (input === `dj_off`) {
            let mode = true;
            if (data.Mode) mode = false;
            data.Mode = mode;
            await data.save();
            const thing = new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(`DJ mode is successfully \`Disabled\`.`)
            return await interaction.editReply({ embeds: [thing] })
        }

    }
}