/**
 * Discord Bot Client 'Ready' Event Handling
 *
 * @see https://discordjs.guide/creating-your-bot/event-handling.html
 */
// Require dotEnv
require('dotenv').config();

// Enable Self Signed Certificate on localhost
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};