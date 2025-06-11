import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Pular musica atual")

export async function execute([client, interaction]) {
    await interaction.deferReply({ ephemeral: false })
    const queue = client.player.nodes.get(interaction.guild.id);


    if (!queue || queue.tracks.data.length === 0) {
        return interaction.editReply('Não há músicas na fila para pular.');
    }
    if (!queue.currentTrack) {
        return interaction.editReply('Não há músicas tocando no momento para pular.');
    }
     const skippedTrack = queue.currentTrack; 
    queue.node.skip();


const embed = new EmbedBuilder()
        .setDescription(`⏩ Pulei a música **[${skippedTrack.title}](${skippedTrack.url})**!`)
        .setImage(skippedTrack.thumbnail)
        .setColor('Blue')

    await interaction.editReply({ embeds: [embed] });

}

