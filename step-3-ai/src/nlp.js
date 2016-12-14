const HOROSCOPE = {};

HOROSCOPE.intents = [
  {
    'START': ['LaunchRequest', 'AMAZON.StartOverIntent'],
  },
  {
    'STOP': ['AMAZON.CancelIntent', 'AMAZON.StopIntent', 'quit', 'exit', 'bye',
    'thanks'],
  },
  {
    'HELP': ['AMAZON.HelpIntent'],
  },
  {
    'HOROSCOPE': ['horoscope'],
  },
];
HOROSCOPE.utterances = [
  'get (a|the|) horoscope for (.*)',
  'get (.*) horoscope for (.*)',
  '(get| what is) (the|this|) (.*) horoscope for (.*)',
];
HOROSCOPE.slotTypes = [
  {
    'SIGN': ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra',
    'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'],
  },
  {
    'PERIOD': ['today', 'week', 'month', 'year'],
  },
];
export default HOROSCOPE;
