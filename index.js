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
    if (message.member.permissions.has('ADMINISTRATOR')) {
      // const member = message.mentions.members.first()
      const member = message.content.substring(5);

      count = count + 1
      
      if (!member) {
        return message.reply(`Who are you trying to add?`)
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
    } else {
      message.channel.send('Sorry, only the MacDaddy can do that.')
    }
  }


  //WHEN CLEARING LIST =====================================================
  if (message.content.startsWith('!clear')) {
    if (message.member.permissions.has('ADMINISTRATOR')) {
      message.channel.send('Guild Battle Sign Up is Cleared.')
      count = 0;
      memberList = ''
      gbMemberList = [];
    } else {
      message.channel.send('Sorry, only the MacDaddy can do that.')
    }
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
    if (message.member.permissions.has('ADMINISTRATOR')) {
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
    } else {
      message.channel.send('Sorry, only the MacDaddy can do that.')
    }
  }

  //WHEN LEAVING =====================================================
  if (message.content.startsWith('!leave')) {
    const currentUser = message.author.username.toLowerCase();

    for (i = 0; i < gbMemberList.length; i++) {
      const char = gbMemberList[i].toLowerCase();

      if (char === currentUser){
          gbMemberList.splice(i, 1);
      }
    }

    count = 0;
    memberList = '';

    for (i = 0; i < gbMemberList.length; i++) {
      count = count + 1
      memberList += count +'. ' + gbMemberList[i] + `\n`
    }

    message.channel.send(`${currentUser} was removed.`)

    if (memberList.length !== 0) {
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
    } else {
      message.channel.send('No one is prepared for battle. Cries.')
    }
  }
})

// client.login(process.env.bot_token)
//   .catch( error => console.log(error))

client.login('NTU0MzU1Nzc1MTY2NzQyNTMz.D2iVkQ.ptE7suiEDPaKCRUG3t070MdbkWU')
  .catch( error => console.log(error))

require('http').createServer().listen()
