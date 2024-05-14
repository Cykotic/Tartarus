const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "fetchinvite",
    aliases: ['fetchinvite'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const guild = client.guilds.cache.find(g => g.name === args.join(' ')) || client.guilds.cache.get(args[0]);
        if (!guild) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                    .setColor(0xff6464)
                    .setDescription('Please give meh a valid guild name')
                ]
            })
        }
        try {
            const tChannel = guild.channels.cache.find(ch => ch.type == 'GUILD_TEXT' && ch.permissionsFor(ch.guild.me).has('CREATE_INSTANT_INVITE'));
            if (!tChannel) {
                return message.channel.send({
                    embeds: [
                        new MessageEmbed()
                        .setColor(0xff6464)
                        .setDescription("There isn't any text channel, so i can't make the invite")
                    ]
                })
            }
            const invite = await tChannel.createInvite({
                maxAge: 10 * 60 * 1000, // maximum time for the invite, in milliseconds
                maxUses: 1 // maximum times it can be used
            });
            message.channel.send(`${guild.name} | ${inv.url}`);
        } catch (err) {
            console.log(err)
        }

        /* LOOPS ALL THE SERVERS THE BOT IN, AND GETS THE CODE FOR THE SERVER INVITE */
        // client.guilds.cache.forEach((guild) => {
        //     let channels = guild.channels.cache.filter(C => C.type === 'GUILD_TEXT');
        //     guild.invites.create(channels.first().id).then(invite => console.log(invite.code))});
    },
};