
module.exports = {
    name: "playerEmpty",
    run: async (client, player) => {
        if(player.data.get("message") && !player.data.get("message").deleted) player.data.get("message").delete().catch(() => null);
        client.channels.cache.get(player.text)?.send({content: "There's no queue left"});
        player.destroy();
    }
}