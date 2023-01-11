const Twitter = require('twitter-lite');
const { twitter } = require('../configuration/notifications.json');

let lastTweet = null;

const tw = new Twitter({
	version: '2',
	extension: false,
	bearer_token: twitter.auth.bearer_token,
});

module.exports = async (client) => {
	const channel = client.channels.resolve(twitter.channel);
	if (!channel) return console.log('NO channel specified for Twitter notifications!');
	setInterval(() => {
		tw.get(`users/${twitter.user}/tweets/`, { exclude: 'replies,retweets' })
			.then((user) => {
				if (!lastTweet) return (lastTweet = user.meta.newest_id);
				if (lastTweet == user.meta.newest_id) return;
				lastTweet = user.meta.newest_id;
				
				channel.send(`https://twitter.com/${twitter.user}/status/${user.meta.newest_id}`);
			})
			.catch(console.error);
	}, 3600000);
};
