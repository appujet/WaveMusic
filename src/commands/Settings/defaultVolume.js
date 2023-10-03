const db = require("../../schema/volume");

module.exports = {
    name: "defaultvolume",
    category: 'Settings',
    description: "Set default volume for the Player",
    args: true,
    usage: "10 | 20 | 69",
    aliases: ["defvol", "defaultvol", "dv"],
    userPrams: ['MANAGE_GUILD'],
    botPrams: ['EMBED_LINKS'],
    owner: false,
    execute: async (message, args, client, prefix) => {

        const data = await db.findOne({ Guild: message.guild.id });
        const player = client.manager.players.get(message.guild.id);
        const hehe = (Number(args[0]));
        const wow = Math.round(hehe);

        if (!wow || wow < 1 || wow > 100) {
            return message.reply({
                content: "Enter Volume Level Between **1** and **100**"
            }).then(msg => { setTimeout(() => { msg.delete() }, 6000) }).catch(() => { });
        }

        if(data) {
            if (player){
                await player.setVolume(wow);
            }
            data.volLevel = wow;
            await data.save();
            return message.reply({
                content: `Default Player Volume Updated to ${wow}`
            }).then(msg => { setTimeout(() => { msg.delete() }, 6000) }).catch(() => { });

        } else {
            if (player){
                await player.setVolume(wow);
            }

            const newData = new db({
                Guild: message.guild.id,
                volLevel: wow
            })
            await newData.save();
            return message.reply({
                content: `Default Player Volume set to ${wow} for this Server`
            }).then(msg => { setTimeout(() => { msg.delete() }, 6000) }).catch(() => { });

        }

    }

}
    