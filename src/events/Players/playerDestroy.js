
module.exports = {
    name: "playerDestroy",
    run: async (client, player) => {
        client.logger.log(`Player Destroy in @ ${player.guild}`, "log");
        const data = player.data.get("247");
        if(data) await client.manager.createPlayer({
            guildId: player.guild,
            voiceId: player.voice,
            textId: player.text,
            deaf: true,
          });
    }
};