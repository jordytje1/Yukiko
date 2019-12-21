var discord = require("discord.js");
var superagent = require("superagent");
var xp = require('../xp.json');
var Canvas = require('canvas');

module.exports.run = async (bot, message, args) => {
    var canvas = Canvas.createCanvas(934, 282);
    var ctx = canvas.getContext('2d');
    var background = await Canvas.loadImage('https://cdn.asthriona.com/discordbotCard.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    //ctx.fillRect(260, 80, 650, 175);
    ctx.fillRect(260, 80, 650, 130);
    ctx.stroke();
    //show Username
    ctx.font = '60px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.fillText(message.author.username, 280, 141);
    //Show Level & XP
    ctx.font = '50px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.fillText("You are level " + xp[message.author.id].level +" - "+ xp[message.author.id].xp + " XP", 280, 185);
    //Show XP left
    //ctx.font = '50px sans-serif';
    //ctx.fillStyle = '#fff';
    //ctx.fillText("You need " + xp[message.author.id].xp + " befor level up.", 280, 230);
    //Show Avatar
    var avatar = await Canvas.loadImage(message.author.displayAvatarURL);
    ctx.beginPath();
    ctx.arc(140, 128, 110, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, 25, 15, 256, 256);
    var lvlimg = new discord.Attachment(canvas.toBuffer(), 'lvlup-image.png');
    message.channel.send(lvlimg);
}

module.exports.help = {
    name: "rank",
    description: "Show... bot uptime? more or less."
}
