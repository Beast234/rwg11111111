import Botkit from 'botkit';
import alexa from 'alexa-botkit';
import localtunnel from 'localtunnel';

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

export default alexaEars;
