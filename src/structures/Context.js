const { ChatInputCommandInteraction, Message } = require('discord.js');

class Context {
    constructor(ctx, args) {
        this.channel = null;
        this.ctx = ctx;
        this.interaction = this.ctx instanceof ChatInputCommandInteraction ? this.ctx : null;
        this.message = this.ctx instanceof Message ? this.ctx : null;
        this.channel = this.ctx.channel;
        this.id = ctx.id;
        this.channelId = ctx.channelId;
        this.client = ctx.client;
        this.author = ctx instanceof Message ? ctx.author : ctx.user;
        this.channel = ctx.channel;
        this.guild = ctx.guild;
        this.createdAt = ctx.createdAt;
        this.createdTimestamp = ctx.createdTimestamp;
        this.member = ctx.member;
        this.setArgs(args);
    }

    get isInteraction() {
        return this.ctx instanceof ChatInputCommandInteraction;
    }

    setArgs(args) {
        if (this.isInteraction) {
            this.args = args.map((arg) => arg.value);
        } else {
            this.args = args;
        }
    }

    async sendMessage(content) {
        if (this.isInteraction) {
            this.msg = await this.interaction.reply(content);
            return this.msg;
        } else {
            this.msg = await this.message.channel.send(content);
            return this.msg;
        }
    }

    async editMessage(content) {
        if (this.isInteraction) {
            if (this.msg) this.msg = await this.interaction.editReply(content);
            return this.msg;
        } else {
            if (this.msg) this.msg = await this.msg.edit(content);
            return this.msg;
        }
    }

    async sendDeferMessage(content) {
        if (this.isInteraction) {
            this.msg = await this.interaction.deferReply({ fetchReply: true });
            return this.msg;
        } else {
            this.msg = await this.message.channel.send(content);
            return this.msg;
        }
    }

    async sendFollowUp(content) {
        if (this.isInteraction) {
            await this.interaction.followUp(content);
        } else {
            this.msg = await this.message.channel.send(content);
        }
    }

    get deferred() {
        if (this.isInteraction) {
            return this.interaction.deferred;
        }
        if (this.msg) return true;
        return false;
    }
}

module.exports = Context;
