const { Client } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { readdir, readdirSync } = require("fs");

const config = (global.config = require("../global.config.json"));
const bot = (global.bot = new Client({ intents: [ 32767 ] }));
const rest = (global.rest = new REST({ version: "10" }))

const slash = new Array();
const commands = (global.commands = new Map())

readdir("./src/commands", async (err, files) => {
    let dirs = readdirSync(`./src/commands/${files}`);
    dirs
    .forEach(file => {
        let prop = require(`../src/commands/${files}/${file}`);
        commands.set(prop.name, prop);
        slash.push(prop)
        console.log(`[Commands] ${files}/${file} loaded!`); 
    })
})
readdir("./src/events", async (err, files) => {
    let dirs = readdirSync(`./src/events/${files}`);
    dirs
    .forEach(file => {
        let prop = require(`../src/events/${files}/${file}`);
        bot.on(prop.name, prop.request);
        console.log(`[Events] ${files}/${file} loaded!`); 
    })
})
bot.once("ready", async() => {
    rest.setToken(config.TOKEN)
    await rest.put(Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID), {
        body: slash
    })
})
bot.login(config.TOKEN).catch(err => console.error(err));