const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { guideEmeds } = require('../configuration/messages.json');

const embeds = [
	new EmbedBuilder()
		.setTitle(guideEmeds[1].title)
		.setDescription(guideEmeds[1].body)
		.setColor('2F3136'),
	new EmbedBuilder()
		.setTitle(guideEmeds[2].title)
		.setDescription(guideEmeds[2].body)
		.setColor('2F3136'),
	new EmbedBuilder()
		.setTitle(guideEmeds[3].title)
		.setDescription(guideEmeds[3].body)
		.setColor('2F3136'),
	new EmbedBuilder()
		.setTitle(guideEmeds[4].title)
		.setDescription(guideEmeds[4].body)
		.setColor('2F3136'),
	new EmbedBuilder()
		.setTitle(guideEmeds[5].title)
		.setDescription(guideEmeds[5].body)
		.setColor('2F3136'),
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
							.setDisabled(nextPage - 1 == 1 || 0 ? true : false)
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
							.setDisabled(nextPage - 1 == 1 || 0 ? true : false),
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
