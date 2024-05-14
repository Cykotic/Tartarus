const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "gleave",
    aliases: ['gleave'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const test = args.join(" ")
        if (test) return message.channel.send({
            embeds: [
                new MessageEmbed()
                .setColor(0xff6464)
                .setDescription("PLEASE ENTER A VALID ID")
            ]
        }).then(async (msg) => setTimeout(() => msg.delete(), 10000))


        guild = client.guilds.cache.find(val => val.id === args.join(' '))
        guild.leave();
        let guildname = guild.name

        return message.channel.send({
            embeds: [
                new MessageEmbed()
                .setColor(0xff6464)
                .setDescription(`✅ Successfully Left ${guildname}!`)
            ]
        }).then(async (msg) => setTimeout(() => msg.delete(), 10000))

    },
};