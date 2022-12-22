const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const embeds = [
	new EmbedBuilder()
		.setTitle('Getting Started in Goose House')
		.setDescription(
			'As a new community member, you may run into things you don’t understand. To help you get started, we created this guide to lead you through everything.'
		)
		.setColor('2F3136'),
	new EmbedBuilder()
		.setTitle('Community Roles (1/3)')
		.setDescription(
			'🚨 <@&1055566420819320863>\nOur dedicated team is here to maintain a friendly space for everyone.\n\n⭐ <@&1055566447922913371>\nGiven to people who are veterans in our community. \n\n**Game, Notification, and other Community Roles**\nThese roles are self-assigned through the Customise Profile button above.'
		)
		.setColor('2F3136'),
	new EmbedBuilder()
		.setTitle('Key Channels (2/3)')
		.setDescription(
			'📅 <#1055439884388663306>\nCatch up on our past news and updates!\n\n📝 <#1055566827201253497>\nYour place to share something about yourself or learn more about others.\n\n🎞️ <#1055571373646426213>\nShare some of your best moments with our community.'
		)
		.setColor('2F3136'),
	new EmbedBuilder().setTitle('... (3/3)').setDescription('This is embed 2').setColor('2F3136'),
	new EmbedBuilder()
		.setTitle("And that's everything!")
		.setDescription(
			'You should now be up to speed on the most important aspects of our server. If you have more questions, check our <#1055443176707588177>.'
		)
		.setColor('5865f2'),
];

module.exports = {
	handleInteraction: async (interaction) => {
		const parameters = interaction.customId.split('_').slice(2);
		const currentPage = parseInt(parameters[1]);

		switch (parameters[0]) {
			case 'button':
				const row = new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setCustomId(`get_started_previous_1`)
						.setLabel('Previous Page')
						.setStyle(ButtonStyle.Secondary)
						.setDisabled(true),
					new ButtonBuilder()
						.setCustomId(`get_started_next_1`)
						.setLabel('Next Page')
						.setStyle(ButtonStyle.Secondary)
				);
				interaction.reply({ embeds: [embeds[0]], components: [row], ephemeral: true });
				break;

			case 'finish':
				interaction.update({ embeds: [embeds[4]], components: [], ephemeral: true });
				break;
			case 'next':
				if (currentPage !== embeds.length) {
					let nextPage = currentPage + 1;
					const row = new ActionRowBuilder().addComponents(
						new ButtonBuilder()
							.setCustomId(`get_started_previous_${nextPage}`)
							.setLabel('Previous Page')
							.setStyle(ButtonStyle.Secondary)
					);
					if (nextPage == embeds.length - 1) {
						row.addComponents(
							new ButtonBuilder()
								.setCustomId(`get_started_finish`)
								.setLabel('Finish')
								.setStyle(ButtonStyle.Success)
						);
					} else {
						row.addComponents(
							new ButtonBuilder()
								.setCustomId(`get_started_next_${nextPage}`)
								.setLabel('Next Page')
								.setStyle(ButtonStyle.Secondary)
						);
					}
					interaction.update({ embeds: [embeds[currentPage]], components: [row] });
				}
				break;
			case 'previous':
				if (currentPage !== 1) {
					let nextPage = currentPage - 1;
					const row = new ActionRowBuilder().addComponents(
						new ButtonBuilder()
							.setCustomId(`get_started_previous_${nextPage}`)
							.setLabel('Previous Page')
							.setStyle(ButtonStyle.Secondary)
							.setDisabled(nextPage == 1),
						new ButtonBuilder()
							.setCustomId(`get_started_next_${nextPage}`)
							.setLabel('Next Page')
							.setStyle(ButtonStyle.Secondary)
					);
					interaction.update({ embeds: [embeds[nextPage - 1]], components: [row] });
				}
				break;
		}
	},
};
