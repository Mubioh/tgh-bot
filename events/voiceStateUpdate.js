const { Events, Collection, ChannelType } = require('discord.js');
const { channels } = require('../configuration/variables.json');

const voiceManager = new Collection();
const joinToCreateChannelIds = channels.joinToCreateChannelIds;

module.exports = {
	name: Events.VoiceStateUpdate,
	async execute(oldState, newState) {
		const { member, guild } = oldState;

		const newChannel = newState.channel;
		const oldChannel = oldState.channel;

		const ownedChannel = voiceManager.get(member.id);

		if (!member.user.bot) {
			if (ownedChannel && oldChannel.id === ownedChannel && (!newChannel || newChannel.id != ownedChannel)) {
				voiceManager.delete(member.id);
				oldState.channel.delete();
			}

			try {
				if (oldChannel !== newChannel && newChannel) {
					for (const id of joinToCreateChannelIds) {
						if (newChannel.id === id) {
							const userChannel = await guild.channels.create({
								name: member.user.tag,
								type: ChannelType.GuildVoice,
								parent: newState.channel.parent,
								userLimit: 5,
							});
							voiceManager.set(member.id, userChannel.id);
							member.voice.setChannel(userChannel);
						}
					}
				}
			} catch (error) {
				member.voice.disconnect({ reason: 'Not enough room to generate channel.' });
				console.log(error);
			}
		}
	},
};
