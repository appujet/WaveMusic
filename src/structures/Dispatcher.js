const { Spotify, AppleMusic } = require('shoukaku-sources');


class Song {
    constructor(track, user) {
        if (!track)
            throw new Error('Track is not provided');
        this.track = track.track;
        this.info = track.info;
        if (this.info && this.info.requester === undefined)
            this.info.requester = user;
        if (track.info.sourceName === 'youtube') {
            track.info.thumbnail = `https://img.youtube.com/vi/${track.info.identifier}/hqdefault.jpg`;
        } else if (track.info.sourceName === 'spotify') {
            new Spotify().getTrack(track.info.uri).then((res) => {
                this.info.thumbnail = res.album && res.album.images ? res.album.images[0] ? res.album.images[0].url : null : null;
            });
        } else if (track.info.sourceName === 'applemusic') {
            new AppleMusic().getTrack(track.info.uri).then((res) => {
                this.info.thumbnail = res.data[0].attributes.artwork.url.replace("{w}x{h}", "512x512");
            });
        }
    }
}

class Dispatcher {
    /**
     * 
     * @param {} options 
     */
    constructor(options) {
        this.history = [];
        this.client = options.client;
        this.guildId = options.guildId;
        this.channelId = options.channelId;
        this.player = options.player;
        this.queue = [];
        this.stopped = false;
        this.previous = null;
        this.current = null;
        this.loop = 'off';
        this.matchedTracks = [];
        this.repeat = 0;
        this.node = options.node;
        this.shuffle = false;
        this.paused = false;
        this.filters = [];
        this.autoplay = false;
        this.nowPlayingMessage = null;
        this.player
            .on('start', () => this.client.shoukaku.emit('trackStart', this.player, this.current, this))
            .on('end', () => {
                if (!this.queue.length)
                    this.client.shoukaku.emit('queueEnd', this.player, this.current, this);
                this.client.shoukaku.emit('trackEnd', this.player, this.current, this);
            })
            .on('stuck', () => this.client.shoukaku.emit('trackStuck', this.player, this.current))
            .on('closed', (...arr) => {
                this.client.shoukaku.emit('socketClosed', this.player, ...arr);
            });
    }
    get exists() {
        return this.client.queue.has(this.guildId);
    }
    get volume() {
        return this.player.filters.volume;
    }
    async play() {
        if (!this.exists || (!this.queue.length && !this.current)) {
            return;
        }
        this.current = this.queue.length !== 0 ? this.queue.shift() : this.queue[0];
        if (this.matchedTracks.length !== 0)
            this.matchedTracks = [];
        const search = (await this.node.rest.resolve(`${this.client.config.searchEngine}:${this.current?.info.title} ${this.current?.info.author}`));
        this.matchedTracks.push(...search.tracks);
        this.player.playTrack({ track: this.current?.track });
        if (this.current) {
            this.history.push(this.current);
            if (this.history.length > 100) {
                this.history.shift();
            }
        }
    }
    pause() {
        if (!this.player)
            return;
        if (!this.paused) {
            this.player.setPaused(true);
            this.paused = true;
        }
        else {
            this.player.setPaused(false);
            this.paused = false;
        }
    }
    remove(index) {
        if (!this.player)
            return;
        if (index > this.queue.length)
            return;
        this.queue.splice(index, 1);
    }
    previousTrack() {
        if (!this.player)
            return;
        if (!this.previous)
            return;
        this.queue.unshift(this.previous);
        this.player.stopTrack();
    }
    destroy() {
        this.queue.length = 0;
        this.history = [];
        this.player.connection.disconnect();
        this.client.queue.delete(this.guildId);
        
        this.client.shoukaku.emit('playerDestroy', this.player);
    }
    setShuffle(shuffle) {
        if (!this.player)
            return;
        this.shuffle = shuffle;
        if (shuffle) {
            const current = this.queue.shift();
            this.queue = this.queue.sort(() => Math.random() - 0.5);
            this.queue.unshift(current);
        }
        else {
            const current = this.queue.shift();
            this.queue = this.queue.sort((a, b) => a - b);
            this.queue.unshift(current);
        }
    }
    async skip(skipto = 1) {
        if (!this.player)
            return;
        if (skipto > 1) {
            this.queue.unshift(this.queue[skipto - 1]);
            this.queue.splice(skipto, 1);
        }
        this.repeat = this.repeat == 1 ? 0 : this.repeat;
        this.player.stopTrack();
    }
    seek(time) {
        if (!this.player)
            return;
        this.player.seekTo(time);
    }
    stop() {
        if (!this.player)
            return;
        this.queue.length = 0;
        this.history = [];
        this.loop = 'off';
        this.autoplay = false;
        this.repeat = 0;
        this.stopped = true;
        this.player.stopTrack();
        this.disconnect();
    }
    async disconnect() {
        if (!this.player)
            return;
        const _247 = await this.client.prisma.stay.findFirst({
            where: { guildId: this.guildId },
        });
        if (!_247) {
            this.destroy();
        } else {
            this.client.shoukaku.emit('playerDestroy', this.player);
        }
    }
    setLoop(loop) {
        this.loop = loop;
    }
    buildTrack(track, user) {
        return new Song(track, user);
    }
    async isPlaying() {
        if (this.queue.length && !this.current && !this.player.paused) {
            this.play();
        }
    }
    async Autoplay(song) {
        const resolve = await this.node.rest.resolve(`${this.client.config.searchEngine}:${song.info.author}`);
        if (!resolve || !resolve.tracks.length)
            return this.destroy();
        let choosed = null;
        const maxAttempts = 10; // Maximum number of attempts to find a unique song
        let attempts = 0;
        while (attempts < maxAttempts) {
            const potentialChoice = new Song(resolve.tracks[Math.floor(Math.random() * resolve.tracks.length)], this.client.user);
            // Check if the chosen song is not already in the queue or history
            if (!this.queue.some(s => s.track === potentialChoice.track) &&
                !this.history.some(s => s.track === potentialChoice.track)) {
                choosed = potentialChoice;
                break;
            }
            attempts++;
        }
        if (choosed) {
            this.queue.push(choosed);
            return await this.isPlaying();
        }
        return this.destroy();
    }
    async setAutoplay(autoplay) {
        this.autoplay = autoplay;
        if (autoplay) {
            this.Autoplay(this.current ? this.current : this.queue[0]);
        }
    }
}


module.exports = Dispatcher
