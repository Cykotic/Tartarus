const {
    MessageButton,
    MessageEmbed,
    MessageActionRow
} = require("discord.js");

module.exports = {
    name: "avatar",
    aliases: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const taggedUser = message.mentions.users.first() || message.author
        if (!taggedUser)
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                    .setColor(0xff6464)
                    .setDescription("Please mention a user")
                ]
            }).then(async (msg) => setTimeout(() => msg.delete(), 10000))

        const buttons = new MessageActionRow().addComponents(
                new MessageButton()
                .setLabel(".gif")
                .setStyle("LINK")
                .setURL(taggedUser.displayAvatarURL({
                    dynamic: true,
                    size: 2048,
                    format: "gif"
                }))
            )
            .addComponents(
                new MessageButton()
                .setLabel(".jpeg")
                .setStyle("LINK")
                .setURL(taggedUser.displayAvatarURL({
                    dynamic: true,
                    size: 2048,
                    format: "jpeg"
                }))
            )
            .addComponents(
                new MessageButton()
                .setLabel(".jpg")
                .setStyle("LINK")
                .setURL(taggedUser.displayAvatarURL({
                    dynamic: true,
                    size: 2048,
                    format: "jpg"
                }))
            )
            .addComponents(
                new MessageButton()
                .setLabel(".png")
                .setStyle("LINK")
                .setURL(taggedUser.displayAvatarURL({
                    dynamic: true,
                    size: 2048,
                    format: "png"
                }))
            )
            .addComponents(
                new MessageButton()
                .setLabel(".webp")
                .setStyle("LINK")
                .setURL(taggedUser.displayAvatarURL({
                    dynamic: true,
                    size: 2048,
                    format: "webp"
                }))
            )

        embed = new MessageEmbed()
            .setColor(0xff6464)
            .setTitle(`${taggedUser.username}'s Avatar`)
            .setImage(taggedUser.displayAvatarURL({
                dynamic: true,
                size: 2048
            }))
        message.channel.send({
            embeds: [embed],
            components: [buttons]
        })

    },
};