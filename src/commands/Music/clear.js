const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "clear",
    aliases: ["c"],
    category: "Music",
  	description: "Clear Filter/Queue",
	  args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
	 execute: async (message, args, client, prefix) => {
  
		const player = message.client.manager.get(message.guild.id);
        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("No Music Is Playing");
            return message.reply({embeds: [thing]});
        }
        const but = new MessageButton()
        .setCustomId("cqueue")
        .setLabel("Queue")
        .setStyle("PRIMARY");
      const but2 = new MessageButton()
        .setCustomId("cfilter")
        .setLabel("Filter")
        .setStyle("PRIMARY");
  
      const but_ = new MessageButton()
        .setCustomId("dqueue")
        .setLabel("Queue")
        .setStyle("PRIMARY")
        .setDisabled(true);
      const but_2 = new MessageButton()
        .setCustomId("dfilter")
        .setLabel("Filter")
        .setStyle("PRIMARY")
        .setDisabled(true);
    

		player.queue.clear();

    const row = new MessageActionRow().addComponents(but, but2)

		let thing = new MessageEmbed()
			.setColor(message.client.embedColor)
			.setDescription(`Which one do you want to clear?`)
      const m = await message.reply({embeds: [thing], components:[row]});
      const collector = m.createMessageComponentCollector({
        filter: (b) => {
        if(b.user.id === message.author.id) return true;
         else {
       b.reply({ ephemeral: true, content: `Only **${message.author.tag}** can use this button, if you want then you've to run the command again.`}); return false;
             };
        },
        time : 60000,
        idle: 60000/2
      });
      collector.on("end", async () => {
       if(!m) return;
          await m.edit({ components: [new MessageActionRow().addComponents(but.setDisabled(true), but2.setDisabled(true))] }).catch(() => {});
      });
      collector.on('collect', async (b) => {
        if(!b.deferred) await b.deferUpdate()
         if(b.customId === "cqueue") {
        
            player.queue.clear();
            await m.edit({ embeds: [new MessageEmbed().setDescription("Which one do you want to clear?")], components: [new MessageActionRow().addComponents(but_, but_2)] })
            return await m.reply({ embeds: [new MessageEmbed().setDescription("Cleared the Queue.")] })
         }
         if(b.customId === "cfilter") {
          await player.clearEffects();
          await m.edit({ embeds: [new MessageEmbed().setDescription("Which one do you want to clear?")], components: [new MessageActionRow().addComponents(but_, but_2)] })
          return await m.reply({ embeds: [new MessageEmbed().setDescription("Cleared the Filter.")] })
          }
        });
      }
    }
   