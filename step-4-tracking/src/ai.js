import alexaEar from './controller';
import AlexaResponse from 'alexa-response';
import { getHoroscope } from './skill';
import HOROSCOPE from './nlp';
import { uTu, constants } from 'utu';

const utuConfig = new uTu(process.env.UTU-SECRET, {
  platform: constants.ALEXA,
  appId: process.env.ALEXA-APPID,
})
let utu = utuConfig;

alexaEar.on('message_received', (bot, message) => {
  const alexa = new AlexaRequest(message);
  utu = utuConfig.withContext({
    platformId: alexa.getUserId();,
    sessionId: alexa.getSessionId();,
  });
});

alexaEar.hears(HOROSCOPE.intents.START, ['message_received'], (bot, message) => {
  utu.user().then((res) => console.log(res)).catch((err) => console.log(err));
  bot.reply(message,
    AlexaResponse
      .ask(HOROSCOPE.GREETING)
      .reprompt(`Signs are things like Aries, leo, Sagittarius. ${HOROSCOPE.GREETING}`)
      // .shouldEndSession(false);  how the f do we do this?
  );
  utu.message({
    values: {
      message: HOROSCOPE.GREETING,
      rawMessage: {
       text: HOROSCOPE.GREETING,
      },
      botMessage: true,
    },
  });
});

alexaEar.hears([HOROSCOPE.intents..., HOROSCOPE.utterances...], ['message_received'], (bot, message) => {
  // do some shit to look through th message.match to see if we've got a slot & intent
  const sign = message.match[1];
  if (!HOROSCOPE.slotTypes.SIGN[sign]) {
    // got a valid sign, check for period
    utu.event("Asked for Horoscope", {
      values: {
        "sign": sign,
        // "period": period,
      },
    });
    getHoroscope(sign.toLowerCase())
      .then(({ horoscope }) => {
        utu.event("Gave Horoscope", {
          values: {
            horoscope,
          },
        });
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
        utu.message({
          values: {
            message: horoscope,
            rawMessage: {
             text: horoscope,
            },
            botMessage: true,
          },
        });
    });
  }
  //else error
  utu.event("Horoscope error: ", {
    values: {
      "sign": sign,
      // "period": period,
    },
  });
  bot.reply(message,
    AlexaResponse
      // ask the use for their sign
      .ask(HOROSCOPE.GREETING)
      // but if they dont reply, give them a few examples
      .reprompt(`Signs are things like Aries, leo, Sagittarius. ${HOROSCOPE.GREETING}`)
  );
  utu.message({
    values: {
      message: HOROSCOPE.GREETING,
      rawMessage: {
       text: HOROSCOPE.GREETING,
      },
      botMessage: true,
    },
  });
});

alexaEar.hears(HOROSCOPE.intents.STOP, ['message_received'], (bot, message) => {
                ['message_received'], (bot, message) => {
  utu.event("Exited", {
    values: {
      endTime: new Date(),
    },
  }); // how is this going to work?
  bot.reply(message, 'Goodbye!');
  // .shouldEndSession(true);  how the f do we do this?
  utu.message({
    values: {
      message: 'Goodbye!',
      rawMessage: {
       text: 'Goodbye!',
      },
      botMessage: true,
    },
  });
});

alexaEar.hears(HOROSCOPE.intents.HELP, ['message_received'], (bot, message) => {
  const msg = `GypsyBot is a simple horoscope bot.  If you tell it your sunsign
  and then if you want the horoscope for today, the week, month, or year, GypsyBot
  will tell you your horoscope.`;
  utu.event("Asked for help"); // how is this going to work?
  bot.reply(message, msg);
  // .shouldEndSession(false);  how the f do we do this?
  utu.message({
    values: {
      message: msg,
      rawMessage: {
       text: msg,
      },
      botMessage: true,
    },
  });
});
