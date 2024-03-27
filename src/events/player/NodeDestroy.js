const Event = require("../../structures/Event.js");
const BotLog = require("../../utils/BotLog.js");

module.exports = class NodeDestroy extends Event {
  constructor(client, file) {
    super(client, file, {
      name: "nodeDestroy",
    });
  }

  async run(node, code, reason) {
    this.client.logger.error(
      `Node ${node} destroyed with code ${code} and reason ${reason}`
    );
    BotLog.send(
      this.client,
      `Node ${node} destroyed with code ${code} and reason ${reason}`,
      "error"
    );
  }
};
