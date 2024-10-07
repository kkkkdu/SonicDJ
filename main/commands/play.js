const { SlashCommandBuilder } = require("discord.js")
const { execute } = require("graphql")


module.exports = {
    data:  new SlashCommandBuilder()
         .setName("play")
         .setDescription("Adicionar música à fila"),
 
     async execute(interaction) {
         console.log(interaction)
         await interaction.reply("Musica adicionada!")
 
     }
 }