
module.exports = {
    name: "playerError",
    run: async (client, player, type, error) => {
        client.logger.log(`Player get error ${error.message}`, "error");
        const guild = client.guilds.cache.get(player.guild);
        if(!guild) return;
        await player.destroy(guild);
    }
};