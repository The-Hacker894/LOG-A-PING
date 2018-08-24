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
const prefix = config.prefix

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
    if(!fs.existsSync(`./data/logs`)) { // Checks to make sure the log folder exists, because GitHub deletes empty folders
    fs.mkdirSync(`./data/logs`)
    }
    if(!fs.existsSync(`./data/tmp`)) {
        fs.mkdirSync(`./data/tmp`)
    }

    if(!fs.existsSync(`./data/tmp/timeout.json`)) {
        var obj = {
            time: null
        }
        var timeObj = JSON.stringify(obj, null, 2)
        fs.writeFileSync(`./data/tmp/timeout.json`, timeObj, function(err) {
            if(err) return console.log(err)
        })
    }


})


client.on("message", (message) => {
    const triggerWord = new RegExp(`^<@!?${client.user.id}>`);
    const trigger = message.content.match(triggerWord) ? message.content.match(triggerWord)[0] : '!';

    fs.readFile(`./data/tmp/timeout.json`, 'utf8', function(err, timeoutData) {
    var timeout = JSON.parse(timeoutData)
    if(message.channel.type == 'text') {
        if(!timeout.time == null) return;
        if(message.author.id == client.user.id) return;
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

            if(!message.member.hasPermission('MENTION_EVERYONE')) return;

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
            if(!message.member.hasPermission('MENTION_EVERYONE')) return;

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
        if(!timeout.time == null) return;

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
            var filename = `./data/logs/${moment().format('MMMM Do YYYY, h:mm:ss a')}.dm.json`
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
            var filename = `./data/logs/${moment().format('MMMM Do YYYY, h:mm:ss a')}.dm.here.json`
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
            var filename = `./data/logs/${moment().format('MMMM Do YYYY, h:mm:ss a')}.dm.everyone.json`
            fs.writeFile(filename, log, function(err) {
                if(err) return console.log(err)
                console.log('[PING ALERT] Check ' + filename + ' for more details')
            })
            return;
        }
        return;
    }
})
    
})

client.on("message", (message) => {
    const args = message.content.split(" ");
    const command = message.content.split(" ")[0]

    if(message.author.bot || !command.startsWith(prefix) || message.channel.type == 'dm') return;
    if(message.author.id !== client.user.id) return;

    const cmd = client.commands.get(command.slice(prefix.length))
  if(cmd)
    cmd.run(client, message, args, config)
})

client.on("error", (error) => {
    console.log('A WebSocket error has occured: ' + error)
    });

    client.commands = new Discord.Collection();
    fs.readdir("./data/commands", (err, files) => {
      if(err) console.error(err)
      const jsFiles = files.filter(f => f.split(".").pop() === "js")
      if(jsFiles.length <= 0) {
        console.log("No commands loaded")
        return;
      }
      console.log('[Commands Loaded] ' + jsFiles.length)
  
      jsFiles.forEach((f, i) => {
        const props = require("./data/commands/" + f)
        client.commands.set(props.help.name, props)
      })
    })
client.login(token)
