import alexaEar from './route';

alexaEar.on('message_received', (bot, message) => {
  bot.reply(message, 'Hello World!');
});
