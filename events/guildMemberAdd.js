const { Events } = require('discord.js');

// Add the role IDs you want to give to new members here. Example: ['123', '123', '123'].
const joinRoleIds = ['1055447764596707349'];

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(member) {
		for (const id of joinRoleIds) {
			if (member.guild.roles.cache.find((roles) => roles.id === id)) member.roles.add(id);
		}
	},
};
