const {
	Events,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} = require('discord.js');

const { channels } = require('../configuration/variables.json');
const { informationButtons, verifyEmbed } = require('../configuration/messages.json');

const welcomeChannelId = channels.welcomeChannelId;

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(member) {
		const channel = member.guild.channels.cache.find((ch) => ch.id === welcomeChannelId);

		const embed = new EmbedBuilder()
			.setTitle(verifyEmbed.title)
			.setDescription(verifyEmbed.body)
			.setColor('2F3136');

		const buttons = new ActionRowBuilder().addComponents([
			new ButtonBuilder()
				.setCustomId('rules_button')
				.setLabel(informationButtons.server_guidelines)
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId(`verify_button_${member.user.id}`)
				.setLabel('Verify')
				.setStyle(ButtonStyle.Success),
		]);

		await channel.send({ content: `<@${member.user.id}>`, embeds: [embed], components: [buttons] });
	},
};
