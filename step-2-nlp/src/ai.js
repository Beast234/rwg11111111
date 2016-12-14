import alexaEar from './controller';
import HOROSCOPE from './nlp';

alexaEar.hears(HOROSCOPE.intents.START, ['message_received'], (bot, message) => {
  const msg = `What sign would you like a horoscope for?  And for what period -
              today, this week, month, or year?`;
  bot.reply(message, AlexaResponse.ask(msg));
  // .shouldEndSession(false);  how the f do we do this?
});
