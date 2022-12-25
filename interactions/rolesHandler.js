const {
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	RoleSelectMenuBuilder,
	StringSelectMenuBuilder,
} = require('discord.js');

const embeds = [
	new EmbedBuilder()
		.setTitle('Customise Profile')
		.setDescription(
			'You can click on the role-categories below to spruce up your profile and help us better understand who you are.'
		)
		.setColor('2F3136'),
	new EmbedBuilder()
		.setTitle('Tournament Roles')
		.setDescription('Tournament Roles Embed Description. You can select multiple tournaments.')
		.setColor('2F3136'),
	new EmbedBuilder()
		.setTitle('Rank Roles')
		.setDescription('Rank Roles Embed Description. You can only select one rank at a time.')
		.setColor('2F3136'),
	new EmbedBuilder()
		.setTitle('Game Roles')
		.setDescription(
			'Game Roles Embed Description. You can select multiple games that interest you.'
		)
		.setColor('2F3136'),
];

module.exports = {
	handleInteraction: async (interaction) => {
		const parameters = interaction.customId.split('_').slice(2);

		function hasRole(member, role_id) {
			if (member.roles.cache.some((role) => role.id === role_id)) return true;
		}

		function hasRoleInt(role_id) {
			const role = interaction.guild.roles.cache.get(role_id);
			return role.members.size;
		}

		const roleButtons = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId(`roles_menu_tournament`)
					.setLabel('Goose House Tournaments')
					.setStyle(ButtonStyle.Secondary)
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId(`roles_menu_rank`)
					.setLabel('VALORANT Ranks')
					.setStyle(ButtonStyle.Secondary)
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId(`roles_menu_games`)
					.setLabel('Other Video Games')
					.setStyle(ButtonStyle.Secondary)
			);

		const backButton = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId(`roles_menu_back`)
				.setLabel('Back')
				.setStyle(ButtonStyle.Secondary)
		);

		const roleSelectMenu = new ActionRowBuilder();

		switch (parameters[0]) {
			case 'button':
				await interaction.reply({
					embeds: [embeds[0]],
					components: [roleButtons],
					ephemeral: true,
				});
				break;
			case 'tournament':
				roleSelectMenu.addComponents(
					new StringSelectMenuBuilder()
						.setCustomId(`roles_select_tournament`)
						.setPlaceholder('Select a role')
						.setMinValues(0)
						.setMaxValues(2)
						.addOptions([
							{
								label: 'Birds of Prey',
								value: '1056558695502336060',
								emoji: '🔹',
								default: hasRole(interaction.member, '1056558695502336060'),
							},
							{
								label: 'BEACON',
								value: '1056558702758469694',
								emoji: '🔹',
								default: hasRole(interaction.member, '1056558702758469694'),
							},
						])
				);
				await interaction.update({
					embeds: [embeds[1]],
					components: [roleSelectMenu, backButton],
				});
				break;
			case 'rank':
				roleSelectMenu.addComponents(
					new StringSelectMenuBuilder()
						.setCustomId(`roles_select_rank`)
						.setPlaceholder('Select a role')
						.setMinValues(0)
						.setMaxValues(1)
						.addOptions([
							{
								label: 'Iron',
								value: '1055950128382488638',
								description: `There are ${hasRoleInt(
									'1055950128382488638'
								)} people with Iron rank.`,
								emoji: '🔹',
								default: hasRole(interaction.member, '1055950128382488638'),
							},
							{
								label: 'Bronze',
								value: '1056556092953473104',
								description: `There are ${hasRoleInt(
									'1056556092953473104'
								)} people with Bronze rank.`,
								emoji: '🔹',
								default: hasRole(interaction.member, '1056556092953473104'),
							},
							{
								label: 'Silver',
								value: '1056556099962163222',
								description: `There are ${hasRoleInt(
									'1056556099962163222'
								)} people with Silver rank.`,
								emoji: '🔹',
								default: hasRole(interaction.member, '1056556099962163222'),
							},
							{
								label: 'Gold',
								value: '1056556134569353247',
								description: `There are ${hasRoleInt(
									'1056556134569353247'
								)} people with Gold rank.`,
								emoji: '🔹',
								default: hasRole(interaction.member, '1056556134569353247'),
							},
							{
								label: 'Platinum',
								value: '1056556143125737512',
								description: `There are ${hasRoleInt(
									'1056556143125737512'
								)} people with Platinum rank.`,
								emoji: '🔹',
								default: hasRole(interaction.member, '1056556143125737512'),
							},
							{
								label: 'Diamond',
								value: '1056556148871921724',
								description: `There are ${hasRoleInt(
									'1056556148871921724'
								)} people with Diamond rank.`,
								emoji: '🔹',
								default: hasRole(interaction.member, '1056556148871921724'),
							},
							{
								label: 'Ascendant',
								value: '1056556166324441170',
								description: `There are ${hasRoleInt(
									'1056556166324441170'
								)} people with Ascendant rank.`,
								emoji: '🔹',
								default: hasRole(interaction.member, '1056556166324441170'),
							},
							{
								label: 'Immortal',
								value: '1056556169579204669',
								description: `There are ${hasRoleInt(
									'1056556169579204669'
								)} people with Immortal rank.`,
								emoji: '🔹',
								default: hasRole(interaction.member, '1056556169579204669'),
							},
							{
								label: 'Radiant',
								value: '1056556176277512232',
								description: `There are ${hasRoleInt(
									'1056556176277512232'
								)} people with Radiant rank.`,
								emoji: '🔹',
								default: hasRole(interaction.member, '1056556176277512232'),
							},
						])
				);
				await interaction.update({
					embeds: [embeds[2]],
					components: [roleSelectMenu, backButton],
				});
				break;
			case 'games':
				roleSelectMenu.addComponents(
					new StringSelectMenuBuilder()
						.setCustomId(`roles_select_games`)
						.setPlaceholder('Select a role')
						.setMinValues(0)
						.setMaxValues(11)
						.addOptions([
							{
								label: 'CS:GO',
								value: '1056560465699946548',
								emoji: '🔹',
								default: hasRole(interaction.member, '1056560465699946548'),
							},
							{
								label: 'Apex Legends',
								value: '1056560501963890708',
								emoji: '🔹',
								default: hasRole(interaction.member, '1056560501963890708'),
							},
							{
								label: 'Formula 1',
								value: '1056560507525533756',
								emoji: '🔹',
								default: hasRole(interaction.member, '1056560507525533756'),
							},
							{
								label: 'Rocket League',
								value: '1056560511690489896',
								emoji: '🔹',
								default: hasRole(interaction.member, '1056560511690489896'),
							},
							{
								label: 'Call of Duty',
								value: '1056560516350349386',
								emoji: '🔹',
								default: hasRole(interaction.member, '1056560516350349386'),
							},
							{
								label: 'Minecraft',
								value: '1056560520204922880',
								emoji: '🔹',
								default: hasRole(interaction.member, '1056560520204922880'),
							},
							{
								label: 'League of Legends',
								value: '1056560525418434620',
								emoji: '🔹',
								default: hasRole(interaction.member, '1056560525418434620'),
							},
							{
								label: 'Fortnite',
								value: '1056560530137022585',
								emoji: '🔹',
								default: hasRole(interaction.member, '1056560530137022585'),
							},
							{
								label: 'Escape From Tarkov',
								value: '1056560533282762832',
								emoji: '🔹',
								default: hasRole(interaction.member, '1056560533282762832'),
							},
							{
								label: 'Rust',
								value: '1056560536042623107',
								emoji: '🔹',
								default: hasRole(interaction.member, '1056560536042623107'),
							},
							{
								label: 'Overwatch',
								value: '1056560538609537105',
								emoji: '🔹',
								default: hasRole(interaction.member, '1056560538609537105'),
							},
						])
				);
				await interaction.update({
					embeds: [embeds[3]],
					components: [roleSelectMenu, backButton],
				});
				break;
			case 'back':
				await interaction.update({
					embeds: [embeds[0]],
					components: [roleButtons],
				});
				break;
		}
	},
	handleSelectMenu: async (interaction) => {
		let fullOptions = interaction.message.components[0].components[0].options.map((d) => d.value);
		let diff = fullOptions.filter((d) => !interaction.values.includes(d));

		await interaction.member.roles.remove(diff);
		await interaction.member.roles.add(interaction.values);

		const updateEmbed = new EmbedBuilder()
			.setColor('2F3136')
			.setDescription('**Your changes have been applied.**');

		const backButton = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId(`roles_menu_back`)
				.setLabel('Back')
				.setStyle(ButtonStyle.Secondary)
		);

		interaction.update({ embeds: [updateEmbed], components: [backButton] });
	},
};
