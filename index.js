require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()

//WHERE DATA IS STORED AT THE MOMENT ======================================
let gbSignUp = [];
let gbMemberList = [];
let count = 0;
let memberList = '';

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
    gbMemberList.push(currentUser);
    
    count = count + 1
    
    memberList += count +'. ' + currentUser + `\n`
      
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
  }

  //WHEN ADDING ANOTHER MEMBER =====================================================
  if (message.content.startsWith('!add')) {
    // const member = message.mentions.members.first()
    const member = message.content.substring(5);

    count = count + 1
    
    if (!member) {
      return message.reply(`Who are you trying to add?.`)
    } else {
      memberList += count +'. ' + member + `\n`
      gbMemberList.push(member);
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
  }

  //WHEN CLEARING LIST =====================================================
  if (message.content.startsWith('!clear')) {
    message.channel.send('Guild Battle Sign Up is Cleared.')
    count = 0;
    memberList = ''
    gbMemberList = [];
  }

  //WHEN VIEWING MEMBER LIST =====================================================
  if (message.content.startsWith('!view')) {
    if (memberList === '') {
      message.channel.send('No one signed up.')
    } else {
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
    };
  }

  //WHEN REMOVING A MEMBER =====================================================
  if (message.content.startsWith('!remove')) {
    const removedMember = message.content.substring(8).toLowerCase();

    for (i = 0; i < gbMemberList.length; i++) {
      const char = gbMemberList[i].toLowerCase();

      if (char === removedMember){
          gbMemberList.splice(i, 1);
      }
    }

    count = 0;
    memberList = '';

    for (i = 0; i < gbMemberList.length; i++) {
      count = count + 1
      memberList += count +'. ' + gbMemberList[i] + `\n`
    }

    message.channel.send(`${removedMember} was removed.`)

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
  }
})

client.login(process.env.bot_token)
  .catch( error => console.log(error))

// client.login('')
//   .catch( error => console.log(error))

require('http').createServer().listen()
