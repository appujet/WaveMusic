const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
    name: "replay",
    description: "To Replay The Current Playing Song.",
	
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {

        await interaction.deferReply({
            ephemeral: false
          });

        const player =  client.manager.get(interaction.guild.id);

        player.seek(0);
        //send informational message
        interaction.editReply({content:`<a:playing:919580939720482816> Repeated The Current Playing Song`}).then(msg => { setTimeout(() => { msg.delete() }, 10000) });
       
      }
    };