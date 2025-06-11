import { Client, Events, GatewayIntentBits, Collection } from 'discord.js'
import fs from 'node:fs'
import path from 'node:path'
import { Player } from 'discord-player'
import dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { YouTubeExtractor } from '@discord-player/extractor'
import { YoutubeiExtractor } from "discord-player-youtubei"

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
})

client.commands = new Collection()
const commandPath = path.join(__dirname, "commands")
const commandFile = fs.readdirSync(commandPath).filter(file => file.endsWith(".js"))

for (const file of commandFile) {
	const filePath = path.join(commandPath, file)
	const { createRequire } = await import('node:module')
	const requireLocal = createRequire(import.meta.url)
	const commands = requireLocal(filePath)

	if ("data" in commands && "execute" in commands) {
		client.commands.set(commands.data.name, commands)
		console.log(commands.data.name)

	} else {
		console.log(`Esse comando em ${filePath} estao com 'data' ou execute ausente`)
	}
}

client.player = new Player(client, {
	ytdlOptions: {
		quality: 'highestaudio',
		highWaterMark: 1 << 25
	},
	ffmpeg: {
		path: 'C:\\MediaTools\\ffmpeg\\bin\\ffmpeg.exe',
		args: [
			'-loglevel', '0',
			'-ar', '48000',
			'-ac', '2',
			'-ab', '192k',
			'-f', 'mp3',
			'-i', 'pipe:0',
		]
	},
});
await client.player.extractors.loadDefault()
console.log("Extratores do Discord Player carregados com sucesso!");
try {
	client.player.extractors.register(YoutubeiExtractor, {})
	console.log("YoutubeExtractor padrão Registrado")
} catch (e) {
	console.warn("Falha ao registrar o YoutbeExtractor")
}
client.player.extractors.register(YoutubeiExtractor);
console.log("YoutubeiExtractor registrado.");

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`)
})


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return

	const command = interaction.client.commands.get(interaction.commandName)
	if (!command) {
		console.error("Comando nao encontrado")
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
		return message.reply('Ocorreu um problema ao identificar voce como membro do servidor.');
	}
})
const { CHAVE, CLIENT_ID, GUILD_ID } = process.env
client.login(CHAVE);