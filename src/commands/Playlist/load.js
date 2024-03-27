const { ApplicationCommandOptionType } = require("discord.js");

const Command = require("../../structures/Command.js");

module.exports = class Load extends Command {
  constructor(client) {
    super(client, {
      name: "load",
      description: {
        content: "Loads a playlist",
        examples: ["load <playlist>"],
        usage: "load <playlist>",
      },
      category: "playlist",
      aliases: [],
      cooldown: 3,
      args: true,
      player: {
        voice: true,
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
          description: "The playlist you want to load",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    });
  }
  async run(client, ctx, args) {
    let player = client.queue.get(ctx.guild.id);
    const playlist = args.join(" ").replace(/\s/g, "");
    const playlistData = await client.db.getPLaylist(ctx.author.id, playlist);
    if (!playlistData)
      return await ctx.sendMessage({
        embeds: [
          {
            description: "That playlist doesn't exist",
            color: client.color.red,
          },
        ],
      });
    for await (const song of JSON.parse(playlistData.songs).map((s) => s)) {
      const vc = ctx.member;
      if (!player)
        player = await client.queue.create(
          ctx.guild,
          vc.voice.channel,
          ctx.channel,
          client.shoukaku.options.nodeResolver(client.shoukaku.nodes)
        );
      const track = player.buildTrack(song, ctx.author);
      player.queue.push(track);
      player.isPlaying();
    }
    return await ctx.sendMessage({
      embeds: [
        {
          description: `Loaded \`${playlistData.name}\` with \`${
            JSON.parse(playlistData.songs).length
          }\` songs`,
          color: client.color.main,
        },
      ],
    });
  }
};
