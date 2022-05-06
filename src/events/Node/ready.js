const db = require("../../schema/autoReconnect");

module.exports = {
    name: "ready",
    run: async (client, name) => {
        client.logger.log(`Lavalink "${name}" connected.`, "ready");
        client.logger.log("Auto Reconnect Collecting player 24/7 data", "log");
        const maindata = await db.find()
        client.logger.log(`Auto Reconnect found ${maindata.length ? `${maindata.length} queue${maindata.length > 1 ? 's' : ''}. Resuming all auto reconnect queue` : '0 queue'}`, "ready");
        for (let data of maindata) {
            const index = maindata.indexOf(data);
            setTimeout(async () => {
                const channel = client.channels.cache.get(data.TextId)
                const voice = client.channels.cache.get(data.VoiceId)
                if (!channel || !voice) return data.delete()
                await client.manager.createPlayer({
                    guildId: data.Guild,
                    voiceId: data.VoiceId,
                    textId: data.TextId,
                    deaf: true,
                  });
                }
            ), index * 5000}
    }
};