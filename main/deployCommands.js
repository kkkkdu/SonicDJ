import { REST, Routes } from 'discord.js'
import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname } from 'node:path'

dotenv.config()


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const { CHAVE, CLIENT_ID, GUILD_ID } = process.env

const commandPath = path.join(__dirname, "commands")
const commandFile = fs.readdirSync(commandPath).filter(file => file.endsWith(".js"))
const commands = []



for (const file of commandFile) {
    const filePath = path.join(commandPath, file)
    try {
        const fileUrl = pathToFileURL(filePath).href
        const commandModule = await import(fileUrl) 
        
        if (commandModule.data) {
            commands.push(commandModule.data.toJSON())
        } else {
            console.warn(`[AVISO] O comando em ${filePath} não exporta uma propriedade 'data'.`)
        }
    } catch (error) {
        console.error(`[ERRO] Falha ao carregar o comando ${filePath}:`, error)
    }
}


const rest = new REST({version: "10"}).setToken(CHAVE);

(async () => {
    try {
        console.log(`Registrando ${commands.length} comandos...`)   
        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            {body: commands}
        )
        console.log("Comandos Resgistrados com Sucesso")
    }
    catch(error){
        console.error("[Erro nos Registros]", error)
    }
})()
