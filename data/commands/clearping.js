const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const fs = require('fs')
const fse = require('fs-extra')
module.exports.run = (client, message, args, config) => {

    if(fs.existsSync(`./data/logs`)) {
        fse.remove(`./data/logs`).then( () => {
            fs.mkdirSync(`./data/logs`)
            message.channel.send('Logs cleared')
        })
    }

}
module.exports.help = {
    name: "clearping",
    info: "Clear ping logs"
}