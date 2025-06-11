import { SlashCommandBuilder } from "discord.js"

export const data = new SlashCommandBuilder()
        .setName("ping")
        .setDescription("PONG!")

    export async function execute([client, interaction]) {
        
        await interaction.reply("PONG!")

    }
