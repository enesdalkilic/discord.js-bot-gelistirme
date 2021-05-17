module.exports = {
    name: "test",
    aliases: ["testet", "testkomutu"],
    execute (client, message, args) {
        message.channel.send('Başarılı!')
    }
}