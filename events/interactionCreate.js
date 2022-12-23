const { Events, InteractionType } = require('discord.js');
const guideHandler = require('../interactions/guideHandler');
const rolesHandler = require('../interactions/rolesHandler');
const rulesHandler = require('../interactions/rulesHandler');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.type === InteractionType.MessageComponent) {
			try {
				if (interaction.customId === 'rules_button')
					return rulesHandler.handleInteraction(interaction);
				if (interaction.customId.startsWith('get_started'))
					return guideHandler.handleInteraction(interaction);
				if (interaction.customId.startsWith('roles_menu'))
					return rolesHandler.handleInteraction(interaction);
			} catch (error) {
				console.error(error);
				await interaction.reply({
					content: 'There was an error while responding to this interaction.',
					ephemeral: true,
				});
			}
		}

		if (!interaction.isChatInputCommand()) return console.log(interaction);

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({
				content: 'There was an error while executing this command!',
				ephemeral: true,
			});
		}
	},
};
