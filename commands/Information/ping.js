const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ['p'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        //message.channel.send(`${client.ws.ping} ws ping`);
        const embed = new MessageEmbed()
            .setTitle(`Ping: ${client.ws.ping}`)
            .setColor("DARK_VIVID_PINK")

        return message.channel.send({
            embeds: [embed]
        })

    },
};