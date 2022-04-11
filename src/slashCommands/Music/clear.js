const { MessageEmbed, CommandInteraction, Client } = require("discord.js")
const {  MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "clear",
    description: "Clear Filter/Queue",
	
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
      await interaction.deferReply({
        ephemeral: false
      });
      const player = interaction.client.manager.get(interaction.guild.id);
      if (!player.queue.current) {
        let thing = new MessageEmbed()
            .setColor("RED")
            .setDescription("There is no music playing.");
     return interaction.followUp({embeds: [thing]});
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
    .setColor(client.embedColor)
    .setDescription(`Which one do you want to clear?`)
    const m = await interaction.editReply({embeds: [thing], components:[row]});
    const collector = m.createMessageComponentCollector({
      filter: (b) => {
      if(b.user.id === interaction.member.user.id) return true;
       else {
     b.reply({ ephemeral: true, content: `Only **${interaction.user.tag}** can use this button, if you want then you've to run the command again.`}); return false;
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
 