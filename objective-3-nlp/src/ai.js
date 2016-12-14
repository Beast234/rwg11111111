import alexaEar from './route';
import AlexaResponse from 'alexa-response';
import { getHoroscope } from './skill';
import HOROSCOPE from './nlp';

alexaEar.hears(HOROSCOPE.intents.START, ['message_received'], (bot, message) => {
  bot.reply(message,
    AlexaResponse
      .ask(HOROSCOPE.responses.greeting)
      .reprompt(`Signs are things like Aries, leo, Sagittarius. ${HOROSCOPE.responses.greeting}`)
  );
});

alexaEar.hears(HOROSCOPE.intents.HOROSCOPE, ['message_received'], (bot, message) => {
  const sign = message.alexa.getSlotValue('sign');
  const period = message.alexa.getSlotValue('period') || 'today';

  console.log(sign, period);

  if (sign) {
    getHoroscope(sign.toLowerCase())
      .then((horoscope) => {
        bot.reply(message, AlexaResponse.say(horoscope));
      });
  } else {
    bot.reply(message,
      AlexaResponse
        // ask the use for their sign
        .ask(HOROSCOPE.responses.greeting)
        // but if they dont reply, give them a few examples
        .reprompt(`Signs are things like Aries, leo, Sagittarius. ${HOROSCOPE.responses.greeting}`)
    );
  }
});

alexaEar.hears(HOROSCOPE.intents.STOP, ['message_received'], (bot, message) => {
  bot.reply(message, HOROSCOPE.responses.goodbye);
});

alexaEar.hears(HOROSCOPE.intents.HELP, ['message_received'], (bot, message) => {
  bot.reply(message, AlexaResponse.ask(HOROSCOPE.responses.help));
});
