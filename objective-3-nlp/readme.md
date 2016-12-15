# Objective 3: NLP
The goal here is to create utterances that account for all ways a user may express the targeted intent.

## Setup
Each objective in the repo runs as a separate project. From the gypsy-bot-tutorial folder (or whatever you named it), navigate to the objective-3-nlp sub directory.

Before running, you will need to run "npm install" from within the directory.

Also, you will need to update the relevant keys in the .env file.  The ALEXA_APPID can be found in the amazon Alexa developer portal.  The SUBDOMAIN is something of your choosing.  Try to make it unique, as it can conflict w/ other free public users.

After these steps you can start the bot by running "npm run start" from the "objective-3-nlp" subdirectory.

## Utterance Translator
To aide the creation of a complete set of utterances we've also authored a free translator that accepts expressions written in mustache {} notation and generates expanded list of utterances.  It can be accessed here:  
#### https://utterances.utu.ai/
