
module.exports = {
    name: "ready",
    run: async (client, name) => {
        client.logger.log(`Lavalink "${name}" connected.`, "ready");
    }
};