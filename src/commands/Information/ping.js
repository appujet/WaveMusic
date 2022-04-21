const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  category: "Information",
  description: "Check Ping Bot",
  args: false,
  usage: "",
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {

    await message.reply({ content: "**Getting The Latency**" }).then(async (msg) => {
      var ping = msg.createdAt - message.createdAt;
      var api_ping = client.ws.ping;

      const PingEmbed = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`\`\`\`ini\n[ Bot Latency ] :: ${ping}ms \n[ API Latency ] :: ${api_ping}ms \`\`\``)
      await msg.edit({ content: "** **", embeds: [PingEmbed] })
    })
  }
}