# Music downloader Telegram bot

This bot download audio from yotube video. You just need send link on video to bot.

## Prerequisites
- [Node.js](https://nodejs.org/en)
- [NPM](https://www.npmjs.com/)
- [FFmpeg](https://ffmpeg.org/)

## Prepare
Make sure all prerequisites is installed, by running:
- ```node -v```
- ```npm -v```
- ```ffmpeg -version```
You should receive current vesrion programs

### Create bot and getting token
1. Create bot via @BotFather [guide](https://core.telegram.org/bots/tutorial#obtain-your-bot-token) 
2. Copy bot token
3. Pass bot token to src/index.js

## Run on Node
1. Install dependencies: ```npm install```
2. Start project: ```npm start```

## Run with [Docker](https://www.docker.com)
### Automatically
- Run with sudo or as Administrator ```npm run docker```
### Manuallly
1. Build docker container :```docker build -t music-downloader .```
2. Run docker container: ```sudo docker run -d --name music-downloader-app music-downloader```

#### Used packages:
1. [node-telegram-bot-api](https://www.npmjs.com/package/node-telegram-bot-api)
2. [youtube-dl-exec](https://www.npmjs.com/package/youtube-dl-exec)