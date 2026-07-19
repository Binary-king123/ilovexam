// ============================================================
// iLoveExams — Mnemonic Hint Generator (generate_hints.js)
// Adds a "hint_exp" (story-style memory hook) to every question
// in neet_pg_all_raw.json without using any AI at runtime.
//
// Run this BEFORE encrypt_questions.js:
//   node scripts/generate_hints.js
// ============================================================
'use strict';
const fs   = require('fs');
const path = require('path');

const SECURE_DIR    = path.join(__dirname, '..', 'neetquestions_secure');
const RAW_DATA_DIR  = path.join(__dirname, '..', 'neet_pg_raw_data');
const OUTPUT_PATH   = path.join(SECURE_DIR, 'neet_pg_all_raw.json');

// Find the best input: prefer the existing merged raw file, else use train.json source
function findInputPath() {
    // If neet_pg_all_raw.json exists and is the real dataset (> 10MB), use it
    if (fs.existsSync(OUTPUT_PATH) && fs.statSync(OUTPUT_PATH).size > 10_000_000) {
        return OUTPUT_PATH;
    }
    // Else look in neet_pg_raw_data for source files
    const candidates = ['train.json','dev.json','test.json','data.json','neet_pg.json'];
    for (const f of candidates) {
        const p = path.join(RAW_DATA_DIR, f);
        if (fs.existsSync(p)) return p;
    }
    // Last resort: neetquestions_secure/neet_pg_all_raw.json even if small
    return OUTPUT_PATH;
}
const INPUT_PATH = findInputPath();

// ──────────────────────────────────────────────────────────────
// SUBJECT-LEVEL STORY TEMPLATES
// Each template gets hydrated with the question keyword
// to create a personalized, memorable narrative hint.
// ──────────────────────────────────────────────────────────────
const SUBJECT_STORY_MAPS = {
    'Anatomy': [
        q => `🧠 Story Time: Imagine your crush pointing to their own body and saying "I know exactly where my ${extractKey(q)} is!" — that's the level of confidence you need. Your crush doesn't get it wrong, and neither will you.`,
        q => `📍 Picture your crush as a tour guide of the human body. They stop at the ${extractKey(q)} section and say "This is my favourite part — don't forget this!" Now you can't forget it either.`,
        q => `🫀 Think of your crush playing "anatomy treasure hunt" — X marks the spot at the ${extractKey(q)}. Every time you see this question, remember: X marks where your heart raced.`,
    ],
    'Physiology': [
        q => `⚡ Story: Your crush texts you at 3 AM: "Can't sleep — thinking about ${extractKey(q)}." That's how memorable this physiology concept is. It keeps people up at night!`,
        q => `🏃 Imagine your crush running a marathon and someone asks them about ${extractKey(q)}. They answer PERFECTLY while still running. That's the kind of effortless recall you're building right now.`,
        q => `❤️ Your crush's heart does something special every time you walk in — that reaction involves ${extractKey(q)}. Whenever you see this topic, feel that same rush.`,
    ],
    'Biochemistry': [
        q => `🧪 Chemistry Class Story: Your crush is the star of biochem lab. They hold up a test tube and say "This reaction involves ${extractKey(q)} — and it's as unstoppable as my feelings." Corny? Yes. Memorable? Absolutely.`,
        q => `🔬 Think of ${extractKey(q)} as the "secret ingredient" your crush uses in their famous recipe. It's always there, always working in the background, making things happen.`,
        q => `📈 Your crush explained ${extractKey(q)} to you once as an analogy for how they function — efficiently, specifically, and always heading toward one goal.`,
    ],
    'Pharmacology': [
        q => `💊 Drug Story: Imagine your crush handing you a prescription that says "Take ${extractKey(q)} once daily — it will make everything better." The mechanism? Unforgettable.`,
        q => `🎯 Your crush is a sniper when it comes to ${extractKey(q)} — they target exactly what needs to be targeted and nothing else. Receptor-specific. Like their attention to you.`,
        q => `⏱️ Remember: ${extractKey(q)} hits fast, like a text from your crush right when you needed it most. Peak effect, right on time.`,
    ],
    'Pathology': [
        q => `🔍 Detective Story: Your crush is a pathologist who just found something important under the microscope — it's ${extractKey(q)}. "Elementary," they say, just like Sherlock. Now YOU'RE the detective who remembers.`,
        q => `🏥 Your crush describes ${extractKey(q)} as "the villain of the story — it looks sneaky, acts sneaky, but once you know the pattern, you'll catch it every time."`,
        q => `📖 Story: The medical drama your crush binge-watches has an episode about ${extractKey(q)}. They pause it and say "THIS is going to be on NEET PG — remember this scene." Now you do.`,
    ],
    'Microbiology': [
        q => `🦠 Imagine your crush saying "Bacteria are like drama queens — each one has a unique personality. Take ${extractKey(q)} — it's extra." You laughed then. You'll laugh (and remember) now.`,
        q => `🔭 Your crush under the microscope of life identified ${extractKey(q)} before anyone else in the class. "I just had a feeling," they said. Intuition + knowledge = unbeatable.`,
        q => `🧫 Think of ${extractKey(q)} as that one organism your crush nicknamed in lab. It had a name, a personality, and you'll never forget it now.`,
    ],
    'Surgery': [
        q => `🔪 Surgery Story: Imagine your crush scrubbing in for their first surgery. The senior surgeon points to the ${extractKey(q)} and says "This — this is the most important part. Don't touch it wrong." Your crush never forgets. Neither will you.`,
        q => `🏥 Your crush is the surgeon who always identifies ${extractKey(q)} first — "If you don't know this, you don't belong in the OR." High stakes. High recall.`,
        q => `⚕️ Think of ${extractKey(q)} as your crush's surgical "signature move" — precise, definitive, and impossible to ignore once you've seen it done right.`,
    ],
    'Medicine': [
        q => `🩺 Clinical Story: Your crush is the brilliant medical resident who caught the ${extractKey(q)} diagnosis when everyone else missed it. "It's always the obvious thing we overlook," they said. Remember that.`,
        q => `📋 Imagine your crush writing the perfect history — they always ask about ${extractKey(q)} first. "Never skip the basics," they remind you. Noted. Remembered.`,
        q => `💡 Your crush had a lightbulb moment about ${extractKey(q)} during rounds. "I finally GET it!" — that energy is infectious. Feel that excitement every time you see this topic.`,
    ],
    'Obstetrics': [
        q => `🤰 OB Story: Your crush is the OB resident who remembered to check ${extractKey(q)} when no one else thought of it. "Every detail matters in OB," they said. Now you'll remember every detail too.`,
        q => `👶 Think of ${extractKey(q)} as the "welcome gift" that comes with every delivery — it's always there, always needs to be accounted for. Your crush made sure you knew this early.`,
        q => `🌸 Your crush compares ${extractKey(q)} to their morning routine — critical, non-negotiable, and if you skip it, everything goes sideways.`,
    ],
    'Gynaecology': [
        q => `🏥 Your crush always said that gynaecology is "where the most important stories begin." ${extractKey(q)} is chapter one. Don't skip chapter one.`,
        q => `📱 Remember ${extractKey(q)} like a notification your crush sends you — you always see it, always know what it means, and you can't ignore it.`,
        q => `✨ Your crush called ${extractKey(q)} the "cornerstone of women's health." Building on a cornerstone means you never forget the foundation.`,
    ],
    'Paediatrics': [
        q => `👶 Peds Story: Your crush babysat their sibling and described ${extractKey(q)} to you with such clarity you felt like you were there. "Kids show you everything — if you know what to look for."`,
        q => `🎈 Think of ${extractKey(q)} as the "birthday rule" in paediatrics — your crush always remembered it with a story about a child's birthday party where something went wrong. You'll never forget a birthday again.`,
        q => `🌟 Your crush said "Paediatrics is just anatomy with a smaller font." ${extractKey(q)} is big print — you can't miss it.`,
    ],
    'Ophthalmology': [
        q => `👁️ Eye Story: Your crush caught you staring and said "I can see EXACTLY what you're thinking — because I know about ${extractKey(q)}." Ophthalmology is about seeing clearly. So is your memory now.`,
        q => `🔭 Your crush uses ${extractKey(q)} as a metaphor: "Some things need to be seen from a distance. Some need to be zoomed in on." This one needs to be seen up close.`,
        q => `✨ Remember ${extractKey(q)} like the moment your crush made eye contact across a crowded room. Impossible to miss. Impossible to forget.`,
    ],
    'ENT': [
        q => `👂 ENT Story: Your crush always says "listen carefully" — and they mean it literally for ${extractKey(q)}. If you listen for the right sounds, you'll always find the right answer.`,
        q => `👃 Your crush sniffed out ${extractKey(q)} before anyone else in the ward. "Sometimes you just know," they said. Now you'll know too.`,
        q => `🗣️ Think of ${extractKey(q)} as your crush's voice — once you've heard it, you recognize it instantly, every time, in any context.`,
    ],
    'Dermatology': [
        q => `🌸 Derm Story: Your crush touched your arm and said "Your skin tells a story — ${extractKey(q)} is chapter one." Every rash, every lesion has a story. Now so does your memory.`,
        q => `✋ Remember ${extractKey(q)} like a handshake from your crush — you see it, you feel it, you remember it. The pattern is that distinctive.`,
        q => `🎨 Your crush is an artist who "sees in patterns." ${extractKey(q)} is a classic painting — once you know it, you recognize it in any museum, any exam.`,
    ],
    'Psychiatry': [
        q => `🧠 Mind Story: Your crush once described ${extractKey(q)} as "the emotion behind the symptom — medicine isn't just about the body." That insight stuck with you forever.`,
        q => `💭 Think of ${extractKey(q)} like your crush's thought process — layered, meaningful, and once you understand it, everything makes sense.`,
        q => `🌙 Your crush said "the mind is the most complex organ we ignore." ${extractKey(q)} is proof. Ignore it on the exam, and you'll feel it.`,
    ],
    'Community Medicine': [
        q => `🌍 Public Health Story: Your crush once volunteered at a health camp and saw ${extractKey(q)} in real life. "Numbers on a paper are real people," they said. Now every stat is a memory.`,
        q => `📊 Your crush made a graph about ${extractKey(q)} for their presentation and it was the most beautiful thing you'd seen — graphs and people, together.`,
        q => `🏘️ Think of ${extractKey(q)} as the rule your crush's whole village lived by — community-wide, non-negotiable, and if you break it, everyone suffers.`,
    ],
    'Social & Preventive Medicine': [
        q => `🛡️ Prevention Story: Your crush's motto is "prevent before you treat — ${extractKey(q)} is the shield, not the sword." Always remember the shield first.`,
        q => `📅 Your crush marks ${extractKey(q)} on every calendar. "If you don't schedule prevention, you'll schedule disease." — Wise words. Remembered always.`,
        q => `🌱 Think of ${extractKey(q)} like your crush planting a garden — the effort is invisible now, the benefit is visible forever.`,
    ],
    'Radiology': [
        q => `🩻 X-Ray Story: Your crush held up the film and said "See this? This is ${extractKey(q)}. Don't look at everything — look for THIS." Focused vision. Focused memory.`,
        q => `📡 Remember ${extractKey(q)} like your crush's first radiology report — specific, confident, and impossible to second-guess once you know what you're looking at.`,
        q => `🔦 Your crush uses a flashlight metaphor: "${extractKey(q)} lights up on the scan because it WANTS to be found. Help it find you on the exam."`,
    ],
    'Anaesthesia': [
        q => `💉 Anaesthesia Story: Your crush says "Good anaesthesia is invisible — you only notice ${extractKey(q)} when it goes wrong." Know it so well it becomes invisible to you too.`,
        q => `😴 Think of ${extractKey(q)} as the concept that "puts everything to rest" — your crush always said knowing this would help you sleep better before exams.`,
        q => `⏱️ Your crush times everything in anaesthesia. ${extractKey(q)} has a specific window. "Miss the window, miss the outcome." Nail the timing, nail the question.`,
    ],
    'Orthopaedics': [
        q => `🦴 Bone Story: Your crush compared ${extractKey(q)} to architecture. "Bones are the framework — know the framework, and everything else makes sense." Structural. Solid. Unforgettable.`,
        q => `🏃 Think of ${extractKey(q)} as your crush in a race — they know exactly when to push, when to stop, and the mechanics behind every movement.`,
        q => `⚙️ Your crush called ${extractKey(q)} the "fulcrum" of orthopaedics. The fulcrum is always the most important point. Don't forget the fulcrum.`,
    ],
};

// Default for any unmapped subject
const DEFAULT_TEMPLATES = [
    q => `💡 Story Hint: Your crush once explained this concept — "${extractKey(q)}" — using a real-life example so vivid you'd never forget it. That clarity is yours now. The answer is locked in memory like their smile.`,
    q => `📚 Remember: Your crush aced this question about "${extractKey(q)}" without hesitation. "It's about connecting the dots," they said. You have all the dots. Connect them.`,
    q => `🎯 Think of "${extractKey(q)}" as your crush's secret weapon on every MCQ paper. They always get it right. Now so will you.`,
    q => `🌟 Mnemonic: Your crush compared "${extractKey(q)}" to something so everyday and relatable that it clicked instantly. That click is contagious. Feel it now.`,
    q => `🧩 Your crush solved "${extractKey(q)}" like a puzzle — methodically, confidently, and with a smile. That's your approach too. Piece by piece. Always right.`,
];

// ──────────────────────────────────────────────────────────────
// Extract a keyword from a question text for template hydration
// ──────────────────────────────────────────────────────────────
function extractKey(q) {
    const text = q.question || '';
    // Try to extract a short noun phrase: words after "of", "for", "in", "about"
    const prepositionMatch = text.match(/(?:of|for|in|about|is|are|causes?|features?|mechanism of)\s+([A-Za-z ]{3,30}?)(?:\s+(?:is|are|include|cause|results?|leads?|occurs?)|\?|$)/i);
    if (prepositionMatch) return prepositionMatch[1].trim();

    // Fallback: just first 4 meaningful words
    const words = text.replace(/[^a-zA-Z0-9 ]/g, ' ').split(/\s+/).filter(w => w.length > 3);
    return words.slice(0, 4).join(' ') || 'this concept';
}

// ──────────────────────────────────────────────────────────────
// Get the right template pool for a question's subject
// ──────────────────────────────────────────────────────────────
function getTemplates(subject) {
    if (!subject) return DEFAULT_TEMPLATES;
    const s = subject.trim();
    // Direct match
    if (SUBJECT_STORY_MAPS[s]) return SUBJECT_STORY_MAPS[s];
    // Partial match
    for (const key of Object.keys(SUBJECT_STORY_MAPS)) {
        if (s.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(s.toLowerCase())) {
            return SUBJECT_STORY_MAPS[key];
        }
    }
    return DEFAULT_TEMPLATES;
}

// ──────────────────────────────────────────────────────────────
// Generate a deterministic hint for a question
// (Same question always gets same hint — no randomness)
// ──────────────────────────────────────────────────────────────
function generateHint(q, index) {
    const templates = getTemplates(q.subject);
    const templateIdx = index % templates.length;
    const templateFn = templates[templateIdx];
    return templateFn(q);
}

// ──────────────────────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────────────────────
console.log('\n🪄 iLoveExams — Story Mnemonic Hint Generator');
console.log('━'.repeat(55));

if (!fs.existsSync(INPUT_PATH)) {
    console.error(`❌ File not found: ${INPUT_PATH}`);
    console.error('   Run encrypt_questions.js first to generate neet_pg_all_raw.json');
    process.exit(1);
}

console.log(`📂 Reading: ${path.basename(INPUT_PATH)}`);
const rawText = fs.readFileSync(INPUT_PATH, 'utf8').replace(/^\uFEFF/, ''); // strip BOM if present
const questions = JSON.parse(rawText);
console.log(`📊 Total questions loaded: ${questions.length.toLocaleString()}`);

let added = 0, skipped = 0;
for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    // Only generate if hint_exp is missing or empty
    if (!q.hint_exp || q.hint_exp.trim() === '') {
        q.hint_exp = generateHint(q, i);
        added++;
    } else {
        skipped++;
    }

    // Progress every 10,000
    if ((i + 1) % 10000 === 0 || i === questions.length - 1) {
        const pct = (((i + 1) / questions.length) * 100).toFixed(1);
        process.stdout.write(`\r   ✏️  Processed ${(i + 1).toLocaleString()} / ${questions.length.toLocaleString()} (${pct}%)`);
    }
}

console.log(`\n\n✅ Hints generated: ${added.toLocaleString()}`);
console.log(`⏭️  Hints already existed (skipped): ${skipped.toLocaleString()}`);
console.log(`\n💾 Saving back to: ${path.basename(OUTPUT_PATH)}`);
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(questions, null, 2));
console.log(`✅ Saved! File size: ${(fs.statSync(OUTPUT_PATH).size / 1024 / 1024).toFixed(1)} MB`);
console.log('\n📋 Next Step: Run "npm run encrypt" to re-encrypt episodes with hints included.');
console.log('━'.repeat(55) + '\n');
