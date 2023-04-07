
module.exports = {
    name: "playerException",
    run: async (client, player, reason) => {
        client.logger.log(`Player Get exception ${reason}`, "error");
        const guild = client.guilds.cache.get(player.guildId);
        if(!guild) return;
        await player.destroy(guild);
    }
};