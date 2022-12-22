const {
	SlashCommandBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} = require('discord.js');

const informationChannelId = '1055439851413045309';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('information')
		.setDescription('Sends the information channel embed.'),
	async execute(interaction) {
		const channel = interaction.guild.channels.cache.find((ch) => ch.id === informationChannelId);
		if (!channel) return console.log('Oops. The information channel could not be found.');

		const embed = new EmbedBuilder()
			.setTitle('Welcome to The Goose House!')
			.setURL('https://thegoose.house/')
			.setDescription(
				'The Goose House began as a community of esports industry professionals looking to network and game together. Since then, it has expanded, allowing passionate gamers and esports fans to come together and connect.\n\n**We are the #1 European VALORANT Community, supported directly by RIOT.**'
			)
			.setColor('2F3136');

		const buttons = new ActionRowBuilder().addComponents([
			new ButtonBuilder()
				.setCustomId('rules_button')
				.setLabel('Server Guidelines')
				.setStyle(ButtonStyle.Primary),
			new ButtonBuilder()
				.setCustomId('get_started_button')
				.setLabel('Get Started in Goose House')
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId('roles_menu_button')
				.setLabel('Customise Profile')
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
