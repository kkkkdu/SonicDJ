const { SlashCommandBuilder, Client } = require("discord.js")
const { execute } = require("graphql")
const { AttachmentBuilder } = require('discord.js');
const file = new AttachmentBuilder('../assets/discordjs.png');


module.exports = exampleEmbed = {
        title: 'Some title',
        image: {
            url: 'attachment://discordjs.png',
        },
    
 
     async execute(interaction) {
        
        channel.send({ embeds: [exampleEmbed], files: [file] });
        
 
     }
 }


 




