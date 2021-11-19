const { Collection, Client, Discord, MessageEmbed } = require('discord.js');
const client = new Client({
    disableMention: 'everyone'
});
const schema = require('./schema')
const mongo = require('mongoose')

mongo.connect("Your MongoDB url!", {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
const prefix = '%'
const path = require('path')
const fs = require('fs')
const config = require('./config.json');
module.exports = client;
client.commands = new Collection();
client.prefix = config.prefix;
client.aliases = new Collection();
client.categories = fs.readdirSync(path.resolve('src/commands'));
["command"].forEach(handler => {
    require(path.resolve(`src/handlers/${handler}`))(client);
});


// functions
client.bal = (id) => new Promise(async ful => {
    const data = await schema.findOne({ id });
    if(!data) return ful(0);
    ful(data.coins);
})
client.add = (id,coins) => {
    schema.findOne({ id }, async(err,data) => {
        if(err) throw err;
        if(data) {
            data.coins += coins;
        } else {
            data = new schema({ id,coins })
        }
        data.save();
    })
}

client.rmv = (id,coins) => {
    schema.findOne({ id }, async(err,data) => {
        if(err) throw err;
        if(data) {
            data.coins -= coins;
        } else {
            data = new schema({ id,coins: -coins})
        }
        data.save();
    })
}

client.login(config.token);





client.on('message', (message) => {
    if(message.content === '%help') {
        message.channel.send("%work, %daily, %buy (item name) , %shop , %DoubleOrNothing , %bal ")
    }
})