const { Client, Intents, Collection } = require("discord.js");
const Manager = require("kazagumo");
const mongoose = require('mongoose');
const { readdirSync } = require("fs");
const shoukakuOptions = require("../utils/options");

class MusicBot extends Client {
  constructor() {
    super({
      shards: "auto",
      allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: false
      },
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES
      ]
    });
    this.commands = new Collection();
    this.slashCommands = new Collection();
    this.config = require("../config.js");
    this.owner = this.config.ownerID;
    this.prefix = this.config.prefix;
    this.embedColor = this.config.embedColor;
    this.aliases = new Collection();
    this.logger = require("../utils/logger.js");
    this.emoji = require("../utils/emoji.json");
    if (!this.token) this.token = this.config.token;
    const Spotify = {
      spotify: {
        clientId: this.config.SpotifyID,
        clientSecret: this.config.SpotifySecret
      },
      defaultSearchEngine: "youtube_music"
    };
    this.manager = new Manager(this, this.config.nodes, shoukakuOptions, Spotify)
    /**
     *  Mongose for data base
     */
    const dbOptions = {
      useNewUrlParser: true,
      autoIndex: false,
      connectTimeoutMS: 10000,
      family: 4,
      useUnifiedTopology: true,
    };
    mongoose.connect(this.config.mongourl, dbOptions);
    mongoose.Promise = global.Promise;
    mongoose.connection.on('connected', () => {
      this.logger.log('[DB] DATABASE CONNECTED', "ready");
    });
    mongoose.connection.on('err', (err) => {
      console.log(`Mongoose connection error: \n ${err.stack}`, "error");
    });
    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected');
    });
    readdirSync("./src/events/Client/").forEach(file => {
      const event = require(`../events/Client/${file}`);
      let eventName = file.split(".")[0];
      this.logger.log(`Loading Events Client ${eventName}`, "event");
      this.on(event.name, (...args) => event.run(this, ...args));
    });
    /**
     * Node Manager Events 
     */
    readdirSync("./src/events/Node/").forEach(file => {
      const event = require(`../events/Node/${file}`);
      let eventName = file.split(".")[0];
      this.logger.log(`Loading Events Lavalink  ${eventName}`, "event");
      this.manager.shoukaku.on(event.name, (...args) => event.run(this, ...args));
    });
    /**
     * Player Manager Events
     */
    readdirSync("./src/events/Players/").forEach(file => {
      const event = require(`../events/Players/${file}`);
      let eventName = file.split(".")[0];
      this.logger.log(`Loading Events Players ${eventName}`, "event");
      this.manager.on(event.name, (...args) => event.run(this, ...args));
    });
    /**
     * Import all commands
     */
    readdirSync("./src/commands/").forEach(dir => {
      const commandFiles = readdirSync(`./src/commands/${dir}/`).filter(f => f.endsWith('.js'));
      for (const file of commandFiles) {
        const command = require(`../commands/${dir}/${file}`);
        this.logger.log(`[ • ] Message Command Loaded: ${command.category} - ${command.name}`, "cmd");
        this.commands.set(command.name, command);
      }
    })
    /**
     * SlashCommands 
     */
    const data = [];

    readdirSync("./src/slashCommands/").forEach((dir) => {
      const slashCommandFile = readdirSync(`./src/slashCommands/${dir}/`).filter((files) => files.endsWith(".js"));

      for (const file of slashCommandFile) {
        const slashCommand = require(`../slashCommands/${dir}/${file}`);

        if (!slashCommand.name) return console.error(`slashCommandNameError: ${slashCommand.split(".")[0]} application command name is required.`);

        if (!slashCommand.description) return console.error(`slashCommandDescriptionError: ${slashCommand.split(".")[0]} application command description is required.`);

        this.slashCommands.set(slashCommand.name, slashCommand);
        this.logger.log(`[ / ] Slash Command Loaded: ${slashCommand.name}`, "cmd");
        data.push(slashCommand);
      }
    });
    this.on("ready", async () => {
      await this.application.commands.set(data).then(() => this.logger.log(`Successfully Loaded All Slash Commands`, "cmd")).catch((e) => console.log(e));
    });
    /**
     * Error Handler
     */
    this.on("disconnect", () => console.log("Bot is disconnecting..."))
    this.on("reconnecting", () => console.log("Bot reconnecting..."))
    this.on('warn', error => console.log(error));
    this.on('error', error => console.log(error));
    process.on('unhandledRejection', (reason, p) => {
      console.log(reason, p);
    });

    process.on('uncaughtException', (err, origin) => {
      console.log(err, origin);
    });

    process.on('uncaughtExceptionMonitor', (err, origin) => {
      console.log(err, origin);
    });

    process.on('multipleResolves', (type, promise, reason) => {
      console.log(type, promise, reason);
    });

  }
  connect() {
    return super.login(this.token);
  };
};

module.exports = MusicBot;
