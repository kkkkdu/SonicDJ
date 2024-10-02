const {REST, Routes} = require ("discord.js")
const fs = require("node:fs")
const path = require("node:path")
const dotenv = require('dotenv')
dotenv.config()


const { CHAVE, CLIENT_ID, GUILD_ID } = process.env
const commandPath = path.join(__dirname, "commands")
const commandFile = fs.readdirSync(commandPath).filter(file => file.endsWith(".js"))
const commands = []


for (const file of commandFile) {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}


const rest = new REST({version: "10"}).setToken(CHAVE);

(async () => {
    try {
        console.log(`Resetando ${commands.length} comandos...`)   
        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            {body: commands}
        )
        console.log("Comandos Resgistrados com Sucesso")
    }
    catch(error){
        console.error(error)
    }
})()
