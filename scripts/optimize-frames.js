import { Jimp } from 'jimp';
import { readdir, mkdir, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE_DIR = join(__dirname, '../documents');
const OUTPUT_DIR = join(__dirname, '../public/frames-optimized');
const TARGET_WIDTH = 1280;
const QUALITY = 60;

async function optimizeFrames() {
    console.log('🚀 Starting frame optimization...\n');

    // Create output directory if it doesn't exist
    try {
        await mkdir(OUTPUT_DIR, { recursive: true });
        console.log('✅ Output directory ready\n');
    } catch (err) {
        console.error('Error creating output directory:', err);
        return;
    }

    // Read all files from source directory
    let files;
    try {
        files = await readdir(SOURCE_DIR);
        files = files.filter(f => f.toLowerCase().endsWith('.jpg'));
        files.sort(); // Sort alphabetically
        console.log(`📁 Found ${files.length} images to process\n`);
    } catch (err) {
        console.error('Error reading source directory:', err);
        return;
    }

    // Process each file
    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const sourcePath = join(SOURCE_DIR, file);
        const frameNumber = String(i + 1).padStart(3, '0');
        const outputPath = join(OUTPUT_DIR, `ffout${frameNumber}.jpg`);

        try {
            // Get original file size
            const stats = await stat(sourcePath);
            const originalSize = stats.size;
            totalOriginalSize += originalSize;

            // Read and process the image
            const image = await Jimp.read(sourcePath);

            // Resize if width is greater than target
            if (image.bitmap.width > TARGET_WIDTH) {
                image.resize({ w: TARGET_WIDTH });
            }

            // Save with quality setting
            await image.write(outputPath, { quality: QUALITY });

            // Get optimized file size
            const optimizedStats = await stat(outputPath);
            const optimizedSize = optimizedStats.size;
            totalOptimizedSize += optimizedSize;

            const reduction = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
            console.log(`✓ [${i + 1}/${files.length}] ${file} → ffout${frameNumber}.jpg (${reduction}% smaller)`);
        } catch (err) {
            console.error(`✗ Error processing ${file}:`, err.message);
        }
    }

    console.log('\n📊 Optimization Summary:');
    console.log(`   Original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Optimized size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Total reduction: ${((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1)}%`);
    console.log('\n✅ Optimization complete!');
}

optimizeFrames().catch(console.error);
