const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('relative')
		.setDescription('Provides an example of a dynamic timestamp.'),
	async execute(interaction) {
		await interaction.reply(`It has been <t:${parseInt((+ new Date())/1000)}:R> since this message has been received`);
	},
};