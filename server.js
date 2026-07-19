const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');
const Razorpay = require('razorpay');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8085;
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'ilovexams_neetpg_cookie_secret_2027!!';
const DECRYPTION_KEY = 'ilovexams_secret_key_32_bytes_long!!';

// ─── Database Setup ──────────────────────────────────────────────────────────
const db = new Database(path.join(__dirname, 'ilovexams.db'));

// Initialise schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id          TEXT PRIMARY KEY,
    email       TEXT UNIQUE NOT NULL,
    crush_hash  TEXT NOT NULL,
    tier        TEXT NOT NULL DEFAULT 'free',
    created_at  INTEGER NOT NULL DEFAULT (strftime('%s','now'))
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token       TEXT PRIMARY KEY,
    user_id     TEXT NOT NULL,
    expires_at  INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS questions (
    id          TEXT PRIMARY KEY,
    question    TEXT NOT NULL,
    opa         TEXT NOT NULL,
    opb         TEXT NOT NULL,
    opc         TEXT NOT NULL,
    opd         TEXT NOT NULL,
    cop         INTEGER NOT NULL,
    exp         TEXT,
    subject     TEXT,
    topic       TEXT
  );

  CREATE TABLE IF NOT EXISTS user_answers (
    user_id     TEXT NOT NULL,
    question_id TEXT NOT NULL,
    selected    INTEGER,
    is_correct  INTEGER,
    bookmarked  INTEGER DEFAULT 0,
    timestamp   INTEGER NOT NULL DEFAULT (strftime('%s','now')),
    PRIMARY KEY (user_id, question_id)
  );

  CREATE TABLE IF NOT EXISTS uploaded_pdfs (
    id          TEXT PRIMARY KEY,
    title       TEXT NOT NULL,
    subject     TEXT NOT NULL,
    size        TEXT NOT NULL,
    pages       INTEGER NOT NULL,
    file_url    TEXT NOT NULL,
    description TEXT,
    uploaded_at INTEGER NOT NULL DEFAULT (strftime('%s','now'))
  );

  CREATE TABLE IF NOT EXISTS uploaded_podcasts (
    id          TEXT PRIMARY KEY,
    title       TEXT NOT NULL,
    description TEXT,
    meta        TEXT,
    src         TEXT NOT NULL,
    uploaded_at INTEGER NOT NULL DEFAULT (strftime('%s','now'))
  );

  CREATE TABLE IF NOT EXISTS uploaded_videos (
    id          TEXT PRIMARY KEY,
    title       TEXT NOT NULL,
    description TEXT,
    badge       TEXT,
    src         TEXT NOT NULL,
    uploaded_at INTEGER NOT NULL DEFAULT (strftime('%s','now'))
  );
`);

console.log('✔ SQLite database ready.');

// Startup Seeder for High-Yield NEET PG Questions
(() => {
    try {
        const qCountRow = db.prepare('SELECT COUNT(*) as count FROM questions').get();
        if (qCountRow && qCountRow.count === 0) {
            const rawPath = path.join(__dirname, 'neetquestions_secure', 'neet_pg_all_raw.json');
            if (fs.existsSync(rawPath)) {
                console.log('⏳ Importing 190,000+ clinical PG questions into SQLite...');
                const start = Date.now();
                const rawData = JSON.parse(fs.readFileSync(rawPath, 'utf8'));
                
                const insert = db.prepare(`
                    INSERT INTO questions (id, question, opa, opb, opc, opd, cop, exp, subject, topic)
                    VALUES (@id, @question, @opa, @opb, @opc, @opd, @cop, @exp, @subject, @topic)
                `);

                const insertMany = db.transaction((qs) => {
                    for (const q of qs) {
                        insert.run({
                            id: q.id,
                            question: q.question,
                            opa: q.opa || '',
                            opb: q.opb || '',
                            opc: q.opc || '',
                            opd: q.opd || '',
                            cop: parseInt(q.cop) || 0,
                            exp: q.exp || '',
                            subject: q.subject || 'General Medicine',
                            topic: q.topic || 'General'
                        });
                    }
                });

                insertMany(rawData);
                console.log(`✅ Loaded ${rawData.length} questions in ${((Date.now() - start) / 1000).toFixed(1)}s.`);
            } else {
                console.warn('⚠️ neet_pg_all_raw.json not found. Database questions table is empty.');
            }
        } else {
            console.log(`✔ Questions database already populated (${qCountRow.count.toLocaleString()} questions).`);
        }
    } catch (e) {
        console.error('❌ Error seeding questions database:', e);
    }
})();

// Startup Seeder for Default PDFs, Podcasts, and Videos
(() => {
    try {
        // Create storage folders if they do not exist
        ['pdfs', 'podcasts', 'videos'].forEach(d => {
            const folderPath = path.join(__dirname, d);
            if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
        });

        // 1. Seed PDFs
        const pdfCount = db.prepare('SELECT COUNT(*) as count FROM uploaded_pdfs').get().count;
        if (pdfCount === 0) {
            console.log('⏳ Seeding default clinical PDFs...');
            const defaultPdfs = [
                {
                    id: 'anatomy_revision',
                    title: 'Anatomy High-Yield Clinical Revision Notes',
                    subject: 'Anatomy',
                    size: '412 B',
                    pages: 1,
                    fileUrl: '/pdfs/Anatomy_High_Yield_Revision.pdf',
                    description: 'Comprehensive review sheet highlighting cranial nerve pathways, rotator cuff muscles, and vascular dominance.'
                },
                {
                    id: 'pharmacology_mnemonics',
                    title: 'Pharmacology High-Yield Mnemonics Sheet',
                    subject: 'Pharmacology',
                    size: '412 B',
                    pages: 1,
                    fileUrl: '/pdfs/Pharmacology_Mnemonics_Sheet.pdf',
                    description: 'Essential pharmacology mnemonics covering tuberculosis treatments (R.I.P.E), anticonvulsants, and antiarrhythmics classes.'
                },
                {
                    id: 'radiology_atlas',
                    title: 'High-Yield Radiology & Pathology Imaging Atlas',
                    subject: 'Radiology',
                    size: '412 B',
                    pages: 1,
                    fileUrl: '/pdfs/High_Yield_Radiology_Atlas.pdf',
                    description: 'Visual diagnosis criteria for epidural and subdural hematomas, croup steeple sign, and consolidation.'
                }
            ];
            const insertPdf = db.prepare(`
                INSERT INTO uploaded_pdfs (id, title, subject, size, pages, file_url, description)
                VALUES (@id, @title, @subject, @size, @pages, @fileUrl, @description)
            `);
            const seedPdfs = db.transaction((list) => {
                for (const item of list) insertPdf.run(item);
            });
            seedPdfs(defaultPdfs);
        }

        // 2. Seed Podcasts
        const podCount = db.prepare('SELECT COUNT(*) as count FROM uploaded_podcasts').get().count;
        if (podCount === 0) {
            console.log('⏳ Seeding default clinical podcasts...');
            const defaultPodcasts = [
                { id: 'pod1', title: 'Cardiology: High-Yield Heart Murmurs', description: 'Systolic vs. diastolic murmurs and clinical diagnostic signs.', meta: 'Free Preview · 4:12', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
                { id: 'pod2', title: 'Neurology: Cranial Nerve Lesions', description: 'CN III, IV, VI palsies and pupillary reflex pathways.', meta: 'Free Preview · 5:45', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
                { id: 'pod3', title: 'Obstetrics: Postpartum Hemorrhage', description: 'Active management of third-stage labor and pharmacological agents.', meta: 'Free Episode · 8:20', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
                { id: 'pod4', title: 'Pharmacology: Antiarrhythmic Classes', description: 'Class I–IV mechanisms, EKG correlates, and adverse effects.', meta: 'Free Episode · 7:15', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
                { id: 'pod5', title: 'Endocrinology: Diabetic Ketoacidosis (DKA)', description: 'Fluid resuscitation, insulin infusion, and potassium replacement.', meta: 'Free Episode · 6:30', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
                { id: 'pod6', title: 'Nephrology: Acute Kidney Injury (AKI)', description: 'Prerenal, intrinsic, and postrenal etiology and diagnostic criteria.', meta: 'Free Episode · 9:10', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
                { id: 'pod7', title: 'Gastroenterology: Inflammatory Bowel Disease', description: 'Crohn\'s vs. Ulcerative Colitis clinical findings and therapeutics.', meta: 'Free Episode · 8:40', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
                { id: 'pod8', title: 'Hematology: Coagulation Cascade Overview', description: 'Intrinsic vs. extrinsic pathways, laboratory diagnostics, and factors.', meta: 'Free Episode · 5:50', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
                { id: 'pod9', title: 'Microbiology: Deep Systemic Mycoses', description: 'Histoplasmosis, Coccidioidomycosis, and Blastomycosis presentations.', meta: 'Free Episode · 7:00', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
                { id: 'pod10', title: 'Rheumatology: Systemic Lupus Erythematosus', description: 'Clinical ACR criteria, diagnostic antibody profiles, and management.', meta: 'Free Episode · 6:15', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' },
                { id: 'pod11', title: 'Pediatrics: Cyanotic Heart Diseases', description: 'Cyanotic heart diseases and other anomalies.', meta: 'Free Episode · 9:50', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3' },
                { id: 'pod12', title: 'Infectious Diseases: Meningitis Empiric Therapy', description: 'Pathogens, cerebrospinal fluid analysis, and antibiotic choices.', meta: 'Free Episode · 8:30', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3' }
            ];
            const insertPod = db.prepare(`
                INSERT INTO uploaded_podcasts (id, title, description, meta, src)
                VALUES (@id, @title, @description, @meta, @src)
            `);
            const seedPods = db.transaction((list) => {
                for (const item of list) insertPod.run(item);
            });
            seedPods(defaultPodcasts);
        }

        // 3. Seed Videos
        const vidCount = db.prepare('SELECT COUNT(*) as count FROM uploaded_videos').get().count;
        if (vidCount === 0) {
            console.log('⏳ Seeding default clinical videos...');
            const defaultVideos = [
                { id: 'vid1', title: 'Cardiology: Interpreting Complex ECG Patterns', description: 'Bundle branch blocks, STEMIs, and electrolyte anomalies — complete guide.', badge: 'Free Lecture', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
                { id: 'vid2', title: 'Nephrology: Acid-Base Disorders Made Simple', description: 'Anion gap, metabolic acidosis, respiratory compensation — step-by-step.', badge: 'Free Lecture', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
                { id: 'vid3', title: 'Neurology: Localization of Spinal Cord Lesions', description: 'Brown-Sequard, syringomyelia, and tabes dorsalis syndromes explained.', badge: 'Free Lecture', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
                { id: 'vid4', title: 'Pharmacology: Autonomous Nervous System Drugs', description: 'Sympathomimetics, parasympatholytics, receptors, and therapeutic applications.', badge: 'Free Lecture', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
                { id: 'vid5', title: 'Hematology: Workup of Microcytic Anemias', description: 'Iron deficiency, thalassemia trait, and sideroblastic anemias differential diagnosis.', badge: 'Free Lecture', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
                { id: 'vid6', title: 'Pulmonology: Ventilator Settings & Modes', description: 'Volume control, pressure support, PEEP, and ARDS management guidelines.', badge: 'Free Lecture', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
                { id: 'vid7', title: 'Endocrinology: Thyroid Nodules Evaluation', description: 'TSH tracking, ultrasound indicators, FNA biopsies, and Bethesda scales.', badge: 'Free Lecture', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
                { id: 'vid8', title: 'Gastroenterology: Acute Pancreatitis Diagnostic Plan', description: 'Ransom criteria, lipase tracking, fluid protocols, and CT staging.', badge: 'Free Lecture', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
                { id: 'vid9', title: 'Infectious Diseases: Sepsis & Septic Shock', description: 'EGDT principles, qSOFA indicators, vasopressors, and lactate monitoring.', badge: 'Free Lecture', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
                { id: 'vid10', title: 'Rheumatology: Seronegative Spondyloarthropathies', description: 'Ankylosing spondylitis, reactive arthritis, psoriatic arthritis features.', badge: 'Free Lecture', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
                { id: 'vid11', title: 'Pediatrics: Pediatric Milestones Tracker', description: 'Gross motor, fine motor, speech, social milestones review.', badge: 'Free Lecture', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
                { id: 'vid12', title: 'Obstetrics: Normal Labor Mechanics', description: 'Engagement, descent, flexion, internal rotation, extension, external rotation.', badge: 'Free Lecture', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
            ];
            const insertVid = db.prepare(`
                INSERT INTO uploaded_videos (id, title, description, badge, src)
                VALUES (@id, @title, @description, @badge, @src)
            `);
            const seedVids = db.transaction((list) => {
                for (const item of list) insertVid.run(item);
            });
            seedVids(defaultVideos);
        }
    } catch (e) {
        console.error('❌ Error seeding PDF/Podcast/Video data:', e);
    }
})();

// ─── Helper functions ─────────────────────────────────────────────────────────
function hashCrush(crushName) {
    return crypto.createHash('sha256').update(crushName.trim().toLowerCase()).digest('hex');
}

function makeSessionToken() {
    return crypto.randomBytes(32).toString('hex');
}

/** Returns user object from signed session cookie, or null */
function getSessionUser(req) {
    const token = req.signedCookies.session_token;
    if (!token) return null;
    const now = Math.floor(Date.now() / 1000);
    const row = db.prepare(
        'SELECT u.id, u.email, u.tier FROM sessions s JOIN users u ON s.user_id = u.id WHERE s.token = ? AND s.expires_at > ?'
    ).get(token, now);
    return row || null;
}

function setSessionCookie(res, token) {
    res.cookie('session_token', token, {
        signed: true,
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        sameSite: 'lax'
    });
}

// ─── Middlewares ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SECRET));

app.use((req, res, next) => {
    if (!req.url.startsWith('/api/')) next();
    else {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
        next();
    }
});

// Serve static files
app.use(express.static(path.join(__dirname)));
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));

// ─── AUTH: Register / Login ───────────────────────────────────────────────────
/**
 * POST /api/auth/login
 * Body: { email, crushName }
 * Auto-creates account on first visit.
 */
app.post('/api/auth/login', (req, res) => {
    const { email, crushName } = req.body;

    if (!email || !crushName) {
        return res.status(400).json({ error: 'Email and crush name are required.' });
    }

    const emailLower = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailLower)) {
        return res.status(400).json({ error: 'Enter a valid email address.' });
    }

    const crush_hash = hashCrush(crushName);
    let user = db.prepare('SELECT * FROM users WHERE email = ?').get(emailLower);

    if (!user) {
        // First time — auto-register
        const id = crypto.randomBytes(16).toString('hex');
        db.prepare('INSERT INTO users (id, email, crush_hash, tier) VALUES (?, ?, ?, ?)').run(id, emailLower, crush_hash, 'free');
        user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
        console.log(`✨ New user registered: ${emailLower}`);
    } else {
        // Existing user — verify crush name
        if (user.crush_hash !== crush_hash) {
            return res.status(401).json({ error: 'Incorrect crush name. Try again!' });
        }
    }

    // Create session
    const token = makeSessionToken();
    const expiresAt = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // 30 days
    db.prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)').run(token, user.id, expiresAt);
    setSessionCookie(res, token);

    console.log(`✅ Login success: ${emailLower} (tier: ${user.tier})`);
    return res.json({ success: true, email: user.email, tier: user.tier });
});

// ─── AUTH: Me ─────────────────────────────────────────────────────────────────
app.get('/api/auth/me', (req, res) => {
    const user = getSessionUser(req);
    if (!user) return res.json({ loggedIn: false });
    return res.json({ loggedIn: true, email: user.email, tier: 'premium', isPro: true });
});

// ─── AUTH: Logout ─────────────────────────────────────────────────────────────
app.post('/api/auth/logout', (req, res) => {
    const token = req.signedCookies.session_token;
    if (token) {
        db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
    }
    res.clearCookie('session_token');
    console.log('👋 User logged out.');
    return res.json({ success: true });
});

// ─── STATUS (legacy compat) ───────────────────────────────────────────────────
app.get('/api/status', (req, res) => {
    const user = getSessionUser(req);
    return res.json({ loggedIn: !!user, isPro: true, tier: 'premium' });
});

// ─── PAYMENT: Create Razorpay Order ──────────────────────────────────────────
app.post('/api/payment/order', (req, res) => {
    const user = getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'Please log in first.' });

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
        // Developer mock mode
        const mockOrderId = 'mock_order_' + crypto.randomBytes(6).toString('hex');
        console.warn(`⚠️ Mock payment mode — no Razorpay credentials.`);
        return res.json({ orderId: mockOrderId, amount: 99900, currency: 'INR', key: 'mock_key', mock: true });
    }

    const rzp = new Razorpay({ key_id: keyId, key_secret: keySecret });
    rzp.orders.create({
        amount: 99900, // ₹999 in paise
        currency: 'INR',
        receipt: `neetpg_${user.id}_${Date.now()}`
    }, (err, order) => {
        if (err) {
            console.error('Razorpay order error:', err);
            return res.status(500).json({ error: 'Payment gateway error.' });
        }
        return res.json({ orderId: order.id, amount: order.amount, currency: order.currency, key: keyId, mock: false });
    });
});

// ─── PAYMENT: Verify Signature ────────────────────────────────────────────────
app.post('/api/payment/verify', (req, res) => {
    const user = getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'Please log in first.' });

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, mock } = req.body;

    if (mock) {
        // Mock — upgrade immediately
        db.prepare('UPDATE users SET tier = ? WHERE id = ?').run('premium', user.id);
        console.log(`🎉 Mock upgrade: ${user.email} → premium`);
        return res.json({ success: true });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) return res.status(500).json({ error: 'Razorpay secret not configured.' });

    const expected = crypto.createHmac('sha256', keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

    if (expected !== razorpay_signature) {
        console.warn(`❌ Signature mismatch for ${user.email}`);
        return res.status(400).json({ error: 'Invalid payment signature.' });
    }

    db.prepare('UPDATE users SET tier = ? WHERE id = ?').run('premium', user.id);
    console.log(`🎉 Payment verified: ${user.email} → premium`);
    return res.json({ success: true });
});

// ─── SECURE EPISODE FETCH ─────────────────────────────────────────────────────
const FREE_EPISODE_LIMIT = 999999; // Set extremely high so all are free

app.get('/api/episode', (req, res) => {
    const user = getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'Please log in to access mock tests.' });

    const episodeId = parseInt(req.query.id) || 1;
    if (isNaN(episodeId) || episodeId < 1)
        return res.status(400).json({ error: 'Invalid episode ID.' });

    const isPro = true;

    // Gate bypassed for free mode

    const encPath = path.join(__dirname, 'neetquestions', `episode${episodeId}.enc`);
    if (!fs.existsSync(encPath))
        return res.status(404).json({ error: `Episode ${episodeId} not found.` });

    const ciphertext = fs.readFileSync(encPath, 'utf8');
    return res.json({ ciphertext, key: DECRYPTION_KEY });
});

// ─── EPISODE COUNT — how many episodes exist (for dynamic dashboard) ──────────
app.get('/api/episodes/count', (req, res) => {
    const user = getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'Not logged in.' });
    const isPro = true;

    const encDir = path.join(__dirname, 'neetquestions');
    let total = 0;
    try {
        total = fs.readdirSync(encDir).filter(f => f.match(/^episode\d+\.enc$/)).length;
    } catch { total = 0; }

    return res.json({
        total,
        free:    total, // All episodes are free
        premium: 0,
        isPro
    });
});

// ─── QBANK: List Subjects and Topics ──────────────────────────────────────────
app.get('/api/qbank/subjects', (req, res) => {
    const user = getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'Please log in first.' });

    try {
        const rows = db.prepare(`
            SELECT subject, topic, COUNT(*) as count 
            FROM questions 
            GROUP BY subject, topic
            ORDER BY subject, topic
        `).all();
        return res.json({ subjects: rows });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Database query failed.' });
    }
});

// ─── QBANK: Get Micro-Quiz Questions ─────────────────────────────────────────
app.get('/api/qbank/quiz', (req, res) => {
    const user = getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'Please log in first.' });

    const { subject, topic, count } = req.query;
    const limit = parseInt(count) || 5;

    try {
        let questions;
        if (subject && topic) {
            questions = db.prepare(`
                SELECT id, question, opa, opb, opc, opd 
                FROM questions 
                WHERE subject = ? AND topic = ? 
                ORDER BY RANDOM() LIMIT ?
            `).all(subject, topic, limit);
        } else if (subject) {
            questions = db.prepare(`
                SELECT id, question, opa, opb, opc, opd 
                FROM questions 
                WHERE subject = ? 
                ORDER BY RANDOM() LIMIT ?
            `).all(subject, limit);
        } else {
            questions = db.prepare(`
                SELECT id, question, opa, opb, opc, opd 
                FROM questions 
                ORDER BY RANDOM() LIMIT ?
            `).all(limit);
        }

        const enriched = questions.map(q => {
            let difficulty = 'Medium';
            const hashVal = parseInt(q.id.replace(/\D/g, '')) || 0;
            if (hashVal % 3 === 0) difficulty = 'Easy';
            else if (hashVal % 3 === 1) difficulty = 'Hard';

            const userAns = db.prepare('SELECT bookmarked FROM user_answers WHERE user_id = ? AND question_id = ?').get(user.id, q.id);
            const bookmarked = userAns ? !!userAns.bookmarked : false;

            return { ...q, difficulty, bookmarked };
        });

        return res.json({ questions: enriched });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Failed to retrieve quiz questions.' });
    }
});

// ─── QBANK: Construct Custom QBank ───────────────────────────────────────────
app.post('/api/qbank/create', (req, res) => {
    const user = getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'Please log in first.' });

    const { subjects, topics, count, source, difficulties } = req.body;
    const limit = parseInt(count) || 10;

    try {
        let sql = 'SELECT id, question, opa, opb, opc, opd FROM questions WHERE 1=1';
        const params = [];

        if (subjects && subjects.length) {
            sql += ` AND subject IN (${subjects.map(() => '?').join(',')})`;
            params.push(...subjects);
        }
        if (topics && topics.length) {
            sql += ` AND topic IN (${topics.map(() => '?').join(',')})`;
            params.push(...topics);
        }

        if (source === 'incorrect') {
            sql += ' AND id IN (SELECT question_id FROM user_answers WHERE user_id = ? AND is_correct = 0)';
            params.push(user.id);
        } else if (source === 'bookmarked') {
            sql += ' AND id IN (SELECT question_id FROM user_answers WHERE user_id = ? AND bookmarked = 1)';
            params.push(user.id);
        } else if (source === 'unattempted') {
            sql += ' AND id NOT IN (SELECT question_id FROM user_answers WHERE user_id = ?)';
            params.push(user.id);
        }

        const poolLimit = limit * 6;
        sql += ` ORDER BY RANDOM() LIMIT ?`;
        params.push(poolLimit);

        const pool = db.prepare(sql).all(...params);
        
        const filtered = pool.map(q => {
            let difficulty = 'Medium';
            const hashVal = parseInt(q.id.replace(/\D/g, '')) || 0;
            if (hashVal % 3 === 0) difficulty = 'Easy';
            else if (hashVal % 3 === 1) difficulty = 'Hard';

            const userAns = db.prepare('SELECT bookmarked FROM user_answers WHERE user_id = ? AND question_id = ?').get(user.id, q.id);
            const bookmarked = userAns ? !!userAns.bookmarked : false;

            return { ...q, difficulty, bookmarked };
        }).filter(q => {
            if (!difficulties || !difficulties.length) return true;
            return difficulties.includes(q.difficulty);
        }).slice(0, limit);

        return res.json({ questions: filtered });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Failed to construct custom QBank.' });
    }
});

// ─── QBANK: Get Bookmarked Question IDs ──────────────────────────────────────
app.get('/api/qbank/bookmarks', (req, res) => {
    const user = getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'Please log in first.' });

    try {
        const rows = db.prepare('SELECT question_id FROM user_answers WHERE user_id = ? AND bookmarked = 1').all(user.id);
        return res.json({ bookmarks: rows.map(r => r.question_id) });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Failed to retrieve bookmarks.' });
    }
});

// ─── QBANK: Toggle Bookmark ──────────────────────────────────────────────────
app.post('/api/content/bookmark', (req, res) => {
    const user = getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'Please log in first.' });

    const { questionId, bookmarked } = req.body;
    if (!questionId) return res.status(400).json({ error: 'Question ID is required.' });

    try {
        db.prepare(`
            INSERT INTO user_answers (user_id, question_id, bookmarked)
            VALUES (?, ?, ?)
            ON CONFLICT(user_id, question_id) DO UPDATE SET bookmarked = excluded.bookmarked
        `).run(user.id, questionId, bookmarked ? 1 : 0);
        return res.json({ success: true, bookmarked: !!bookmarked });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Failed to update bookmark.' });
    }
});

// ─── QBANK: Full-Text Keywords Search ────────────────────────────────────────
app.get('/api/qbank/search', (req, res) => {
    const user = getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'Please log in first.' });

    const { query } = req.query;
    if (!query || query.trim().length < 2) {
        return res.json({ questions: [] });
    }

    try {
        const cleanQuery = `%${query.trim()}%`;
        const matches = db.prepare(`
            SELECT id, question, opa, opb, opc, opd, cop, exp, subject, topic
            FROM questions 
            WHERE question LIKE ? OR exp LIKE ? 
            LIMIT 50
        `).all(cleanQuery, cleanQuery);

        const enriched = matches.map(q => {
            let difficulty = 'Medium';
            const hashVal = parseInt(q.id.replace(/\D/g, '')) || 0;
            if (hashVal % 3 === 0) difficulty = 'Easy';
            else if (hashVal % 3 === 1) difficulty = 'Hard';

            const userAns = db.prepare('SELECT bookmarked, is_correct, selected FROM user_answers WHERE user_id = ? AND question_id = ?').get(user.id, q.id);
            
            return {
                ...q,
                difficulty,
                bookmarked: userAns ? !!userAns.bookmarked : false,
                attempted: !!userAns,
                isCorrect: userAns ? !!userAns.is_correct : null
            };
        });

        return res.json({ questions: enriched });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Search failed.' });
    }
});

// ─── QBANK: Topic Mastery Analytics ──────────────────────────────────────────
app.get('/api/qbank/analytics', (req, res) => {
    const user = getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'Please log in first.' });

    try {
        const stats = db.prepare(`
            SELECT 
                q.subject,
                q.topic,
                COUNT(ua.question_id) as total_answered,
                SUM(ua.is_correct) as correct_count
            FROM user_answers ua
            JOIN questions q ON ua.question_id = q.id
            WHERE ua.user_id = ? AND ua.selected IS NOT NULL AND ua.selected != -1
            GROUP BY q.subject, q.topic
        `).all(user.id);
        return res.json({ stats });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Failed to retrieve analytics.' });
    }
});

// ─── QBANK: List Study PDFs ──────────────────────────────────────────────────
// Configure multer for file uploads
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'pdfFile') cb(null, path.join(__dirname, 'pdfs'));
        else if (file.fieldname === 'audioFile') cb(null, path.join(__dirname, 'podcasts'));
        else if (file.fieldname === 'videoFile') cb(null, path.join(__dirname, 'videos'));
        else cb(new Error('Invalid field name'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// ─── QBANK: List Study PDFs ──────────────────────────────────────────────────
app.get('/api/pdfs/list', (req, res) => {
    const user = getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'Please log in first.' });

    try {
        const rows = db.prepare('SELECT id, title, subject, size, pages, file_url as fileUrl, description as desc FROM uploaded_pdfs ORDER BY uploaded_at ASC').all();
        return res.json({ pdfs: rows });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Failed to retrieve PDFs.' });
    }
});

// ─── QBANK: List Podcasts ────────────────────────────────────────────────────
app.get('/api/podcasts/list', (req, res) => {
    const user = getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'Please log in first.' });

    try {
        const rows = db.prepare('SELECT id, title, description as desc, meta, src FROM uploaded_podcasts ORDER BY uploaded_at ASC').all();
        return res.json({ podcasts: rows });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Failed to retrieve podcasts.' });
    }
});

// ─── QBANK: List Videos ──────────────────────────────────────────────────────
app.get('/api/videos/list', (req, res) => {
    const user = getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'Please log in first.' });

    try {
        const rows = db.prepare('SELECT id, title, description as desc, badge, src as embedUrl FROM uploaded_videos ORDER BY uploaded_at ASC').all();
        return res.json({ videos: rows });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Failed to retrieve videos.' });
    }
});

// ─── ADMIN: Upload PDF Document ──────────────────────────────────────────────
app.post('/api/admin/upload/pdf', upload.single('pdfFile'), (req, res) => {
    const user = getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'Please log in first.' });
    if (!req.file) return res.status(400).json({ error: 'PDF file is required.' });

    const { title, subject, description } = req.body;
    if (!title || !subject) return res.status(400).json({ error: 'Title and subject are required.' });

    const id = 'pdf_' + crypto.randomBytes(8).toString('hex');
    const fileUrl = `/pdfs/${req.file.filename}`;
    
    const sizeStr = (req.file.size < 1024 * 1024) 
        ? `${(req.file.size / 1024).toFixed(1)} KB` 
        : `${(req.file.size / (1024 * 1024)).toFixed(1)} MB`;

    try {
        db.prepare(`
            INSERT INTO uploaded_pdfs (id, title, subject, size, pages, file_url, description)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `).run(id, title, subject, sizeStr, 1, fileUrl, description || '');
        
        console.log(`📂 PDF uploaded by admin: ${title} (${sizeStr})`);
        return res.json({ success: true, id, fileUrl });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Failed to save PDF metadata.' });
    }
});

// ─── ADMIN: Upload Podcast (Audio) ───────────────────────────────────────────
app.post('/api/admin/upload/podcast', upload.single('audioFile'), (req, res) => {
    const user = getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'Please log in first.' });
    if (!req.file) return res.status(400).json({ error: 'Audio file is required.' });

    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required.' });

    const id = 'pod_' + crypto.randomBytes(8).toString('hex');
    const src = `/podcasts/${req.file.filename}`;
    
    const sizeStr = (req.file.size < 1024 * 1024) 
        ? `${(req.file.size / 1024).toFixed(1)} KB` 
        : `${(req.file.size / (1024 * 1024)).toFixed(1)} MB`;
    const meta = `Audio Lecture · ${sizeStr}`;

    try {
        db.prepare(`
            INSERT INTO uploaded_podcasts (id, title, description, meta, src)
            VALUES (?, ?, ?, ?, ?)
        `).run(id, title, description || '', meta, src);
        
        console.log(`🎙  Podcast uploaded by admin: ${title}`);
        return res.json({ success: true, id, src });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Failed to save podcast metadata.' });
    }
});

// ─── ADMIN: Upload Video Lecture ─────────────────────────────────────────────
app.post('/api/admin/upload/video', upload.single('videoFile'), (req, res) => {
    const user = getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'Please log in first.' });
    
    const { title, description, youtubeUrl } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required.' });

    const id = 'vid_' + crypto.randomBytes(8).toString('hex');
    let src = '';

    if (req.file) {
        src = `/videos/${req.file.filename}`;
    } else if (youtubeUrl) {
        let ytId = youtubeUrl;
        if (youtubeUrl.includes('v=')) ytId = youtubeUrl.split('v=')[1].split('&')[0];
        else if (youtubeUrl.includes('youtu.be/')) ytId = youtubeUrl.split('youtu.be/')[1].split('?')[0];
        src = `https://www.youtube.com/embed/${ytId}`;
    } else {
        return res.status(400).json({ error: 'Either a video file or a YouTube link must be provided.' });
    }

    try {
        db.prepare(`
            INSERT INTO uploaded_videos (id, title, description, badge, src)
            VALUES (?, ?, ?, ?, ?)
        `).run(id, title, description || '', 'Video Lecture', src);
        
        console.log(`🎥 Video uploaded by admin: ${title}`);
        return res.json({ success: true, id, src });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Failed to save video metadata.' });
    }
});

// ─── ADMIN: Delete Media Item ────────────────────────────────────────────────
app.post('/api/admin/delete/media', (req, res) => {
    const user = getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'Please log in first.' });
    const { type, id } = req.body;

    try {
        let row;
        if (type === 'pdf') {
            row = db.prepare('SELECT file_url FROM uploaded_pdfs WHERE id = ?').get(id);
            if (row) {
                const filePath = path.join(__dirname, row.file_url);
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
                db.prepare('DELETE FROM uploaded_pdfs WHERE id = ?').run(id);
            }
        } else if (type === 'podcast') {
            row = db.prepare('SELECT src FROM uploaded_podcasts WHERE id = ?').get(id);
            if (row && row.src.startsWith('/podcasts/')) {
                const filePath = path.join(__dirname, row.src);
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
            db.prepare('DELETE FROM uploaded_podcasts WHERE id = ?').run(id);
        } else if (type === 'video') {
            row = db.prepare('SELECT src FROM uploaded_videos WHERE id = ?').get(id);
            if (row && row.src.startsWith('/videos/')) {
                const filePath = path.join(__dirname, row.src);
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
            db.prepare('DELETE FROM uploaded_videos WHERE id = ?').run(id);
        }
        return res.json({ success: true });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Failed to delete media.' });
    }
});

// ─── QBANK: Get Incorrect Questions (Mistake Book) ───────────────────────────
app.get('/api/qbank/mistakes', (req, res) => {
    const user = getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'Please log in first.' });

    try {
        const rows = db.prepare(`
            SELECT DISTINCT q.id, q.question, q.opa, q.opb, q.opc, q.opd, q.cop, q.exp, q.subject, q.topic
            FROM user_answers ua
            JOIN questions q ON ua.question_id = q.id
            WHERE ua.user_id = ? AND ua.is_correct = 0 AND ua.selected IS NOT NULL AND ua.selected != -1
            ORDER BY ua.timestamp DESC
        `).all(user.id);

        return res.json({ mistakes: rows });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Failed to retrieve mistakes.' });
    }
});

// ─── QBANK: Get Activity Streak & Daily Counts ───────────────────────────────
app.get('/api/qbank/streak', (req, res) => {
    const user = getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'Please log in first.' });

    try {
        const rows = db.prepare(`
            SELECT timestamp FROM user_answers 
            WHERE user_id = ? AND selected IS NOT NULL AND selected != -1
            ORDER BY timestamp ASC
        `).all(user.id);

        const countsByDate = {};
        rows.forEach(r => {
            const date = new Date(r.timestamp * 1000).toISOString().split('T')[0];
            countsByDate[date] = (countsByDate[date] || 0) + 1;
        });

        let streak = 0;
        const todayStr = new Date().toISOString().split('T')[0];
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        let checkDate = countsByDate[todayStr] ? todayStr : (countsByDate[yesterdayStr] ? yesterdayStr : null);
        
        if (checkDate) {
            streak = 1;
            const cursor = new Date(checkDate);
            while (true) {
                cursor.setDate(cursor.getDate() - 1);
                const cursorStr = cursor.toISOString().split('T')[0];
                if (countsByDate[cursorStr]) {
                    streak++;
                } else {
                    break;
                }
            }
        }

        const history = Object.keys(countsByDate).map(d => ({ date: d, count: countsByDate[d] }));
        return res.json({ streak, history });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Failed to calculate streak.' });
    }
});

// ─── SECURE GRADING (split-value — answers never leave server) ────────────────
app.post('/api/content/verify', (req, res) => {
    const user = getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'Not logged in.' });

    const { episodeId, questionId, selectedOption } = req.body;
    let qAnswer = null;

    if (episodeId && episodeId !== 'custom') {
        const securePath = path.join(__dirname, 'neetquestions_secure', `episode${episodeId}_answers.json`);
        if (fs.existsSync(securePath)) {
            const answers = JSON.parse(fs.readFileSync(securePath, 'utf8'));
            qAnswer = answers[questionId];
        }
    }

    if (!qAnswer) {
        // Fallback to database lookup for custom/micro quizzes
        qAnswer = db.prepare('SELECT cop, exp FROM questions WHERE id = ?').get(questionId);
    }

    if (!qAnswer) return res.status(404).json({ error: 'Question details not found.' });

    // cop is 1-indexed; selectedOption is 0-indexed from client
    const isCorrect = (selectedOption !== null && selectedOption !== -1)
        && parseInt(selectedOption) === (parseInt(qAnswer.cop) - 1);

    // Save student response to user_answers table
    try {
        db.prepare(`
            INSERT INTO user_answers (user_id, question_id, selected, is_correct)
            VALUES (?, ?, ?, ?)
            ON CONFLICT(user_id, question_id) DO UPDATE SET
            selected = excluded.selected,
            is_correct = excluded.is_correct,
            timestamp = strftime('%s','now')
        `).run(user.id, questionId, selectedOption, isCorrect ? 1 : 0);
    } catch (e) {
        console.error('Error saving user answer:', e);
    }

    return res.json({
        isCorrect,
        cop:    qAnswer.cop,
        exp:    qAnswer.exp,
        locked: false
    });
});

// ─── DEV RESET ────────────────────────────────────────────────────────────────
app.post('/api/reset', (req, res) => {
    const user = getSessionUser(req);
    if (user) {
        db.prepare('UPDATE users SET tier = ? WHERE id = ?').run('free', user.id);
        console.log(`🔄 Reset ${user.email} to free.`);
    }
    return res.json({ success: true });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n🚀 iLoveExams NEET PG server running → http://localhost:${PORT}`);
    console.log(`   Login page  : http://localhost:${PORT}/neet_pg_login.html`);
    console.log(`   Dashboard   : http://localhost:${PORT}/neet_pg.html`);
    console.log(`   Exam Engine : http://localhost:${PORT}/neet_pg_ui.html\n`);
});
