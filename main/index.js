const { Client, Events, GatewayIntentBits, Collection } = require('discord.js')
const fs = require("node:fs")
const path = require("node:path")

const dotenv = require('dotenv')
dotenv.config()
const { CHAVE, CLIENT_ID, GUILD_ID } = process.env
const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`)
})
client.login(CHAVE);
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


client.on(Events.InteractionCreate, async interaction =>{
	if (!interaction.isChatInputCommand()) return
	const command = interaction.client.commands.get(interaction.commandName)
	if (!command) { 
		console.error("Comando não encontrado") 
		return
	}
	try{
		await command.execute(interaction)

	}catch(error) {
		console.error(error)
		console.log(`Log de args e message`, args, message)
		await interaction.reply("Houve um erro ao executar esse comando")
	}
} )