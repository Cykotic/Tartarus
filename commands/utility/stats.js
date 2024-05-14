const {
    MessageEmbed
} = require("discord.js");

const {
    stripIndent
} = require("common-tags");

module.exports = {
    name: "info",
    aliases: ['s'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const test = stripIndent `

        Server Location     :: Germany

        `

        return message.channel.send({
            embeds: [
                new MessageEmbed()
                .setColor(0xff6464)
                .addField(`testing`, `\`\`\`css\n${test}\`\`\``, true)
            ]
        })


    },
};