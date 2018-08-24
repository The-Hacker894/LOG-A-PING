const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const fs = require('fs')
const ms = require('ms');
module.exports.run = (client, message, args, config) => {
    var tO = message.content.split(' ').slice(1).join(' ')

    if(tO.length < 1) return message.channel.send('***Timeout not specified:***\nTry `' + config.prefix + 'timeout 3 minutes`')

    if(!fs.existsSync(`./data/tmp`)) {
        fs.mkdirSync(`./data/tmp`)
    }

    var time = ms(tO).catch(console.error)

    var obj = {
        time: time,
        start: moment().format('h:mm:ss a')
    }
    var timeObj = JSON.stringify(obj, null, 2)

    fs.writeFile(`./data/tmp/timeout.json`, timeObj, function(err) {
        if(err) return console.log(err)
        message.channel.send('Timeout saved!')
    })

    setTimeout( () => {
        var newObj = {
            time: null,
            start: null
        }
        var newTimeObj = JSON.stringify(newObj, null, 2)
        fs.writeFile(`./data/tmp/timeout.json`, newTimeObj, function(err) {
            if(err) return console.log(err)
            console.log('Timeout Finished')
        }, time)
    })
}
module.exports.help = {
    name: "timeout",
    info: "Timeout logging"
}