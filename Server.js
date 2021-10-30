const { Client, Collection, MessageEmbed } = require('discord.js');
const { REST } = require('@discordjs/rest');
const db = require("quick.db");
const fetch = require("node-fetch");
require("express")().listen(1343);
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const client = new Client({
  intents: [
    'GUILDS',
    'GUILD_MEMBERS',
    'GUILD_BANS',
    'GUILD_EMOJIS_AND_STICKERS',
    'GUILD_INTEGRATIONS',
    'GUILD_WEBHOOKS',
    'GUILD_INVITES',
    'GUILD_VOICE_STATES',
    'GUILD_PRESENCES',
    'GUILD_MESSAGES',
    'GUILD_MESSAGE_REACTIONS',
    'GUILD_MESSAGE_TYPING',
    'DIRECT_MESSAGES',
    'DIRECT_MESSAGE_REACTIONS',
    'DIRECT_MESSAGE_TYPING',
  ]
});


const express = require("express");
const app = express(); 
const http = require("http");
app.get("/", (request, response) => {
  console.log("Pinglenmedi.");
  response.sendStatus(200);
}); 

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

setInterval(() => {
  var links = db.get("linkler");
  if (!links) return;
  var linkA = links.map(c => c.url);
  linkA.forEach(link => {
    try {
      fetch(link);
    } catch (e) {
      console.log("" + e);
    }
  });
  console.log("Pinglendi.");
}, 60000);

client.on("ready", () => {
 if (!Array.isArray(db.get("linkler"))) {
    db.set("linkler", []);
  }
});

const token = 'token' || process.env.token;
const rest = new REST({ version: '9' }).setToken(token);
const cmd = [
   {
    name: require('./komutlar/show').name,
    description: require('./komutlar/show').description,
    options: require('./komutlar/show').options,
    type: 1
  }, {
    name: require('./komutlar/yardım').name,
    description: require('./komutlar/yardım').description,
    options: require('./komutlar/yardım').options,
    type: 1 
  }, {
    name: require('./komutlar/link-ekle').name,
    description: require('./komutlar/link-ekle').description,
    options: require('./komutlar/link-ekle').options,
    type: 1 
  }
];
const clientId = '903938114576343091';
const guildId = '810822733444415498';
client.command = new Collection();

(async () => {
  try {
    await rest.put(
      Routes.applicationCommands(clientId), 
      { body: cmd }
    );
    console.log('Slash Commands yüklendi.');
  } catch (e) {
    console.log('Slash Commands yüklenemedi.');
    throw new Error(e);
  }
})();

fs.readdirSync('./komutlar/').forEach(file => {
  const dosya = require(`./komutlar/${file}`);
  const option = {
    name: dosya.name,
    description: dosya.description,
    options: dosya.options
  };
  cmd.push(option);
  client.command.set(dosya.name, dosya);
});

client.on('ready', async () => {
  console.log('Bot hazır.');
  client.user.setActivity('Ghost Uptime! Slash Commands..');
});


client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  var cmd = client.command.get(interaction.commandName);
  await cmd.execute(client, interaction);
});  


client.login(token)