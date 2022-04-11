
module.exports = {
    name: "error",
    run: async (client, name, error) => {
        client.logger.log(`Lavalink "${name}" error ${error}`, "error");
    }
};