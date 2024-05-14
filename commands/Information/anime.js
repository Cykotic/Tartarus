const {
    MessageEmbed,
    Message
} = require("discord.js")
const malScraper = require('mal-scraper')

module.exports = {
    name: "anime",
    aliases: ['t'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const search = `${args}`;
        if (!search) return message.channel.send({
            embeds: [
                new MessageEmbed()
                .setDescription("Please type some anime to search!")
                .setColor(0xff6464)
            ]
        })

        malScraper.getInfoFromName(search)
            .then((data) => {

                return message.channel.send({
                    embeds: [

                        new MessageEmbed()
                        .setThumbnail(data.picture)
                        .setColor(0xff6464)
                        .addFields({
                            name: `Search Result For: ${args.slice(",").join(' ')}`,
                            value: `ENGLISH TITLE: ${data.englishTitle}\nTYPE: ${data.type}\nEPISODES: ${data.episodes}`
                        })
                    ]
                })
            })
    },
};


/**
 * 
 *                     let embed = new MessageEmbed()
                        .setColor("0xff7700")
                        .setAuthor(`${anime.titles.english} | ${anime.showType}`, anime.posterImage.original)
                        .setDescription(anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
                        .addField('❯\u2000\Information:', `•\u2000\**Japanese Name:** ${anime.titles.romaji}\n\•\u2000\**Age Rating:** ${anime.ageRating}\n\•\u2000\**NSFW:** ${anime.nsfw ? 'Yes' : 'No'}`, true)
                        .addField('❯\u2000\Stats:', `•\u2000\**Average Rating:** ${anime.averageRating}\n\•\u2000\**Rating Rank:** ${anime.ratingRank}\n\•\u2000\**Popularity Rank:** ${anime.popularityRank}`, true)
                        .addField('❯\u2000\Status:', `•\u2000\**Episodes:** ${anime.episodeCount ? anime.episodeCount : 'N/A'}\n\•\u2000\**Start Date:** ${anime.startDate}\n\•\u2000\**End Date:** ${anime.endDate ? anime.endDate : "Still airing"}`, true)
                        .setFooter(message.author.tag, message.member.user.displayAvatarURL())
                        .setTimestamp()
                        .setImage(anime.posterImage.original);
                    return message.channel.send(`📺 | Try watching **${anime.titles.english}**!`, { embed });
                })
 */