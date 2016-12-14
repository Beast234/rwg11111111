import fetch from 'node-fetch';

/**
 * Gets the horoscope for a given sign
 * @method getHoroscope
 * @param  {String}     sign           the sign of question
 * @param  {String}     time           yesterday, today, tomorrow
 * @return {Promise}
 * date: body.date,
 * horoscope: body.horoscope,
 * sunsign: body.sunsign,
 */
export const getHoroscope = (sign, period = 'today') => (
  fetch(`http://horoscope-api.herokuapp.com/horoscope/${period}/${sign}`)
    .then(res => res.json())
    .then((res) => res.horoscope)
);
