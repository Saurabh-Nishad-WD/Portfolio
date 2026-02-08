import { Jimp } from 'jimp';
import { readdir, mkdir, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE_DIR = join(__dirname, '../documents');
const OUTPUT_DIR = join(__dirname, '../public/frames-optimized');
const TARGET_WIDTH = 854; // 480p width
const QUALITY = 40;       // Aggressive compression
const BATCH_SIZE = 10;    // Process 10 images at a time

async function optimizeFrames() {
    console.log('🚀 Starting frame optimization (Aggressive JPEG - Parallel)...\n');

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

    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;
    let processedCount = 0;

    const processFile = async (file, index) => {
        const sourcePath = join(SOURCE_DIR, file);
        const frameNumber = String(index + 1).padStart(3, '0');
        const outputPath = join(OUTPUT_DIR, `ffout${frameNumber}.jpg`);

        try {
            // Get original file size
            const stats = await stat(sourcePath);
            const originalSize = stats.size;

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

            const reduction = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
            console.log(`✓ [${index + 1}/${files.length}] ${file} → ffout${frameNumber}.jpg (${reduction}% smaller)`);

            return { original: originalSize, optimized: optimizedSize };
        } catch (err) {
            console.error(`✗ Error processing ${file}:`, err.message);
            return { original: 0, optimized: 0 };
        }
    };

    // Process in batches
    for (let i = 0; i < files.length; i += BATCH_SIZE) {
        const batch = files.slice(i, i + BATCH_SIZE);
        const results = await Promise.all(batch.map((file, idx) => processFile(file, i + idx)));

        results.forEach(res => {
            totalOriginalSize += res.original;
            totalOptimizedSize += res.optimized;
        });
    }

    console.log('\n📊 Optimization Summary:');
    console.log(`   Original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Optimized size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Total reduction: ${((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1)}%`);
    console.log('\n✅ Optimization complete!');
}

optimizeFrames().catch(console.error);
