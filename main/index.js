const { Client, Events, GatewayIntentBits } = require ('discord.js')

const dotenv = require('dotenv')
dotenv.config()

const{ CHAVE, CLIENT_ID, GUILD_ID} = process.env

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`)
})

client.login(CHAVE);