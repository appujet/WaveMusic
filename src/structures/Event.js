module.exports = class Event {
    constructor(client, file, options) {
        this.client = client;
        this.file = file;
        this.name = options.name;
        this.one = options.one || false;
        this.fileName = file.split('.')[0];
    }
    async run(..._args) {
        return await Promise.resolve();
    }
}
