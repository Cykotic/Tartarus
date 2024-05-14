const { Client, CommandInteraction, MessageEmbed, MessageAttachment } = require("discord.js");
const fetch = require("node-fetch");


module.exports = {
    name: "screenshot",
    description: "Take's screenshot from the site you send",
    type: 'CHAT_INPUT',
    ephemeral: true,
    UserPerms: [],
    BotPerms: [],
    OwnerOnly: false,
    options: [
        {
            name: 'url',
            description: 'The url you want to take screenshot from',
            required: true,
            type: `STRING`
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let url = interaction.options.getString('url')

        try {
            if (url.length < 8)
            return interaction.followUp(`"https is too short to reach - 8 limit"`)

            const site = /^(https?:\/\/)/i.test(url) ? url : `http://${url}`

            const { body } = await fetch(`https://image.thum.io/get/width/1950/crop/700/noanimate/${site}`)


            interaction.followUp({
                embeds: [
                    new MessageEmbed()
                    .setDescription(`Screenshotted!, [LINK](${site})`)
                    .setColor(0xff6464)
                    .setImage(`attachment://screenshot.png`)
                ],
                files: [ body ]
            })
        } catch(err) {
            interaction.followUp(`Error: ${err}`)
        }
    },
};
