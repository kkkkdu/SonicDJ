import { SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
        .setName("continue")
        .setDescription("Retomar a música")
        
        export async function execute ({client, interaction}) {
            const queue = client.player.getQeue(interaction.guild)

            if(!queue){
                await interaction.reply("Não há música na fila")
                return
            }
            queue.setPause(false)

            await interaction.reply("A Música foi retomada")
        }
        
