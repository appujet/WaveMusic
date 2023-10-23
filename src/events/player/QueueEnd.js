const { Event } = require('../../structures/index.js');
const { updateSetup } = require('../../utils/SetupSystem.js');

class QueueEnd extends Event {
    constructor(client, file) {
        super(client, file, {
            name: 'queueEnd',
        });
    }

    async run(player, track, dispatcher) {
        const guild = this.client.guilds.cache.get(dispatcher.guildId);
        if (!guild) return;

        if (dispatcher.loop === 'repeat') dispatcher.queue.unshift(track);
        if (dispatcher.loop === 'queue') dispatcher.queue.push(track);

        if (dispatcher.autoplay) {
            await dispatcher.Autoplay(track);
        } else {
            dispatcher.autoplay = false;
        }

        if (dispatcher.loop === 'off') {
            dispatcher.previous = dispatcher.current;
            dispatcher.current = null;
        }

        await updateSetup(this.client, guild);
    }
}

module.exports = QueueEnd;
