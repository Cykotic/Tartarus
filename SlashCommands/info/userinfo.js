const {
    MessageActionRow,
    MessageButton,
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
    description: "Get information about a user",
    options: [{
        name: "user",
        description: "User to get information from",
        type: "USER",
        required: true,
    }, {
        name: "ephemeral",
        description: "The output can only be viewed by yourself or not",
        type: "BOOLEAN",
        required: false
    }],
    run: async (client, interaction) => {
        const {
            guild
        } = interaction;

        const member = guild.members.cache.get(interaction.targetId);
        // const owner = await guild.fetchOwner();
        // //const devices = member.presence ?.clientStatus || {}; // devices
        // //const account_age = `${((Date.now() - member.user.createdAt) / 1000 / 60 / 60 / 24 + '.0').toString().split('.')[0]} days` // account age
        // const totalRoles = await member.roles.cache.size;
        // const roles = await member.roles;
        // const highestRole = member.roles.highest.id === guild.id ? 'None' : member.roles.highest;
        // let isBot = false // checking if the member is a bot
        // if (member.user.bot) isBot = true
        // const userFlags = member.user.flags.toArray()
        // const joinedServerAt = `${moment(member.joinedTimestamp).format("MM/DD/YY")}`
        // let memberPermissons = `${member.permissions.toArray().map(p => `\`${p}\``).join(", ")}`;
        // if (member.user.id === owner.id) {
        //     memberPermissons = "SERVER_OWNER"
        // };
        // const badges = userFlags.length ? userFlags.map(flag => flags[flag]).join(", ") : "None";

        // const statuses = {
        //     "online": "🟢",
        //     "idle": "🌙",
        //     "dnd": "⛔",
        //     "offline": "⚫️",
        // };
        // const status = `${statuses[member.presence?.status]} ${member.presence?.status}`
        // const activity = member.presence ?.activities[0];
        // var userstatus = "None";
        // if (activity) {
        //     if (activity.type === "CUSTOM_STATUS") {
        //         let emoji = `${activity.emoji ? activity.emoji.id ? `<${activity.emoji.animated ? "a" : ""}:${activity.emoji.name}:${activity.emoji.id}>` : activity.emoji.name : ""}`
        //         userstatus = `${emoji} \`${activity.state || 'None'}\``
        //     } else {
        //         userstatus = `\`${activity.type.toLowerCase().charAt(0).toUpperCase() + activity.type.toLowerCase().slice(1)} ${activity.name}\``
        //     }
        // };

        // function trimArray(arr, maxLen = 25) {
        //     if (Array.from(arr.values()).length > maxLen) {
        //         const len = Array.from(arr.values()).length - maxLen;
        //         arr = Array.from(arr.values()).sort((a, b) => b.rawPosition - a.rawPosition).slice(0, maxLen);
        //         arr.map(role => `<@&${role.id}>`)
        //         arr.push(`${len} more...`);
        //     }
        //     return arr.join(", ");
        // }
        // const Roles = await member.roles.cache.size < 25 ? Array.from(roles.cache.values()).sort((a, b) => b.rawPosition - a.rawPosition).map(role => `<@&${role.id}>`).join(', ') : roles.cache.size > 25 ? trimArray(roles.cache) : "None";


        // // avatar
        // let avatar = {
        //     png: member.user.displayAvatarURL({
        //         format: 'png'
        //     }),
        //     jpeg: member.user.displayAvatarURL({
        //         format: 'jpeg'
        //     }),
        //     jpg: member.user.displayAvatarURL({
        //         format: 'jpg'
        //     }),
        //     gif: member.user.displayAvatarURL({
        //         format: 'gif'
        //     }),
        //     webp: member.user.displayAvatarURL({
        //         format: 'webp'
        //     }),
        //     dynamic: member.user.displayAvatarURL({
        //         format: 'png',
        //         dynamic: true
        //     })
        // }
        // let av = `[PNG](${avatar.png}) | [JPEG](${avatar.jpeg}) | [JPG](${avatar.jpg}) | [GIF](${avatar.gif}) | [WEBP](${avatar.webp})`;

        // checking what device are you on
        // const description = () => {
        //     if (devices > 1) {
        //         const entries = Object.entries(devices).map(
        //             (value) => value[0]
        //         );
        //         return `Device: ${entries}`;
        //     } else {
        //         const entries = Object.entries(devices).map(
        //                 (value) => `${value[0][0].toUpperCase()}${value[0].slice(1)}`) // devices
        //             .join("\n");
        //         return `${entries}`;
        //     }
        // };

        const Embed = new MessageEmbed()
            .setColor(0xff6464)
            .setThumbnail(member.user.displayAvatarURL({
                dynamic: true
            }))
            .addField("User Information:", `
				> **➥ Username:** ${member.user.username},

                    `)
            // .addField('**Member Information:**', `
            //     > **➥ Role(s) :- ** ${`[${totalRoles}] -\n ${Roles}`}
            //     > **➥ Highest Role:** ${highestRole}
            //     > **➥ Server Join Date:** ${joinedServerAt}
            //     > **➥ Role Color:** ${(member.displayHexColor)}
            //     > **➥ Permissions:** ${memberPermissons}

            //     `)
            .setFooter({
                text: `${member.user.tag}`,
                iconURL: member.user.displayAvatarURL({
                    dynamic: true
                })
            })
            .setTimestamp()

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('close')
                .setLabel('Close This Page?')
                .setStyle('DANGER'),
            );
        interaction.followUp({
            embeds: [Embed],
            ephemeral: false,
            components: [row]
        });
    },
};