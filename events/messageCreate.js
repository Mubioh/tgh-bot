const { Events, MessageType, ChannelType } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		if (message.type === MessageType.ChannelPinnedMessage) message.delete();
		if (message.channel.id === '1055439884388663306') await message.startThread({ name: 'Comments' });
		if (message.channel.type === ChannelType.GuildAnnouncement && message.crosspostable)
			message.crosspost();
	},
};
