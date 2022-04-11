
module.exports = {
    name: "playerError",
    run: async (client, error) => {
        client.logger.log(`Player get error ${error.message}`, "error");
    }
};