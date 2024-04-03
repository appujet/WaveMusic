<center><img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=WaveMusic&fontSize=80&fontAlignY=35&animation=twinkling&fontColor=gradient" /></center>

[![Version][version-shield]](version-url)
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/brblacky/WaveMusic">
    <img src="https://media.discordapp.net/attachments/963097935820750878/963098304483328030/20220411_160253.png" alt="moebot" width="200" height="200">
  </a>

  <h3 align="center">WaveMusic</h3>

  <p align="center">
    WaveMusic is  a powerful music Bot
    <br />
    <br />
    <a href="https://github.com/brblacky/WaveMusic/issues">Report Bug & Request Feature</a>
  </p>
</p>
<!-- ABOUT THE PROJECT -->

## 🔥 Unique Features

- Developed Discord.js v14
- Advanced Music System
- Customizable Prefix
- Powerful Search Engine
- 12 + Music Filters
- Hybrid Command Handling (Slash and Normal Commands)
- Highly Configurable
- User-friendly and Easy to Use
- 24/7 Music Playback
- Playlist commands
- Setup music channel

## 🎶 Support Sources

🔍 **Default Sources**:

-   ![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=plastic&logo=youtube&logoColor=white)
-   ![SoundCloud](https://img.shields.io/badge/SoundCloud-FF3300?style=plastic&logo=soundcloud&logoColor=white)
-   ![Twitch](https://img.shields.io/badge/Twitch-9146FF?style=plastic&logo=twitch&logoColor=white)
-   ![Bandcamp](https://img.shields.io/badge/Bandcamp-629AA9?style=plastic&logo=bandcamp&logoColor=white)
-   ![Vimeo](https://img.shields.io/badge/Vimeo-1AB7EA?style=plastic&logo=vimeo&logoColor=white)
-   ![http](https://img.shields.io/badge/http-FFA500?style=plastic&logo=http&logoColor=white)

🔌 **Plugin Sources**: `(Require: LavaLink v4.0.x)`

**Note: You need to install the plugins to use these sources**

-   ![Spotify](https://img.shields.io/badge/Spotify-1ED760?style=plastic&logo=spotify&logoColor=white) ([Required Plugin][LavaSrc])
-   ![Deezer](https://img.shields.io/badge/Deezer-FF0000?style=plastic&logo=deezer&logoColor=white) ([Required Plugin][LavaSrc])
-   ![Apple Music](https://img.shields.io/badge/Apple%20Music-000000?style=plastic&logo=apple-music&logoColor=white) ([Required Plugin][LavaSrc])
-   ![Yandex Music](https://img.shields.io/badge/Yandex%20Music-FF0066?style=plastic&logo=yandex-music&logoColor=white) ([Required Plugin][LavaSrc])
-   ![Mixcloud](https://img.shields.io/badge/Mixcloud-51C4D3?style=plastic&logo=mixcloud&logoColor=white) ([Required Plugin][skybot-lavalink-plugin])
-   ![Ocremix](https://img.shields.io/badge/Ocremix-FF6600?style=plastic&logo=ocremix&logoColor=white) ([Required Plugin][skybot-lavalink-plugin])
-   ![Clyp](https://img.shields.io/badge/Clyp-6BB5A6?style=plastic&logo=clyp&logoColor=white) ([Required Plugin][skybot-lavalink-plugin])
-   ![Reddit](https://img.shields.io/badge/Reddit-FF4500?style=plastic&logo=reddit&logoColor=white) ([Required Plugin][skybot-lavalink-plugin])
-   ![Getyarn](https://img.shields.io/badge/Getyarn-FF9000?style=plastic&logo=getyarn&logoColor=white) ([Required Plugin][skybot-lavalink-plugin])
-   ![TikTok](https://img.shields.io/badge/TikTok-FF2D55?style=plastic&logo=tiktok&logoColor=white) ([Required Plugin][skybot-lavalink-plugin])
-   ![Soundgasm](https://img.shields.io/badge/Soundgasm-F1672F?style=plastic&logo=soundgasm&logoColor=white) ([Required Plugin][skybot-lavalink-plugin])
-   ![Text To Speech](https://img.shields.io/badge/Text%20To%20Speech-3080ff?style=plastic&logo=google-translate&logoColor=white) ([Required Plugin][skybot-lavalink-plugin])

[LavaSrc]: https://github.com/TopiSenpai/LavaSrc
[skybot-lavalink-plugin]: https://github.com/DuncteBot/skybot-lavalink-plugin

### To set up a Lavalink server on Windows, Linux, or Replit, [Click Here.](https://github.com/LucasB25/lavalink-server)

### **Need Help with plugins?** Join our [Discord Server](https://discord.gg/YsJCtDuTXp) and ask for help in the `#support` channel.

## 🔧 Requirements

Before starting with the installation, you need to have the following:

- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) [v18.17.1 or higher](https://nodejs.org/en/download/)

- ![Lavalink](https://img.shields.io/badge/Lavalink-7289DA?style=for-the-badge&logo=discord&logoColor=white) [v4.0.0 or higher](https://github.com/freyacodes/Lavalink)

## 🚀 Installation from source

1. Clone the WaveMusic repository:

```bash
git clone https://github.com/brblacky/WaveMusic.git
```

2. change the directory to WaveMusic

```bash
cd WaveMusic
```

3. Install the required packages:

```bash
npm i
```

4. Set up your environment variables:

Create a `.env` file in the root directory of your project with the following variables:

```bash
TOKEN="." # Your bot token
PREFIX= "!" # Your prefix
OWNER_IDS=["959276033683628122","859640640640640640"] # Your discord id, you can add multiple ids
GUILD_ID= "859640640640640640" # Your server Id if you want to use the for single server
PRODUCTION="true" # true for production 
SEARCH_ENGINE= "ytsearch" # ytsearch, scsearch or ytmsearch
MAX_PLAYLIST_SIZE= "100" # Max playlist size
MAX_QUEUE_SIZE= "100" # Max queue size
BOT_STATUS= "online" # Your bot status
BOT_ACTIVITY= "Lavamusic" # Your bot activity
LAVALINK_URL="lavalink:2333" # Your lavalink url
LAVALINK_AUTH="youshallnotpass" # Your lavalink password
LAVALINK_NAME="Blacky" # Your lavalink name
LAVALINK_SECURE= "false" # true for secure lavalink
KEEP_ALIVE= "false" # true for keep alive in https://replit.com
LOG_CHANNEL_ID=""
BOT_ACTIVITY_TYPE=0 # Activity type is a number from 0 to 5 see more here https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-types
```

5. Run the bot:

```bash
npm start
```

## 📝 Configuration

- **Prefix**: The prefix for the bot commands
- **Owner ID**: The ID of the bot owner
- **Client ID**: The ID of the bot client
- **Guild ID**: The ID of the server where the bot will be used
- **Production**: Set to `true` for production
- **Search Engine**: The search engine to use for searching songs
- **Max Playlist Size**: The maximum size of a playlist
- **Max Queue Size**: The maximum size of the queue
- **Bot Status**: The status of the bot
- **Bot Activity**: The activity of the bot
- **Lavalink URL**: The URL of the Lavalink server
- **Lavalink Auth**: The password for the Lavalink server
- **Lavalink Name**: The name of the Lavalink server
- **Lavalink Secure**: Set to `true` for secure Lavalink
- **Bot Activity Type**: The type of activity for the bot
- **Keep Alive**: Set to `true` for keep alive for replit

###

WaveMusic is a discord music bot base in [Shoukaku](<https://github.com/Deivu/Shoukaku>)
If you liked this repository, feel free to leave a star ⭐ to help promote !

## 📜 Contributing

Thank you for your interest in contributing to Lavamusic! Here are some guidelines to follow when contributing:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Write clean and concise code that follows the established coding style.
3. Create detailed and thorough documentation for any new features or changes.
4. Write and run tests for your code.
5. Submit a pull request with your changes.

Your contribution will be reviewed by the project maintainers, and any necessary feedback or changes will be discussed with you. We appreciate your help in making Lavamusic better!

## 🔐 License

Distributed under the GPL-3.0 license. See ![LICENSE](https://img.shields.io/github/license/appujet/WaveMusic?style=social) for more information.

## ☕ Donate

Do you like this project? Support it by donating

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/H2H7LKT9L)
[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.me/sdip521)

## 👥 Contributors

Thanks goes to these wonderful people :

<a href="https://github.com/appujet/WaveMusic/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=appujet/WaveMusic" />
</a>

[version-shield]: https://img.shields.io/github/package-json/v/brblacky/WaveMusic?style=for-the-badge
[contributors-shield]: https://img.shields.io/github/contributors/brblacky/WaveMusic.svg?style=for-the-badge
[contributors-url]: https://github.com/brblacky/WaveMusic/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/brblacky/WaveMusic.svg?style=for-the-badge
[forks-url]: https://github.com/brblacky/WaveMusic/network/members
[stars-shield]: https://img.shields.io/github/stars/brblacky/WaveMusic.svg?style=for-the-badge
[stars-url]: https://github.com/brblacky/WaveMusic/stargazers
[issues-shield]: https://img.shields.io/github/issues/brblacky/WaveMusic.svg?style=for-the-badge
[issues-url]: https://github.com/brblacky/WaveMusic/issues
[license-shield]: https://img.shields.io/github/license/brblacky/WaveMusic.svg?style=for-the-badge
[license-url]: https://github.com/brblacky/WaveMusic/blob/master/LICENSE
