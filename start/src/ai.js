import alexaEars from './controller';

// reply to ANY incoming message - Hello World
alexaEars.on('message_received', function(bot, message) {
    bot.reply(message, 'I heard... something! Hello World!!');
});
