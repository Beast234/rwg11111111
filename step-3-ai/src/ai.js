import alexaEar from './controller';
import AlexaResponse from 'alexa-response';
import { getHoroscope } from './skill';
import HOROSCOPE from './nlp';

alexaEar.hears(HOROSCOPE.intents.START, ['message_received'], (bot, message) => {
  bot.reply(message,
    AlexaResponse
      .ask(HOROSCOPE.GREETING)
      .reprompt(`Signs are things like Aries, leo, Sagittarius. ${HOROSCOPE.GREETING}`)
      // .shouldEndSession(false);  how the f do we do this?
  );
});

alexaEar.hears([HOROSCOPE.intents..., HOROSCOPE.utterances...], ['message_received'], (bot, message) => {
  // do some shit to look through th message.match to see if we've got a slot & intent
  const sign = message.match[1];
  if (!HOROSCOPE.slotTypes.SIGN[sign]) {
    // got a valid sign, check for period
    getHoroscope(sign.toLowerCase())
      .then(({ horoscope }) => {
        bot.reply(message,
          AlexaResponse
            // create a card within the alexa app to show the user their horoscope in text
            .card({
              title: `${sign} Horoscope`,
              content: horoscope.ho,
            })
            // say the horoscope to the user
            .say(horoscope)
        );
    });
  }
  //else error
  bot.reply(message,
    AlexaResponse
      // ask the use for their sign
      .ask(HOROSCOPE.GREETING)
      // but if they dont reply, give them a few examples
      .reprompt(`Signs are things like Aries, leo, Sagittarius. ${HOROSCOPE.GREETING}`)
  );
});

alexaEar.hears(HOROSCOPE.intents.STOP, ['message_received'], (bot, message) => {
                ['message_received'], (bot, message) => {
  bot.reply(message, 'Goodbye!');
  // .shouldEndSession(true);  how the f do we do this?
});

alexaEar.hears(HOROSCOPE.intents.HELP, ['message_received'], (bot, message) => {
  const msg = `GypsyBot is a simple horoscope bot.  If you tell it your sunsign
  and then if you want the horoscope for today, the week, month, or year, GypsyBot
  will tell you your horoscope.`;
  bot.reply(message, msg);
  // .shouldEndSession(false);  how the f do we do this?
});
