import { SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pausar a musica")
        
        export async function execute ({client, interaction}) {
            const queue = client.player.getQeue(interaction.guild)

            if(!queue){
                await interaction.reply("Nao existem musicas na fila")
                return
            }
            queue.setPause(true)

            await interaction.reply("A Música foi interrompida")
        }
        
