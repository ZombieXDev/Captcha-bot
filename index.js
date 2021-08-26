const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});

const Discord = require('discord.js')
const client = new Discord.Client()




const prefix = "Your Prefix"




const Database = require('st.db')
const db = new Database('setting')
client.on("ready", () => {
  console.log(`[ - Bot is Online - ]`);
  console.log(`Name Bot : ${client.user.username}`);
  console.log(`Guilds : ${client.guilds.cache.size}`);
  console.log(`Users : ${client.users.cache.size}`);
  console.log(`Channels : ${client.channels.cache.size}`);
  client.user.setActivity(`${prefix}help`, {
    type: "PLAYING"
  });
});
client.on("message", message =>{
if(message.content === prefix + "help"){
const embed = new Discord.MessageEmbed()
.setTitle("Captcha Bot")
.setColor("BLUE")
.setThumbnail(message.guild.iconURL())
.addField(`${prefix}set-role`, "To Change Captcha Role", true)
.addField(`${prefix}set-ch`, "To Change Captcha Channel", true)
.addField(`${prefix}verify`, "To verify user", true)
.setFooter("Developer:! ZombieX#0001")
message.channel.send(embed)
}
})


client.on("message", message =>{
if(message.content.startsWith(prefix + "set-role")){
if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("You Dont Have ADMINISTRATOR permission")

const role = message.mentions.roles.first()
db.set("role", role.id)
const embed = new Discord.MessageEmbed()
.setTitle("Done Changed Role")
.setColor("GREEN")
message.channel.send(embed)
}
})

client.on("message", message =>{
if(message.content.startsWith(prefix + "set-ch")){
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("You Dont Have ADMINISTRATOR permission")

const ch = message.mentions.channels.first()
db.set("ch", ch.id)
const embed = new Discord.MessageEmbed()
.setTitle("Done Changed Channel")
.setColor("GREEN")
message.channel.send(embed)
}
})

client.on("message", message =>{
if(message.channel.id !== `${db.fetch("ch")}`) return;
    if (message.author.bot) return;
if(message.content === prefix + "verify"){
const c = [
"https://captcha.com/images/captcha/botdetect3-captcha-meltingheat.jpg", 
"https://captcha.com/images/captcha/botdetect3-captcha-meltingheat2.jpg", 
"https://captcha.com/images/captcha/botdetect3-captcha-negative.jpg", 
"https://captcha.com/images/captcha/botdetect3-captcha-neon.jpg", 
"https://captcha.com/images/captcha/botdetect3-captcha-neon2.jpg", 
"https://captcha.com/images/captcha/botdetect3-captcha-overlap.jpg", 
"https://captcha.com/images/captcha/botdetect3-captcha-overlap2.jpg", 
"https://captcha.com/images/captcha/botdetect3-captcha-paintmess.jpg", 
"https://captcha.com/images/captcha/botdetect3-captcha-radar.jpg", 
"https://captcha.com/images/captcha/botdetect3-captcha-ripple.jpg" 
  
]
const cc = [
"JA3V8", 
"HJ9PV", 
"459CT",
"D4TSH", 
"HAPK3", 
"6H3T8", 
"YU4RT", 
"HWJRC", 
"D35UA", 
"HSD5A"  
]
  let cap = Math.floor(Math.random() * cc.length)
const embed = new Discord.MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL())
.setColor("BLUE")
.setDescription("Write the symbols in the picture to take the role")
.setImage(c[cap])
.setFooter("You have 15 seconds")
.setTimestamp()
message.channel.send(embed)
      .then(() => {
  var filter = m => m.content.includes(cc[cap]) && m.author.id == message.author.id;
  message.channel.awaitMessages(filter ,{
    max: 1,
    time: 15000,
    errors: ['time'],
  }) 
      .then((collected) =>{
      let role = message.guild.roles.cache.get(db.fetch("role"));
let member = message.member;
member.roles.add(role).catch(console.error); 
const embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setTitle("✅ | Done Give The Role")
message.channel.send(embed)
    })
    .catch(() => {
 const embed = new Discord.MessageEmbed()
.setColor("RED")
.setTitle("🕘 | time is over")
message.channel.send(embed)
    });
}) 
}
})





client.login(process.env.token).catch(() => {
  console.log("Token Invalid")
})
