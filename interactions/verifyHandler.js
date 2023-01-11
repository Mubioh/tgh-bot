const { roles } = require('../configuration/variables.json');
const { verifySuccess } = require('../configuration/messages.json');

const joinRoleIds = roles.joinRoleIds;

module.exports = {
	handleInteraction: async (interaction) => {
		const parameters = interaction.customId.split('_').slice(2);
		const userId = parameters[0];

		const member = interaction.member;

		if (member.user.id !== userId) {
			await interaction.reply({
				content: 'You are not authorized to verify this user.',
				ephemeral: true,
			});
			return;
		} else {
			for (const id of joinRoleIds) {
				if (member.guild.roles.cache.find((roles) => roles.id === id)) member.roles.add(id);
			}
			await interaction.reply({
				content: verifySuccess.body,
				ephemeral: true,
			});
		}
	},
};
