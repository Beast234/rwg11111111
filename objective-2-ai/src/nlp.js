const HOROSCOPE = {
  intents: {
    START: ['LaunchRequest', 'AMAZON.StartOverIntent'],
    STOP: ['AMAZON.CancelIntent', 'AMAZON.StopIntent', 'bye', 'thanks'],
    HELP: ['AMAZON.HelpIntent'],
    HOROSCOPE: ['HoroscopeIntent'],
  },
};

export default HOROSCOPE;
