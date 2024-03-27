const Database = require("better-sqlite3");
const config = require("../config.js");
const db = new Database("./WaveMusic.db", {
  fileMustExist: false,
  readonly: false,
});
db.pragma("journal_mode=WAL");
module.exports = class ServerData {
  constructor() {
    this.intialize();
  }
  intialize() {
    db.prepare(
      "CREATE TABLE IF NOT EXISTS guild (guildId TEXT PRIMARY KEY, prefix TEXT)"
    ).run();
    db.prepare(
      "CREATE TABLE IF NOT EXISTS stay (guildId TEXT PRIMARY KEY, textId TEXT, voiceId TEXT)"
    ).run();
    db.prepare(
      "CREATE TABLE IF NOT EXISTS dj (guildId TEXT PRIMARY KEY, mode BOOLEAN)"
    ).run();
    db.prepare(
      "CREATE TABLE IF NOT EXISTS roles (guildId TEXT, roleId TEXT)"
    ).run();
    db.prepare(
      "CREATE TABLE IF NOT EXISTS playlist (userId TEXT, name TEXT, songs TEXT)"
    ).run();
    db.prepare(
      "CREATE TABLE IF NOT EXISTS botchannel (guildId TEXT PRIMARY KEY, textId TEXT)"
    ).run();
    db.prepare(
      "CREATE TABLE IF NOT EXISTS setup (guildId TEXT PRIMARY KEY, textId TEXT, messageId TEXT)"
    ).run();
    db.prepare(
      "CREATE TABLE IF NOT EXISTS premium (userId TEXT PRIMARY KEY, guildId TEXT)"
    ).run();
  }
  get(guildId) {
    let data = db.prepare("SELECT * FROM guild WHERE guildId = ?").get(guildId);
    if (!data) {
      db.prepare("INSERT INTO guild (guildId) VALUES (?)").run(guildId);
      data = db.prepare("SELECT * FROM guild WHERE guildId = ?").get(guildId);
    }
    return data;
  }
  setPrefix(guildId, prefix) {
    const data = db
      .prepare("SELECT * FROM guild WHERE guildId = ?")
      .get(guildId);
    if (!data) {
      db.prepare("INSERT INTO guild (guildId, prefix) VALUES (?, ?)").run(
        guildId,
        prefix
      );
    } else {
      db.prepare("UPDATE guild SET prefix = ? WHERE guildId = ?").run(
        prefix,
        guildId
      );
    }
  }
  set_247(guildId, textId, voiceId) {
    let data = db.prepare("SELECT * FROM stay WHERE guildId = ?").get(guildId);
    if (!data) {
      db.prepare(
        "INSERT INTO stay (guildId, textId, voiceId) VALUES (?, ?, ?)"
      ).run(guildId, textId, voiceId);
    } else {
      db.prepare(
        "UPDATE stay SET textId = ?, voiceId = ? WHERE guildId = ?"
      ).run(textId, voiceId, guildId);
    }
  }
  delete_247(guildId) {
    const data = db
      .prepare("SELECT * FROM stay WHERE guildId = ?")
      .get(guildId);
    if (!data) return;
    db.prepare("DELETE FROM stay WHERE guildId = ?").run(guildId);
  }
  setDj(guildId, mode) {
    const modeNum = mode ? 1 : 0;
    let data = db.prepare("SELECT * FROM dj WHERE guildId = ?").get(guildId);
    if (!data) {
      db.prepare("INSERT INTO dj (guildId, mode) VALUES (?, ?)").run(
        guildId,
        modeNum
      );
    } else {
      db.prepare("UPDATE dj SET mode = ? WHERE guildId = ?").run(
        modeNum,
        guildId
      );
    }
  }
  getPrefix(guildId) {
    const data = db
      .prepare("SELECT * FROM guild WHERE guildId = ?")
      .get(guildId);
    if (!data) {
      db.prepare("INSERT INTO guild (guildId, prefix) VALUES (?, ?)").run(
        guildId,
        config.prefix
      );
      return {
        prefix: config.prefix,
      };
    } else {
      return data;
    }
  }
  get_247(guildId) {
    if (guildId) {
      const data = db
        .prepare("SELECT * FROM stay WHERE guildId = ?")
        .get(guildId);
      if (!data) {
        db.prepare("INSERT INTO stay (guildId) VALUES (?)").run(guildId);
        return false;
      } else {
        return data;
      }
    } else {
      const data = db.prepare("SELECT * FROM stay").all();
      if (!data) {
        return false;
      } else {
        return data;
      }
    }
  }
  getDj(guildId) {
    const data = db.prepare("SELECT * FROM dj WHERE guildId = ?").get(guildId);
    if (!data) {
      db.prepare("INSERT INTO dj (guildId) VALUES (?)").run(guildId);
      return false;
    } else {
      return data;
    }
  }
  getRoles(guildId) {
    const data = db
      .prepare("SELECT * FROM roles WHERE guildId = ?")
      .all(guildId);
    if (!data) {
      return false;
    } else {
      return data;
    }
  }
  addRole(guildId, roleId) {
    const data = db
      .prepare("SELECT * FROM roles WHERE guildId = ? AND roleId = ?")
      .get(guildId, roleId);
    if (!data) {
      db.prepare("INSERT INTO roles (guildId, roleId) VALUES (?, ?)").run(
        guildId,
        roleId
      );
    }
  }
  removeRole(guildId, roleId) {
    const data = db
      .prepare("SELECT * FROM roles WHERE guildId = ? AND roleId = ?")
      .get(guildId, roleId);
    if (data) {
      db.prepare("DELETE FROM roles WHERE guildId = ? AND roleId = ?").run(
        guildId,
        roleId
      );
    }
  }
  clearRoles(guildId) {
    const data = db
      .prepare("SELECT * FROM roles WHERE guildId = ?")
      .all(guildId);
    if (data) {
      db.prepare("DELETE FROM roles WHERE guildId = ?").run(guildId);
    }
  }
  getBotChannel(guildId) {
    const data = db
      .prepare("SELECT * FROM botchannel WHERE guildId = ?")
      .get(guildId);
    if (!data) {
      db.prepare("INSERT INTO botchannel (guildId) VALUES (?)").run(guildId);
      return false;
    } else {
      return data;
    }
  }
  setBotChannel(guildId, textId) {
    let data = db
      .prepare("SELECT * FROM botchannel WHERE guildId = ?")
      .get(guildId);
    if (!data) {
      db.prepare("INSERT INTO botchannel (guildId, textId) VALUES (?, ?)").run(
        guildId,
        textId
      );
    } else {
      db.prepare("UPDATE botchannel SET textId = ? WHERE guildId = ?").run(
        textId,
        guildId
      );
    }
  }
  getSetup(guildId) {
    const data = db
      .prepare("SELECT * FROM setup WHERE guildId = ?")
      .get(guildId);
    if (!data) {
      db.prepare("INSERT INTO setup (guildId) VALUES (?)").run(guildId);
      return false;
    } else {
      return data;
    }
  }
  setSetup(guildId, textId, messageId) {
    let data = db.prepare("SELECT * FROM setup WHERE guildId = ?").get(guildId);
    if (!data) {
      db.prepare(
        "INSERT INTO setup (guildId, textId, messageId) VALUES (?, ?, ?)"
      ).run(guildId, textId, messageId);
    } else {
      db.prepare(
        "UPDATE setup SET textId = ?, messageId = ? WHERE guildId = ?"
      ).run(textId, messageId, guildId);
    }
  }
  deleteSetup(guildId) {
    const data = db
      .prepare("SELECT * FROM setup WHERE guildId = ?")
      .get(guildId);
    if (!data) return;
    db.prepare("DELETE FROM setup WHERE guildId = ?").run(guildId);
  }
  getUser(userId) {
    const data = db.prepare("SELECT * FROM user WHERE userId = ?").get(userId);
    if (!data) {
      db.prepare("INSERT INTO user (userId) VALUES (?)").run(userId);
      return false;
    } else {
      return data;
    }
  }
  getPLaylist(userId, name) {
    const data = db
      .prepare("SELECT * FROM playlist WHERE userId = ? AND name = ?")
      .get(userId, name);
    if (!data) {
      return false;
    } else {
      return data;
    }
  }
  createPlaylist(userId, name) {
    const data = db
      .prepare("SELECT * FROM playlist WHERE userId = ? AND name = ?")
      .get(userId, name);
    if (!data) {
      db.prepare("INSERT INTO playlist (userId, name) VALUES (?, ?)").run(
        userId,
        name
      );
    } else {
      throw new Error("Playlist already exists");
    }
  }
  deletePlaylist(userId, name) {
    const data = db
      .prepare("SELECT * FROM playlist WHERE userId = ? AND name = ?")
      .get(userId, name);
    if (data) {
      db.prepare("DELETE FROM playlist WHERE userId = ? AND name = ?").run(
        userId,
        name
      );
    } else {
      throw new Error("Playlist does not exist");
    }
  }
  addSong(userId, name, song) {
    const data = db
      .prepare("SELECT * FROM playlist WHERE userId = ? AND name = ?")
      .get(userId, name);
    if (data) {
      const existingSongs = JSON.parse(data.songs || "[]");
      const updatedSongs = existingSongs.concat(song);
      db.prepare(
        "UPDATE playlist SET songs = ? WHERE userId = ? AND name = ?"
      ).run(JSON.stringify(updatedSongs), userId, name);
    } else {
      throw new Error("Playlist does not exist");
    }
  }
  removeSong(userId, name, song) {
    const data = db
      .prepare("SELECT * FROM playlist WHERE userId = ? AND name = ?")
      .get(userId, name);
    if (data) {
      db.prepare(
        "UPDATE playlist SET songs = ? WHERE userId = ? AND name = ?"
      ).run(JSON.stringify(data.songs.filter((s) => s !== song)), userId, name);
    } else {
      throw new Error("Playlist does not exist");
    }
  }
};
//# sourceMappingURL=server.js.map
