const { Event } = require('../../structures/index.js');
const { updateSetup } = require('../../utils/SetupSystem.js');

class PlayerDestroy extends Event {
    constructor(client, file) {
        super(client, file, {
            name: 'playerDestroy',
        });
    }

    async run(player) {
        const guild = this.client.guilds.cache.get(player.connection.guildId);
        if (!guild) return;
        
        await updateSetup(this.client, guild);
    }
}

module.exports = PlayerDestroy;
