const { Client, Message, MessageEmbed } = require('discord.js');
const inventory = require("../../models/inventory");
const items = require("../../shopitems");

module.exports = {
    name: 'buy',
    cooldown: 0,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!args[0]) return message.channel.send("Type Item to BUY!")
        const itemToBuy = args[0].toLowerCase();

        const validItem = !!items.find((val) => val.item.toLowerCase() === itemToBuy)
        if(!validItem) return message.reply("This item don't exsist");

        const itemPrice = items.find((val) => val.item.toLowerCase() === itemToBuy)
           .price;

        const userBalance = await client.bal(message.author.id);
        if (userBalance < itemPrice)
          return message.reply(
              `You have only ${userBalance} coins, Price of this item is ${itemPrice} coins!`
          );


        const params = {
            Guild: message.guild.id,
            User: message.author.id,
        };
        inventory.findOne(params, async (err, data) => {
            if (data) {
                const hasItem = Object.keys(data.Inventory).includes(itemToBuy);
                if (!hasItem) {
                    data.Inventory[itemToBuy] = 1;
                } else {
                    data.Inventory[itemToBuy]++;
                }
                await inventory.findOneAndUpdate(params, data);
             } else {
                 new inventory({
                     Guild: message.guild.id,
                     User: message.author.id,
                     Inventory: {
                         [itemToBuy]: 1,
                     },
                 }).save();
            } 
            message.channel.send(`You buyed ${itemToBuy} !`) 
            client.rmv(message.author.id, itemPrice);
        });
    },
};