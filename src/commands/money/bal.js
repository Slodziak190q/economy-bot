const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'bal',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.member;


        const bal = await client.bal(member.id);
        message.channel.send(bal + " kasy");
    }
}