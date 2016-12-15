import getUtterances from 'alexa-utterances';

const HOROSCOPE = {
  intents: {
    START: ['LaunchRequest', 'AMAZON.StartOverIntent'],
    STOP: ['AMAZON.CancelIntent', 'AMAZON.StopIntent', 'quit', 'exit', 'bye', 'thanks'],
    HELP: ['AMAZON.HelpIntent'],
    HOROSCOPE: ['GetHoroscope']
  },
  utterances: [
    'get {a|the} horoscope for {-|SIGN}',
    'get {-|SIGN} horoscope for {-|PERIOD}',
    '{get|what is} {the|this} {-|PERIOD} horoscope for {-|SIGN}',
  ],
  slots: {
    SIGN: 'SIGN',
    PERIOD: 'PERIOD',
  },
  slotTypes: {
    SIGN: [
      'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
      'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
    ],
    PERIOD: ['today', 'week', 'month', 'year']
  },
  responses: {
    greeting: 'What sign would you like a horoscope for? And for what period - today, this week, month, or year?',
    help: `GypsyBot is a simple horoscope bot. If you tell it your sunsign
           and then if you want the horoscope for today, the week, month, or year, GypsyBot
           will tell you your horoscope.`,
    goodbye: 'Goodbye!',
  }
};

const { utterances, slots, slotTypes } = HOROSCOPE;
console.log('UTTERANCES:\n\n');
console.log(
  utterances
    .map((utterance) => (
      getUtterances(utterance, slots, slotTypes).map((s) => `GetHoroscope       ${s}`)
    ))
    .reduce((m, o) => [...m, ...o], [])
    .join('\n')
);
console.log('\n\nEND OF UTTERANCES');
export default HOROSCOPE;
