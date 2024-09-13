import ytdl from 'youtube-dl-exec';
import fs from 'fs';
import path from 'path';

const output_dir = './music/'

function already_exist(title, ext = 'mp3') {
    let file_path = path.join(output_dir, `${title}.${ext}`);
    return fs.existsSync(file_path);
}

async function download_music(link) {
    if (!link) throw new Error('Link for video on YouTube not provided!');
    if (typeof(link) !== 'string') throw new Error('Link must be string!');
    if (!link.includes('https://')) throw new Error('You must provide link on public youtube video!!');
    if (!link.includes('youtu')) throw new Error('Supports only videos from YouTube!');

    try {

        let metadata = await ytdl(link, { dumpSingleJson: true });
        let duration_seconds = metadata.duration; 
        let duration_minutes = Math.floor(duration_seconds / 60);

        if (duration_minutes > 30) {
            console.log('Warning: this song longer than 30 minutes!');
            throw new Error('This song longer than 30 minutes!');
        }

        let title = metadata.title;

        if (already_exist(title)) {
            console.log('This song already downloaded!');
            return `${title}.mp3`;
        }

        let output_placement = path.join(output_dir, `${title}.mp3`);
        let options = {
            extractAudio: true,
            audioFormat: 'mp3',
            output: output_placement
        }

        let output = await ytdl(link, options);

        console.log('Download complete:', output);
        return `${title}.mp3`;
    } catch (err) {
        throw new Error(err);
    }
}

export default download_music;