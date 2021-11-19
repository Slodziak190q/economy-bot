const { Client, Message, MessageEmbed } = require('discord.js');
const inventory = require("../../models/inventory")
module.exports = {
    name: 'inv',
    cooldown: 0,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        inventory.findOne({ Guild: message.channel.id, User: message.author.id}, async(err, data) => {
            if(!data) return message.channel.send('You buyed nothing!')
            const mappedData = Object.keys(data.Inventory)
            .map((key) => {
                return  `${key}(${data.Inventory[key]})`;
            })
            .join(", ");

            message.channel.send("mappedData")
        } )
    }
}