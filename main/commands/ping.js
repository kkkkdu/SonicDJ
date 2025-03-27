const { SlashCommandBuilder } = require("discord.js")
const { execute } = require("graphql")


module.exports = {
   data:  new SlashCommandBuilder()
        .setName("ping")
        .setDescription("PONG!"),

    async execute(interaction) {
        await interaction.reply("PONG!")

    }
}