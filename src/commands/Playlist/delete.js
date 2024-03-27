const { ApplicationCommandOptionType } = require("discord.js");

const Command = require("../../structures/Command.js");

module.exports = class Delete extends Command {
  constructor(client) {
    super(client, {
      name: "delete",
      description: {
        content: "Deletes a playlist",
        examples: ["delete <playlist name>"],
        usage: "delete <playlist name>",
      },
      category: "playlist",
      aliases: ["delete"],
      cooldown: 3,
      args: true,
      player: {
        voice: false,
        dj: false,
        active: false,
        djPerm: null,
      },
      permissions: {
        dev: false,
        client: ["SendMessages", "ViewChannel", "EmbedLinks"],
        user: [],
      },
      slashCommand: true,
      options: [
        {
          name: "playlist",
          description: "The playlist you want to delete",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    });
  }
  async run(client, ctx, args) {
    const playlist = args.join(" ").replace(/\s/g, "");
    const playlistExists = await client.db.getPLaylist(ctx.author.id, playlist);
    if (!playlistExists)
      return await ctx.sendMessage({
        embeds: [
          {
            description: "That playlist doesn't exist",
            color: client.color.red,
          },
        ],
      });
    client.db.deletePlaylist(ctx.author.id, playlist);
    return await ctx.sendMessage({
      embeds: [
        {
          description: `Deleted playlist **${playlist}**`,
          color: client.color.main,
        },
      ],
    });
  }
};
