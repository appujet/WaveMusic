const Event = require("../../structures/Event.js");
const BotLog = require("../../utils/BotLog.js");

module.exports = class NodeError extends Event {
  constructor(client, file) {
    super(client, file, {
      name: "nodeError",
    });
  }

  async run(node, error) {
    this.client.logger.error(`Node ${node} Error: ${JSON.stringify(error)}`);
    BotLog.send(
      this.client,
      `Node ${node} Error: ${JSON.stringify(error)}`,
      "error"
    );
  }
};
