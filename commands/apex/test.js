const {
    MessageEmbed
} = require("discord.js");
const fetch = require("node-fetch")

const {
    apikeytest
} = require("../../config.json")

module.exports = {
    name: "rotation",
    aliases: ['rr'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const x = await fetch(`https://api.mozambiquehe.re/maprotation?auth=${apikeytest}`, {
            method: "POST",
            body: JSON.stringify(),
            headers: {
                'Content-Type': 'application/json'
            }

        })

        const data = await x.json();

        //console.log(data)
        const embed = new MessageEmbed()
            .setTitle(`Map: ${data.current.map}`)
            .setImage(data.current.asset)
            .addField("CURRECT MAP ROATION:", `
        > **➥ remainingTimer:** ${data.current.remainingTimer},

            `)
            .addField("NEXT MAP ROATION:", `
            > **➥ Next map:** ${data.next.map},
            > **➥ DurationInSecs:** ${data.next.DurationInSecs},
            > **➥ DurationInMinutes:** ${data.next.DurationInMinutes},
    
                `)
            .setColor("DARK_VIVID_PINK")


        return message.channel.send({
            embeds: [embed]
        })
    },
};