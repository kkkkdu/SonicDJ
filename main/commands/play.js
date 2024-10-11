const { SlashCommandBuilder } = require("discord.js")
const { execute } = require("graphql")



module.exports = {
    data:  new SlashCommandBuilder()
         .setName("play")
         .setDescription("Adicionar música à fila"),
 
     async execute(interaction) {
        client.on('message', message=>({
            switch (args[0]) { 
                case: 'play'

            }
        }))
         await interaction.reply("Musica adicionada!")
 
     }
 }