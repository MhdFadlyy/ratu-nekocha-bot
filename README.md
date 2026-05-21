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
| Always muted | Mic muted + ears deafened — completely silent |
| Admin-only | Only members with Admin or Manage Channels can use commands |

---

## 🛠️ Setup Guide

### Step 1 — Create the Bot on Discord

1. Go to [https://discord.com/developers/applications](https://discord.com/developers/applications)
2. Click **New Application** → name it `Ratu Nekocha (selalu miaw)`
3. Go to **Bot** tab → click **Add Bot**
4. Under **Privileged Gateway Intents**, enable:
   - ✅ Server Members Intent
   - ✅ Message Content Intent
   - ✅ Voice State (enabled by default)
5. Copy your **Bot Token** — you'll need it below

### Step 2 — Invite the Bot to Your Server

Use this URL (replace `YOUR_CLIENT_ID` with your app's Client ID):

```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=3148800&scope=bot
```

Permissions included:
- Connect (voice)
- Speak
- Send Messages
- View Channels

### Step 3 — Install & Configure

```bash
# Clone or copy the bot folder, then:
npm install

# Copy the example env file
cp .env.example .env
```

Edit `.env`:
```env
DISCORD_TOKEN=paste_your_token_here
RATU_NAME=Ratu Nekocha   # Change to exact Discord name of Ratu Nekocha
```

> ⚠️ **RATU_NAME** must match either the **Display Name**, **Username**, or **Global Name**
> of the real Ratu Nekocha account exactly (case-sensitive).

### Step 4 — Run the Bot

```bash
npm start
```

You should see:
```
✅ Putri Nekocha is online as Putri Nekocha#1234
```

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
