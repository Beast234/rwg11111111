import fetch from 'node-fetch';

/**
 * Gets the horoscope for a given sign
 * @method getHoroscope
 * @param  {String}     sign           the sign of question
 * @param  {String}     time           yesterday, today, tomorrow
 * @return {Promise}
 */
export const getHoroscope = (sign, time = 'today') => (
  fetch(`http://theastrologer-api.herokuapp.com/api/horoscope/${sign}/${time}`)
    .then(res => res.json())
);

function getHoroscope(sign, hday) {
  var horoscope = null;
  var myDate = 'today';
  switch (hday) {
    case 'week':
      myDate = 'week';
      break;
    case 'month':
      myDate = 'month';
      break;
    case 'year':
      myDate = 'year';
      break;
    default:
  }
  var url = 'http://horoscope-api.herokuapp.com/horoscope/' + myDate + '/' + sign;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body)
      horoscope = {
        day: myDate,
        date: body.date,
        horoscope: body.horoscope,
        sunsign: body.sunsign,
      }
   } else {
     // got a non 200 response back
     horoscope = { error: error };
   }
  });
  deasync.loopWhile(function() {
    return !horoscope;
  });
  return horoscope;
}
