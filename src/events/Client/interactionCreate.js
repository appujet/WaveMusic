const { MessageEmbed, Client } = require("discord.js")
const pre= require("../../schema/prefix.js");
const db = require("../../schema/setup");

module.exports = {
    name: "interactionCreate",
    run: async (client, interaction) => {
   
    let prefix = client.prefix;
    const ress =  await pre.findOne({Guild: interaction.guildId})
    if(ress && ress.Prefix)prefix = ress.Prefix;

  
     if(interaction.isCommand()) {

        const SlashCommands = client.slashCommands.get(interaction.commandName);
        if(!SlashCommands) return;
        
        if (SlashCommands.owner && interaction.author.id !== `${client.owner}`) {
          await interaction.editReply({
          content: `Only <@836958855866089512> can use this command!`
        }).catch(() => {});
        }
        /*
        const player = interaction.client.manager.get(interaction.guildId);

        if (SlashCommands.player && !player) {
          await interaction.editReply({
                    content: `There is no player for this guild.`
                }).catch(() => {});
        }
        */
        if (SlashCommands.inVoiceChannel && !interaction.member.voice.channel) { 
          await interaction.editReply({
          content: `You must be in a voice channel!`
        }).catch(() => {});
        }
        if (SlashCommands.sameVoiceChannel && interaction.member.voice.channel !== interaction.guild.me.voice.channel) { 
           await interaction.editReply({
                    content: `You must be in the same channel as ${interaction.client.user}`
                }).catch(() => {}); 
         }
                
        try {
            await SlashCommands.run(client, interaction, prefix);
        } catch (error) {
            if(interaction.replied) {
                await interaction.editReply({
                    content: `An unexcepted error occured.`
                }).catch(() => {});
            } else {
                await interaction.followUp({
                    ephemeral: true,
                    content: `An unexcepted error occured.`
                }).catch(() => {});
            }
            console.error(error);
        };
    } 
    if(interaction.isButton()) {
        let data = await db.findOne({ Guild: interaction.guildId });
        if(data && interaction.channelId === data.Channel && interaction.message.id === data.Message) return client.emit("playerButtons", interaction, data);
    };
  }    
};