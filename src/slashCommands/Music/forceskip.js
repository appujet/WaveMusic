const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
    name: "forceskip",
    description: "To force skip the current playing song.",
	
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
          const song = player.queue.current;
  
             player.stop();
             
          const emojiskip = interaction.client.emoji.skip;
  
          let thing = new MessageEmbed()
              .setDescription(`${emojiskip} **Skipped**\n[${song.title}](${song.uri})`)
              .setColor(client.embedColor)
          return interaction.followUp({embeds: [thing]}).then(msg => { setTimeout(() => {msg.delete()}, 3000);
         })
      
      }
  };     


    