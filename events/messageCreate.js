const { Events, MessageType, ChannelType } = require('discord.js');

const commentEnabledChannelIds = ['1055439884388663306'];

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		if (message.type === MessageType.ChannelPinnedMessage) message.delete();
		if (message.channel.type === ChannelType.GuildAnnouncement && message.crosspostable)
			message.crosspost();
		for (const id of commentEnabledChannelIds) {
			if (message.channel.id === id) {
				await message.startThread({ name: 'Comments' });
			}
		}
	},
};
