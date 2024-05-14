const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "purgeuser",
    aliases: ['puser'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let amout = args[1]
        if (!member) return message.channel.send({
            embeds: [
                new MessageEmbed()
                .setColor(0xff6464)
                .setDescription("Please mention a user or id")
            ]
        })
        if (!amout) return message.channel.send({
            embeds: [
                new MessageEmbed()
                .setColor(0xff6464)
                .setDescription("please provide an amount")
            ]
        })
        if (isNaN(amout)) return message.channel.send({
            embeds: [
                new MessageEmbed()
                .setColor(0xff6464)
                .setDescription("Please provided a valid amount to be deleted!")
            ]
        })
        if (amout > 99) return message.channel.send({
            embeds: [
                new MessageEmbed()
                .setColor(0xff6464)
                .setDescription("99 messages is the limted")
            ]
        })

        let AllMessage = await message.channel.messages.fetch()
        let FiliterdMessages = await AllMessage.filter(x => x.author.id === member.id)
        let deleteMessages = 0
        FiliterdMessages.forEach(msg => {
            if (deleteMessages >= amout) return
            msg.delete()
            deleteMessages++
        });

    },
};