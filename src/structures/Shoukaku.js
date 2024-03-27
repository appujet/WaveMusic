const { Connectors, Shoukaku } = require('shoukaku');

class ShoukakuClient extends Shoukaku {
    constructor(client) {
        super(new Connectors.DiscordJS(client), client.config.lavalink, {
            moveOnDisconnect: false,
            resume: false,
            reconnectInterval: 30,
            reconnectTries: 2,
            restTimeout: 10000,
            userAgent: `WaveMusic (@devblacky)`, // don't change this
            nodeResolver: nodes => [...nodes.values()]
                .filter(node => node.state === 2)
                .sort((a, b) => a.penalties - b.penalties)
                .shift(),
        });
        this.client = client;
        this.on('ready', (name, reconnected) => {
            this.client.shoukaku.emit(reconnected ? 'nodeReconnect' : 'nodeConnect', name);
        });
        this.on('error', (name, error) => this.client.shoukaku.emit('nodeError', name, error));
        this.on('close', (name, code, reason) => this.client.shoukaku.emit('nodeDestroy', name, code, reason));
        this.on('disconnect', (name, count) => {
            this.client.shoukaku.emit('nodeDisconnect', name, count);
        });
        this.on('debug', (name, reason) => this.client.shoukaku.emit('nodeRaw', name, reason));
    }
}

module.exports = ShoukakuClient;
