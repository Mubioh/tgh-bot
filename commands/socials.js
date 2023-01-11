const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('links')
		.setDescription('Sends the links to our socials.'),
	async execute(interaction) {
		interaction.reply({
			content: 'https://beacons.ai/thegoosehouse',
			ephemeral: true,
		});
	},
};
