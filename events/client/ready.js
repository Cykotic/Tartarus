const {
  prefix
} = require('../../config')
const { default: chalk } = require("chalk");


module.exports = async (client) => {
  console.log(
    chalk.cyan("[ INFORMATION ]") +
    chalk.white.bold(" | ") +
    chalk.blue(`${new Date().toLocaleDateString()}`) +
    chalk.white.bold(" | ") +
    chalk.cyan("Logged in as") +
    chalk.white(": ") +
    chalk.greenBright(`${client.user.tag}`)
  )
  client.user.setPresence({
    status: "dnd",
    activities: [{
      name: `${prefix}help | ${client.users.cache.size} users`,
      type: 'COMPETING'
    }]
  })
};
