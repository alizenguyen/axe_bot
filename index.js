const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!')
  }
})

client.login('NTUzODI4ODgwOTM1Mjg4ODMz.D2TyNw.RITrj_QHkXIsNth6cvLNWOUpcq0')