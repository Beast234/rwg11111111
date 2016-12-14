import Botkit from 'botkit';
import alexa from 'alexa-botkit';
import localTunnel from 'localtunnel';

// define ears for Alexa
const alexaEars = alexa({});

// spawn ears for Alexa
const alexaConnection = alexaEars.spawn({});

// start listening to your Alexa ears!
alexaEars.setupWebserver(3000, (err, webserver) => {
  alexaEars.createWebhookEndpoints(webserver, alexaConnection, () => {
    console.log('ALEXA LISTENING!');
    const alexaTunnel = localTunnel(3000, {subdomain: process.env.SUBDOMAIN}, (err, tunnel) => {
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

export alexaEars, alexaConnection from default;
