const { ClientCredentialsAuthProvider } = require('@twurple/auth');
const { ApiClient } = require('@twurple/api');
const { twitch } = require('../configuration/notifications.json');

const authProvider = new ClientCredentialsAuthProvider(
	twitch.auth.clientId,
	twitch.auth.clientSecret
);
const apiClient = new ApiClient({ authProvider });

const twitchUsers = {};
for (let n of twitch.users) twitchUsers[n] = null;

module.exports = (client) => {
	const channel = client.channels.resolve(twitch.channel);
	if (!channel) return console.log('NO channel specified for twitch notifications!');

	setInterval(async () => {
		const users = await apiClient.users.getUsersByNames(twitch.users);
		for (let user of users) {
			let stream = await user.getStream();
			if (!stream) return (twitchUsers[user.name] = false);
			if (
				(!twitchUsers[user.name] && Date.now() - stream.startDate.valueOf() < 2 * 60000) ||
				(!!twitchUsers[user.name] && twitchUsers[user.name] !== stream.startDate.valueOf())
			) {
				twitchUsers[user.name] = stream.startDate.valueOf();
				
				channel.send(
					`https://www.twitch.tv/${user.name}`
				);
			}
		}
	}, 3600000);
};
