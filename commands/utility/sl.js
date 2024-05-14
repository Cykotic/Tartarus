const {
    MessageEmbed,
} = require("discord.js");

module.exports = {
    name: "sl",
    aliases: ['sl'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        let sl = ''
        client.guilds.cache.forEach((g) => {
            sl = sl.concat('> \`' + "ID: ", g.id + `\` **|** \`` + g.name + `\` **|** \`` + g.members.cache.size + '\`') + "\n" || 'None'
        })

        return message.channel.send({
            embeds: [
                new MessageEmbed()
                .setColor(0xff6464)
                .addField("SERVER INFORMATION:", `${sl}`)
                .setThumbnail(client.user.displayAvatarURL())
                .setTimestamp()
                .setFooter({
                    text: message.author.tag,
                    iconURL: message.member.user.displayAvatarURL()
                })
            ]
        })
    },
};