const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const sourcebin = require("sourcebin");
const util = require("util");
const exec = util.promisify(require('child_process').exec);

module.exports = {
    name: "pm2",
    description: "Execute a PM2 command",
    type: 'CHAT_INPUT',
    ephemeral: true,
    UserPerms: [],
    BotPerms: [],
    OwnerOnly: true,
    options: [
        {
            name: `command`,
            description: `The command to execute`,
            type: `STRING`,
            required: true
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let command = interaction.options.getString('command')

        let tempMsg = await interaction.followUp({
            embeds: [
                new MessageEmbed()
                .setDescription(`Executing the command...`)
            ]
        })

        const { stdout, stderr } = await exec('pm2 ' + command)

        if(stderr) return await sourcebin.create([{
            content: stderr,
            language: `js`
        }], {
            title: `Pm2 excution output`,
            description: `Excution runned by ${interaction.user.tag}`
        }).then((value) => {
            tempMsg.edit({
                embeds: [
                    new MessageEmbed()
                    .setDescription(`An error occured while executing the command`)
                    .setColor(0xff6464)
                    .addFields({
                        name: `Pm2 Output :`,
                        value: `${value.url} \`${command}\` this excution runned by ${interaction.user.tag}`
                    })
                ]
            })
        })

        await sourcebin.create(
            [{
                content: stdout,
                language: `js`
            }], {
                title: `Pm2 excution output`,
                description: `Excution runned by ${interaction.user.tag}`
            }
        ).then((value) => {
            tempMsg.edit({
                embeds: [
                    new MessageEmbed()
                    .setDescription(`Successfully executed the command`)
                    .setColor(0xff6464)
                    .addFields({
                        name: `Pm2 Output :`,
                        value: `${value.url} \`${command}\` this excution runned by ${interaction.user.tag}`
                    })
                ]
            })
        })
    },
};


/**
 * # Fork mode
pm2 start app.js --name my-api # Name process

# Cluster mode
pm2 start app.js -i 0        # Will start maximum processes with LB depending on available CPUs
pm2 start app.js -i max      # Same as above, but deprecated.
pm2 scale app +3             # Scales `app` up by 3 workers
pm2 scale app 2              # Scales `app` up or down to 2 workers total

# Listing

pm2 list               # Display all processes status
pm2 jlist              # Print process list in raw JSON
pm2 prettylist         # Print process list in beautified JSON

pm2 describe 0         # Display all information about a specific process

pm2 monit              # Monitor all processes

# Logs

pm2 logs [--raw]       # Display all processes logs in streaming
pm2 flush              # Empty all log files
pm2 reloadLogs         # Reload all logs

# Actions

pm2 stop all           # Stop all processes
pm2 restart all        # Restart all processes

pm2 reload all         # Will 0s downtime reload (for NETWORKED apps)

pm2 stop 0             # Stop specific process id
pm2 restart 0          # Restart specific process id

pm2 delete 0           # Will remove process from pm2 list
pm2 delete all         # Will remove all processes from pm2 list

# Misc

pm2 reset <process>    # Reset meta data (restarted time...)
pm2 updatePM2          # Update in memory pm2
pm2 ping               # Ensure pm2 daemon has been launched
pm2 sendSignal SIGUSR2 my-app # Send system signal to script
pm2 start app.js --no-daemon
pm2 start app.js --no-vizion
pm2 start app.js --no-autorestart
 */