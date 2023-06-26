
module.exports = {
    name: "playerResumed",
    run: async (client, player) => {
        client.logger.log(`Player Resume in @ ${player.guildId}`, "log");
    }
};