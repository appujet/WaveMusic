
module.exports = {
    name: "playerException",
    run: async (client, reasonr) => {
        client.logger.log(`Player Get error ${reasonr}`, "error");
    }
};