const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'public');

const files = [
    { in: 'hvac-raw.jpg', out: 'hvac-case-study.webp' },
    { in: 'landscaping-raw.jpg', out: 'landscaping-concept.webp' },
    { in: 'roofing-raw.jpg', out: 'roofing-concept.webp' }
];

async function convert() {
    for (const file of files) {
        const input = path.join(dir, file.in);
        if (!fs.existsSync(input)) {
            console.error(`Missing input file: ${input}`);
            continue;
        }
        const output = path.join(dir, file.out);
        try {
            await sharp(input)
                .resize({ width: 1200, withoutEnlargement: true })
                .webp({ quality: 80 })
                .toFile(output);
            console.log(`Successfully converted ${file.in} to ${file.out}`);
            fs.unlinkSync(input); // cleanup raw
        } catch (e) {
            console.error(`Failed converting ${file.in}:`, e);
        }
    }
}

convert();
