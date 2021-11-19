const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'DoubleOrNothing',
    cooldown: 0,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!args[0]) return message.reply("Enter the Amount to Bet");
        
        if(isNaN(args[0])) return message.reply('Enter the amount to bet on');

        const amountToBet = parseInt(args[0]);

        if(await client.bal(message.author.id) < amountToBet) return message.reply("Jesteś zbyt biedny żeby postawić aż tyle pieniędzy!");

        function random() {
            const num = Math.floor(Math.random() * 2);
            return num === 1;
        };

        if(random() === true) {
            const winAmount = amountToBet * 2;
            message.channel.send(`Congrats! You win ${winAmount} coins!`);
            client.add(message.author.id, winAmount)
        } else {
            message.channel.send(`You losed. We removed ${amountToBet} coins from your bal! `);
            client.rmv(message.author.id, amountToBet)
        }
    }
}