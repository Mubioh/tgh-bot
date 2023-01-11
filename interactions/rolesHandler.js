const {
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	StringSelectMenuBuilder,
} = require('discord.js');
const { roleEmbeds, roleButtons } = require('../configuration/messages.json');
const { roles, emojis } = require('../configuration/variables.json');

const embeds = [
	new EmbedBuilder()
		.setTitle(roleEmbeds[1].title)
		.setDescription(roleEmbeds[1].body)
		.setColor('2F3136'),
	new EmbedBuilder()
		.setTitle(roleEmbeds[2].title)
		.setDescription(roleEmbeds[2].body)
		.setColor('2F3136'),
	new EmbedBuilder()
		.setTitle(roleEmbeds[3].title)
		.setDescription(roleEmbeds[3].body)
		.setColor('2F3136'),
	new EmbedBuilder()
		.setTitle(roleEmbeds[4].title)
		.setDescription(roleEmbeds[4].body)
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

		const rButtons = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId(`roles_menu_tournament`)
					.setLabel(roleButtons.goose_house_tournaments)
					.setStyle(ButtonStyle.Secondary)
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId(`roles_menu_rank`)
					.setLabel(roleButtons.valorant_ranks)
					.setStyle(ButtonStyle.Secondary)
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId(`roles_menu_games`)
					.setLabel(roleButtons.other_games)
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
					components: [rButtons],
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
								value: roles.roleIds.tournament.birds_of_prey,
								default: hasRole(
									interaction.member,
									roles.roleIds.tournament.birds_of_prey
								),
							},
							{
								label: 'BEACON',
								value: roles.roleIds.tournament.beacon,
								default: hasRole(interaction.member, roles.roleIds.tournament.beacon),
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
								value: roles.roleIds.ranks.iron,
								description: `There are ${hasRoleInt(
									roles.roleIds.ranks.iron
								)} people with Iron rank.`,
								emoji: emojis.iron,
								default: hasRole(interaction.member, roles.roleIds.ranks.iron),
							},
							{
								label: 'Bronze',
								value: roles.roleIds.ranks.bronze,
								description: `There are ${hasRoleInt(
									roles.roleIds.ranks.bronze
								)} people with Bronze rank.`,
								emoji: emojis.bronze,
								default: hasRole(interaction.member, roles.roleIds.ranks.bronze),
							},
							{
								label: 'Silver',
								value: roles.roleIds.ranks.silver,
								description: `There are ${hasRoleInt(
									roles.roleIds.ranks.silver
								)} people with Silver rank.`,
								emoji: emojis.silver,
								default: hasRole(interaction.member, roles.roleIds.ranks.silver),
							},
							{
								label: 'Gold',
								value: roles.roleIds.ranks.gold,
								description: `There are ${hasRoleInt(
									roles.roleIds.ranks.gold
								)} people with Gold rank.`,
								emoji: emojis.gold,
								default: hasRole(interaction.member, roles.roleIds.ranks.gold),
							},
							{
								label: 'Platinum',
								value: roles.roleIds.ranks.platinum,
								description: `There are ${hasRoleInt(
									roles.roleIds.ranks.platinum
								)} people with Platinum rank.`,
								emoji: emojis.platinum,
								default: hasRole(interaction.member, roles.roleIds.ranks.platinum),
							},
							{
								label: 'Diamond',
								value: roles.roleIds.ranks.diamond,
								description: `There are ${hasRoleInt(
									roles.roleIds.ranks.diamond
								)} people with Diamond rank.`,
								emoji: emojis.diamond,
								default: hasRole(interaction.member, roles.roleIds.ranks.diamond),
							},
							{
								label: 'Ascendant',
								value: roles.roleIds.ranks.ascendant,
								description: `There are ${hasRoleInt(
									roles.roleIds.ranks.ascendant
								)} people with Ascendant rank.`,
								emoji: emojis.ascendant,
								default: hasRole(interaction.member, roles.roleIds.ranks.ascendant),
							},
							{
								label: 'Immortal',
								value: roles.roleIds.ranks.immortal,
								description: `There are ${hasRoleInt(
									roles.roleIds.ranks.immortal
								)} people with Immortal rank.`,
								emoji: emojis.immortal,
								default: hasRole(interaction.member, roles.roleIds.ranks.immortal),
							},
							{
								label: 'Radiant',
								value: roles.roleIds.ranks.radiant,
								description: `There are ${hasRoleInt(
									roles.roleIds.ranks.radiant
								)} people with Radiant rank.`,
								emoji: emojis.radiant,
								default: hasRole(interaction.member, roles.roleIds.ranks.radiant),
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
								value: roles.roleIds.games.csgo,
								emoji: emojis.csgo,
								default: hasRole(interaction.member, roles.roleIds.games.csgo),
							},
							{
								label: 'Apex Legends',
								value: roles.roleIds.games.apex_legends,
								emoji: emojis.apex_legends,
								default: hasRole(interaction.member, roles.roleIds.games.apex_legends),
							},
							{
								label: 'Formula 1',
								value: roles.roleIds.games.formula_one,
								emoji: emojis.formula_one,
								default: hasRole(interaction.member, roles.roleIds.games.formula_one),
							},
							{
								label: 'Rocket League',
								value: roles.roleIds.games.rocket_league,
								emoji: emojis.rocket_league,
								default: hasRole(interaction.member, roles.roleIds.games.rocket_league),
							},
							{
								label: 'Call of Duty',
								value: roles.roleIds.games.call_of_duty,
								emoji: emojis.call_of_duty,
								default: hasRole(interaction.member, roles.roleIds.games.call_of_duty),
							},
							{
								label: 'Minecraft',
								value: roles.roleIds.games.minecraft,
								emoji: emojis.minecraft,
								default: hasRole(interaction.member, roles.roleIds.games.minecraft),
							},
							{
								label: 'League of Legends',
								value: roles.roleIds.games.league_of_legends,
								emoji: emojis.league_of_legends,
								default: hasRole(interaction.member, roles.roleIds.games.league_of_legends),
							},
							{
								label: 'Fortnite',
								value: roles.roleIds.games.fortnite,
								emoji: emojis.fortnite,
								default: hasRole(interaction.member, roles.roleIds.games.fortnite),
							},
							{
								label: 'Escape From Tarkov',
								value: roles.roleIds.games.escape_from_tarkov,
								emoji: emojis.escape_from_tarkov,
								default: hasRole(
									interaction.member,
									roles.roleIds.games.escape_from_tarkov
								),
							},
							{
								label: 'Rust',
								value: roles.roleIds.games.rust,
								emoji: emojis.rust,
								default: hasRole(interaction.member, roles.roleIds.games.rust),
							},
							{
								label: 'Overwatch',
								value: roles.roleIds.games.overwatch,
								emoji: emojis.overwatch,
								default: hasRole(interaction.member, roles.roleIds.games.overwatch),
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
					components: [rButtons],
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
