const { MessageEmbed } = require("discord.js");
const { post } = require("node-superfetch");

module.exports = {
    name: "leave-server",
    category: "Owner",
    aliases: ["lv"],
    description: "Leave server",
    args: false,
    usage: "<string>",
    permission: [],
    owner: true,
    execute: async (message, args, client, prefix) => {
        if (!client.config.ownerID.includes(message.author.id))
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setFooter()
          .setTitle(`You are not allowed to run this command! Only the Owner is allowed to run this Cmd`)
        ]
      });
    if (!args[0])
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setTitle(`You have to add which Guild I should leave`)
          .setDescription(`Usage: ${prefix}leaveserver \`<SERVERID>\``)
        ]
      });
    let guild = client.guilds.cache.get(args[0]);
    if (!guild) return message.reply({
      content: "Could not find the Guild to Leave"
    })
    guild.leave().then(g => {
      message.channel.send({
        content: `Left ${g.name} | ${g.id}`
      })
    }).catch(e => {
      message.reply(`${e.message ? e.message : e}`, {
        code: "js"
      })
    })
  },
};