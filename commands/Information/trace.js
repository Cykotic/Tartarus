const {
    MessageEmbed
} = require("discord.js");
const axios = require("axios")

module.exports = {
    name: "trace",
    aliases: ['trace'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const image = message.attachments.size > 0 ? message.attachments.first().url : '';
        console.log(image)
        if (!image) return message.channel.send({
            embeds: [
                new MessageEmbed()
                .setDescription("no image provided")
                .setColor(0xff6464)
            ]
        }).then(async (msg) => setTimeout(() => msg.delete(), 10000))
        const traceDetails = await axios(
                `https://api.trace.moe/search?url=${encodeURIComponent(image)}`
            )
            .then((res) => res.data)
            .catch((err) => {
                return message.channel.send({
                    embeds: [
                        new MessageEmbed()
                        .setDescription("unable to fetch the image")
                        .setColor(0xff6464)
                    ]
                }).then(async (msg) => setTimeout(() => msg.delete(), 10000))
            })
        if (!traceDetails.result.length) return message.channe.send("No  found")
        const animeResult = traceDetails.result[0];
        const animeDetails = await axios
            .post(`https://graphql.anilist.co`, {
                query: `query ($id: Int) {
                Media(id: $id, type: ANIME) {
                  title {
                    english
                  }
                  coverImage {
                    large
                    color
                  }
                  status
                  episodes
                  description
                  bannerImage
                }
              }`,
                variables: {
                    id: animeResult.anilist
                },
            })
            .then((res) => (res.data ? res.data.data.Media : null))
            .catch((err) => {});

        return message.channel.send({
            embeds: [
                new MessageEmbed()
                .setTitle(`${animeDetails.title.english} | Founded`)
                .setDescription(animeDetails.description.substring(0, 200) +
                    ` **[[Read More](https://anilist.co/anime/${animeResult.anilist})]**`)
                .setColor(animeDetails.coverImage.color ?
                    parseInt(animeDetails.coverImage.color.replace('#', '0x')) :
                    0xffffff)
                .setImage(animeDetails.bannerImage)
                .addField(`Traced Image/Video`, `EP. ${animeResult.episode} [Video Clip](${animeResult.video}) | [Image](${animeResult.image})`, true)
                .addField(`Status`, `${animeDetails.episodes} Episodes | ${animeDetails.status}`, true)
            ]
        })
    },
};