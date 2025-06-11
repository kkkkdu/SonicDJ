import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'

const exampleEmbed = new EmbedBuilder()
.setColor(0x17569b)
.setTitle('SonicDJ')
.setURL('https://discord.com/oauth2/authorize?client_id=1286416398423425037')
.setAuthor({ name: 'SonicDJ', url: 'https://discord.js.org' })
.setDescription('Sonico Musical!!')
.setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP5KwuGyF4gkJ59GuDw9EPtfQdr6jMulyaKA&s')
.addFields(
    { name: 'Segue as infos do bot bro', value: 'Infos do bot:' },
)
.setImage('https://m.media-amazon.com/images/I/41lxaqxy8oL._UXNaN_FMjpg_QL85_.jpg')
.setTimestamp(Date.now())
.setFooter({ text: 'SonicHeroes', iconURL: 'https://m.media-amazon.com/images/I/41lxaqxy8oL._UXNaN_FMjpg_QL85_.jpg' });

export const data = new SlashCommandBuilder()
        .setName("info")
        .setDescription("Descricao e commands!")

    export async function execute([client,interaction]) {
        const commandList = client.commands.map(command => {
        return `\`/${command.data.name}\`: ${command.data.description}`;
    }).join('\n')

    exampleEmbed.setFields([
        { name: 'Segue as infos do bot bro', value: commandList, inline: false },
    ]);
        await interaction.reply({ embeds: [exampleEmbed] }); 
}

    
