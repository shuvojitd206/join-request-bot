const TelegramBot = require('node-telegram-bot-api');

// DEMO TOKEN
const token = "8864343192:AAFM225_OiQphPDwq2TQn1zAKwe-p1kFJEg";

const bot = new TelegramBot(token, { polling: true });

console.log("Bot started. Waiting for channel join requests...");

// Join Request
bot.on("chat_join_request", async (req) => {
  const chatId = req.chat.id;
  const userId = req.from.id;
  const userName = req.from.first_name || "Friend";

  try {
    // Auto Approve
    await bot.approveChatJoinRequest(chatId, userId);
    console.log(`Approved: ${userId} (${userName})`);

    // Welcome DM
    try {
      await bot.sendMessage(
        userId,
`🎉 Welcome ${userName}! 🎉

🎁 Gift Codes & Bonus sirf Register Users ke liye hain.

🔗 Register Link:
https://www.ts77777.online/#/register?invitationCode=324515976095

✅ Register karein aur Gift Codes + Bonus ka fayda uthayein.

💬 Koi bhi help chahiye ho to message karein.
👉 @MissKajal 😊`
      );

      console.log(`DM sent to ${userId}`);
    } catch (dmError) {
      console.warn(`DM could not be sent: ${dmError.message}`);
    }

  } catch (err) {
    console.error(`Approve failed: ${err.message}`);
  }
});

// Polling Error
bot.on("polling_error", (err) => {
  console.error("Polling Error:", err.message);
});
