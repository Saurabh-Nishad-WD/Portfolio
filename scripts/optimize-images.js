
import { Jimp } from 'jimp';
import fs from 'fs/promises';
import path from 'path';

const INPUT_DIR = 'public/frames';
const OUTPUT_DIR = 'public/frames-optimized';
const TARGET_WIDTH = 1280; // Full HD width, good balance
const QUALITY = 80;

async function optimize() {
    try {
        await fs.mkdir(OUTPUT_DIR, { recursive: true });
        const files = await fs.readdir(INPUT_DIR);

        // Filter for gif files
        const gifFiles = files.filter(file => file.endsWith('.gif'));

        console.log(`Found ${gifFiles.length} GIF files to process.`);

        for (const file of gifFiles) {
            const inputPath = path.join(INPUT_DIR, file);
            // Change extension to .jpg for better compatibility and compression
            const outputFilename = file.replace('.gif', '.jpg');
            const outputPath = path.join(OUTPUT_DIR, outputFilename);

            console.log(`Processing ${file}...`);

            try {
                // Read the image
                const image = await Jimp.read(inputPath);

                // Resize if width is larger than target
                if (image.width > TARGET_WIDTH) {
                    image.resize({ w: TARGET_WIDTH });
                }

                // Write as JPEG
                await image.write(outputPath, { quality: QUALITY });
                console.log(`Saved ${outputFilename}`);
            } catch (err) {
                console.error(`Error processing ${file}:`, err);
            }
        }
        console.log('Optimization complete!');
    } catch (error) {
        console.error('Script failed:', error);
    }
}

optimize();
