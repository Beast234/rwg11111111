import alexaEar from './route';
import AlexaResponse from 'alexa-response';
import { getHoroscope } from './skill';
import HOROSCOPE from './nlp';

alexaEar.on('message_received', (bot, message) => {
  message.utu.message({
    values: {
      message: message.alexa.getIntentName(),
      rawMessage: {
       text: message.alexa.getIntentName(),
      },
      botMessage: false,
    }
  }).then( (e) => console.log("error: ", e))
    .catch( (e) => console.log("error: ", e));
});

alexaEar.hears(HOROSCOPE.intents.START, ['message_received'], (bot, message) => {
  bot.reply(message,
    AlexaResponse
      .ask(HOROSCOPE.responses.greeting)
      .reprompt(`Signs are things like Aries, leo, Sagittarius. ${HOROSCOPE.responses.greeting}`)
  );
  message.utu.event("Session start");
});

alexaEar.hears(HOROSCOPE.intents.HOROSCOPE, ['message_received'], (bot, message) => {
  const sign = message.alexa.getSlotValue('sign');
  const period = message.alexa.getSlotValue('period') || 'today';
  message.utu.event("Asked for Horoscope", {
    values: {
      "sign": sign,
      "period": period,
    },
  });
  console.log(sign, period);
  if (sign) {
    getHoroscope(sign.toLowerCase())
      .then((horoscope) => {
        bot.reply(message, AlexaResponse.say(horoscope));
      });
    message.utu.event("Returned Horoscope", {
      values: {
        "sign": sign,
        "period": period,
      },
    });
  } else {
    bot.reply(message,
      AlexaResponse
        // ask the use for their sign
        .ask(HOROSCOPE.responses.greeting)
        // but if they dont reply, give them a few examples
        .reprompt(`Signs are things like Aries, leo, Sagittarius. ${HOROSCOPE.responses.greeting}`)
    );
    message.utu.event("Horoscope Error");
  }
});

alexaEar.hears(HOROSCOPE.intents.STOP, ['message_received'], (bot, message) => {
  bot.reply(message, HOROSCOPE.responses.goodbye);
  message.utu.event("Session End");
});

alexaEar.hears(HOROSCOPE.intents.HELP, ['message_received'], (bot, message) => {
  bot.reply(message, AlexaResponse.ask(HOROSCOPE.responses.help));
  message.utu.event("Asked for help");
});
