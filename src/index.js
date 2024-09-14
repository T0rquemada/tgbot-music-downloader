import TelegramBot from 'node-telegram-bot-api';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import download_music from "./download_music.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const bot_token = '';
const bot = new TelegramBot(bot_token, {polling: true});

let command_to_ignore = ['/start', '/help'];

bot.onText('/start', (msg) => {
    const chatId = msg.chat.id;
    let answer = 'Send link on youtube video';

    bot.sendMessage(chatId, answer || "Oops, undefined desc for '/start'");
});

bot.onText('/help', (msg) => {
    const chatId = msg.chat.id;
    let desc = 'This bot downloads music (in .mp3) from youtube video. To use just send link on any video from YouTube. Supports video shorter 30 minutes';

    bot.sendMessage(chatId, desc || "Oops, undefined desc for '/help'");
});

bot.on('message', async (msg) => {
    const chat_id = msg.chat.id;
    const message = msg.text;
    const message_id = msg.message_id;

    if (!message || typeof(message) !== 'string') {
        console.error('Unexpected message from user: not provided or not string');
        return;
    }

    console.log('Receive message: ', message);

    if (command_to_ignore.includes(message)) return;
    else if (message[0] === '/') {
        bot.sendMessage(chat_id, "Unknow command. Type /help to see available commands");
        return;
    }
    try {
        let bot_msg = await bot.sendMessage(chat_id, "Start download audio...");
        const bot_msg_id = bot_msg.message_id;
        
        let music = await download_music(message);
        let { title, artist } = music;

        let file_path = join(__dirname, '../music', `${title}.mp3`);

        if (fs.existsSync(file_path)) {
            await bot.sendAudio(chat_id, file_path, { title: title.replace('_', ' '), caption: 'Downloaded with @MusicDownloaderYTBot', performer: artist, thumbnail: thumbnail });

            // Delete downloaded file
            fs.unlink(file_path, (err) => {
                if (err) console.error('Error deleting file:', err);
                else console.log('Audio file deleted successfully');
            });

            bot.deleteMessage(chat_id, bot_msg_id); // Delete bot message about starting download
            bot.deleteMessage(chat_id, message_id); // Delete link on video
        } else {
            bot.sendMessage(chat_id, 'Error: Audio file not found.');
        }
    } catch (err) {
        console.error(err);
        bot.sendMessage(chat_id, err.message);
    }
});