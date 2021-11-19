const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'work',
    cooldown: 1800000,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const jobs = ['Programer', 'Budulier','Teacher', 'Bus Men', 'Boss', 'Car repair shop', 'Doc']
        const job = Math.floor(Math.random() * jobs.length);
        const coins = Math.floor(Math.random() * 200) + 1;

        message.channel.send(`You worked as **${jobs[job]}** and got **${coins}** coins!`);
        client.add(message.author.id, coins);
    }
}