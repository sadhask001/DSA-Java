const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('   DSA-JAVA PLATFORM COMPREHENSIVE TEST SUITE       ');
console.log('====================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`  [PASS] ${message}`);
        passCount++;
    } else {
        console.error(`  [FAIL] ${message}`);
        failCount++;
    }
}

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            if (file !== '.git' && file !== 'node_modules') results = results.concat(walk(fullPath));
        } else if (file.endsWith('.html')) {
            results.push(fullPath);
        }
    });
    return results;
}

const htmlFiles = walk('.');

// -----------------------------------------------------------------
// TEST 1: ALL HTML FILES COUNT & ARCHITECTURE
// -----------------------------------------------------------------
console.log('--- TEST 1: HTML Architecture Verification ---');
assert(htmlFiles.length === 45, `Found exactly 45 HTML curriculum pages (actual: ${htmlFiles.length})`);

// -----------------------------------------------------------------
// TEST 2: SHARED ASSETS INCLUSION (CSS & JS)
// -----------------------------------------------------------------
console.log('\n--- TEST 2: Shared Asset Dependencies Across All Pages ---');
let missingCss = 0;
let missingSearch = 0;
let missingProgress = 0;
let missingProbDb = 0;

htmlFiles.forEach(f => {
    const text = fs.readFileSync(f, 'utf8');
    if (!text.includes('design-system.css')) missingCss++;
    if (!text.includes('global-search.js')) missingSearch++;
    if (!text.includes('progress-manager.js')) missingProgress++;
    if (!text.includes('problem-db.js')) missingProbDb++;
});

assert(missingCss === 0, `All 45 pages include design-system.css (missing: ${missingCss})`);
assert(missingSearch === 0, `All 45 pages include global-search.js (missing: ${missingSearch})`);
assert(missingProgress === 0, `All 45 pages include progress-manager.js (missing: ${missingProgress})`);
assert(missingProbDb === 0, `All 45 pages include problem-db.js (missing: ${missingProbDb})`);

// -----------------------------------------------------------------
// TEST 3: INTERNAL LINK CRAWLER (ZERO 404s)
// -----------------------------------------------------------------
console.log('\n--- TEST 3: Internal Link & Asset Crawler ---');
let brokenLinks = [];

htmlFiles.forEach(file => {
    const text = fs.readFileSync(file, 'utf8');
    const dir = path.dirname(file);
    const linkRegex = /(?:href|src)=["']([^"':#?]+)(?:[#?][^"']*)?["']/g;
    let match;
    while ((match = linkRegex.exec(text)) !== null) {
        const link = match[1];
        if (link.startsWith('http') || link.startsWith('mailto:') || link.startsWith('javascript:')) continue;
        if (!link.trim()) continue;
        
        const targetPath = path.resolve(dir, link);
        if (!fs.existsSync(targetPath)) {
            brokenLinks.push({ file, link, resolved: targetPath });
        }
    }
});

assert(brokenLinks.length === 0, `All internal HTML, CSS, and JS links resolve without 404s (broken: ${brokenLinks.length})`);
if (brokenLinks.length > 0) {
    brokenLinks.forEach(b => console.error(`    ${b.file} -> ${b.link}`));
}

// -----------------------------------------------------------------
// TEST 4: PROBLEM DATABASE TAXONOMY & TOPIC QUERIES
// -----------------------------------------------------------------
console.log('\n--- TEST 4: Problem Database & Query Verification ---');
global.window = global;
global.document = {
    getElementById: () => null,
    getElementsByTagName: () => [],
    createElement: () => ({ setAttribute: ()=>{}, style: {}, addEventListener: ()=>{} }),
    addEventListener: () => {},
    body: { appendChild: ()=>{} }
};
global.localStorage = { getItem: () => null, setItem: () => {}, length: 0, key: () => null };

require(path.resolve('shared/js/problem-db.js'));
require(path.resolve('shared/js/progress-manager.js'));

assert(typeof PROBLEM_DATABASE !== 'undefined' && PROBLEM_DATABASE.length > 0, `PROBLEM_DATABASE loaded with ${PROBLEM_DATABASE.length} problems`);

// Test Linked List query specifically
const linkedListProblems = getProblemsByTopic('Linked List');
assert(linkedListProblems.length === 8, `Linked List topic query yields 8 verified problems (actual: ${linkedListProblems.length})`);

const linkedListNorm = getProblemsByTopic('LinkedList');
assert(linkedListNorm.length === 8, `Normalized query 'LinkedList' correctly aliases to 'Linked List' (actual: ${linkedListNorm.length})`);

// Check all pages calling renderProblemCards
let emptyProblemCalls = [];
htmlFiles.forEach(file => {
    const text = fs.readFileSync(file, 'utf8');
    const rpcRegex = /renderProblemCards\s*\(\s*['"][^'"]+['"]\s*,\s*['"]([^'"]+)['"]\s*\)/g;
    let m;
    while ((m = rpcRegex.exec(text)) !== null) {
        const queryTopic = m[1];
        const count = getProblemsByTopic(queryTopic).length;
        if (count === 0) {
            emptyProblemCalls.push({ file, queryTopic });
        }
    }
});

assert(emptyProblemCalls.length === 0, `All renderProblemCards topic queries return registered problems (empty calls: ${emptyProblemCalls.length})`);
if (emptyProblemCalls.length > 0) {
    emptyProblemCalls.forEach(e => console.error(`    ${e.file} queries '${e.queryTopic}' -> 0 problems!`));
}

// -----------------------------------------------------------------
// TEST 5: TOPIC PROGRESS KEY SYNCHRONIZATION
// -----------------------------------------------------------------
console.log('\n--- TEST 5: Topic Progress Key Alignment ---');
const validTopicIds = ALL_TOPICS.map(t => t.id);
let invalidTopicCalls = [];

htmlFiles.forEach(file => {
    const text = fs.readFileSync(file, 'utf8');
    const statusRegex = /(?:getTopicStatus|toggleTopicComplete)\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
    let m;
    while ((m = statusRegex.exec(text)) !== null) {
        const id = m[1];
        const norm = typeof normalizeTopicId === 'function' ? normalizeTopicId(id) : id;
        if (!validTopicIds.includes(norm)) {
            invalidTopicCalls.push({ file, id, norm });
        }
    }
});

assert(invalidTopicCalls.length === 0, `All topic status callers map to registered roadmap IDs (invalid: ${invalidTopicCalls.length})`);
if (invalidTopicCalls.length > 0) {
    invalidTopicCalls.forEach(i => console.error(`    ${i.file} uses unmapped topic ID: '${i.id}'`));
}

// Test Array & LinkedList specifically
assert(normalizeTopicId('array') === 'arrays', `Legacy key 'array' normalizes to 'arrays'`);
assert(normalizeTopicId('linkedlist') === 'linked-list', `Legacy key 'linkedlist' normalizes to 'linked-list'`);

// -----------------------------------------------------------------
// TEST 6: SEARCH KEYBOARD NAVIGATION & ARIA
// -----------------------------------------------------------------
console.log('\n--- TEST 6: Search Modal Keyboard Navigation & Semantics ---');
const searchJs = fs.readFileSync('shared/js/global-search.js', 'utf8');
assert(searchJs.includes('ArrowDown'), `global-search.js implements ArrowDown navigation`);
assert(searchJs.includes('ArrowUp'), `global-search.js implements ArrowUp navigation`);
assert(searchJs.includes("e.key === 'Enter'"), `global-search.js implements Enter key activation`);
assert(searchJs.includes("role=\"dialog\"") || searchJs.includes("setAttribute('role', 'dialog')"), `global-search.js includes ARIA dialog role`);
assert(searchJs.includes("aria-modal"), `global-search.js includes aria-modal attribute`);
assert(searchJs.includes("overflow = 'hidden'"), `global-search.js manages body scroll locking`);

// -----------------------------------------------------------------
// TEST 7: DESIGN SYSTEM & ACCESSIBILITY (CONTRAST & NO CURSIVE)
// -----------------------------------------------------------------
console.log('\n--- TEST 7: Design System & Typography Cleanliness ---');
let cursiveUsages = [];
htmlFiles.forEach(f => {
    const text = fs.readFileSync(f, 'utf8');
    if (text.includes('Great Vibes')) cursiveUsages.push(f);
});

assert(cursiveUsages.length === 0, `Purged novelty cursive font 'Great Vibes' across all curriculum pages (found in: ${cursiveUsages.length})`);

const designCss = fs.readFileSync('shared/css/design-system.css', 'utf8');
assert(designCss.includes('@media (max-width: 1024px)'), `design-system.css contains tablet media query`);
assert(designCss.includes('@media (max-width: 768px)'), `design-system.css contains mobile media query`);
assert(designCss.includes(':focus-visible'), `design-system.css defines accessible :focus-visible ring`);
assert(designCss.includes('.skip-to-content'), `design-system.css provides accessible skip-to-content component`);

// Check WCAG contrast of palette
function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const num = parseInt(hex, 16);
    return [num >> 16, (num >> 8) & 255, num & 255];
}
function getLuminance([r, g, b]) {
    const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
function getContrast(h1, h2) {
    const l1 = getLuminance(hexToRgb(h1));
    const l2 = getLuminance(hexToRgb(h2));
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

const textMutedRatio = getContrast('#94a3b8', '#0a0d14');
assert(textMutedRatio >= 4.5, `--color-text-muted (#94a3b8) on --bg-main (#0a0d14) contrast is ${textMutedRatio.toFixed(2)}:1 (>= 4.5:1 WCAG AA standard)`);

const textMainRatio = getContrast('#f8fafc', '#0a0d14');
assert(textMainRatio >= 7.0, `--color-text-main (#f8fafc) on --bg-main (#0a0d14) contrast is ${textMainRatio.toFixed(2)}:1 (High Contrast)`);

// -----------------------------------------------------------------
// TEST SUMMARY
// -----------------------------------------------------------------
console.log('\n====================================================');
console.log(`TEST SUITE FINISHED: ${passCount} PASSED, ${failCount} FAILED`);
console.log('====================================================\n');

if (failCount > 0) {
    process.exit(1);
} else {
    process.exit(0);
}
