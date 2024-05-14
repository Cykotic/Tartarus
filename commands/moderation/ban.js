const {
    Permissions
} = require("discord.js");
const {
    prefix
} = require("../../config.json");

module.exports = {
    name: "ban",
    usages: "<PREFIX>ban <@user> [reason]\n<PREFIX>ban <userID> [reason]",
    required: true,

    run: async (client, message, args) => {
        try {
            const server = message.guild;
            const color = 0xff6464;
            let reason = args.slice(1).join(" ") || "No reason given";

            const syntaxError = {
                title: "Syntax Error",
                fields: [{
                    name: "Usages:",
                    value: `${prefix}ban <@user> [reason]\n${prefix}ban <userID> [reason]`,
                }, ],
                color: color,
            };
            if (
                !message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS) &&
                !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
            )
                return message.reply({
                    content: "You don't have permission to run this command!",
                });
            if (
                !message.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS) &&
                !message.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
            )
                return message.reply({
                    content: "I don't have permission to do that!",
                });
            if (!args[0])
                return message.reply({
                    embeds: [syntaxError],
                });
            if (
                args[0].startsWith("<@") &&
                args[0].endsWith(">") &&
                args[0].length == 21 &&
                !isNaN(args[0].slice(2, 20))
            ) {
                return banUser(args[0].slice(2, 20));
            }

            if (
                args[0].startsWith("<@!") &&
                args[0].endsWith(">") &&
                args[0].length == 22 &&
                !isNaN(args[0].slice(3, 21))
            ) {
                return banUser(args[0].slice(3, 21));
            }
            if (!isNaN(args[0]) && args[0].length == 18) {
                return banUser(args[0]);
            }
            return message.reply({
                embeds: [syntaxError],
            });

            function banUser(id) {
                client.users
                    .fetch(id)
                    .then(async (user) => {
                        const channelEmbed = {
                            title: `${user.tag}  (${id}) has been banned!`,
                            description: `Reason: ${reason} \nModerator: ${message.author.tag}  (${message.author.id})`,
                            timestamp: new Date(),
                            color: color,
                            timestamp
                        };
                        // const dmEmbed = {
                        //     title: `You were banned from **${server.name}!**`,
                        //     description: `Reason: ${reason} \nModerator: ${message.author.tag}  (${message.author.id})`,
                        //     timestamp: new Date(),
                        //     color: color,
                        // };

                        if (id == message.guild.me.id)
                            return message.reply({
                                content: "I can ban myself!",
                            });
                        if (id == message.author.id)
                            return message.reply({
                                content: "You can't ban yourself!",
                            });
                        if (id == server.ownerId)
                            return message.reply({
                                content: "The guild owner can't be banned!",
                            });

                        const guildUser = message.guild.members.cache.get(id);
                        if (guildUser) {
                            if (
                                message.author.id != server.ownerId &&
                                guildUser.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
                            )
                                return message.reply({
                                    content: "You can't ban an Administrator!",
                                });

                            if (
                                message.author.id != server.ownerId &&
                                guildUser.roles.highest.position >
                                message.member.roles.highest.position
                            )
                                return message.reply({
                                    content: "You can't ban someone that has a higher role than yours!",
                                });
                            if (
                                message.author.id != server.ownerId &&
                                guildUser.roles.highest.position ==
                                message.member.roles.highest.position
                            )
                                return message.reply({
                                    content: "You can't ban someone that has your same higher role!",
                                });
                            if (
                                server.me.roles.highest.position <
                                guildUser.roles.highest.position
                            )
                                return message.reply({
                                    content: "I can't ban someone that has a higher role than mine!",
                                });
                            if (
                                server.me.roles.highest.position ==
                                guildUser.roles.highest.position
                            )
                                return message.reply({
                                    content: "I can't ban someone that has mine same higher role!",
                                });
                        }
                        if (!user.bot) {
                            user
                            // .send({
                            //     embeds: [dmEmbed],
                            // })
                            // .catch((err) => {
                            //     console.log(err);
                            // });
                        }
                        message.guild.members.ban(id, {
                            reason: reason,
                        });
                        return message.channel.send({
                            embeds: [channelEmbed],
                        })
                    }).then(async (msg) => setTimeout(() => msg.delete(), 10000))
                    .catch((err) => {
                        console.log(err);
                        return message.reply({
                            content: "I couldn't find that user!",
                        });
                    });
            }
        } catch (err) {
            console.log(err);
        }
    },
};