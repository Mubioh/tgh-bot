const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	handleInteraction: async (interaction) => {
		const embed = new EmbedBuilder()
			.setDescription(
				'**You must be at least 16 years old:**\nThis is an age-restricted server to ensure the safety of everyone in our community.\n\n**You must be respectful: **\nYou should respect all members regardless of ethnicity, gender, sexual orientation, or beliefs. Harassment and hate speech will not be tolerated. Political topics should also be avoided.\n\n**You must keep profiles appropriate: **\nYour username, nickname, avatar, and custom status must be appropriate. This includes zalgo, blank usernames, slurs, or other offensive material.\n\n**You must ask before messaging a server member: **\nPlease do not contact server members unsolicited. This includes Twitch Partners and Industry members. Do not ping staff unless you have a reason.\n\n**You must respect the TOS of other platforms: **\nYou should respect the rules of Discord and game publishers and continue to abide by them here. For example, no discussion of account sharing or boosting.'
			)
			.setColor('2F3136');

		const buttons = new ActionRowBuilder().addComponents([
            new ButtonBuilder()
				.setURL('https://discord.com/terms')
				.setLabel('Discord Terms of Service')
				.setStyle(ButtonStyle.Link),
			new ButtonBuilder()
				.setURL('https://discord.com/guidelines')
				.setLabel('Discord Community Guidelines')
				.setStyle(ButtonStyle.Link),
		]);

		interaction.reply({ embeds: [embed], components: [buttons], ephemeral: true });
	},
};
