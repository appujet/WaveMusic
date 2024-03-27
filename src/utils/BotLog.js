class BotLog {
    static send(client, message, type) {
        if (!client)
            return;
        if (!client.channels.cache)
            return;
        if (!client.config.logChannelId)
            return;
        const channel = client.channels.cache.get(client.config.logChannelId);
        if (!channel)
            return;
        let color;
        switch (type) {
            case 'error':
                color = 0xff0000;
                break;
            case 'warn':
                color = 0xffff00;
                break;
            case 'info':
                color = 0x00ff00;
                break;
            case 'success':
                color = 0x00ff00;
                break;
            default:
                color = 0x000000;
                break;
        }
        const embed = client.embed()
            .setColor(color)
            .setDescription(message)
            .setTimestamp();
        channel.send({ embeds: [embed] }).catch(() => { null; });
    }
}

module.exports = BotLog;