const dotenv = require('dotenv')
dotenv.config()

const { Client, Events, GatewayIntentBits, Collection } = require('discord.js')
const fs = require("node:fs")
const path = require("node:path")
const { Player } = require("discord-player")

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.commands = new Collection()
const commandPath = path.join(__dirname, "commands")
const commandFile = fs.readdirSync(commandPath).filter(file => file.endsWith(".js")) 

for (const file of commandFile) {
	const filePath = path.join(commandPath, file)
	const commands = require(filePath)
	if ("data" in commands && "execute" in commands) {
		client.commands.set(commands.data.name, commands)
		console.log(commands.data.name)

	} else {
		console.log(`Esse comando em ${filePath} está com 'data' ou execute ausente`)
	}
}

client.player = new Player(client, {
	ytdlOptions: {
		quality: 'highestaudio',
        highWaterMark: 1 << 25
    }
})



client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`)
})


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return
	
	const command = interaction.client.commands.get(interaction.commandName)
	if (!command) {
		console.error("Comando não encontrado")
		return
	}
	try {
		await command.execute([client, interaction])

	} catch (error) {
		console.error(error)
		await interaction.reply("Houve um erro ao executar esse comando")
	}
})

client.on('messageCreate', async (message) => {
	if (message.author.bot) return;
  
	const member = message.member;
  
	if (!member) {
	  return message.reply('Ocorreu um problema ao identificar você como membro do servidor.');
	}
}) 


const { CHAVE, CLIENT_ID, GUILD_ID } = process.env
client.login(CHAVE);