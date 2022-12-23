const {
	SlashCommandBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	StringSelectMenuBuilder,
} = require('discord.js');

const openATicketChannnelId = '1055440749757481012';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ticket')
		.setDescription('Sends the ticket channel embed.'),
	async execute(interaction) {
		const channel = interaction.guild.channels.cache.find(
			(ch) => ch.id === openATicketChannnelId
		);
		if (!channel) return console.log('Oops. The ticket channel could not be found.');

		const embed = new EmbedBuilder()
			.setTitle('📩 Submit a Ticket')
			.setDescription('Select a ticket type from the options in the menu down below.')
			.setColor('2F3136');

		const menu = new ActionRowBuilder().addComponents([
			new StringSelectMenuBuilder()
				.setCustomId('ticket_type')
				.setPlaceholder('Select a ticket type...')
				.setMinValues(0)
				.setMaxValues(3)
				.addOptions([
					{
						label: 'General Issue',
						value: 'general_issue',
						emoji: '❌',
					},
					{
						label: 'General Question',
						value: 'general_question',
						emoji: '❓',
					},
					{
						label: 'Member Report',
						value: 'member_report',
						emoji: '🧑',
					},
					{
						label: 'Bot Report',
						value: 'bot_report',
						emoji: '🤖',
					},
					{
						label: 'Tournament/Esports Issue',
						value: 'tournament_esports_issue',
						emoji: '🎮',
					},
				]),
		]);

		await channel.send({ embeds: [embed], components: [menu] }).then(
			interaction.reply({
				content: `The ticket embed was sent to ${channel}!`,
				ephemeral: true,
			})
		);
	},
};
