const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "help",
    category: "Information",
    aliases: ["h"],
    description: "Return all commands, or one specific command",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {

        if (client.config.ownerID === message.author.id) {
            const color = client.embedColor
            var row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('Invite')
                        .setURL(client.config.links.invite)
                        .setStyle('LINK'),

                    new MessageButton()
                        .setLabel('Privacy Policy')
                        .setURL('https://github.com/AkAbhijit/Apera-Documentation/blob/main/Privacy%20Policy.md')
                        .setStyle('LINK'),

                    new MessageButton()
                        .setLabel('Support Server')
                        .setURL(client.config.links.support)
                        .setStyle('LINK'),

                    new MessageButton()
                        .setLabel('Vote')
                        .setURL('https://discordbotlist.com/bots/apera-5143/upvote')
                        .setStyle('LINK'),
                )

            info_commands = client.commands.filter((x) => x.category && x.category === "Information").map((x) => `\`${x.name}\``);
            music_commands = client.commands.filter((x) => x.category && x.category === "Music").map((x) => `\`${x.name}\``);
            filter_commands = client.commands.filter((x) => x.category && x.category === "Filters").map((x) => `\`${x.name}\``);
            playlist_commands = client.commands.filter((x) => x.category && x.category === "Playlist").map((x) => `\`${x.name}\``);
            settings_commands = client.commands.filter((x) => x.category && x.category === "Settings").map((x) => `\`${x.name}\``);
            owner_commands = client.commands.filter((x) => x.category && x.category === "Owner").map((x) => `\`${x.name}\``);

            const embed = new MessageEmbed()
                .setAuthor({ name: `Command Panel`, iconURL: client.user.displayAvatarURL() })
                .setColor(color)
                .addFields(
                    { name: `  Information`, value: `${info_commands.join(", ")}`, inline: false },
                    { name: `  Music`, value: `${music_commands.join(", ")}`, inline: false },
                    { name: `  Filters`, value: `${filter_commands.join(", ")}`, inline: false },
                    { name: `  Playlist`, value: `${playlist_commands.join(", ")}`, inline: false },
                    { name: `  Settings`, value: `${settings_commands.join(", ")}`, inline: false },
                    { name: `  Owner`, value: `${owner_commands.join(", ")}`, inline: false }

                )
                .setFooter({ text: `Type ?help <command> to view information of a specific command!` })

            message.channel.send({ embeds: [embed], components: [row] })

        } else {
            const color = client.embedColor

            var row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('Invite')
                        .setURL(client.config.links.invite)
                        .setStyle('LINK'),

                    new MessageButton()
                        .setLabel('Privacy Policy')
                        .setURL('https://github.com/AkAbhijit/Apera-Documentation/blob/main/Privacy%20Policy.md')
                        .setStyle('LINK'),

                    new MessageButton()
                        .setLabel('Support Server')
                        .setURL(client.config.links.support)
                        .setStyle('LINK'),

                    new MessageButton()
                        .setLabel('Vote')
                        .setURL('https://github.com/AkAbhijit/Apera-Documentation/blob/main/Privacy%20Policy.md')
                        .setStyle('LINK'),
                )

            info_commands = client.commands.filter((x) => x.category && x.category === "Information").map((x) => `\`${x.name}\``);
            music_commands = client.commands.filter((x) => x.category && x.category === "Music").map((x) => `\`${x.name}\``);
            filter_commands = client.commands.filter((x) => x.category && x.category === "Filters").map((x) => `\`${x.name}\``);
            playlist_commands = client.commands.filter((x) => x.category && x.category === "Playlist").map((x) => `\`${x.name}\``);
            settings_commands = client.commands.filter((x) => x.category && x.category === "Settings").map((x) => `\`${x.name}\``);

            const embed = new MessageEmbed()
                .setAuthor({ name: `Command Panel`, iconURL: client.user.displayAvatarURL() })
                .setColor(color)
                .addFields(
                    { name: `  Information`, value: `${info_commands.join(", ")}`, inline: false },
                    { name: `  Music`, value: `${music_commands.join(", ")}`, inline: false },
                    { name: `  Filters`, value: `${filter_commands.join(", ")}`, inline: false },
                    { name: `  Playlist`, value: `${playlist_commands.join(", ")}`, inline: false },
                    { name: `  Settings`, value: `${settings_commands.join(", ")}`, inline: false }

                )
                .setFooter({ text: `Type ?help <command> to view information of a specific command!` })

            message.channel.send({ embeds: [embed], components: [row] })
        }

    }
}
