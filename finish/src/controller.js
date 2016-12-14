// from root
// page_token=<MY PAGE TOKEN> verify_token=<MY_VERIFY_TOKEN> node facebook_bot.js [--lt [--ltsubdomain LOCALTUNNEL_SUBDOMAIN]]
//

import Botkit from 'botkit';
import alexa from 'alexa-botkit';
import localTunnel from 'localtunnel';
import HOROSCOPE from './horoscope';

// define routes for connecting to various gardens
const alexaEars = alexa({});
// const fbEars = Botkit.facebookbot({
//     debug: true,
//     log: true,
//     access_token: process.env.page_token,
//     verify_token: process.env.verify_token,
// });

// spawn Ears for each of the routes
const alexaConnection = alexaEars.spawn({});
// const fbConnection = fbEars.spawn({});


// start listening to your Ears!
alexaEars.setupWebserver(3000, (err, webserver) => {
  alexaEars.createWebhookEndpoints(webserver, alexaConnection, () => {
    console.log('ALEXA LISTENING!');
    const alexaTunnel = localTunnel(3000, {subdomain: HOROSCOPE.slotTypes.SIGN[Math.floor(Math.random() * 10) + 1 ]}, (err, tunnel) => {
        if (err) {
            console.log(err);
            process.exit();
        }
        console.log("Your bot is listening for Alexa on the following URL: " + tunnel.url + '/alexa/listener');
    });
    alexaTunnel.on('close', function() {
        console.log("Your bot is no longer listening for Alexa at the localtunnnel.me URL.");
        process.exit();
    });
  });
});
// fbEars.setupWebserver(3001, function(err, webserver) {
//     fbEars.createWebhookEndpoints(webserver, fbConnection, function() {
//         console.log('FB MESSENGER LISTENING!');
//     });
// });

export alexaConnection, alexaRoute from default;
// export fbConnection, alexaConnection, fbEars, alexaRoute from default;
