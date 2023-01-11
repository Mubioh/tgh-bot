const {
	SlashCommandBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} = require('discord.js');
const { informationEmbed, informationButtons } = require('../configuration/messages.json');
const { channels } = require('../configuration/variables.json');

const informationChannelId = channels.informationChannelId;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('information')
		.setDescription('Sends the information channel embed.'),
	async execute(interaction) {
		const channel = interaction.guild.channels.cache.find((ch) => ch.id === informationChannelId);
		if (!channel) return console.log('Oops. The information channel could not be found.');

		const embed = new EmbedBuilder()
			.setTitle(informationEmbed.title)
			.setURL(informationEmbed.url)
			.setDescription(informationEmbed.body)
			.setColor('2F3136');

		const buttons = new ActionRowBuilder().addComponents([
			new ButtonBuilder()
				.setCustomId('rules_button')
				.setLabel(informationButtons.server_guidelines)
				.setStyle(ButtonStyle.Primary),
			new ButtonBuilder()
				.setCustomId('get_started_button')
				.setLabel(informationButtons.get_started)
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId('roles_menu_button')
				.setLabel(informationButtons.customise_profile)
				.setStyle(ButtonStyle.Secondary),
		]);

		await channel.send({ embeds: [embed], components: [buttons] }).then(
			interaction.reply({
				content: `The information embed was sent to ${channel}!`,
				ephemeral: true,
			})
		);
	},
};
