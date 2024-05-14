const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "unbanall",
    aliases: ['uball'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        if (!message.member.permissions.has(`ADMINISTRATOR`)) {
            message.reply("You don't have the permissions to unban all");
            return;
        }

        message.guild.bans.fetch().then((bans) => {
            if (bans.size == 0) {
                return message.channel.send({
                    embeds: [
                        new MessageEmbed()
                        .setColor(0xff6464)
                        .setDescription("There are no banned users!")
                    ]
                }).then(async (msg) => setTimeout(() => msg.delete(), 10000))
            } else {
                bans.forEach((ban) => {
                    message.guild.members.unban(ban.user.id);
                    return message.channel.send({
                        embeds: [
                            new MessageEmbed()
                            .setColor(0xff6464)
                            .setDescription(` Successful Unbanned ${bans.map((m) => `**${m.user.username}**#**${m.user.discriminator}**`).join(", ")}`)
                            //${member.map((m) => `**<@${m.user.id}>**`).join(", ")} 
                            //.setDescription(`All Mentioned Users ✅ Successful Unbanned ${bans.map((m) => `**<@${m.user.id}>**`).join(", ")}`)
                            //.setDescription(`${ban.user.username}#${ban.user.discriminator} been unbanned!\n`)
                        ]
                    //console.log(`${ban.user.username}#${ban.user.discriminator}`) // discriminator
                    }).then(async (msg) => setTimeout(() => msg.delete(), 100000))
                })
            }
        })
    },
};