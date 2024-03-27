const Event = require("../../structures/Event.js");

module.exports = class NodeRaw extends Event {
  constructor(client, file) {
    super(client, file, {
      name: "nodeRaw",
    });
  }

  async run(payload) {
    //this.client.logger.debug(`Node raw event: ${JSON.stringify(payload)}`);
  }
};
