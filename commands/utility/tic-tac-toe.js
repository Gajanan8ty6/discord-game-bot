/**
 * Tic Tac Toe Game
 *
 * @see https://discordjs.guide/creating-your-bot/slash-commands.html
 *
 * @note we cannot create dynamic options - https://www.reddit.com/r/Discordjs/comments/yer3cj/help_are_dynamic_slashcommand_choices_possible/
 */
// Require the necessary classes
const { ActionRowBuilder, SlashCommandBuilder, ButtonBuilder, ButtonStyle, TextInputComponent, TextInputStyle, ModalBuilder,
	TextInputBuilder, } = require('discord.js');
const { TicTacToe } = require('discord-gamecord');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tic-tac-toe')
		.setDescription('Play Tic Tac Toe Game')
		.addSubcommand(subcommand =>
			subcommand
				.setName('free')
				.setDescription('Free Game')
				.addUserOption(option =>
					option.setName('opponent')
						.setDescription('The opponent you will be playing against')
						.setRequired(true)
				),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('paid')
				.setDescription('Paid Game')
				.addUserOption(option =>
					option.setName('opponent')
						.setDescription('The opponent you will be playing against')
						.setRequired(true)
				)
				.addStringOption(option =>
					option.setName('currency')
						.setDescription('Currency staked')
						.setRequired(true)
						.addChoices(
							{ name: 'HBAR', value: 'hbar' },
							{ name: 'OWOW', value: 'owow_token' },
							{ name: 'USDC', value: 'usdc' },
						)
				)
				.addNumberOption(option =>
					option.setName("amount")
						.setDescription("Challenge amount")
						.setMinValue(0)
						.setMaxValue(500)
						.setRequired(true)
				)
		),
	async execute(interaction) {
		/**
		 * You cannot send private responses ({ ephemeral: true }) to both users, so we create a channel just for them if need be
		 *
		 * @see - https://www.reddit.com/r/Discord_Bots/comments/sr4kcv/can_you_send_ephemeral_to_another_user_that_not/
		 */
		await interaction.deferReply();

		// Get the parameters
		const challenge_selection = interaction.options.getSubcommand();
		const player = interaction.user;
		const opponent = interaction.options.getUser('opponent');
		const currency = interaction.options.getString('currency');
		const amount = interaction.options.getNumber('amount');
		const game_id = interaction.id;

		/**
		 * Check if both players exist in the web app
		 *
		 * @todo - Make API call
		 *
		 * @type {TicTacToe}
		 */


		/*
		 * If free, start the game
		 */
		if( challenge_selection === 'free' ){
			/**
			 * Make API call to backend to create a record of this game
			 *
			 * @todo - Make API Call
			 */
			// Start the actual game
			await startGame( interaction );
		}

		/**
		 * If paid, do additional checks:
		 * 1. Request for stake amount and check that both opponents have deposited the stake amount from API
		 * 2.
		 *
		 * @todo - Make API Call
		 */
		if( challenge_selection === 'paid' ){

			// Start the actual game
			await startGame( interaction );

		}
	},
};

/**
 * Start the Tic Tac Toe game
 *
 * @param interaction
 * @param player
 * @param opponent
 * @param amount
 * @returns {Promise<void>}
 */
async function startGame( interaction ) {
	const Game = new TicTacToe({
		message: interaction,
		isSlashGame: false,
		opponent: interaction.options.getUser('opponent'),
		embed: {
			title: 'Tic Tac Toe',
			color: '#5865F2',
			statusTitle: 'Status',
			overTitle: 'Game Over'
		},
		emojis: {
			xButton: '❌',
			oButton: '🔵',
			blankButton: '➖'
		},
		mentionUser: true,
		timeoutTime: 60000,
		xButtonStyle: 'DANGER',
		oButtonStyle: 'PRIMARY',
		turnMessage: '{emoji} | Its turn of player **{player}**.',
		winMessage: '{emoji} | **{player}** won the TicTacToe Game.',
		tieMessage: 'The Game tied! No one won the Game!',
		timeoutMessage: 'The Game went unfinished! No one won the Game!',
		playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
	});

	Game.startGame();
	Game.on('gameOver', result => {
		/**
		 * Make API Call to post the results
		 *
		 * @todo - Make API Call
		 */

		const game_id = interaction.id;


		console.log(result);  // =>  { result... }
	});
}
