const {
    MessageEmbed,
    Permissions
} = require("discord.js");

module.exports = {
    name: "test",
    aliases: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const {
            guild
        } = message
        const owner = await guild.fetchOwner()


        return message.channel.send({
            embeds: [
                new MessageEmbed()
                .setColor(0xff6464)
                .setThumbnail(guild.iconURL())

                .setTimestamp()
                .setFooter({
                    text: guild.name,
                    iconURL: guild.iconURL()
                })
                .addField(`Information about: ${guild.name}`, `
                > **➥ Server ID:** ${guild.id}
                > **➥ Server created at:** <t:${(String(guild.createdTimestamp / 1000)).split('.')[0]}> (<t:${(String(guild.createdTimestamp / 1000)).split('.')[0]}:R>)
                > **➥ Server Owner:** ${owner.user.tag} (${owner.id})
            `)
                .addField("Members Information:", `
                > **➥ Total Members:** ${await guild.memberCount}
                > **➥ Total Humans:** ${(await guild.members.fetch()).filter(x => !x.user.bot).size}
                > **➥ Total Bots:** ${(await guild.members.fetch()).filter(x => x.user.bot).size}
            `)
                .addField("Channels Information:", `
                > **➥ Total Channels:** ${(await guild.channels.fetch()).filter(x => x.type !== 'GUILD_CATEGORY').size}
                > **➥ Private Channels:** ${(await guild.channels.fetch()).filter(x => x.type !== 'GUILD_CATEGORY' && !x.permissionsFor(guild.id).has(Permissions.FLAGS.VIEW_CHANNEL)).size}
                > **➥ Public Channels:** ${(await guild.channels.fetch()).filter(x => x.type !== 'GUILD_CATEGORY' && x.permissionsFor(guild.id).has(Permissions.FLAGS.VIEW_CHANNEL)).size}
            `)

                .addField("Emojis Information", `
                > **➥ Total Emojis:** ${(await guild.emojis.fetch()).size}
                > **➥ Animated Emojis:** ${(await guild.emojis.fetch()).filter(x => x.animated).size}
                > **➥ Non-Animated Emojis:** ${(await guild.emojis.fetch()).filter(x => !x.animated).size}
            `)

                .addField("Extra Information", `
                > **➥ Total Roles:** ${(await guild.roles.fetch()).size}
                > **➥ Is a partnered server?:** ${guild.partnered ? 'Yes' : 'No'}
                > **➥ Is a verified server?:** ${guild.verified ? 'Yes' : 'No'}
                > **➥ Number of boosts:** ${guild.premiumSubscriptionCount ? `${guild.premiumSubscriptionCount} boosts` : 'No boosts.'}
                > **➥ Boost Level:** ${formatTier(guild.premiumTier)}
                > **➥ Vanity URL:** ${guild.vanityURLCode ? guild.vanityURLCode : 'No Vanity URL'}
                > **➥ Acknowledgements:** ${guild.features.map((feature) => format(feature)).join(', ')}
            `)

            ]
        })

        function format(str) {
            str = str.replace(/\_/g, " ");
            const split = str.trim().split(" ")
            const splitFixed = [];
            split.forEach((e) => {
                e = e.charAt(0).toUpperCase() + e.slice(1).toLocaleLowerCase();
                splitFixed.push(e);
            });
            return splitFixed.join(" ");
        }

        //the above function is not made by me
        function formatTier(tier) {
            if (tier == 'NONE') return 'Level 0 (no boosts)'
            else if (tier == 'TIER_1') return 'Level 1'
            else if (tier == 'TIER_2') return 'Level 2'
            else if (tier == 'TIER_3') return 'Level 3'
        }
    },
};

//> **➥ Server ID:** \`\`\`${guild.id}\`\`\`



// const {
//     MessageEmbed,
//     Permissions
// } = require('discord.js')
// module.exports = {
//     name: 'serverinfo',
//     run: async (client, message, args) => {
//         const {
//             guild
//         } = message
//         const owner = await guild.fetchOwner()
//         let embed = new MessageEmbed()
//         embed.setTitle(`Information about ${guild.name}`)
//         embed.addField(`Server ID:`, `\`\`\`${guild.id}\`\`\``)
//         embed.addField(`Server created at:`, `<t:${(String(guild.createdTimestamp / 1000)).split('.')[0]}> (<t:${(String(guild.createdTimestamp / 1000)).split('.')[0]}:R>)`)
//         embed.addField(`Server Owner:`, `\`\`\`${owner.user.tag} (${owner.id})\`\`\``)
//         embed.addField(`Members info:`, `\`\`\`Total Members: ${await guild.memberCount}
// Humans: ${(await guild.members.fetch()).filter(x => !x.user.bot).size}
// Bots: ${(await guild.members.fetch()).filter(x => x.user.bot).size}\`\`\``)
//         embed.addField(`Channels info:`, `\`\`\`Total Channels: ${(await guild.channels.fetch()).filter(x => x.type !== 'GUILD_CATEGORY').size}
// Private Channels: ${(await guild.channels.fetch()).filter(x => x.type !== 'GUILD_CATEGORY' && !x.permissionsFor(guild.id).has(Permissions.FLAGS.VIEW_CHANNEL)).size}
// Public Channels: ${(await guild.channels.fetch()).filter(x => x.type !== 'GUILD_CATEGORY' && x.permissionsFor(guild.id).has(Permissions.FLAGS.VIEW_CHANNEL)).size}\`\`\``)
//         embed.addField(`Emojis info:`, `\`\`\`Total Emojis: ${(await guild.emojis.fetch()).size}
// Animated Emojis: ${(await guild.emojis.fetch()).filter(x => x.animated).size}
// Non-Animated Emojis: ${(await guild.emojis.fetch()).filter(x => !x.animated).size}\`\`\``)
//         embed.addField(`Total Roles:`, `\`\`\`${(await guild.roles.fetch()).size}\`\`\``)
//         embed.addField(`Is a partnered server?`, `\`\`\`${guild.partnered ? 'Yes' : 'No'}\`\`\``)
//         embed.addField(`Is a verified server?`, `\`\`\`${guild.verified ? 'Yes' : 'No'}\`\`\``)
//         embed.addField(`Number of boosts:`, `\`\`\`${guild.premiumSubscriptionCount ? `${guild.premiumSubscriptionCount} boosts` : 'No boosts.'}\`\`\``)
//         embed.addField(`Boost Level:`, `\`\`\`${formatTier(guild.premiumTier)}\`\`\``)
//         embed.addField(`Vanity URL:`, `\`\`\`${guild.vanityURLCode ? guild.vanityURLCode : 'No Vanity URL'}\`\`\``)
//         embed.addField(`Acknowledgements:`, `\`\`\`${guild.features.map((feature) => format(feature)).join('\n')}\`\`\``)
//         guild.iconURL() ? embed.setThunbnail(guild.iconUrl()) : null
//         embed.setColor('RED')
//         await message.channel.send({
//             embeds: [embed]
//         })


//         function format(str) {
//             str = str.replace(/\_/g, " ");
//             const split = str.trim().split(" ")
//             const splitFixed = [];
//             split.forEach((e) => {
//                 e = e.charAt(0).toUpperCase() + e.slice(1).toLocaleLowerCase();
//                 splitFixed.push(e);
//             });
//             return splitFixed.join(" ");
//         }

//         //the above function is not made by me
//         function formatTier(tier) {
//             if (tier == 'NONE') return 'Level 0 (no boosts)'
//             else if (tier == 'TIER_1') return 'Level 1'
//             else if (tier == 'TIER_2') return 'Level 2'
//             else if (tier == 'TIER_3') return 'Level 3'
//         }
//     }
// }