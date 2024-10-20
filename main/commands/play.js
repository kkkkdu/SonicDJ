const { SlashCommandBuilder } = require("discord.js")
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const { execute } = require("graphql")
const ytdl = require('ytdl-core');

const PREFIX = '/';

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Adicionar música à fila"),

    async execute(interaction) {
            const args = message.content.substring(PREFIX.length).split(' ');
            const command = args.shift().toLowerCase();
            const url = args[0];
            if (!url || !ytdl.validateURL(url)) {
                return message.reply('Por favor, forneça um link válido do YouTube.');
              }


        await interaction.reply("Musica adicionada!")
        console.log(args, command)

    }
}