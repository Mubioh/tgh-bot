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
			'📅 <#1055439884388663306>\nCatch up on our past news and updates!\n\n📝 <#1056554955105910825>\nYour place to share something about yourself or learn more about others.\n\n🎞️ <#1056555078175166484>\nShare some of your best moments with our community.'
		)
		.setColor('2F3136'),
	new EmbedBuilder()
		.setTitle('Honks and Weekly Skirmish (3/3)')
		.setDescription('🦆 **Honks**\nHonks are our currency, like raffle tickets – the more you have, the more likely you will win our monthly giveaway. You can earn honks by taking part in and winning events like our Weekly Skirmish.\n\n⚔️ **Weekly Skirmish**\nWe run a weekly skirmish every week of the year. The tournaments are split into Iron to Plat and Diamond to Radiant groups. We also have anti-smurf detection to ensure you are playing with people of a similar skill level.\n\nYou can learn more about the Weekly Skirmish in <#1055443176707588177>.')
		.setColor('2F3136'),
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
