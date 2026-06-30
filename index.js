const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, VoiceConnectionStatus, entersState } = require('@discordjs/voice');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
});

const connections = new Map();
const BOT_CHANNEL = 'bot-neko';

const RATU_NAME = process.env.RATU_NAME || 'Ratu Nekocha';
const RATU_NAME2 = process.env.RATU_NAME2 || '';

client.once('ready', () => {
  console.log(`✅ Ratu Nekocha (selalu miaw) is online as ${client.user.tag}`);
  client.user.setActivity('miaw miaw miaw 🐾');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.channel.name.includes('bot')) return;

  const prefix = 'n!';
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args[0].toLowerCase();

  const isAdmin = message.member?.permissions.has('Administrator') ||
                  message.member?.permissions.has('ManageChannels');

  if (!isAdmin) {
    return message.reply('❌ Only admins can control Ratu Nekocha (selalu miaw)!');
  }

  if (command === 'join') {
    const voiceChannel = message.member?.voice?.channel;

    if (!voiceChannel) {
      return message.reply('❌ You need to be in a voice channel first!');
    }

    if (connections.has(message.guild.id)) {
      connections.get(message.guild.id).destroy();
      connections.delete(message.guild.id);
    }

    try {
      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
        selfMute: true,
        selfDeaf: false,
      });

      connections.set(message.guild.id, connection);

      connection.on(VoiceConnectionStatus.Ready, () => {
        console.log(`🎀 Joined voice channel: ${voiceChannel.name} in ${message.guild.name}`);
      });

      connection.on(VoiceConnectionStatus.Disconnected, async () => {
        try {
          await Promise.race([
            entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
            entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
          ]);
        } catch {
          connection.destroy();
          connections.delete(message.guild.id);
        }
      });

      await message.reply(`🐾 Ratu Nekocha (selalu miaw) joined **${voiceChannel.name}** — mic muted, miaw-ing silently...`);
    } catch (err) {
      console.error(err);
      if (err.message?.includes('Missing') || err.message?.includes('permissions') || err.statusCode === 403) {
        message.reply(
          `❌ Ratu Nekocha (selalu miaw) can't join **${voiceChannel.name}**!\n\n` +
          `If it's a private TempVoice channel, the owner needs to run:\n` +
          `\`/permit @Ratu Nekocha (selalu miaw)\`\n\n` +
          `For stage channels, make sure the bot role has **Connect** permission in that channel! 🐾`
        );
      } else {
        message.reply('❌ I CANT GET IN MIAWWW!!');
      }
    }
  }

  if (command === 'leave') {
    if (connections.has(message.guild.id)) {
      connections.get(message.guild.id).destroy();
      connections.delete(message.guild.id);
      message.reply('👋 Ratu Nekocha (selalu miaw) has left the voice channel.');
    } else {
      message.reply('❌ Ratu Nekocha (selalu miaw) is not in any voice channel.');
    }
  }

  if (command === 'help') {
    message.reply(
      '**🐾 Ratu Nekocha (selalu miaw) Commands**\n' +
      '`!join` — Bot joins your current voice channel (muted & silent)\n' +
      '`!leave` — Force bot to leave the voice channel\n' +
      '`!help` — Show this help message\n\n' +
      `*Bot will auto-leave when **${RATU_NAME}** joins the same channel.*`
    );
  }
});

client.on('voiceStateUpdate', (oldState, newState) => {
  const guildId = newState.guild.id;

  if (!connections.has(guildId)) return;

  const member = newState.member;
  if (!member) return;

  const isRatu =
    member.displayName === RATU_NAME ||
    member.user.username === RATU_NAME ||
    member.user.globalName === RATU_NAME ||
    member.displayName === RATU_NAME2 ||
    member.user.username === RATU_NAME2 ||
    member.user.globalName === RATU_NAME2;

  if (!isRatu) return;

  const justJoined = !oldState.channelId && newState.channelId;
  const movedChannel = oldState.channelId && newState.channelId && oldState.channelId !== newState.channelId;

  if (justJoined || movedChannel) {
    console.log(`👑 Ratu Nekocha has arrived! Ratu Nekocha (selalu miaw) is leaving...`);

    const connection = connections.get(guildId);
    if (connection) {
      connection.destroy();
      connections.delete(guildId);

      const botNeko = newState.guild.channels.cache.find(
        ch => ch.name.includes('bot') && ch.isTextBased()
      );
      if (botNeko) {
        botNeko.send(`👑 **Ratu Nekocha** has arrived! Ratu Nekocha (selalu miaw) respectfully takes her leave. 🐾`);
      }
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
