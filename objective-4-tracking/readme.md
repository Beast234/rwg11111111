# Objective 4: Tracking
This exercise focuses on instrumenting GypsyBot with User, Event, and Messaging tracking from [utu.ai](https://www.utu.ai).

## Setup
Each objective in the repo runs as a separate project. From the gypsy-bot-tutorial folder (or whatever you named it), navigate to the objective-4-tracking sub directory.

Before running, you will need to run "npm install" from within the directory.

Also, you will need to update the relevant keys in the .env file.  The UTU_SECRET can be obtained by provisioning a new bot at [utu.ai](https://www.utu.ai).  While the ALEXA_APPID can be found in the amazon Alexa developer portal.  

The SUBDOMAIN is something of your choosing.  Try to make it unique, as it can conflict w/ other free public users.

After these steps you can start the bot by running "npm run start" from the "objective-4-tracking" subdirectory.

## Intent
```
{
  "intents": [
    {
      "intent": "GetHoroscope",
      "slots": [
        {
          "name": "sign",
          "type": "SIGNS"
        },
        {
          "name": "period",
          "type": "PERIOD"
        }
      ]
    },
	{
      "intent": "AMAZON.HelpIntent"
    },
    {
      "intent": "AMAZON.StopIntent"
    }
  ]
}
```
