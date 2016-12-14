import fbEars from './controller';
import HOROSCOPE from './horoscope';

// Event	Description
// message_received	a message was received by the bot
// facebook_postback	user clicked a button in an attachment and triggered a webhook postback
// message_delivered	a confirmation from Facebook that a message has been received
// message_read	a confirmation from Facebook that a message has been read
// facebook_optin	a user has clicked the Send-to-Messenger plugin
// message_referral	a user has clicked on a m.me URL with a referral param

// launch / start
fbEars.on('facebook_postback', function(bot, message) {
    // console.log(bot, message);
   bot.reply(message, 'Great Choice!!!! (' + message.payload + ')');

});

// {{origin}} - a message object that represents the initial triggering message that caused the conversation.
//
// {{responses}} - an object that contains all of the responses a user has given during the course of the conversation. This can be used to make references to previous responses. This requires that convo.ask() questions include a keyname, making responses available at {{responses.keyname}}

// All platforms will receive the message_received event. This event is the first event fired for every message of any type received - before any platform specific events are fired.
//
// controller.on('message_received', function(bot, message) {
//
//     // carefully examine and
//     // handle the message here!
//     // Note: Platforms such as Slack send many kinds of messages, not all of which contain a text field!
// });

//ask for horoscope
// controller.hears(HOROSCOPE.utterances, 'message_received', function(bot, message) {
//     var name = message.match[1];
//     controller.storage.users.get(message.user, function(err, user) {
//         if (!user) {
//             user = {
//                 id: message.user,
//             };
//         }
//         user.name = name;
//         controller.storage.users.save(user, function(err, id) {
//             bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
//         });
//     });
// });

// controller.hears(['cookies'], 'message_received', function(bot, message) {
//
//     bot.startConversation(message, function(err, convo) {
//
//         convo.say('Did someone say cookies!?!!');
//         convo.ask('What is your favorite type of cookie?', function(response, convo) {
//             convo.say('Golly, I love ' + response.text + ' too!!!');
//             convo.next();
//         });
//     });
// });

// controller.hears('open the (.*) doors',['message_received'],function(bot,message) {
//  var doorType = message.match[1]; //match[1] is the (.*) group. match[0] is the entire group (open the (.*) doors).
//  if (doorType === 'pod bay') {
//    return bot.reply(message, 'I\'m sorry, Dave. I\'m afraid I can\'t do that.');
//  }
//  return bot.reply(message, 'Okay');
// });

//ask for help
// controller.hears(['quick'], 'message_received', function(bot, message) {
//
//     bot.reply(message, {
//         text: 'Hey! This message has some quick replies attached.',
//         quick_replies: [
//             {
//                 "content_type": "text",
//                 "title": "Yes",
//                 "payload": "yes",
//             },
//             {
//                 "content_type": "text",
//                 "title": "No",
//                 "payload": "no",
//             }
//         ]
//     });
// });

//end
// controller.hears(['shutdown'], 'message_received', function(bot, message) {
//
//     bot.startConversation(message, function(err, convo) {
//
//         convo.ask('Are you sure you want me to shutdown?', [
//             {
//                 pattern: bot.utterances.yes,
//                 callback: function(response, convo) {
//                     convo.say('Bye!');
//                     convo.next();
//                     setTimeout(function() {
//                         process.exit();
//                     }, 3000);
//                 }
//             },
//         {
//             pattern: bot.utterances.no,
//             default: true,
//             callback: function(response, convo) {
//                 convo.say('*Phew!*');
//                 convo.next();
//             }
//         }
//         ]);
//     });
// });
