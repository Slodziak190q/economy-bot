const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'daily',
    cooldown: 86400000,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const coins = Math.floor(Math.random() * 2000) + 1;

        message.channel.send(`You got **${coins}** coins! Come back here in 24h!`);
        client.add(message.author.id, coins);
    }
}