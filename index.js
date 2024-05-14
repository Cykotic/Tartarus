const { Client, Collection } = require("discord.js");
const { token } = require("./config");
const colors = require("colors");

const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.aliases = new Collection();

//Requuire the Handlers
["handler"].forEach(h => {
    require(`./handlers/${h}`)(client);
})

client.login(token);


// color #ff6464
// timeout msg: .then(async (msg) => setTimeout(() => msg.delete(), 10000))