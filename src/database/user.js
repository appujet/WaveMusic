const { PrismaClient } = require('@prisma/client');

class UserData {
    static async get(discordId) {
        let data = await this.prisma.user.findFirst({
            where: {
                userId: discordId,
            },
        });
        if (!data) {
            data = await this.prisma.user.create({
                data: {
                    userId: discordId,
                },
            });
        }
        return data;
    }

    static async update(discordId, data) {
        let user = await this.get(discordId);
        user = await this.prisma.user.update({
            where: {
                userId: discordId,
            },
            data: data,
        });
        return user;
    }
}

UserData.prisma = new PrismaClient();
module.exports = UserData;
