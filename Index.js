// Telegram Channel Join Request Welcome Bot (using grammy)
//
// Jab koi user aapke channel ko join karne ki request bhejta hai:
//   1. Bot us request ko AUTO-APPROVE karta hai
//   2. User ko ek private welcome message bhejta hai

const { Bot } = require("grammy");

// ============ CONFIG (apne hisaab se badlo) ============

const BOT_TOKEN = "8864343192:AAFM225_OiQphPDwq2TQn1zAKwe-p1kFJEg"; // BotFather se mila token

const WELCOME_TEXT = (name) => `
🎉 Welcome ${name}! 🎉

🎁 Gift Codes & Bonus sirf Register Users ke liye hain.

🔗 Register Link:
https://www.ts777.online/#/register?invitationCode=324515976095

✅ Register karein aur Gift Codes + Bonus ka fayda uthayein.

💬 Koi bhi help chahiye ho to message karein.
👉 @MissKajal 😊
`;

// =========================================================

const bot = new Bot(BOT_TOKEN);

bot.on("chat_join_request", async (ctx) => {
  const user = ctx.chatJoinRequest.from;
  const chat = ctx.chatJoinRequest.chat;

  try {
    // Step 1: request approve karo
    await ctx.approveChatJoinRequest();
    console.log(`Approved: ${user.id} (${user.first_name}) for ${chat.title}`);

    // Step 2: welcome DM bhejo
    await ctx.api.sendMessage(user.id, WELCOME_TEXT(user.first_name || "there"));
    console.log(`Welcome message sent to ${user.id}`);
  } catch (err) {
    // Common reason: user ne bot ko kabhi /start nahi kiya, isliye DM nahi ja sakta
    console.warn(`Could not message ${user.id}:`, err.message);
  }
});

bot.catch((err) => {
  console.error("Bot error:", err);
});

bot.start();
console.log("Bot started. Waiting for channel join requests...");
