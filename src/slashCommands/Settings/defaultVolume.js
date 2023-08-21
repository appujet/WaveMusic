const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const db = require("../../schema/volume");

module.exports = {
    name: "setdefaultvolume",
    description: "Set Default Volume for Player",
    userPrams: ['ADMINISTRATOR'],
    botPrams: ['EMBED_LINKS'],
    options: [
        {
            name: "level",
            description: "Enter Volume Level 1 - 100",
            required: true,
            type: "INTEGER",
            min_value: 1,
            max_value: 100,
        }
    ],
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    */

    run: async (client, interaction) => {

        await interaction.deferReply({
            ephemeral: false
        });

    const hehe = interaction.options.getInteger("level");
    const data = await db.findOne({ Guild: interaction.guild.id });
    if (!data) {

        const newData = new db({
            Guild: interaction.guild.id,
            volLevel: hehe
        });
        await newData.save();
        return interaction.editReply(`Player Volume set to ${hehe}`);
    } else {
        data.volLevel = hehe;
        await data.save();
        interaction.editReply(`Player Volume Updated to ${hehe}`)
    }
    
    }
}