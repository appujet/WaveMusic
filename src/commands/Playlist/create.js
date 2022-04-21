const { MessageEmbed } = require('discord.js');
const db = require('../../schema/playlist');

module.exports = {
  name: 'create',
  aliases: ['plcreate'],
  category: 'Playlist',
  description: "Creates the user's playlist.",
  args: true,
  usage: '<playlist name>',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const Name = args[0];
    if (Name.length > 10) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription('Playlist Name Cant Be Greater Than `10` Charecters'),
        ],
      });
    }
    let data = await db.find({
      UserId: message.author.id,
      PlaylistName: Name,
    });

    if (data.length > 0) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(
              `This playlist already Exists! delete it using: \`${prefix}\`delete \`${Name}\``,
            ),
        ],
      });
    }
    let userData = db.find({
      UserId: message.author.id,
    });
    if (userData.length >= 10) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`You Can Only Create \`10\` Playlist`),
        ],
      });
    }

    const newData = new db({
      UserName: message.author.tag,
      UserId: message.author.id,
      PlaylistName: Name,
      CreatedOn: Math.round(Date.now() / 1000),
    });
    await newData.save();
    const embed = new MessageEmbed()
      .setDescription(`Successfully created a playlist for you **${Name}**`)
      .setColor(client.embedColor);
    return message.channel.send({ embeds: [embed] });
  },
};
