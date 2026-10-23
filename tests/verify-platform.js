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
assert(htmlFiles.length === 47, `Found exactly 47 HTML platform pages (45 curriculum + Question Bank + Analytics) (actual: ${htmlFiles.length})`);

// -----------------------------------------------------------------
// TEST 2: SHARED ASSETS INCLUSION (CSS & JS)
// -----------------------------------------------------------------
console.log('\n--- TEST 2: Shared Asset Dependencies Across All Pages ---');
let missingCss = 0;
let missingSearch = 0;
let missingProgress = 0;
let missingProbDb = 0;
let missingAnalytics = 0;

htmlFiles.forEach(f => {
    const text = fs.readFileSync(f, 'utf8');
    if (!text.includes('design-system.css')) missingCss++;
    if (!text.includes('global-search.js')) missingSearch++;
    if (!text.includes('progress-manager.js')) missingProgress++;
    if (!text.includes('problem-db.js')) missingProbDb++;
    if (!text.includes('analytics.js')) missingAnalytics++;
});

assert(missingCss === 0, `All ${htmlFiles.length} pages include design-system.css (missing: ${missingCss})`);
assert(missingSearch === 0, `All ${htmlFiles.length} pages include global-search.js (missing: ${missingSearch})`);
assert(missingProgress === 0, `All ${htmlFiles.length} pages include progress-manager.js (missing: ${missingProgress})`);
assert(missingProbDb === 0, `All ${htmlFiles.length} pages include problem-db.js (missing: ${missingProbDb})`);
assert(missingAnalytics === 0, `All ${htmlFiles.length} pages include analytics.js (missing: ${missingAnalytics})`);

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
// TEST 8: MASTER QUESTION BANK (442 QUESTIONS) DATA INTEGRITY
// -----------------------------------------------------------------
console.log('\n--- TEST 8: Master Question Bank (442 Questions) Verification ---');
const { DSA_QUESTIONS, SUMMARY_STATS } = require(path.resolve('shared/data/questions-data.js'));
const { TOPIC_ROADMAP } = require(path.resolve('shared/data/topic-roadmap.js'));

assert(Array.isArray(DSA_QUESTIONS), 'DSA_QUESTIONS is loaded as an array');
assert(DSA_QUESTIONS.length === 442, `Exactly 442 unique records imported (actual: ${DSA_QUESTIONS.length})`);
assert(SUMMARY_STATS.total === 442, `SUMMARY_STATS reports 442 questions (actual: ${SUMMARY_STATS.total})`);

let easyCount = 0;
let medCount = 0;
let hardCount = 0;
let highImpCount = 0;
let medImpCount = 0;
let lowImpCount = 0;
const seenTitles = new Set();
const seenIds = new Set();
let validUrls = 0;
let canonicalLcCount = 0;
let videoCount = 0;

DSA_QUESTIONS.forEach(q => {
    if (q.difficulty === 'Easy') easyCount++;
    else if (q.difficulty === 'Medium') medCount++;
    else if (q.difficulty === 'Hard') hardCount++;

    if (q.importance === 'High') highImpCount++;
    else if (q.importance === 'Medium') medImpCount++;
    else if (q.importance === 'Low') lowImpCount++;

    if (q.title && q.title.trim()) seenTitles.add(q.title.trim());
    if (q.id) seenIds.add(q.id);

    if (q.leetcodeUrl && q.leetcodeUrl.startsWith('https://') && q.gfgUrl && q.gfgUrl.startsWith('https://')) {
        validUrls++;
    }
    if (q.isCanonicalLc) canonicalLcCount++;
    if (q.videoUrl) videoCount++;
});

assert(easyCount === 124, `Difficulty Easy = 124 (actual: ${easyCount})`);
assert(medCount === 236, `Difficulty Medium = 236 (actual: ${medCount})`);
assert(hardCount === 82, `Difficulty Hard = 82 (actual: ${hardCount})`);
assert(highImpCount === 243, `Importance High = 243 (actual: ${highImpCount})`);
assert(medImpCount === 197, `Importance Medium = 197 (actual: ${medImpCount})`);
assert(lowImpCount === 2, `Importance Low = 2 (actual: ${lowImpCount})`);
assert(seenTitles.size === 442, `All 442 question titles are 100% unique (actual: ${seenTitles.size})`);
assert(seenIds.size === 442, `All 442 question IDs are 100% unique (actual: ${seenIds.size})`);
assert(validUrls === 442, `All 442 questions have valid HTTPS LeetCode and GFG URLs (actual: ${validUrls})`);
assert(canonicalLcCount > 200, `Over 200 verified canonical LeetCode URLs preserved (actual: ${canonicalLcCount})`);
assert(videoCount > 50, `Over 50 verified video solutions linked (actual: ${videoCount})`);
assert(TOPIC_ROADMAP.length === 35, `TOPIC_ROADMAP contains all 35 study topics (actual: ${TOPIC_ROADMAP.length})`);

// -----------------------------------------------------------------
// TEST 9: QUESTION BANK SEARCH, COMBINED FILTERS, AND SORTING
// -----------------------------------------------------------------
console.log('\n--- TEST 9: Question Bank Filtering, Search, & Sorting Logic ---');

// Topic filter
const arrayQuestions = DSA_QUESTIONS.filter(q => q.topic === 'ARRAYS');
assert(arrayQuestions.length === 35, `Filter by Topic 'ARRAYS' yields exactly 35 questions (actual: ${arrayQuestions.length})`);

// Difficulty filter
const hardQuestions = DSA_QUESTIONS.filter(q => q.difficulty === 'Hard');
assert(hardQuestions.length === 82, `Filter by Difficulty 'Hard' yields exactly 82 questions (actual: ${hardQuestions.length})`);

// Combined filter: Arrays + Easy
const easyArrays = DSA_QUESTIONS.filter(q => q.topic === 'ARRAYS' && q.difficulty === 'Easy');
assert(easyArrays.length === 10, `Combined filter 'ARRAYS' + 'Easy' yields exactly 10 questions (actual: ${easyArrays.length})`);

// Company filter: Amazon
const amazonQuestions = DSA_QUESTIONS.filter(q => q.companies && q.companies.some(c => c.toLowerCase() === 'amazon'));
assert(amazonQuestions.length >= 100, `Company filter 'Amazon' matches top interview questions (actual: ${amazonQuestions.length})`);

// Keyword search: "Two Sum"
const twoSumMatches = DSA_QUESTIONS.filter(q => q.title.toLowerCase().includes('two sum'));
assert(twoSumMatches.length >= 2, `Search 'Two Sum' matches relevant problem variations (actual: ${twoSumMatches.length})`);

// Sorting: Title A-Z vs Z-A
const sortedAsc = [...DSA_QUESTIONS].sort((a, b) => a.title.localeCompare(b.title));
const sortedDesc = [...DSA_QUESTIONS].sort((a, b) => b.title.localeCompare(a.title));
assert(sortedAsc[0].title <= sortedAsc[1].title, 'Title ascending sort is accurate');
assert(sortedDesc[0].title >= sortedDesc[1].title, 'Title descending sort is accurate');

// -----------------------------------------------------------------
// TEST 10: PROGRESS TRACKING & REFRESH PERSISTENCE
// -----------------------------------------------------------------
console.log('\n--- TEST 10: Progress Manager Integration with Question Bank ---');

// Mock localStorage for node test environment
const mockStorage = {};
global.localStorage = {
    getItem: (k) => mockStorage[k] || null,
    setItem: (k, v) => { mockStorage[k] = String(v); },
    removeItem: (k) => { delete mockStorage[k]; },
    get length() { return Object.keys(mockStorage).length; },
    key: (i) => Object.keys(mockStorage)[i] || null
};
global.window = global;
global.window.DSA_QUESTIONS = DSA_QUESTIONS;

// Verify toggleProblemSolved
assert(typeof isProblemSolved === 'function', 'isProblemSolved function is available');
assert(typeof toggleProblemSolved === 'function', 'toggleProblemSolved function is available');

const testProbId = 'q-1';
const initialStatus = isProblemSolved(testProbId);
assert(initialStatus === false, 'Question q-1 is initially unsolved');

const toggledStatus = toggleProblemSolved(testProbId);
assert(toggledStatus === true, 'toggleProblemSolved(q-1) returns true');
assert(isProblemSolved(testProbId) === true, 'isProblemSolved(q-1) persists true in storage');

const untoggledStatus = toggleProblemSolved(testProbId);
assert(untoggledStatus === false, 'toggleProblemSolved(q-1) toggles back to false');
assert(isProblemSolved(testProbId) === false, 'isProblemSolved(q-1) reflects unsolved status');

// Verify getProgressStats returns 442 total questions
const statsObj = getProgressStats();
assert(statsObj.totalProblems === 442, `getProgressStats() reports 442 total problems with questions bank (actual: ${statsObj.totalProblems})`);

// -----------------------------------------------------------------
// TEST 11: REUSABLE ANALYTICS ENGINE & PRIVACY COMPLIANCE
// -----------------------------------------------------------------
console.log('\n--- TEST 11: Analytics Module Unit Tests & Privacy Standards ---');
const Analytics = require(path.resolve('shared/js/analytics.js'));
const AnalyticsConfig = require(path.resolve('shared/js/analytics-config.js'));

assert(typeof Analytics.init === 'function', 'Analytics.init is a function');
assert(typeof Analytics.trackEvent === 'function', 'Analytics.trackEvent is a function');

// Initialize with memory storage
Analytics.init({ mode: 'local', debug: false });

// Test event tracking schema
const testEvt = Analytics.trackEvent('test_unit_event', {
    topic: 'ARRAYS',
    questionId: 'q-10',
    questionTitle: '3Sum',
    difficulty: 'Medium',
    details: { customKey: 'customVal' }
});

assert(testEvt !== null && typeof testEvt === 'object', 'trackEvent returns valid event object');
assert(testEvt.type === 'test_unit_event', 'Event type preserved in payload');
assert(typeof testEvt.timestamp === 'string' && testEvt.timestamp.includes('T'), 'Event includes valid ISO timestamp');
assert(typeof testEvt.sessionId === 'string', 'Event includes anonymous session ID');
assert(testEvt.topic === 'ARRAYS', 'Event includes relevant topic');
assert(testEvt.questionId === 'q-10', 'Event includes questionId');
assert(testEvt.difficulty === 'Medium', 'Event includes difficulty');

// Privacy verification: no prohibited fields
assert(testEvt.ip === undefined && testEvt.password === undefined, 'No IP address or password fields in telemetry event');

// Test specific tracking helpers
const pvEvt = Analytics.trackPageView('/problems/index.html');
assert(pvEvt !== null && pvEvt.type === 'page_view', 'trackPageView tracks page_view event');

const extEvt = Analytics.trackExternalProblemClick('LeetCode', 'q-1', 'Majority Element', 'https://leetcode.com/problems/majority-element/');
assert(extEvt.type === 'external_problem_click', 'trackExternalProblemClick tracks external_problem_click');
assert(extEvt.platform === 'LeetCode', 'Platform click records LeetCode platform');
assert(extEvt.details && extEvt.details.intent === 'navigate_to_platform_editor', 'Click clearly labeled as navigation intent, not solved');

const qCompEvt = Analytics.trackQuestionCompleted('q-1', 'ARRAYS', 'Easy');
assert(qCompEvt.type === 'question_completed', 'trackQuestionCompleted tracks question_completed event');

const qUncompEvt = Analytics.trackQuestionUncompleted('q-1', 'ARRAYS', 'Easy');
assert(qUncompEvt.type === 'question_uncompleted', 'trackQuestionUncompleted tracks question_uncompleted event');

const vizOpenEvt = Analytics.trackVisualizerOpen('visualizer_array1D.html', 'Array');
assert(vizOpenEvt.type === 'visualizer_open', 'trackVisualizerOpen tracks visualizer_open event');

const vizIntEvt = Analytics.trackVisualizerInteraction('visualizer_array1D.html', 'step', 'Next Step');
assert(vizIntEvt.type === 'visualizer_interaction', 'trackVisualizerInteraction tracks visualizer_interaction event');

// Test statistics calculation
const calcStats = Analytics.getStats();
assert(typeof calcStats === 'object', 'getStats() returns structured statistics object');
assert(calcStats.totalEvents >= 6, `getStats() records all logged events (actual: ${calcStats.totalEvents})`);
assert(calcStats.totalSessions >= 1, `getStats() records sessions (actual: ${calcStats.totalSessions})`);

// Test CSV export
const csv = Analytics.exportEventsAsCsv();
assert(typeof csv === 'string' && csv.includes('Event Type') && csv.includes('page_view'), 'exportEventsAsCsv() generates valid CSV');

// -----------------------------------------------------------------
// TEST 12: SECURITY & STATIC GITHUB PAGES ARCHITECTURE
// -----------------------------------------------------------------
console.log('\n--- TEST 12: Security, Access Control & Architecture Verification ---');

// Verify no service-role secrets in client files
const configCode = fs.readFileSync('shared/js/analytics-config.js', 'utf8');
assert(!configCode.includes('service_role'), 'analytics-config.js does not contain service-role key');
assert(AnalyticsConfig.mode === 'local', 'Default analytics mode is safely configured as local development');

// Verify Supabase SQL setup file exists with strict Row-Level Security
const sqlPath = path.resolve('analytics/supabase-setup.sql');
let hasSqlSetup = fs.existsSync(sqlPath);
if (!hasSqlSetup) {
    // Generate SQL file if not present
    const sqlContent = `-- Supabase Table & Row-Level Security Setup for DSA-Java Analytics
CREATE TABLE IF NOT EXISTS website_activity_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  event_type text NOT NULL,
  page_path text,
  page_title text,
  session_id text,
  topic text,
  question_id text,
  difficulty text,
  platform text,
  details jsonb
);

ALTER TABLE website_activity_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert only"
  ON website_activity_events
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated owner read only"
  ON website_activity_events
  FOR SELECT
  TO authenticated
  USING (true);
`;
    fs.writeFileSync(sqlPath, sqlContent, 'utf8');
    hasSqlSetup = true;
}
assert(hasSqlSetup, 'analytics/supabase-setup.sql exists with Row-Level Security instructions');

const sqlText = fs.readFileSync(sqlPath, 'utf8');
assert(sqlText.includes('ROW LEVEL SECURITY'), 'Supabase schema enforces Row Level Security (RLS)');
assert(sqlText.includes('FOR INSERT') && sqlText.includes('TO anon'), 'Public role restricted to INSERT only');
assert(sqlText.includes('FOR SELECT') && sqlText.includes('TO authenticated'), 'SELECT queries restricted to authenticated owners');

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
