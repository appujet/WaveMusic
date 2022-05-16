const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'node',
  category: 'Information',
  aliases: ['nodestats'],
  description: 'Check The Nodes',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {
  
  const all = [...client.manager.shoukaku.nodes.values()].map(node => 
        `Node ${node.name} Connected` +
        `\nPlayer:  ${client.guilds.cache.filter((g) => g.me.voice.channel).size}` +
        `\nUptime: ${new Date(node.stats.uptime).toISOString().slice(11, 19)}` +
        `\n\nMemory` +
        `\nReservable Memory: ${Math.round(node.stats.memory.reservable / 1024 / 1024)}mb` +
        `\nUsed Memory: ${Math.round(node.stats.memory.used / 1024 / 1024)}mb` +
        `\nFree Memory: ${Math.round(node.stats.memory.free / 1024 / 1024)}mb` +
        `\nAllocated Memory: ${Math.round(node.stats.memory.allocated / 1024 / 1024)}mb` +
        "\n\nCPU" +
        `\nCores: ${node.stats.cpu.cores}` +
        `\nSystem Load: ${(Math.round(node.stats.cpu.systemLoad * 100) / 100).toFixed(2)}%` +
        `\nLavalink Load: ${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}%`
    ).join('\n\n----------------------------\n');
    
    const embed = new MessageEmbed()
        .setAuthor({ name: 'Lavalink Node', iconURL: client.user.displayAvatarURL()})
        .setDescription(`\`\`\`${all}\`\`\``)
        .setColor(client.embedColor)
    message.reply({embeds: [embed]})

  },
};  
