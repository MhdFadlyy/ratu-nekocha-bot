# 🐾 Ratu Nekocha (selalu miaw) — Discord Voice Bot

A silent Discord bot that joins voice channels on admin command, stays muted,
and automatically leaves the moment **Ratu Nekocha** (the real one) arrives.

---

## ✨ Features

| Feature | Details |
|---|---|
| `!join` | Bot joins your current voice channel |
| `!leave` | Force bot to leave |
| `!help` | Show all commands |
| Auto-leave | Bot leaves when **Ratu Nekocha** joins any VC |
| Always muted | Mic muted — completely silent |
| Admin-only | Only members with Admin or Manage Channels can use commands |

---

## 📋 Commands

| Command | Who can use | What it does |
|---|---|---|
| `!join` | Admin only | Bot joins your voice channel (muted) |
| `!leave` | Admin only | Bot leaves the voice channel |
| `!help` | Admin only | Shows help message |

---

## 🔧 Customization

**Change the command prefix** — edit `index.js` line:
```js
const prefix = '!';  // Change to whatever you want, e.g. '/'
```

**Leave only when Ratu joins the SAME channel** (instead of any channel):
In `index.js`, inside the `voiceStateUpdate` handler, add this check:
```js
// Only leave if Ratu joined the exact same channel as the bot
if (newState.channelId !== botVoiceState?.channelId) return;
```

---

## 📦 Dependencies

- `discord.js` v14 — Discord API wrapper
- `@discordjs/voice` — Voice channel support
- `dotenv` — Environment variable loading
- `libsodium-wrappers` — Required by voice library
- `ffmpeg-static` — Audio encoding support

---

*Made with 💜 for the Nekocha server*
