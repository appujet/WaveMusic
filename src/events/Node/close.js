
module.exports = {
    name: "error",
    run: async (client, name, code, reason) => {
        client.logger.log(`Lavalink ${name}: Closed, Code ${code}, Reason ${reason || 'No reason'}`, "error");
    }
};