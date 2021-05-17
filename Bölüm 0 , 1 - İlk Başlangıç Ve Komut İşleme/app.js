const Discord = require('discord.js'),
    fs = require("fs"),
    client = new Discord.Client();

require("dotenv").config();

client.commands = new Discord.Collection();

fs.readdir('./commands', (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        const props = require('./commands/' + file);
        client.commands.set(props.name, props);
    });
});


client.on("ready", () => {
    console.log('Bot çalışıyor')
});


client.on("message", msg => {
    var prefix = process.env.PREFIX
    if (msg.content.startsWith(prefix)) {
        var args = msg.content.slice(prefix.length).trim().split(/ +/g)
        var command = args[0];
        args = args.slice(1)
        var cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))
        if (!cmd) return;
        cmd.execute(client, msg, args);
    };
});

client.login(process.env.TOKEN)