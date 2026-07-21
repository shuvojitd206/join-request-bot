const TelegramBot = require('node-telegram-bot-api');

// TEMPORARY: token hardcoded for quick testing. Isse jaldi environment variable mein move karo aur BotFather se revoke/regenerate karo.
const token = process.env.BOT_TOKEN || '8864343192:AAFaLevCaCb3mfdQfYAxmfNxvextJomEdJs';

const bot = new TelegramBot(token, {
  polling: {
    params: {
      // Ye batana zaroori hai warna Telegram chat_join_request event bhejta hi nahi
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

  // Sirf DM bhejo, approve mat karo
  try {
    await bot.sendMessage(
      userId,
      `🎉 Welcome ${userName}! Your content is ready 👇`
    );
    console.log(`DM sent to ${userId}`);
  } catch (dmError) {
    // Yahan poora error object log karo taaki exact wajah pata chale
    console.error(`DM FAILED for ${userId}: ${dmError.message}`);
    if (dmError.response && dmError.response.body) {
      console.error('Telegram response:', JSON.stringify(dmError.response.body));
    }
  }
});

// Kisi bhi tarah ki polling error ko crash hone se bachao
bot.on('polling_error', (err) => {
  console.error('Polling error:', err.message);
});
