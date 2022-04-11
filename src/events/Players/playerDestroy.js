
module.exports = {
    name: "playerDestroy",
    run: async (client, player) => {
        client.logger.log(`Player Destroy in @ ${player.guild}`, "log");
    }
};