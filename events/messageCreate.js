const { Events, MessageType, ChannelType } = require('discord.js');
const { channels } = require('../configuration/variables.json');

const commentEnabledChannelIds = channels.commentEnabledChannelIds;

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		if (message.type === MessageType.ChannelPinnedMessage) message.delete();
		if (message.channel.type === ChannelType.GuildAnnouncement && message.crosspostable)
			message.crosspost();
		for (const id of commentEnabledChannelIds) {
			if (message.channel.id === id) await message.startThread({ name: 'Comments' });
		}
	},
};
