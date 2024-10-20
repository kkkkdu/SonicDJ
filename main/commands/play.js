const { SlashCommandBuilder } = require("discord.js")
const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Adicionar músicas ao Bot!")
    .addSubcommand(subcommand =>
      subcommand
        .setName("musica")
        .setDescription("Tocar musicas do youtube")
        .addStringOption(option =>
          option
            .setName("url")
            .setDescription("Insira Url da música")
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
        .setName("-search")
        .setDescription("Irá buscar por uma música")
        .addStringOption(option =>
          option
            .setName("chaves")
            .setDescription("Buscar palavras Chaves")
            .setRequired(true)
        )

    ),
  async execute({ client, interaction }) {
    if (!interaction.member.voice.channel) {
      return interaction.reply("Você precisa estar em um canal de voz")
    }
    const queue = await client.player.createQueue(interaction.guild)

    if (!queue.connection) await queue.connect(interaction.member.voice.channel)

    let embed = new MessageEmbed()

    if (interaction.options.getSubcommand() == "song") {
      let url = interaction.options.getString("url")

      const result = await client.player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.YOUTUBE_VIDEO
      })
      if (result.tracks.length === 0) {
        await interaction.reply("Sem resultado")
        return
      }

      const song = result.tracks[0]
      await queue.addTrack(song)

      embed
        .setDescription(`Adicionada **[${song.title}] (${song.url})** à fila`)
        .setThumbnail(song.thumbnail)
        .setFooter({ text: `Duration ${song.duration}` })
    }
    else if (interaction.options.getSubcommand() === "playlist") {

      let url = interaction.options.getString("url")
      const result = await client.player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.YOUTUBE_PLAYLIST
      })

      if (result.tracks.length === 0) {
        return interaction.reply(`Nenhuma playlist encontrada ${url}`)
      }


      const playlist = result.playlist
      await queue.addTracks(result.tracks)
      embed
        .setDescription(`**${result.tracks.length} músicas de [${playlist.title}](${playlist.url})** foram adicionadas à fila`)
        .setThumbnail(playlist.thumbnail)

    }
    else if (interaction.options.getSubcommand() === "search") {


      let url = interaction.options.getString("chaves")
      const result = await client.player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO
      })
      if (result.tracks.length === 0)
        return interaction.editReply("Sem resultados para a busca")
      const song = result.tracks[0]
      await queue.addTrack(song)
      embed
        .setDescription(`**[${song.title}](${song.url})** foi adicionada a fila`)
        .setThumbnail(song.thumbnail)
        .setFooter({ text: `Duration: ${song.duration}` })
    }
    if (!queue.playing) await queue.play()
    await interaction.reply({
      embeds: [embed]
    })

    client.on('messageCreate', async (message) => {
      if (message.author.bot) return;
    
      const member = message.member;
    
      if (!member) {
        return message.reply('Ocorreu um problema ao identificar você como membro do servidor.');
      }
    
    });

  }

}











