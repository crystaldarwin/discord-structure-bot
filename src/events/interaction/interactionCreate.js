const { CommandInteraction } = require("discord.js")
module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    request: async (interaction) => {
        if (!interaction || !interaction.guild) return;
        let command = global.commands.get(interaction.commandName);
        if (!command) {
            return interaction.reply({
                content: `**${interaction.commandName}** adlı komut bulunamadı!`,
                ephemeral: true
            })
        }
        if (command) {
            let bot = global.bot;
            command.request(bot, interaction)
        }
    }
}