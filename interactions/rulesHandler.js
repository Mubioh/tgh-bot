const { EmbedBuilder } = require('discord.js');
const { ruleEmbed } = require('../configuration/messages.json');

module.exports = {
	handleInteraction: async (interaction) => {
		const embed = new EmbedBuilder().setDescription(ruleEmbed.body).setColor('5865f2');

		interaction.reply({ embeds: [embed], ephemeral: true });
	},
};
