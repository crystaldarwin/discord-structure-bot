const { Client, CommandInteraction } = require("discord.js");
module.exports = {
    name: "ping",
    description: "Bot gecikmesini öğrenebilirsin",
    /**
     * 
     * @param {Client} bot 
     * @param {CommandInteraction} interaction 
     */
    request: async(bot, interaction) => {
        return interaction.reply({
            content: `
            > Bot gecikmesi: **${bot.ws.ping}**
            > Etkileşim gecikmesi: **${Date.now() - interaction.createdAt}**
            `,
            ephemeral: true
        })
    }
}