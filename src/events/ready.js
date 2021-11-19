const client = require('../../src/index');

client.on('ready', async () => {
    console.log(`${client.user.tag} is now online!`);
    client.user.setActivity("Your Custom Status! (set it in ready.js)!")
});

