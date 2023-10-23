const { PrismaClient } = require('@prisma/client');

class ServerData {
    static async get(guildId) {
        let data = await this.prisma.guild.findFirst({
            where: {
                guildId: guildId,
            },
        });
        if (!data) {
            data = await this.prisma.guild.create({
                data: {
                    guildId: guildId,
                },
            });
        }
        return data;
    }

    static async getPrefix(guildId) {
        let data = await this.get(guildId);
        return data.prefix;
    }

    static async setPrefix(guildId, prefix) {
        let data = await this.get(guildId);
        if (!data) {
            await this.prisma.guild.create({
                data: {
                    guildId: guildId,
                    prefix: prefix,
                },
            });
        } else {
            await this.prisma.guild.update({
                where: {
                    guildId: guildId,
                },
                data: {
                    prefix: prefix,
                },
            });
        }
        return data;
    }

    static async set_247(guildId, textId, voiceId) {
        let data = await this.prisma.stay.findFirst({
            where: {
                guildId: guildId,
            },
        });
        if (!data) {
            await this.prisma.stay.create({
                data: {
                    guildId: guildId,
                    textId: textId,
                    voiceId: voiceId,
                },
            });
        } else {
            await this.prisma.stay.update({
                where: {
                    guildId: guildId,
                },
                data: {
                    textId: textId,
                    voiceId: voiceId,
                },
            });
        }
    }

    static async setDj(guildId, roleId) {
        let data = await this.prisma.dj.findFirst({
            where: {
                guildId: guildId,
            },
        });
        if (!data && roleId) {
            await this.prisma.dj.create({
                data: {
                    guildId: guildId,
                    mode: true,
                    roles: {
                        create: {
                            roleId: roleId,
                        },
                    },
                },
            });
        } else if (data && roleId) {
            await this.prisma.dj.update({
                where: {
                    guildId: guildId,
                },
                data: {
                    mode: true,
                    roles: {
                        create: {
                            roleId: roleId,
                        },
                    },
                },
            });
        } else if (data && !roleId) {
            await this.prisma.roles.deleteMany({
                where: { guildId: guildId },
            });
            await this.prisma.dj.update({
                where: {
                    guildId: guildId,
                },
                data: {
                    mode: false,
                },
            });
        }
    }
}

ServerData.prisma = new PrismaClient();
module.exports = ServerData;
