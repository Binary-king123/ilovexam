/**
 * iLoveExams — NEET PG Question Encryptor
 * ==========================================
 * Supports the full NEET PG clinical dataset (180,000+ questions).
 *
 * SETUP (for full 180k questions):
 * ---------------------------------
 * 1. Download the NEET PG clinical dataset from HuggingFace:
 *    pip install datasets
 *    python -c "from datasets import load_dataset; ds = load_dataset('openlifescienceai/neet_pg'); import json; [open(f'neet_pg_data/{k}.json','w').write(json.dumps(list(ds[k]))) for k in ds]"
 *
 *    OR manually download from:
 *    https://huggingface.co/datasets/openlifescienceai/neet_pg/tree/main/data
 *    Place train.json / dev.json / test.json inside: ./neet_pg_data/
 *
 * 2. Run: node scripts/encrypt_questions.js
 *
 * WITHOUT the dataset files, this script generates 250 sample questions (5 episodes).
 * WITH the full dataset, it generates all episodes at 50 questions each.
 * ==========================================
 */

const fs     = require('fs');
const path   = require('path');
const crypto = require('crypto');

// AES-256-CBC key (must be exactly 32 bytes)
const SECRET_KEY = Buffer.from('ilovexams_secret_key_32_bytes_long!!'.substring(0, 32));

function encryptText(text) {
    const iv       = crypto.randomBytes(16);
    const cipher   = crypto.createCipheriv('aes-256-cbc', SECRET_KEY, iv);
    let encrypted  = cipher.update(text, 'utf8');
    encrypted      = Buffer.concat([iv, encrypted, cipher.final()]);
    return encrypted.toString('base64');
}

// ── Paths ──────────────────────────────────────────────────
const rawDir     = path.join(__dirname, '../neetquestions_raw');
const outDir     = path.join(__dirname, '../neetquestions');
const secureDir  = path.join(__dirname, '../neetquestions_secure');
const dataDir    = path.join(__dirname, '../neet_pg_data');

[rawDir, outDir, secureDir, dataDir].forEach(d => { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); });

// ── Load NEET PG clinical dataset if available ─────────────────────
function loadNEET_PG_clinicalQuestions() {
    const candidates = ['train.json', 'dev.json', 'validation.json', 'test.json', 'train.jsonl', 'dev.jsonl', 'data.json', 'neet_pg.json'];
    let allQuestions = [];

    for (const filename of candidates) {
        const filePath = path.join(dataDir, filename);
        if (!fs.existsSync(filePath)) continue;

        console.log(`📂 Loading: ${filename}`);
        const raw  = fs.readFileSync(filePath, 'utf8');
        let   data;

        try {
            // Try standard JSON array
            data = JSON.parse(raw);
        } catch {
            // Try JSONL (one JSON object per line)
            data = raw.split('\n').filter(l => l.trim()).map(l => JSON.parse(l));
        }

        if (!Array.isArray(data)) {
            // HuggingFace format: { train: [...], dev: [...] }
            const keys = Object.keys(data);
            data = keys.flatMap(k => Array.isArray(data[k]) ? data[k] : []);
        }

        // Validate & normalise field names
        const valid = data.filter(q =>
            q && q.question && q.opa && q.opb && q.opc && q.opd &&
            (q.cop !== undefined && q.cop !== null)
        ).map((q, i) => ({
            id:       q.id     || q._id    || `q_${i}`,
            question: q.question,
            opa:      q.opa,
            opb:      q.opb,
            opc:      q.opc,
            opd:      q.opd,
            cop:      parseInt(q.cop) + 1,   // 1-indexed (1=A, 2=B, 3=C, 4=D)
            exp:      q.exp             || q.explanation || 'No explanation provided.',
            subject:  q.subject_name    || q.subject || '',
            topic:    q.topic_name      || q.topic   || ''
        }));

        allQuestions = allQuestions.concat(valid);
        console.log(`   → ${valid.length.toLocaleString()} valid questions loaded from ${filename}`);
    }

    return allQuestions;
}

// ── Fallback sample questions (250 mock Qs) ───────────────
function generateSampleQuestions() {
    console.log('⚠️  No NEET PG clinical dataset found. Using 250 sample questions.');
    console.log('   To use the full 180k dataset, see the setup instructions at the top of this file.\n');

    const seeds = [
        { question: "A 45-year-old male presents with sudden severe chest pain radiating to the back. CXR shows a widened mediastinum. Most likely diagnosis?", opa: "Acute MI", opb: "Aortic Dissection", opc: "Pulmonary Embolism", opd: "Pneumothorax", cop: 2, exp: "Aortic dissection presents with tearing/ripping pain radiating to the back. Widened mediastinum on CXR is a classic finding." },
        { question: "Histopathological hallmark of Alzheimer's disease?", opa: "Lewy bodies", opb: "Negri bodies", opc: "Amyloid-beta plaques and Neurofibrillary tangles", opd: "Pick bodies", cop: 3, exp: "Alzheimer's disease: extracellular amyloid-beta plaques + intracellular hyperphosphorylated tau neurofibrillary tangles." },
        { question: "Hyperpigmentation, hypotension, hyponatremia, hyperkalemia — primary hormone deficiency?", opa: "Cortisol", opb: "Thyroxine", opc: "Aldosterone", opd: "Growth hormone", cop: 1, exp: "Addison's disease (primary adrenal insufficiency) causes cortisol and aldosterone deficiency." },
        { question: "Primary site of Vitamin B12 absorption in the GI tract?", opa: "Duodenum", opb: "Jejunum", opc: "Terminal Ileum", opd: "Stomach", cop: 3, exp: "Vitamin B12 bound to intrinsic factor is absorbed in the terminal ileum." },
        { question: "'Barking' cough, stridor, hoarseness, 'steeple sign' on X-ray — causative organism?", opa: "RSV", opb: "Parainfluenza virus", opc: "H. influenzae", opd: "C. diphtheriae", cop: 2, exp: "Croup (laryngotracheobronchitis) is most commonly caused by Parainfluenza virus." },
        { question: "Enzyme deficient in Pompe's disease?", opa: "Acid alpha-glucosidase", opb: "Glucose-6-phosphatase", opc: "Hexosaminidase A", opd: "Alpha-galactosidase", cop: 1, exp: "Pompe's disease (GSD type II) — lysosomal acid alpha-glucosidase (acid maltase) deficiency." },
        { question: "Drug of choice for status epilepticus?", opa: "Phenytoin", opb: "Lorazepam", opc: "Valproate", opd: "Carbamazepine", cop: 2, exp: "IV Lorazepam is the initial drug of choice for terminating status epilepticus." },
        { question: "Primary visual cortex location?", opa: "Frontal lobe", opb: "Temporal lobe", opc: "Occipital lobe", opd: "Parietal lobe", cop: 3, exp: "Primary visual cortex (Brodmann area 17) is in the occipital lobe along the calcarine sulcus." },
        { question: "Cranial nerve affected in Bell's Palsy?", opa: "CN V", opb: "CN VII", opc: "CN VIII", opd: "CN X", cop: 2, exp: "Bell's Palsy is an acute unilateral lower motor neuron facial nerve (CN VII) paralysis." },
        { question: "Main physiological role of Surfactant?", opa: "Increase elasticity", opb: "Decrease surface tension", opc: "Promote gas exchange", opd: "Synthesize mucin", cop: 2, exp: "Surfactant reduces surface tension at the air-water interface in alveoli, preventing collapse." }
    ];

    const questions = [];
    for (let i = 0; i < 250; i++) {
        const seed = seeds[i % seeds.length];
        const ep   = Math.floor(i / 50) + 1;
        const qn   = (i % 50) + 1;
        questions.push({
            id:       `ep${ep}_q${qn}`,
            question: `[Ep${ep} Q${qn}] ${seed.question}`,
            opa:      seed.opa, opb: seed.opb, opc: seed.opc, opd: seed.opd,
            cop:      seed.cop,
            exp:      seed.exp,
            subject:  'General Medicine', topic: 'Sample'
        });
    }
    return questions;
}

// ── Main ──────────────────────────────────────────────────
let allQuestions = loadNEET_PG_clinicalQuestions();
const usingRealData = allQuestions.length > 0;

if (!usingRealData) {
    allQuestions = generateSampleQuestions();
}

const totalQuestions = allQuestions.length;
const totalEpisodes  = Math.ceil(totalQuestions / 50);

console.log(`\n📊 Total questions: ${totalQuestions.toLocaleString()}`);
console.log(`📁 Total episodes to generate: ${totalEpisodes.toLocaleString()} (50 questions each)\n`);

// Save full raw JSON for reference (server-side only)
const rawPath = path.join(secureDir, 'neet_pg_all_raw.json');
fs.writeFileSync(rawPath, JSON.stringify(allQuestions, null, 2));
console.log(`✅ Saved raw question bank (${totalQuestions.toLocaleString()} questions) → neetquestions_secure/neet_pg_all_raw.json`);

// Clean old episode files so stale episodes don't linger
const existingEnc     = fs.readdirSync(outDir).filter(f => f.endsWith('.enc'));
const existingAnswers = fs.readdirSync(secureDir).filter(f => f.endsWith('_answers.json'));
existingEnc.forEach(f     => fs.unlinkSync(path.join(outDir, f)));
existingAnswers.forEach(f => fs.unlinkSync(path.join(secureDir, f)));
console.log(`🗑  Cleaned ${existingEnc.length} old .enc files and ${existingAnswers.length} old answer files.\n`);

// Generate per-episode encrypted + secure answer files
let generated = 0;
for (let ep = 1; ep <= totalEpisodes; ep++) {
    const startIdx  = (ep - 1) * 50;
    const epQ       = allQuestions.slice(startIdx, startIdx + 50);
    if (epQ.length === 0) break;

    // Assign stable IDs if missing
    epQ.forEach((q, i) => {
        if (!q.id || q.id === 'undefined') q.id = `ep${ep}_q${i + 1}`;
    });

    // ── Public payload (no cop, no exp) ──
    const publicPayload = epQ.map(q => ({
        id:       q.id,
        question: q.question,
        opa:      q.opa, opb: q.opb, opc: q.opc, opd: q.opd
    }));
    const encData = encryptText(JSON.stringify({ questions: publicPayload }));
    fs.writeFileSync(path.join(outDir, `episode${ep}.enc`), encData);

    // ── Secure server-side answer key ──
    const securePayload = {};
    epQ.forEach(q => {
        securePayload[q.id] = {
            cop: q.cop,   // 1-indexed
            exp: q.exp
        };
    });
    fs.writeFileSync(
        path.join(secureDir, `episode${ep}_answers.json`),
        JSON.stringify(securePayload, null, 2)
    );

    generated++;

    // Progress every 100 episodes
    if (ep % 100 === 0 || ep === totalEpisodes) {
        const pct = ((ep / totalEpisodes) * 100).toFixed(1);
        process.stdout.write(`\r   Generating episodes... ${ep}/${totalEpisodes} (${pct}%)`);
    }
}

console.log(`\n\n✅ Done! Generated ${generated} episodes.`);
if (usingRealData) {
    console.log(`   Episodes 1–4   → FREE (all users)`);
    console.log(`   Episodes 5+    → PRO only`);
    console.log(`   Total Qs       → ${totalQuestions.toLocaleString()}`);
} else {
    console.log(`   Using sample data. Place neet_pg JSON files in ./neet_pg_data/ for the full 180k dataset.`);
}
console.log('\n🔐 Symmetrical split-value encryption complete.\n');
