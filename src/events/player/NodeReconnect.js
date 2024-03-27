const Event = require("../../structures/Event.js");
const BotLog = require("../../utils/BotLog.js");

module.exports = class NodeReconnect extends Event {
  constructor(client, file) {
    super(client, file, {
      name: "nodeReconnect",
    });
  }

  async run(node) {
    this.client.logger.warn(`Node ${node} reconnected`);
    BotLog.send(this.client, `Node ${node} reconnected`, "warn");
  }
};
