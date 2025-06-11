import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'
import { QueryType, useMainPlayer } from 'discord-player'


export const data = new SlashCommandBuilder()
    .setName("play")
    .setDescription("Adicionar musicas ao Bot!")
    .addSubcommand(subcommand =>
        subcommand
            .setName("song")
            .setDescription("Tocar musicas do youtube")
            .addStringOption(option =>
                option
                    .setName("url")
                    .setDescription("Insira Url da musica")
                    .setRequired(true)
            )
    )
    .addSubcommand(subcommand =>
        subcommand
            .setName("playlist")
            .setDescription("Tocar playlists do YT")
            .addStringOption(option =>
                option
                    .setName("url")
                    .setDescription("playlist url")
                    .setRequired(true)

            )
    )
    .addSubcommand(subcommand =>
        subcommand
            .setName("search")
            .setDescription("Ira buscar por uma musica")
            .addStringOption(option =>
                option
                    .setName("chaves")
                    .setDescription("Buscar palavras Chaves")
                    .setRequired(true)
            )

    )

export async function execute([client, interaction]) {
    if (!interaction.member.voice.channel) {
        return interaction.reply({ content: "Voce precisa estar em um canal de voz para usar este comando!", ephemeral: true });
    }

    await interaction.deferReply({ ephemeral: true });

    const player = client.player;

    let embed = new EmbedBuilder();

    if (interaction.options.getSubcommand() === "song") {
        let url = interaction.options.getString("url");

        console.log("--- 'SONG' ---");
        console.log("URL recebida :", url);

        console.log("URL IMEDIATAMENTE antes de player.play:", url);
        try {
            const { track, queue: updatedQueue } = await player.play(interaction.member.voice.channel, url, { /* ... */ });
            // ...
        } catch (error) {
            console.error("Erro no bloco try/catch do play (song):", error);
            // ...
        }
        try {
            const { track, queue: updatedQueue } = await player.play(interaction.member.voice.channel, url, {
                member: interaction.member,
                textChannel: interaction.channel,
                interaction: interaction,
                nodeOptions: {
                    metadata: interaction.channel,
                },
                searchEngine: QueryType.YOUTUBE_VIDEO
            });


            if (!track) {
                console.log("Player nao encontrou ou adicionou uma faixa para a URL fornecida.");
                return interaction.editReply("❌Não foi possível encontrar a música com a URL fornecida.❌");
            }

            const song = track;
            console.log(" Música encontrada :", song);

            embed
                .setDescription(`🎶**Adicionada a fila 
                    [${song.title}](${song.url})** `)
                .setColor('#3061e3')
                .setImage(song.thumbnail)
                .setFooter({ text: `⏱️ Duracao: [${song.duration}]` })

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error(" Erro no bloco try/catch do play (song):", error);

            await interaction.editReply(`Ocorreu um erro ao tocar a música: \`${error.message}\`. Verifique a URL ou tente novamente.`);
        }
    }

    else if (interaction.options.getSubcommand() === "playlist") {
        let url = interaction.options.getString("url");
        const player = client.player;

        console.log("--- INÍCIO DO SUBCONANDO 'PLAYLIST' ---");
        try {
            const { tracks, playlist, queue: updatedQueue } = await player.play(interaction.member.voice.channel, url, {
                member: interaction.member,
                textChannel: interaction.channel,
                interaction: interaction,
                nodeOptions: {
                    metadata: interaction.channel,
                },
                searchEngine: QueryType.YOUTUBE_PLAYLIST
            });

            if (!tracks || tracks.length === 0) {
                return interaction.editReply(`✅ Playlist encontrada: ${url}`);
            }

            embed
                .setDescription(`**${tracks.length} músicas de [${playlist.title}](${playlist.url})** foram adicionadas à fila`)
                .setColor('#3061e3')
                .setImage(playlist.thumbnail)
                .setFooter({ text: `⏱️ Duração Total: ${playlist.durationFormatted}` })

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error("ERRO CAPTURADO no bloco try/catch do play (playlist):", error);
            await interaction.editReply("💥 Ocorreu um erro ao tocar a playlist");
        }
        console.log(" --- FIM DO SUBCONANDO 'PLAYLIST' ---");
    }

    else if (interaction.options.getSubcommand() === "search") {
        let query = interaction.options.getString("chaves");
        const player = client.player;

        console.log("DEBUG: --- INÍCIO DO SUBCONANDO 'SEARCH' ---");
        try {
            const { track, queue: updatedQueue } = await player.play(interaction.member.voice.channel, query, {
                member: interaction.member,
                textChannel: interaction.channel,
                interaction: interaction,
                nodeOptions: {
                    metadata: interaction.channel,
                },
                searchEngine: QueryType.AUTO
            });

            if (!track) {
                return interaction.editReply("Sem resultados para a busca.");
            }

            embed
                .setDescription(`**[${track.title}](${track.url})** foi adicionada à fila`)
                .setThumbnail(track.thumbnail)
                .setFooter({ text: `Duração: ${song.duration}` });

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error("DEBUG: ERRO CAPTURADO no bloco try/catch do play (search):", error);
            await interaction.editReply("Ocorreu um erro ao buscar e tocar a música. Por favor, verifique sua pesquisa ou tente novamente.");
        }
        console.log("DEBUG: --- FIM DO SUBCONANDO 'SEARCH' ---");
    }
}