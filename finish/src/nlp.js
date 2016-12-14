const HOROSCOPE = {};

// [
//   'call me (.*)',
//   'my name is (.*)'
//   'get a horoscope for (.*)'
//   'get (a|the) horoscope for (.*)',
// ]

  HOROSCOPE.utterances = [
    'get {a|the|} horoscope for {-|SunSign}',
    'get {-|SunSign} {horoscope|} for {-|Hday}',
    '{get| what is} {the|this|} {-|Hday} horoscope for {-|SunSign}',
  ]

  HOROSCOPE.slotTypes = [
    {
        'SIGN': ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra',
                 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'],
    },
    {
        'PERIOD': ['today', 'week', 'month', 'year'],
    },
  ]

  export default HOROSCOPE;

  // convo.extractResponses()
  //
  // Returns an object containing all of the responses a user sent during the course of a conversation.
  //
  // var values = convo.extractResponses();
  // var value = values.key;
  // convo.extractResponse()
  //
  // Return one specific user response, identified by its key.
  //
  // var value  = convo.extractResponse('key');
