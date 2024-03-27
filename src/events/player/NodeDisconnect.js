const Event = require("../../structures/Event.js");
const BotLog = require("../../utils/BotLog.js");

module.exports = class NodeDisconnect extends Event {
  constructor(client, file) {
    super(client, file, {
      name: "nodeDisconnect",
    });
  }

  async run(node, count) {
    this.client.logger.warn(`Node ${node} disconnected ${count} times`);
    BotLog.send(
      this.client,
      `Node ${node} disconnected ${count} times`,
      "warn"
    );
  }
};
