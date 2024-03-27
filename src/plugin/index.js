const fs = require("fs");
const path = require("path");

module.exports = function loadPlugins(client) {
  const pluginsFolder = path.join(__dirname, "./plugins");
  const pluginFiles = fs
    .readdirSync(pluginsFolder)
    .filter((file) => file.endsWith(".js"));
  pluginFiles.forEach(async (file) => {
    const plugin = (await import(`./plugins/${file}`)).default;
    if (plugin.initialize) plugin.initialize(client);
    client.logger.info(`Loaded plugin: ${plugin.name} v${plugin.version}`);
  });
};
