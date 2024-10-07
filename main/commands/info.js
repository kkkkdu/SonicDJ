const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { execute } = require("graphql")

const exampleEmbed = new EmbedBuilder()
.setColor(0x17569b)
.setTitle('SonicDJ')
.setURL('https://discord.com/oauth2/authorize?client_id=1286416398423425037')
.setAuthor({ name: 'SonicDJ', url: 'https://discord.js.org' })
.setDescription('Sonico Musical!!')
.setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP5KwuGyF4gkJ59GuDw9EPtfQdr6jMulyaKA&s')
.addFields(
    { name: 'Segue as infos do bot bro', value: 'Infos do bot:' },
    // { name: '\u200B', value: '\u200B' },
    // { name: 'Inline field title', value: 'Some value here', inline: true },
)
.setImage('https://m.media-amazon.com/images/I/41lxaqxy8oL._UXNaN_FMjpg_QL85_.jpg')
.setTimestamp(Date.now())
.setFooter({ text: 'SonicHeroes', iconURL: 'https://m.media-amazon.com/images/I/41lxaqxy8oL._UXNaN_FMjpg_QL85_.jpg' });

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Descrição e git commands!"),

    async execute(interaction) {
        console.log(interaction)
        await interaction.channel.send({ embeds: [exampleEmbed] })

    }
}