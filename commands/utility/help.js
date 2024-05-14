const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
    MessageButton
} = require(`discord.js`);
const {
    prefix
} = require("../../config.json")

module.exports = {
    name: 'help',
    aliases: ["h", "cmds"],
    run: async (client, message, args) => {
        const emojis = {
            information: "<:ii:871068940208590880>",
            utility: "<:utility:871068944457424896>",
            moderation: "<:shieldd:871068941403963444>",
            fun: "<:5484ingame:843370973691379712>"
        }
        if (!args.length) {
            const directories = [
                ...new Set(client.commands.map((cmd) => cmd.directory)),
            ];

            const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

            const categories = directories.map((dir) => {
                const getCommands = client.commands.filter(
                    (cmd) => cmd.directory === dir
                ).map(cmd => {
                    return {
                        name: cmd.name || "there is no name",
                        description: cmd.description ||
                            "there is no description for this command"
                    }
                });

                return {
                    directory: formatString(dir),
                    commands: getCommands
                }
            });

            const embed = new MessageEmbed()
                .setTitle("Help Menu")
                .setDescription(`Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example:  \`${prefix}help ban\``, )
                .setColor(0xff6464)

            const components = (state) => [
                new MessageActionRow().addComponents(
                    new MessageSelectMenu()
                    .setCustomId("help")
                    .setPlaceholder("Plase select a category")
                    .setDisabled(state)
                    .addOptions(
                        categories.map((cmd) => {
                            return {
                                label: cmd.directory,
                                value: cmd.directory.toLowerCase(),
                                description: `Commands from ${cmd.directory} category`,
                                emoji: emojis[cmd.directory.toLowerCase()] || null,
                            };
                        }),
                    ),
                ),
            ];

            const initialMessage = await message.channel.send({
                embeds: [embed],
                components: components(false)
            });

            const filter = (interaction) =>
                interaction.user.id === message.author.id;

            const collector = message.channel.createMessageComponentCollector({
                filter,
                componentType: "SELECT_MENU"
            });

            collector.on("collect", (interaction) => {
                if (interaction.user.id !== message.author.id) return interaction.reply({
                    content: `Only **${message.author.username}** can use the menu!`,
                    ephemeral: true
                })
                const [directory] = interaction.values;
                const category = categories.find(
                    (x => x.directory.toLowerCase() === directory)
                );

                const categoryEmbed = new MessageEmbed()
                    .setTitle(`${directory} commands`)
                    .setColor(0xff6464)
                    .setDescription("Here are a list of commands")
                    .setThumbnail(client.user.displayAvatarURL())
                    .setFooter({
                        text: message.author.tag,
                        iconURL: message.member.user.displayAvatarURL()
                    })
                    .setTimestamp()
                    .addFields(
                        category.commands.map((cmd) => {
                            return {
                                name: `\`${cmd.name}\``,
                                value: cmd.description,
                                inline: true
                            };
                        }),
                    );


                const button1 = new MessageButton()
                    .setLabel("Support")
                    .setStyle("LINK")
                    .setURL("https://discord.gg/sQqePm9r")

                const button2 = new MessageButton()
                    .setLabel("Invite")
                    .setStyle("LINK")
                    .setURL("https://discord.gg/sQqePm9r")

                const row = new MessageActionRow().addComponents([button1, button2])

                // reply: you only see it
                // update: doing a message edit!
                interaction.reply({
                    embeds: [categoryEmbed],
                    ephemeral: true,
                    components: [row]
                })
            });
        } else {
            const command =
                client.commands.get(args[0].toLowerCase()) ||
                client.commands.find(
                    (c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));
            if (!command) {
                const embedx = new MessageEmbed()
                    .setTitle(`Invalid command. Use \`${prefix}help\` to see all commands in a category.`)
                    .setColor("RED")
                return message.channel.send({
                    embeds: [embedx]
                })
            }

            // command informtion
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                    .setColor(0xff6464)
                    .addFields({
                        name: `Command Information:  "${args[0]}"`
                    })
                ]
            })


            // const embedy = new MessageEmbed()
            //     .setTitle(`Command Information:  "${args[0]}"`)
            //     .addField("Name:", command.name ? `\`${command.name}\`` : "Not  Provided", inline = true)
            //     .addField("Description:", command.description ? `\`${command.description}\`` : "Not Provided", inline = true)
            //     .addField("Aliases:", command.aliases ? `\`${command.aliases.join(", ")}\`` : "No Aliases", inline = true)
            //     .addField("Usage:", command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : `\`${prefix}${command.name}\``, inline = true)
            //     .addField("Example:", command.example ? `\`${prefix}${command.name} ${command.example}\`` : "No Example", inline = true)
            //     .addField("Cooldown:", command.cooldown ? `${command.cooldown} seconds` : "No Cooldown", inline = true)
            //     .setThumbnail(client.user.displayAvatarURL())
            //     .setFooter({
            //         text: message.author.tag,
            //         iconURL: message.member.user.displayAvatarURL()
            //     })
            //     .setTimestamp()
            //     .setColor(0xff6464)
            // return message.channel.send({
            //     embeds: [embedy]
            // })
        }
    }
}