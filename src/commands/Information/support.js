const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "support",
    category: "Information",
    aliases: [],
    description: "Gives you the link of our support server",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
        var support = client.config.links.support;
        var color = client.embedColor
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("Support Server")
                    .setStyle("LINK")
                    .setURL(support)
            )
        const embed = new MessageEmbed()
            .setDescription(`Click [Here](${support}) To Join Support Server Or Click Below `)
            .setColor(color)
        await message.reply({ embeds: [embed], components: [row] })
    }
}