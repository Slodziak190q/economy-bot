const { Client, Message, MessageEmbed } = require('discord.js');
const items = require("../../shopitems");

module.exports = {
    name: 'shop',
    cooldown: 0,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(items.length === 0) return message.reply('there is no items for sale!')

        const shopList = items
          .map((value, index) => {
              return `**${index+1}** ${value.item} -> ${value.price} kasy!`
          })

          message.channel.send(shopList);
    }
}