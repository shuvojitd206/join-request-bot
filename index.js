// Telegram Channel Join Request Welcome Bot (using grammY)

const { Bot } = require("grammy");

// ================= CONFIG =================

const BOT_TOKEN = "8864343192:AAFM225_OiQphPDwq2TQn1zAKwe-p1kFJEg";

const WELCOME_TEXT = (name) => `
🎉 Welcome ${name}! 🎉

🎁 Gift Codes & Bonus sirf Register Users ke liye hain.

🔗 Register Link:
https://www.ts777.online/#/register?invitationCode=324515976095

✅ Register karein aur Gift Codes + Bonus ka fayda uthayein.

💬 Koi bhi help chahiye ho to message karein.
👉 @MissKajal 😊
`;

// ==========================================

const bot = new Bot(BOT_TOKEN);

bot.on("chat_join_request", async (ctx) => {
  const user = ctx.chatJoinRequest.from;
  const chat = ctx.chatJoinRequest.chat;

  try {
    // Auto approve join request
    await ctx.api.approveChatJoinRequest(chat.id, user.id);

    console.log(`Approved: ${user.id} (${user.first_name})`);

    // Send welcome DM
    try {
      await ctx.api.sendMessage(
        user.id,
        WELCOME_TEXT(user.first_name || "Friend")
      );

      console.log(`Welcome message sent to ${user.id}`);
    } catch (err) {
      console.log("DM could not be sent:", err.message);
    }

  } catch (err) {
    console.error("Approve failed:", err.message);
  }
});

bot.catch((err) => {
  console.error("Bot error:", err);
});

bot.start();

console.log("Bot started. Waiting for channel join requests...");
