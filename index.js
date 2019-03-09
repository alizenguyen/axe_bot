require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()

//WHERE DATA IS STORED AT THE MOMENT ======================================
let gbSignUp = [];
let memberList = ''

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

//NOTES =====================================================
// const member = message.mentions.members.first()
// const currentUser = message.author.username

client.on('message', message => {

  //WHEN ADDING YOURSELF =====================================================
  if (message.content.startsWith('!join')) {
    const currentUser = message.author.username

    gbSignUp.push(currentUser)

    for (i = 0; i < gbSignUp.length; i++) {
      memberList += i+1 +'. ' + gbSignUp[i] + `\n`
    }
      
    message.channel.send(`${currentUser} was added.`)

    message.channel.send({
      embed: {
        color: 0x0abab5,
        fields: [{
            name: 'GUILD BATTLE SIGN UP',
            value: `${memberList}`
          },
        ],
      }
    });

    memberList = ''
  }

  //WHEN ADDING ANOTHER MEMBER =====================================================
  if (message.content.startsWith('!add')) {
    const member = message.mentions.members.first()
    
    if (!member) {
      return message.reply(`Who are you trying to add?.`)
    } else {
      gbSignUp.push(member)
    }

    for (i = 0; i < gbSignUp.length; i++) {
      memberList += i+1 +'. ' + gbSignUp[i] + `\n`
    }

    message.channel.send(`${member} was added.`)

    message.channel.send({
      embed: {
        color: 0x0abab5,
        fields: [{
            name: 'GUILD BATTLE SIGN UP',
            value: `${memberList}`
          },
        ],
      }
    });

    memberList = ''
  }

  //WHEN CLEARING LIST =====================================================
  if (message.content.startsWith('!clear')) {
    message.channel.send('Guild Battle Sign Up is Cleared.')
    gbSignUp = []
  }

})

client.login(process.env.BOT_TOKEN)

require('http').createServer().listen()
