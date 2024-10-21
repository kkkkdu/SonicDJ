const { SlashCommandBuilder } = require ("discord.js")
const { MessageEmbed } = require ("discord.js")


module.exports = {
    data : new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pausar a música"),
        
        async execute ({client, interaction}) {
            const queue = client.player.getQeue(interaction.guild)

            if(!queue){
                await interaction.reply("Não há música na fila")
                return
            }
            queue.setPause(true)

            await interaction.reply("A Música foi interrompida")
        }
        
}