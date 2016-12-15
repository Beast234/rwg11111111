import Botkit from 'botkit';
import alexa from 'alexa-botkit';
import localtunnel from 'localtunnel';
import { uTu, constants } from 'utu';

// tag utu constants to app environment
console.log('apiKey: ', process.env.UTU_SECRET);
const utu = new uTu(process.env.UTU_SECRET, {
  platform: constants.ALEXA,
  appId: process.env.ALEXA_APPID,
});

// define ears for Alexa
const alexaEars = alexa({
  debug: true,
});

// give alexa the tools to listen and communicate to the outside world
const alexaEarbuds = alexaEars.spawn({});

// start listening to your Alexa ears!
alexaEars.setupWebserver(3000, (err, webserver) => {
  alexaEars.createWebhookEndpoints(webserver, alexaEarbuds);
  const tunnel = localtunnel(3000,  { subdomain: process.env.SUBDOMAIN, host: 'https://www.bot-tunnel.com/' }, (err, tunnel) => {
      if (err) {
          console.log(err);
          process.exit();
      }
      console.log(`Your bot is listening for Alexa requests on the following URL: ${tunnel.url}/alexa/receive`);
  });

  tunnel.on('close', function() {
      console.log('Your bot is no longer listening for Alexa requests at the localtunnnel.me URL.');
      process.exit();
  });
});

alexaEars.middleware.receive.use((bot, message, next) => {
  message.utu = utu.withContext(
    {
      platformId: message.user,
      sessionId: message.alexa.getSessionId(),
    }
  );
  next();
});

export default alexaEars;
