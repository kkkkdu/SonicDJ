const { SlashCommandBuilder } = require ("discord.js")
const { MessageEmbed } = require ("discord.js")


module.exports = {
    data : new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Pular música atual"),
        
        async execute (client, interaction) {
            const queue = client.player.getQeue(interaction.guild)

            if(!queue){
                await interaction.reply("Não há música na fila")
                return
            }
            const currentSong = queue.current
            queue.skip()

            await interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`Skipped **${currentSong.title}**`)
                        .setThumbnail(currentSong.thumbnail)
                ]
            })

        }
        
}