import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
        .setName("fila")
        .setDescription("Listar as primeiras musicas da fila")


        export async function execute ([client, interaction]){
             const queue = client.player.nodes.get(interaction.guild.id);
            await interaction.deferReply({ ephemeral: false }); 

            if(!queue || queue.playing){
                await interaction.reply("Nao existem musicas na fila")
                return
            }

            const queueString = queue.tracks.data.slice(0, 10).map((song, i) => {
                 return `${i +1} [${song.duration}]\ ${song.title} <@${song.requestedBy.id}`
            }).join("\n")

            const currentSong = queue.currentTrack
             const embed = new EmbedBuilder()
        .setColor('#3061e3') // Cor azul
        .setDescription(
            `**🎵 Tocando Agora:**\n` + 
            (currentSong ? `\`[${currentSong.duration}]\` **[${currentSong.title}](${currentSong.url})** - <@${currentSong.requestedBy.id}>` : "Nada tocando no momento.") +
            `\n\n**🎶 Próximas na Fila:**\n${queueString.length > 0 ? queueString : "Nenhuma música na fila."}`
        )
        .setThumbnail(currentSong ? currentSong.thumbnail : null) // Define a thumbnail se houver música atual
        .setFooter({ text: `Total na fila: ${queue.tracks.data.length} | Volume: ${queue.volume}%` }); // Exemplo de footer mais completo

         await interaction.editReply({ embeds: [embed] });


        }

    
