const { Client, Events, GatewayIntentBits } = require ('discord.js')
const fs = require ("node:fs")
const path = require("node:path")

const commandPath = path.join(__dirname, "commands")
const commandFile = fs.readdirSync(commandPath).filter(file => file.endsWith(".js"))
console.log(commandFile)

for (const file of commandFile){
	const filePath = path.join(commandPath, file)
	const commands = require(filePath)
	console.log(commands)

}

const dotenv = require('dotenv')
dotenv.config()


const{ CHAVE, CLIENT_ID, GUILD_ID} = process.env
const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`)
})

client.login(CHAVE);