const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js')

const {
    stripIndent
} = require("common-tags");


module.exports = {
    name: 'nuke',
    description: 'nukes a channel',

    run: async (client, message, args) => {

        const test = stripIndent `

        Missing Permissions     :: MANAGE_MESSAGES

        `

        const reas = new MessageEmbed()
            .setTimestamp()
            .setThumbnail(message.member.user.displayAvatarURL({
                dynamic: true,
                size: 512
            })) 
            .setTimestamp()
            .setFooter({
                text: message.author.tag,
                iconURL: message.member.user.displayAvatarURL()
            })
            .setDescription(`\`\`\`css\n${test}\`\`\``)
            .setColor(0xff6464)

        const rea = new MessageEmbed()
            .setDescription(`This channel cannot be nuked!.`)
            .setColor(0xff6464)


        if (!message.member.permissions.has('MANAGE_MESSAGES'))
            return message.channel.send({
                embeds: [reas]
            })

        let reason = args.join(" ") || "No Reason"
        if (!message.channel.deletable) {
            return message.reply({
                embeds: [rea]
            })
        }


        let a = new MessageButton()
            .setCustomId('accept')
            .setStyle('SUCCESS')
            .setEmoji('<:tick:913042728542150667>')

        let b = new MessageButton()
            .setCustomId('decline')
            .setStyle('DANGER')
            .setEmoji('<:wrong:918906350111703090>')

        let row = new MessageActionRow().addComponents(a, b)
        const collector = message.channel.createMessageComponentCollector({
            componentType: 'BUTTON',
            time: 30000
        })
        const mssg = await message.channel.send({
            embeds: [
                new MessageEmbed()
                .setDescription(`**Are You Sure U Want To Nuke This Channel?** \n **All Message Data Will Be Lost If Nuked** \n\n <:check:1014693534957326458> To Confirm | ❌ To Cancel`)
                .setColor(0xff6464)
            ],
            components: [row]
        })

        collector.on('collect', async (m) => {
            if (m.customId === 'accept') {

                let newchannel = await message.channel.clone()
                await message.channel.delete()

                return newchannel.send({
                    embeds: [
                        new MessageEmbed()
                        .setTitle("Channel Nuked")
                        .setDescription(reason)
                        .setColor(0xff6464)
                        .setImage('https://c.tenor.com/Rl84jpphg7IAAAAC/explosion-space.gif')
                    ]
                }).then(async (msg) => setTimeout(() => msg.delete(), 10000))
            }

            if (m.customId === 'decline') {
                message.react("✅")
                collector.stop('success')

                return message.channel.send({
                    embeds: [
                        new MessageEmbed()
                        .setDescription(`❌ | The Process Has Been Cancelled`)
                        .setColor(0xff6464)
                    ]
                }).then(async (msg) => setTimeout(() => msg.delete(), 10000))
            }
        })
    }
}