const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '8845040943:AAF1VA_2cXRQHmFZN0lmERkHlUxkFFKHxN8';
const ADMIN_ID = 8213349474;

const bot = new TelegramBot(TOKEN, { polling: true });

const userMap = {};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const welcomeMessage = `🎉 Welcome to VIP Team! 💯

🔗 Registration Link:
https://www.ts77777.online/#/register?invitationCode=324515976095

✅ Register karke deposit karo aur Screenshot bhej do. Screenshot verify hote hi tumhe VIP Group me add kar diya jayega. 🚀`;

  bot.sendMessage(chatId, welcomeMessage).catch((err) => {
    console.log(err.message);
  });

  bot.sendDocument(chatId, "./ITHESHBHAI.apk", {
    caption: "📲 Download App"
  }).catch((err) => {
    console.log(err.message);
  });

  bot.sendVoice(chatId, "./newaudio.ogg").catch((err) => {
    console.log(err.message);
  });

  bot.sendMessage(chatId, "✅ Deposit karke Screenshot Send karo.").catch((err) => {
    console.log(err.message);
  });
});

bot.on('chat_join_request', (req) => {
  const chatId = req.from.id;

  const joinMessage = `🎉 Welcome to VIP Team! 💯

🔗 Registration Link:
https://www.ts77777.online/#/register?invitationCode=324515976095

✅ Register karke deposit karo aur Screenshot bhej do. Screenshot verify hote hi tumhe VIP Group me add kar diya jayega. 🚀`;

  bot.sendMessage(chatId, joinMessage).catch((err) => {
    console.log(err.message);
  });

  bot.sendDocument(chatId, "./ITHESHBHAI.apk", {
    caption: "📲 Download App"
  }).catch((err) => {
    console.log(err.message);
  });

  bot.sendVoice(chatId, "./newaudio.ogg").catch((err) => {
    console.log(err.message);
  });

  bot.sendMessage(chatId, "✅ Deposit karke Screenshot Send karo.").catch((err) => {
    console.log(err.message);
  });
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  if (chatId === ADMIN_ID) {
    if (msg.text && msg.text.startsWith('/start')) return;

    if (msg.reply_to_message) {
      const repliedId = msg.reply_to_message.message_id;
      const targetUserId = userMap[repliedId];

      if (targetUserId) {
        bot.sendMessage(targetUserId, msg.text).catch((err) => {
          console.log(err.message);
        });
      } else {
        bot.sendMessage(
          ADMIN_ID,
          'Ye message kis user ka hai pata nahi chal raha, sahi message pe reply karo.'
        ).catch((err) => {
          console.log(err.message);
        });
      }
    }
    return;
  }

  if (msg.text && msg.text.startsWith('/start')) return;

  const userName = msg.from.first_name || 'User';
  const username = msg.from.username ? `@${msg.from.username}` : 'No username';

  const forwardText = `📩 New message\n👤 ${userName} (${username})\n🆔 ${chatId}\n\n${msg.text}`;

  bot.sendMessage(ADMIN_ID, forwardText).then((sentMsg) => {
    userMap[sentMsg.message_id] = chatId;
  }).catch((err) => {
    console.log(err.message);
  });
});

bot.on('polling_error', (error) => {
  console.log(error.message);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection:', err.message);
});  console.log(error.message);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection:', err.message);
});
