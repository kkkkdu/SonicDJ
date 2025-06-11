import { SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
        .setName("sair")
        .setDescription("Sair da chamada")
        
        export async function execute ({client, interaction}) {
            const queue = client.player.getQeue(interaction.guild)

            if(!queue){
                await interaction.reply("Não há música na fila")
                return
            }
            queue.destroy()

            await interaction.reply("Você se tornou um vilão de primeira linha, Doutor!")
        }