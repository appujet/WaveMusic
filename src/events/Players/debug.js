
module.exports = {
    name: "debug",
    run: async (client, message) => {
        client.logger.log(`Player debug for ${message} `, "debug");
    }
};