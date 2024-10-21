const { SlashCommandBuilder } = require ("discord.js")
const { MessageEmbed } = require ("discord.js")


module.exports = {
    data : new SlashCommandBuilder()
        .setName("fila")
        .setDescription("Listar primeiras 10 músicas na fila"),
        async execute ({client, interaction}){
            const queue = client.player.getQueue(interaction.guild)

            if(!queue || queue.playing){
                await interaction.reply("Não existem músicas na fila")
                return
            }

            const queueString = queue.tracks.slic(0,10).map((song, i) => {
                 return `${i +1} [${song.duration}]\ ${song.title} <@${song.requestedBy.id}`
            }).join("\n")

            const currentSong = queue.current
            await interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`**Tocando agora**\n` + 
                            (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} - <@${currentSong.requestedBy.id}>` : "nada") +
                            `\n\n**Fila**\n${queueString}`
                        )
                        .setThumbnail(currentSong.setThumbnail)
                ]
            })


        }

    }