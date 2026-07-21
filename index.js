const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN || '8845040943:AAF1VA_2cXRQHmFZN0lmERkHlUxkFFKHxN8';

const bot = new TelegramBot(token, {
  polling: {
    params: {
      allowed_updates: ['message', 'chat_join_request']
    }
  }
});

console.log('Bot started. Waiting for channel join requests...');

// Jab koi user group/channel join request bhejta hai
bot.on('chat_join_request', async (req) => {
  const chatId = req.chat.id;
  const userId = req.from.id;
  const userName = req.from.first_name || 'there';

  console.log(`Join request aayi: ${userId} (${userName}) chat ${chatId} se`);

  try {
    // 1️⃣ Welcome Message
    await bot.sendMessage(
      userId,
      `🎉 Welcome to VIP Team! 💯

🔗 Registration Link:
https://www.ts777.online/#/register?invitationCode=324515976095

✅ Register karke deposit karo aur Screenshot bhej do. Screenshot verify hote hi tumhe VIP Group me add kar diya jayega. 🚀`
    );

    // 2️⃣ APK File
    await bot.sendDocument(userId, "./ITHESHBHAI.apk", {
      caption: "📲 Download App"
    });

    // 3️⃣ Voice Note
    await bot.sendVoice(userId, "./newaudio.ogg");

    // 4️⃣ Final Message
    await bot.sendMessage(
      userId,
      "✅ Deposit karke Screenshot Send karo."
    );

    console.log(`DM sent to ${userId}`);

  } catch (dmError) {
    console.error(`DM FAILED for ${userId}: ${dmError.message}`);

    if (dmError.response && dmError.response.body) {
      console.error(
        'Telegram response:',
        JSON.stringify(dmError.response.body)
      );
    }
  }
});

// Polling error
bot.on('polling_error', (err) => {
  console.error('Polling error:', err.message);
});
