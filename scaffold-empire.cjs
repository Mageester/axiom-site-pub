const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.join(__dirname);
const parentDir = path.dirname(__dirname); // C:\Users\aidan\OneDrive\Desktop\AxiomV4

const landscapingDir = path.join(parentDir, 'axiom-demo-landscaping');
const roofingDir = path.join(parentDir, 'axiom-demo-roofing');

const ignorePatterns = [
    'node_modules', '.git', 'dist', '.env', 'hvac-raw.jpg', 'landscaping-raw.jpg', 'roofing-raw.jpg',
    'fetch-images.cjs', 'convert.cjs', 'scaffold-empire.cjs'
];

function filterCopy(src, dest) {
    const basename = path.basename(src);
    if (ignorePatterns.includes(basename)) {
        return false;
    }
    return true;
}

console.log("Cloning to Landscaping...");
fs.cpSync(rootDir, landscapingDir, { recursive: true, filter: filterCopy });

console.log("Cloning to Roofing...");
fs.cpSync(rootDir, roofingDir, { recursive: true, filter: filterCopy });

// Find and Replace logic
function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

function processReplacements(dir, replacements) {
    walkDir(dir, (filePath) => {
        const ext = path.extname(filePath);
        if (!['.tsx', '.ts', '.md', '.json', '.html'].includes(ext)) return;

        let content = fs.readFileSync(filePath, 'utf8');
        let initialContent = content;

        for (const [search, replace] of Object.entries(replacements)) {
            // Global case-insensitive replacement
            const regex = new RegExp(search, 'gi');
            content = content.replace(regex, (match) => {
                // Try to preserve case if it's all caps
                if (match === match.toUpperCase()) return replace.toUpperCase();
                return replace;
            });
        }

        if (content !== initialContent) {
            fs.writeFileSync(filePath, content, 'utf8');
        }
    });
}

const landscapingReplacements = {
    'HVAC \\& Climate Dispatch': 'Premium Landscaping & Hardscaping',
    'Heating \\& Cooling': 'Landscaping & Hardscaping',
    'HVAC Contractor': 'Landscape Architecture',
    'Industrial Climate Control': 'Exterior Architecture',
    'HVAC': 'Landscaping',
    'hvac\\.getaxiom\\.ca': 'landscaping.getaxiom.ca'
};

const roofingReplacements = {
    'HVAC \\& Climate Dispatch': 'Premium Roofing & Exteriors',
    'Heating \\& Cooling': 'Roofing & Exteriors',
    'HVAC Contractor': 'Roofing Authority',
    'Industrial Climate Control': 'Exterior Protection',
    'HVAC': 'Roofing',
    'hvac\\.getaxiom\\.ca': 'roofing.getaxiom.ca'
};

console.log("Processing terminology replacements...");
processReplacements(landscapingDir, landscapingReplacements);
processReplacements(roofingDir, roofingReplacements);

function verifyAndGit(dir, name) {
    console.log(`Setting up Git and verifying ${name}...`);
    try {
        execSync('npm install', { cwd: dir, stdio: 'ignore' });
        execSync('npm run build', { cwd: dir, stdio: 'ignore' });
        execSync('git init', { cwd: dir, stdio: 'ignore' });
        execSync('git add .', { cwd: dir, stdio: 'ignore' });
        execSync('git commit -m "chore(init): scaffolding initial baseline for ' + name + '"', { cwd: dir, stdio: 'ignore' });
        console.log(`Success: ${name} is ready!`);
    } catch (e) {
        console.error(`Failed to build or initialize git for ${name}: `, e.message);
    }
}

verifyAndGit(landscapingDir, 'Landscaping Demo');
verifyAndGit(roofingDir, 'Roofing Demo');
console.log("Protocol Empire completed successfully.");
