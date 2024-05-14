const {
    MessageEmbed
} = require('discord.js');
const moment = require('moment');

const flags = {
    DISCORD_EMPLOYEE: 'Discord Employee',
    DISCORD_PARTNER: 'Discord Partner',
    BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
    BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
    HYPESQUAD_EVENTS: 'HypeSquad Events',
    HOUSE_BRAVERY: 'House of Bravery',
    HOUSE_BRILLIANCE: 'House of Brilliance',
    HOUSE_BALANCE: 'House of Balance',
    EARLY_SUPPORTER: 'Early Supporter',
    TEAM_USER: 'Team User',
    SYSTEM: 'System',
    VERIFIED_BOT: 'Verified Bot',
    VERIFIED_DEVELOPER: 'Verified Bot Developer'
};


module.exports = {
    name: "userinfo",
    aliases: ["ui", ],
    category: "<:ii:871068940208590880> | Information",
    usage: "Nothing rlly",
    description: "Nothing",

    run: async (client, message, args) => {
        const member = message.mentions.members.last() || message.member; // mention member
        const devices = member.presence ?.clientStatus || {}; // devices
        const account_age = `${((Date.now() - member.user.createdAt) / 1000 / 60 / 60 / 24 + '.0').toString().split('.')[0]} days` // account age
        // const members = message.guild.members.cache.sort((a, b) => a.joinedTimestamp - b.joinedTimestamp).array(); //format joinPosition 
        // const roles = member.roles.cache // roles 
        //     .sort((a, b) => b.position - a.position)
        //     .map(role => role.toString())
        //     .slice(0, -1);
        let isBot = false // checking if the member is a bot
        if (member.user.bot) isBot = true
        const userFlags = member.user.flags.toArray()

        const statuses = {
            "online" : "🟢",
            "idle" : "🟠",
            "dnd" : "🔴",
            "offline" : "⚫️",
          }

        //position when you joined the server
        // const position = new Promise((ful) => {
        //     for (let i = 1; i < members.length + 1; i++) {
        //         if (members[i - 1].id === member.id) ful(i);
        //     }
        // });

        // avatar
        let avatar = {
            png: member.user.displayAvatarURL({
                format: 'png'
            }),
            jpeg: member.user.displayAvatarURL({
                format: 'jpeg'
            }),
            jpg: member.user.displayAvatarURL({
                format: 'jpg'
            }),
            gif: member.user.displayAvatarURL({
                format: 'gif'
            }),
            webp: member.user.displayAvatarURL({
                format: 'webp'
            }),
            dynamic: member.user.displayAvatarURL({
                format: 'png',
                dynamic: true
            })
        }
        let av = `[PNG](${avatar.png}) | [JPEG](${avatar.jpeg}) | [JPG](${avatar.jpg}) | [GIF](${avatar.gif}) | [WEBP](${avatar.webp})`;

        // checking what device are you on
        const description = () => {
            if (devices > 1) {
                const entries = Object.entries(devices).map(
                    (value) => value[0]
                );
                return `Device: ${entries}`;
            } else {
                const entries = Object.entries(devices).map(
                        (value) => `${value[0][0].toUpperCase()}${value[0].slice(1)}`) // devices
                    .join("\n");
                return `${entries}`;
            }
        };

        return message.channel.send({
            embeds: [
                new MessageEmbed()
                .setColor(0xff6464)
                .setThumbnail(member.user.displayAvatarURL({
                    dynamic: true,
                    size: 512
                }))
                .setTimestamp()
                .setFooter({
                    text: message.author.tag,
                    iconURL: message.member.user.displayAvatarURL()
                })
                .addField("User Information:", `
                > **➥ Username:** ${member.user.username}
                > **➥ Discriminator:** #${member.user.discriminator}
                > **➥ NickName:** ${member.nickname ? member.nickname : "None"}
                > **➥ ID:** ${member.id}
                > **➥ Avatar:** ${av}
                > **➥ Time Created:** ${moment(member.user.createdTimestamp).format('LL')}, @${moment(member.user.createdTimestamp).format('LT')} (${account_age})
                > **➥ Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}
                > **➥ Bot?:** ${isBot}
                > **➥ Status:** ${statuses[member.presence ? member.presence.status : "offline"]} ${member.presence ? member.presence.status : "offline"}
            `)
            ]
        })

        // .addField("User Information:", `
        // > **➥ Username:** ${member.user.username},
        // > **➥ Discriminator:** #${member.user.discriminator},
        // > **➥ NickName:** ${member.nickname ? member.nickname : "None"},
        // > **➥ ID:** ${member.id},
        // > **➥ Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'},
        // > **➥ Avatar:** ${av},
        // > **➥ Time Created:** ${moment(member.user.createdTimestamp).format('LL')}, @${moment(member.user.createdTimestamp).format('LT')} (${account_age})
        // > **➥ Bot?:** ${isBot},
        // > **➥ Badges:** ${badges},
        // > **➥ Status:** ${status},
        // > **➥ Activity:** ${userstatus},
        // > **➥ Devices?:** ${description()},
        //     `)
        // return message.channel.send(new MessageEmbed()
        // .setThumbnail(member.user.displayAvatarURL({
        //     dynamic: true,
        //     size: 512
        // }))
        // .setColor(0xff7700)
        // .setTimestamp()
        // .setFooter({
        //     text: message.author.tag,
        //     iconURL: message.member.user.displayAvatarURL()
        // })
        // .addField('**Userinfo status:**', [
        //     `> **➥ Username:** ${member.user.username}`,
        //     `> **➥ Discriminator:** #${member.user.discriminator}`,
        //     `> **➥ NickName:** ${member.nickname ? member.nickname : "None"}`,
        //     `> **➥ ID:** ${member.id}`,
        //     // `> **➥ Nitro:** ${member.premium_type}`,
        //     `> **➥ Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
        //     `> **➥ Avatar:** ${av}`,
        //     `> **➥ Time Created:** ${moment(member.user.createdTimestamp).format('LL')}, @${moment(member.user.createdTimestamp).format('LT')} (${account_age})`, //${moment(member.user.createdTimestamp).fromNow()} show's the amount of years
        //     //`> **➥ Status:** ${status}`,
        //     //`> **➥ Game:** ${member.user.presence.game || 'Not playing a game.'}`,
        //     //`> **➥ Activity:** ${member.presence.activities[0] ? member.user.presence.activities[0].name : "No Activity Found"}`,
        //     `> **➥ Bot?:** ${isBot}`,
        //     `> **➥ Devices?:** ${description()}`,
        // ])
        // .addField('**Member status:**', [
        //     `> **➥ Highest Role:** ${roles.length > 0 ? member.roles.highest.toString() : 'None'}`,
        //     `> **➥ Join Position:** ${await position}`,
        //     `> **➥ Server Join Date:** ${moment(member.joinedAt).format('LL LT')}`,
        //     `> **➥ Role Color:** ${(member.displayHexColor)}`,
        //     `> **➥ Roles: [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`,
        // ])
        //)
    }
}



// const { MessageEmbed } = require('discord.js')

// module.exports = {
//     name: "whois",
//     permissions: ["SEND_MESSAGES"],
//     cooldown: 2,
//     description: "user info command",

//     execute (client, message, args, Discord) {
//         const { guild, channel } = message

//         const user = message.mentions.users.first() || message.member.user
//         const member = guild.members.cache.get(user.id)

//         let person = message.mentions.users.first() || message.author
//         let avatar = person.displayAvatarURL({dynamic: true, size: 1024})

//         const userEmbed = new MessageEmbed()
//         .setTitle(`${user.username}'s Information:`)
//         .setDescription("User info command to get information of a user.")
//         .setAuthor(`${user.username}`, avatar )
//         .setThumbnail(avatar)
//         .addFields(
//             {name: `Username:`, value: `${user.username}`, inline: true},
//             {name: `\u200B`, value: `\u200B`, inline: true},
//             {name: `Tag:`, value: `#${user.discriminator}`, inline: true},
//             {name: `Created at:`, value: `${user.createdAt.toLocaleString()}`, inline: true},
//             {name: `\u200B`, value: `\u200B`, inline: true},
//             {name: `Joined at:`, value: `${member.joinedAt.toLocaleString()}`, inline: true},
//             {name: `Booster:`, value: `${member.premiumSince ? 'since ' + member.premiumSince.toLocaleString() : 'Nope'}`, inline: true},
//             {name: `\u200B`, value: `\u200B`, inline: true},
//             {name: `Bot:`, value: `${user.bot}`, inline: true}
//         )
//         .setTimestamp()
//         .setColor("BLACK")
//         .setFooter(client.user.tag , client.user.displayAvatarURL());

//         message.channel.send({ embeds: [userEmbed]})
//     }
// }