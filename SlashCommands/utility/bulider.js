const {
    Client,
    CommandInteraction
} = require("discord.js");

module.exports = {
    name: "builder",
    description: "Builds a server!",
    options: [{
        name: "server-type",
        type: "STRING",
        description: "The type of server to create",
        required: true,
    }, ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {Array} options
     */
    run: async (client, interaction, options) => {
        const types = ["gaming"]; //only one type, cause im lazy
        const type = interaction.options.getString("server-type");
        if (!type || !types.includes(type.toLowerCase()))
            return interaction.followUp(
                "Please provide the type of server that you want to build!!\nChoose one of: " +
                types.join("`, `")
            );

        const msg = await interaction.channel.send("Starting the process...");
        await wait(6000);
        await msg.edit("Deleting the old channels...");

        await Promise.all(
            interaction.guild.channels.cache.map(async (ch) => {
                if (ch.id != interaction.channel.id) await ch.delete();
            })
        );

        await msg.edit("Creating the channel categories...");

        const categories = [];
        let channels = [];

        switch (type.toLowerCase()) {
            case "gaming": {
                const categoryNames = ["General", "Gaming", "Lobbies"];
                channels = [{
                        cat: "General",
                        names: ["general", "commands"]
                    },
                    {
                        cat: "Gaming",
                        names: ["gaming-chat", "games"]
                    },
                    {
                        cat: "Lobbies",
                        names: ["lobby-1", "lobby-2"],
                        type: "GUILD_VOICE",
                    },
                ];

                categoryNames.forEach((name) => {
                    categories.push({
                        name,
                        options: {
                            type: "GUILD_CATEGORY"
                        }
                    });
                });
                break;
            }
        }

        await wait(6000);

        await Promise.all(
            categories.map(async (category) => {
                await interaction.guild.channels.create(
                    category.name,
                    category.options
                );
            })
        );

        await msg.edit("Creating the new channels...");

        await wait(6000);

        await Promise.all(
            channels.map(async (channel) => {
                let parent = interaction.guild.channels.cache.find(
                    (ch) => ch.type == "GUILD_CATEGORY" && ch.name == channel.cat
                );

                channel.names.forEach(async (chName) => {
                    await interaction.guild.channels.create(chName, {
                        type: channel.type ? channel.type : "GUILD_TEXT",
                        parent,
                    });
                });
            })
        );

        await msg.edit("The process has compeleted!");
        await wait(6000);
        await interaction.channel.delete();
    },
};

function wait(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}