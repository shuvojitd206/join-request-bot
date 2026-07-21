const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '8845040943:AAF1VA_2cXRQHmFZN0lmERkHlUxkFFKHxN8';
const ADMIN_ID = 8213349474;

const bot = new TelegramBot(TOKEN, { polling: true });

const userMap = {};

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  await bot.sendMessage(
    chatId,
    `🎉 Welcome to VIP Team! 💯

🔗 Registration Link:
https://www.ts77777.online/#/register?invitationCode=324515976095

✅ Register karke deposit karo aur Screenshot bhej do. Screenshot verify hote hi tumhe VIP Group me add kar diya jayega. 🚀`
  );

  await bot.sendDocument(chatId, "./ITHESHBHAI.apk", {
    caption: "📲 Download App"
  });

  await bot.sendVoice(chatId, "./newaudio.ogg");

  await bot.sendMessage(
    chatId,
    "✅ Deposit karke Screenshot Send karo."
  );
});

bot.on('chat_join_request', async (req) => {
  const chatId = req.from.id;

  await bot.sendMessage(
    chatId,
    `🎉 Welcome to VIP Team! 💯

🔗 Registration Link:
https://www.ts77777.online/#/register?invitationCode=324515976095

✅ Register karke deposit karo aur Screenshot bhej do. Screenshot verify hote hi tumhe VIP Group me add kar diya jayega. 🚀`
  );

  await bot.sendDocument(chatId, "./ITHESHBHAI.apk", {
    caption: "📲 Download App"
  });

  await bot.sendVoice(chatId, "./newaudio.ogg");

  await bot.sendMessage(
    chatId,
    "✅ Deposit karke Screenshot Send karo."
  );
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  if (chatId === ADMIN_ID) {
    if (msg.text && msg.text.startsWith('/start')) return;

    if (msg.reply_to_message) {
      const repliedId = msg.reply_to_message.message_id;
      const targetUserId = userMap[repliedId];

      if (targetUserId) {
        bot.sendMessage(targetUserId, msg.text);
      } else {
        bot.sendMessage(ADMIN_ID, 'Ye message kis user ka hai pata nahi chal raha, sahi message pe reply karo.');
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
  });
});

bot.on('polling_error', (error) => {
  console.log(error.message);
});
