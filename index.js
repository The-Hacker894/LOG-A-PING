const fs = require('fs')

fs.readFile("./data/startup.txt", 'utf8', function(err, data) {
    if(err) return console.log('STARTUP FILE DOES NOT EXIST')

    console.log(data)
})


const Discord = require("discord.js");
const client = new Discord.Client({autoReconnect:true});
const config = require('./data/config.json')
const token = config.token // Place yo token in the config.json boi
const moment = require('moment')

/*
    REQUESTED BY raizo#0001
*/

client.on("ready", () => {
    console.log("Logged on as " + client.user.tag)
    console.log("Client ID -> " + client.user.id)


    // Just to make sure we have the config.json
    if(!fs.existsSync(`./data/config.json`)) {
        setInterval(() => {
            console.log("./data/config.json does not exist")
        }, 2000)
    }
})

client.on("message", (message) => {
    const triggerWord = new RegExp(`^<@!?${client.user.id}>`);
    const trigger = message.content.match(triggerWord) ? message.content.match(prefixMention)[0] : '!';

    if(message.channel.type == 'text') {
        if(message.content.includes(`${trigger}`)) {
            var obj = {
                time: moment().format('MMMM Do YYYY, h:mm:ss a'),
                user: message.author.tag,
                userID: message.author.id,
                channelName: message.channel.name,
                channelID: message.channel.id,
                guildName: message.guild.name,
                guildID: message.guild.id,
                messageContent: message.content,
                messageContentLength: message.content.length,
                pingType: "mention"
            }
            var log = JSON.stringify(obj, null, 2)
            var filename = `./data/logs/${moment().format('MMMM Do YYYY, h:mm:ss a')}.mention.json`
            fs.writeFile(filename, log, function(err) {
                if(err) return console.log(err)
                console.log('[PING ALERT] Check ' + filename + ' for more details')
            })
            return;
        }
        if(message.content.includes(`@here`)) {
            var obj = {
                time: moment().format('MMMM Do YYYY, h:mm:ss a'),
                user: message.author.tag,
                userID: message.author.id,
                channelName: message.channel.name,
                channelID: message.channel.id,
                guildName: message.guild.name,
                guildID: message.guild.id,
                messageContent: message.content,
                messageContentLength: message.content.length,
                pingType: "@here"
            }
            var log = JSON.stringify(obj, null, 2)
            var filename = `./data/logs/${moment().format('MMMM Do YYYY, h:mm:ss a')}.here.json`
            fs.writeFile(filename, log, function(err) {
                if(err) return console.log(err)
                console.log('[PING ALERT] Check ' + filename + ' for more details')
            })
            return;
        }
        if(message.content.includes(`@everyone`)) {
            var obj = {
                time: moment().format('MMMM Do YYYY, h:mm:ss a'),
                user: message.author.tag,
                userID: message.author.id,
                channelName: message.channel.name,
                channelID: message.channel.id,
                guildName: message.guild.name,
                guildID: message.guild.id,
                messageContent: message.content,
                messageContentLength: message.content.length,
                pingType: "@everyone"
            }
            var log = JSON.stringify(obj, null, 2)
            var filename = `./data/logs/${moment().format('MMMM Do YYYY, h:mm:ss a')}.everyone.json`
            fs.writeFile(filename, log, function(err) {
                if(err) return console.log(err)
                console.log('[PING ALERT] Check ' + filename + ' for more details')
            })
            return;
        }
        return;
    }
    if(message.channel.type == 'dm') {
        if(message.content.includes(`${trigger}`)) {
            var obj = {
                time: moment().format('MMMM Do YYYY, h:mm:ss a'),
                user: message.author.tag,
                userID: message.author.id,
                channelID: message.channel.id,
                messageContent: message.content,
                messageContentLength: message.content.length,
                pingType: "mention"
            }
            var log = JSON.stringify(obj, null, 2)
            var filename = `./data/logs/${moment().format('MMMM Do YYYY, h:mm:ss a')}.mention.json`
            fs.writeFile(filename, log, function(err) {
                if(err) return console.log(err)
                console.log('[PING ALERT] Check ' + filename + ' for more details')
            })
            return;
        }
        if(message.content.includes(`@here`)) {
            var obj = {
                time: moment().format('MMMM Do YYYY, h:mm:ss a'),
                user: message.author.tag,
                userID: message.author.id,
                channelID: message.channel.id,
                messageContent: message.content,
                messageContentLength: message.content.length,
                pingType: "@here"
            }
            var log = JSON.stringify(obj, null, 2)
            var filename = `./data/logs/${moment().format('MMMM Do YYYY, h:mm:ss a')}.here.json`
            fs.writeFile(filename, log, function(err) {
                if(err) return console.log(err)
                console.log('[PING ALERT] Check ' + filename + ' for more details')
            })
            return;
        }
        if(message.content.includes(`@everyone`)) {
            var obj = {
                time: moment().format('MMMM Do YYYY, h:mm:ss a'),
                user: message.author.tag,
                userID: message.author.id,
                channelID: message.channel.id,
                messageContent: message.content,
                messageContentLength: message.content.length,
                pingType: "@everyone"
            }
            var log = JSON.stringify(obj, null, 2)
            var filename = `./data/logs/${moment().format('MMMM Do YYYY, h:mm:ss a')}.everyone.json`
            fs.writeFile(filename, log, function(err) {
                if(err) return console.log(err)
                console.log('[PING ALERT] Check ' + filename + ' for more details')
            })
            return;
        }
        return;
    }
    
})
client.login(token)
