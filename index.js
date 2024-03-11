const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((a) => {
    return GatewayIntentBits[a];
  }),
});
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  const imagePath = path.join(__dirname, 'index.html');
  res.sendFile(imagePath);
});
app.listen(port, () => console.log('\x1b[36m%s\x1b[0m', `|    🔗 Listening to RTX : ${port}`));

const statusMessages = ["Talk to Me", "@PIXBIT"]; 
let currentIndex = 0;

async function login() {
  try {
    await client.login(process.env.TOKEN);
    console.log(`\x1b[36m%s\x1b[0m`, `|    🐇 Logged in as ${client.user.tag}`);
  } catch (error) {
    console.error('Failed to log in:', error);
    process.exit(1);
  }
}

function updateStatus() {
  const currentStatus = statusMessages[currentIndex];
  client.user.setPresence({
    activities: [{ name: currentStatus, type: ActivityType.Streaming, url: "https://www.twitch.tv/aceu"}],
    status: 'dnd', 
  });
  currentIndex = (currentIndex + 1) % statusMessages.length;

  
  setTimeout(updateStatus, 1000); 
}

client.once('ready', () => {
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✅ Bot is ready as ${client.user.tag}`);
  updateStatus(); 
});

login();
