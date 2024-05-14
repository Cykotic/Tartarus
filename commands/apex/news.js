const {
    MessageEmbed
} = require("discord.js");
const fetch = require("node-fetch")

const {
    apikeytest
} = require("../../config.json")

module.exports = {
    name: "test",
    aliases: ['news'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const x = await fetch(`curl "https://api.mozambiquehe.re/news?auth=${apikeytest}"`, {
            method: "POST",
            body: JSON.stringify(),
            headers: {
                'Content-Type': 'application/json'
            }

        })

        const data = await x.json();

        console.log(data)


    },
};