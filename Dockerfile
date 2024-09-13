FROM node:18

# Install FFmpeg
RUN apt update && apt install -y ffmpeg && apt clean

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]