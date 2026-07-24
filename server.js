const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');
const Razorpay = require('razorpay');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

dotenv.config();

if (!process.env.COOKIE_SECRET) {
    console.warn('⚠️  COOKIE_SECRET not set in .env — using insecure default. Set it before deploying!');
}
if (!process.env.DECRYPTION_KEY) {
    console.warn('⚠️  DECRYPTION_KEY not set in .env — using insecure default. Set it before deploying!');
}

const app = express();
const PORT = process.env.PORT || 8085;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'ilovexams_neetpg_cookie_secret_2027!!';
const DECRYPTION_KEY = process.env.DECRYPTION_KEY || 'ilovexams_secret_key_32_bytes_long!!';
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@ilovexams.in').toLowerCase();

// ─── Database Setup ──────────────────────────────────────────────────────────
const db = new Database(path.join(__dirname, 'ilovexams.db'));
db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');

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
    topic       TEXT,
    hint_exp    TEXT
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

// Migration: Ensure hint_exp column exists in SQLite schema
try {
    db.prepare('ALTER TABLE questions ADD COLUMN hint_exp TEXT').run();
    console.log('✔ Added hint_exp column to questions table.');
} catch (e) {
    // Ignore: column already exists
}

// ─── Performance Indexes ───────────────────────────────────────────────────────
try {
    db.exec(`
        CREATE INDEX IF NOT EXISTS idx_user_answers_user_id ON user_answers(user_id);
        CREATE INDEX IF NOT EXISTS idx_user_answers_question_id ON user_answers(question_id);
        CREATE INDEX IF NOT EXISTS idx_user_answers_user_correct ON user_answers(user_id, is_correct);
        CREATE INDEX IF NOT EXISTS idx_questions_subject_topic ON questions(subject, topic);
        CREATE INDEX IF NOT EXISTS idx_questions_subject ON questions(subject);
        CREATE INDEX IF NOT EXISTS idx_questions_subject_rowid ON questions(subject, rowid);
        CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
        CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);
    `);
    console.log('✔ Database indexes ready.');
} catch (e) {
    // Indexes already exist
}

console.log('✔ SQLite database ready.');

// Startup Seeder for High-Yield NEET PG Questions
(() => {
    try {
        const qCountRow = db.prepare('SELECT COUNT(*) as count FROM questions').get();
        const rawPath = path.join(__dirname, 'neetquestions_secure', 'neet_pg_all_raw.json');
        const encDir = path.join(__dirname, 'neetquestions');

        const insert = db.prepare(`
            INSERT OR IGNORE INTO questions (id, question, opa, opb, opc, opd, cop, exp, subject, topic, hint_exp)
            VALUES (@id, @question, @opa, @opb, @opc, @opd, @cop, @exp, @subject, @topic, @hint_exp)
        `);

        if (!qCountRow || qCountRow.count < 150000) {
            if (fs.existsSync(encDir)) {
                console.log('⏳ Importing 180,000+ clinical PG questions from encrypted episodes into SQLite...');
                const start = Date.now();
                const datasetKeyBuf = Buffer.from('ilovexams_secret_key_32_bytes_long!!'.substring(0, 32));

                const encFiles = fs.readdirSync(encDir).filter(f => f.match(/^episode\d+\.enc$/));
                let totalLoaded = 0;

                const insertMany = db.transaction((qs) => {
                    for (const q of qs) {
                        insert.run({
                            id: q.id || crypto.randomUUID(),
                            question: q.question || '',
                            opa: q.opa || '',
                            opb: q.opb || '',
                            opc: q.opc || '',
                            opd: q.opd || '',
                            cop: parseInt(q.cop) || 0,
                            exp: q.exp || '',
                            subject: q.subject || 'General Medicine',
                            topic: q.topic || 'General',
                            hint_exp: q.hint_exp || null
                        });
                        totalLoaded++;
                    }
                });

                for (const file of encFiles) {
                    try {
                        const encPath = path.join(encDir, file);
                        const encText = fs.readFileSync(encPath, 'utf8');
                        const buf = Buffer.from(encText, 'base64');
                        const iv = buf.subarray(0, 16);
                        const decipher = crypto.createDecipheriv('aes-256-cbc', datasetKeyBuf, iv);
                        let dec = decipher.update(buf.subarray(16), undefined, 'utf8');
                        dec += decipher.final('utf8');
                        const payload = JSON.parse(dec);
                        if (payload && Array.isArray(payload.questions)) {
                            insertMany(payload.questions);
                        }
                    } catch (err) {
                        console.warn(`⚠️ Error decrypting ${file}:`, err.message);
                    }
                }
                console.log(`✅ Successfully seeded ${totalLoaded.toLocaleString()} questions from encrypted episodes in ${((Date.now() - start) / 1000).toFixed(1)}s.`);
            } else if (fs.existsSync(rawPath)) {
                console.log('⏳ Importing clinical PG questions from raw JSON into SQLite...');
                const start = Date.now();
                const rawData = JSON.parse(fs.readFileSync(rawPath, 'utf8'));

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
                            topic: q.topic || 'General',
                            hint_exp: q.hint_exp || null
                        });
                    }
                });

                insertMany(rawData);
                console.log(`✅ Loaded ${rawData.length} questions in ${((Date.now() - start) / 1000).toFixed(1)}s.`);
            } else {
                console.warn('⚠️ No question dataset found.');
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
        sameSite: 'lax',
        secure: IS_PRODUCTION   // HTTPS-only in production
    });
}

/** Middleware: require logged-in user */
function requireAuth(req, res, next) {
    const user = getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'Please log in first.' });
    req.user = user;
    next();
}

/** Middleware: require admin role */
function requireAdmin(req, res, next) {
    const user = getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'Please log in first.' });
    if (user.email !== ADMIN_EMAIL) return res.status(403).json({ error: 'Admin access required.' });
    req.user = user;
    next();
}

/** Cleanup expired sessions — run once on startup and every 6 hours */
function cleanExpiredSessions() {
    const now = Math.floor(Date.now() / 1000);
    const result = db.prepare('DELETE FROM sessions WHERE expires_at < ?').run(now);
    if (result.changes > 0) console.log(`🧹 Cleaned ${result.changes} expired session(s).`);
}
cleanExpiredSessions();
setInterval(cleanExpiredSessions, 6 * 60 * 60 * 1000);

// ─── Middlewares ──────────────────────────────────────────────────────────────
app.use(compression());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use(cookieParser(COOKIE_SECRET));

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    if (IS_PRODUCTION) {
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }
    next();
});

// Block direct access to admin page for non-admins via server redirect
app.get('/neet_pg_admin.html', (req, res, next) => {
    const user = getSessionUser(req);
    if (!user || user.email !== ADMIN_EMAIL) {
        return res.redirect('/neet_pg_login.html');
    }
    next();
});

// Rate limiter for auth endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,                   // max 20 login attempts per window
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many login attempts. Please wait 15 minutes.' }
});

app.use((req, res, next) => {
    if (req.url.startsWith('/api/')) {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    }
    next();
});

// Serve static assets with 7-day browser caching for high performance
app.use(express.static(__dirname, {
    maxAge: IS_PRODUCTION ? '7d' : '0',
    setHeaders: (res, filePath) => {
        if (filePath.match(/\.(css|js|png|svg|jpg|jpeg|webp|woff2|ttf|ico)$/i)) {
            res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
        }
    }
}));


// ─── PROGRAMMATIC QUESTION SEO ENGINE (2 Lakh Questions Google Indexer) ───────
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

const SUBJECT_SLUG_MAP = {
    'anaesthesia': 'Anaesthesia',
    'anatomy': 'Anatomy',
    'biochemistry': 'Biochemistry',
    'dental': 'Dental',
    'ent': 'ENT',
    'forensic-medicine': 'Forensic Medicine',
    'gynaecology-and-obstetrics': 'Gynaecology & Obstetrics',
    'medicine': 'Medicine',
    'microbiology': 'Microbiology',
    'ophthalmology': 'Ophthalmology',
    'orthopaedics': 'Orthopaedics',
    'pathology': 'Pathology',
    'pediatrics': 'Pediatrics',
    'pharmacology': 'Pharmacology',
    'physiology': 'Physiology',
    'psychiatry': 'Psychiatry',
    'radiology': 'Radiology',
    'skin': 'Skin',
    'social-and-preventive-medicine': 'Social & Preventive Medicine',
    'surgery': 'Surgery',
    'unknown': 'Unknown'
};

function toSubjectSlug(s) {
    if (!s) return 'medicine';
    return String(s).toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

app.get(['/question/:id', '/question/:slug-:id'], (req, res) => {
    const qid = req.params.id || req.params.slug;
    try {
        const q = db.prepare('SELECT * FROM questions WHERE id = ?').get(qid);
        if (!q) {
            return res.status(404).send(`
                <!DOCTYPE html>
                <html lang="en">
                <head><title>Question Not Found | iLoveExams</title><meta name="viewport" content="width=device-width, initial-scale=1"/></head>
                <body style="font-family:sans-serif; text-align:center; padding:50px;">
                    <h1>Question Not Found</h1>
                    <p>The requested question could not be found in the iLoveExams QBank.</p>
                    <a href="/neet_pg.html" style="background:#e0004d; color:white; padding:10px 20px; border-radius:8px; text-decoration:none;">Explore 2 Lakh NEET PG Questions</a>
                </body>
                </html>
            `);
        }

        const rawCop = parseInt(q.cop);
        const correctIndex = (rawCop >= 1 && rawCop <= 4) ? rawCop - 1 : (rawCop >= 0 && rawCop <= 3 ? rawCop : 0);
        const options = [q.opa || '', q.opb || '', q.opc || '', q.opd || ''];
        const correctAnswerText = options[correctIndex] || options[0];
        const optionLabels = ['A', 'B', 'C', 'D'];

        const subject = escapeHtml(q.subject || 'General Medicine');
        const topic = escapeHtml(q.topic || 'Clinical Case');
        const subjectSlug = toSubjectSlug(q.subject);
        const rawQuestion = (q.question || '').replace(/\s+/g, ' ').trim();
        const escapedQuestion = escapeHtml(rawQuestion);
        const snippet = escapeHtml(rawQuestion.length > 120 ? rawQuestion.substring(0, 117) + '...' : rawQuestion);
        
        const canonicalUrl = `https://ilovexams.com/question/${q.id}`;
        const pageTitle = `${snippet} — NEET PG ${subject} Question | i❤️Exams`;
        const metaDescription = escapeHtml(`${rawQuestion.substring(0, 150)}. Free NEET PG, INI-CET clinical mock question with solution on i❤️Exams.`);

        // Fetch prev and next question IDs for crawler traversal
        const prevQ = db.prepare('SELECT id FROM questions WHERE rowid < (SELECT rowid FROM questions WHERE id = ?) ORDER BY rowid DESC LIMIT 1').get(qid);
        const nextQ = db.prepare('SELECT id FROM questions WHERE rowid > (SELECT rowid FROM questions WHERE id = ?) ORDER BY rowid ASC LIMIT 1').get(qid);

        const prevLink = prevQ ? `<a href="/question/${prevQ.id}" class="nav-btn">← Previous Question</a>` : '';
        const nextLink = nextQ ? `<a href="/question/${nextQ.id}" class="nav-btn">Next Question →</a>` : '';

        // Fetch 5 related questions in the same subject for powerful internal linking PageRank flow
        const relatedQs = db.prepare('SELECT id, question, topic FROM questions WHERE subject = ? AND id != ? ORDER BY rowid DESC LIMIT 5').all(q.subject || '', qid);

        const jsonLdQuiz = {
            "@context": "https://schema.org",
            "@type": "Quiz",
            "name": `NEET PG ${subject} — ${topic} Mock Question`,
            "description": metaDescription,
            "url": canonicalUrl,
            "hasPart": [
                {
                    "@type": "Question",
                    "name": rawQuestion,
                    "educationalAlignment": [
                        { "@type": "AlignmentObject", "alignmentType": "educationalSubject", "targetName": subject }
                    ],
                    "suggestedAnswer": options.map((optText, idx) => ({
                        "@type": "Answer",
                        "position": idx + 1,
                        "text": optText
                    })),
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "position": correctIndex + 1,
                        "text": correctAnswerText,
                        "comment": {
                            "@type": "Comment",
                            "text": q.exp || "Explanation available on i❤️Exams."
                        }
                    }
                }
            ]
        };

        const jsonLdBreadcrumb = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "i❤️Exams Home", "item": "https://ilovexams.com/" },
                { "@type": "ListItem", "position": 2, "name": "NEET PG 2027", "item": "https://ilovexams.com/neet_pg.html" },
                { "@type": "ListItem", "position": 3, "name": `${subject} MCQs`, "item": `https://ilovexams.com/subject/${subjectSlug}` },
                { "@type": "ListItem", "position": 4, "name": `Question #${q.id.substring(0, 8)}`, "item": canonicalUrl }
            ]
        };

        const html = `<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${pageTitle}</title>
  <meta name="description" content="${metaDescription}"/>
  <meta name="keywords" content="neet pg, neet pg 2027, ${subject}, ${topic}, clinical mcq, iloveexams, ilovexam, free medical mock test"/>
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large"/>
  <meta name="author" content="i❤️Exams"/>
  <link rel="canonical" href="${canonicalUrl}"/>
  
  <!-- Open Graph & Twitter Cards -->
  <meta property="og:type" content="article"/>
  <meta property="og:site_name" content="i❤️Exams"/>

  <meta property="og:title" content="${pageTitle}"/>
  <meta property="og:description" content="${metaDescription}"/>
  <meta property="og:url" content="${canonicalUrl}"/>
  <meta property="og:image" content="https://ilovexams.com/dashboard.png"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${pageTitle}"/>
  <meta name="twitter:description" content="${metaDescription}"/>
  <meta name="twitter:image" content="https://ilovexams.com/dashboard.png"/>

  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">${JSON.stringify(jsonLdQuiz)}</script>
  <script type="application/ld+json">${JSON.stringify(jsonLdBreadcrumb)}</script>

  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"/>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"/>
  <style>
    body { background-color: #f8f9fa; color: #111; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding-bottom: 60px; }
    .header-bar { background: #000; color: #fff; padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #e0004d; }
    .header-logo { color: #fff; font-weight: 900; font-size: 1.25rem; text-decoration: none; display: flex; align-items: center; gap: 8px; }
    .header-logo span { color: #e0004d; }
    .q-card { background: #fff; border: 2px solid #000; border-radius: 12px; box-shadow: 4px 4px 0px #000; padding: 24px; margin-top: 16px; }
    .badge-subject { background: #e0004d; color: #fff; font-weight: 700; font-size: 0.8rem; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px; text-decoration: none; }
    .badge-topic { background: #003366; color: #fff; font-weight: 600; font-size: 0.8rem; padding: 4px 10px; border-radius: 20px; }
    .q-text { font-size: 1.15rem; font-weight: 700; line-height: 1.5; margin-top: 14px; margin-bottom: 20px; }
    .option-item { background: #f8f9fa; border: 2px solid #e9ecef; border-radius: 8px; padding: 12px 16px; margin-bottom: 10px; font-weight: 600; display: flex; align-items: center; gap: 12px; transition: all 0.2s; }
    .option-item.correct { background: #d1e7dd; border-color: #0f5132; color: #0f5132; }
    .option-badge { width: 28px; height: 28px; border-radius: 50%; background: #000; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 800; flex-shrink: 0; }
    .option-item.correct .option-badge { background: #0f5132; }
    .exp-box { background: #fff8f9; border-left: 4px solid #e0004d; border-radius: 0 8px 8px 0; padding: 16px; margin-top: 20px; font-size: 0.95rem; line-height: 1.6; }
    .exp-title { font-weight: 800; color: #e0004d; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 6px; display: flex; align-items: center; gap: 6px; }
    .cta-banner { background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); color: #fff; border-radius: 12px; padding: 24px; margin-top: 28px; border: 2px solid #e0004d; text-align: center; }
    .cta-btn { background: #e0004d; color: #fff; font-weight: 800; font-size: 1.1rem; padding: 12px 28px; border-radius: 8px; text-decoration: none; display: inline-block; margin-top: 14px; border: 2px solid #000; box-shadow: 3px 3px 0px #fff; transition: transform 0.1s; }
    .cta-btn:hover { transform: translateY(-2px); color: #fff; }
    .nav-box { display: flex; justify-content: space-between; margin-top: 20px; gap: 12px; }
    .nav-btn { background: #fff; border: 2px solid #000; color: #000; font-weight: 700; font-size: 0.9rem; padding: 10px 18px; border-radius: 8px; text-decoration: none; box-shadow: 2px 2px 0px #000; }
    .nav-btn:hover { background: #f0f0f0; color: #000; }
  </style>
</head>
<body>
  <header class="header-bar">
    <a href="/" class="header-logo">
      <i class="bi bi-heart-pulse-fill" style="color:#e0004d;"></i>
      iLove<span>Exams</span>
    </a>
    <a href="/neet_pg.html" class="btn btn-sm btn-outline-light fw-bold">Full 2L QBank</a>
  </header>

  <main class="container" style="max-width: 760px;">
    <nav aria-label="breadcrumb" class="mt-3">
      <ol class="breadcrumb mb-0 small">
        <li class="breadcrumb-item"><a href="/" class="text-decoration-none text-secondary">Home</a></li>
        <li class="breadcrumb-item"><a href="/neet_pg.html" class="text-decoration-none text-secondary">NEET PG</a></li>
        <li class="breadcrumb-item"><a href="/subject/${subjectSlug}" class="text-decoration-none text-secondary">${subject}</a></li>
        <li class="breadcrumb-item active text-dark fw-semibold" aria-current="page">MCQ #${q.id.substring(0, 8)}</li>
      </ol>
    </nav>

    <article class="q-card">
      <div class="d-flex align-items-center gap-2 flex-wrap">
        <a href="/subject/${subjectSlug}" class="badge-subject">${subject}</a>
        <span class="badge-topic">${topic}</span>
        <span class="ms-auto text-muted small fw-bold"><i class="bi bi-hash"></i>${q.id.substring(0, 8)}</span>
      </div>

      <h1 class="q-text">${escapedQuestion}</h1>

      <div class="options-list">
        ${options.map((opt, i) => `
          <div class="option-item ${i === correctIndex ? 'correct' : ''}">
            <div class="option-badge">${optionLabels[i]}</div>
            <div>${escapeHtml(opt)} ${i === correctIndex ? '<i class="bi bi-check-circle-fill ms-2 text-success"></i>' : ''}</div>
          </div>
        `).join('')}
      </div>

      ${q.exp ? `
        <div class="exp-box">
          <div class="exp-title"><i class="bi bi-journal-medical"></i> High-Yield Explanation</div>
          <div>${escapeHtml(q.exp)}</div>
        </div>
      ` : ''}
    </article>

    <div class="nav-box">
      ${prevLink}
      ${nextLink}
    </div>

    ${relatedQs.length > 0 ? `
      <section class="mt-4 p-3 bg-white rounded-3 border">
        <h2 class="h6 fw-bold text-uppercase text-dark mb-3"><i class="bi bi-diagram-3-fill text-danger me-2"></i>Related ${subject} MCQs</h2>
        <div class="list-group list-group-flush">
          ${relatedQs.map(rq => {
            const rqSnippet = escapeHtml(rq.question.length > 95 ? rq.question.substring(0, 92) + '...' : rq.question);
            return `
              <a href="/question/${rq.id}" class="list-group-item list-group-item-action px-2 py-2 d-flex justify-content-between align-items-center">
                <div class="pe-2">
                  <div class="fw-semibold text-dark small">${rqSnippet}</div>
                  <span class="badge bg-light text-secondary border mt-1" style="font-size:0.7rem;">${escapeHtml(rq.topic || 'Clinical Case')}</span>
                </div>
                <i class="bi bi-chevron-right text-muted small"></i>
              </a>
            `;
          }).join('')}
        </div>
        <div class="text-center mt-3">
          <a href="/subject/${subjectSlug}" class="btn btn-outline-dark btn-sm fw-bold px-3">Explore All ${subject} Questions →</a>
        </div>
      </section>
    ` : ''}

    <div class="cta-banner">
      <h2 class="h4 fw-bold mb-2">Practice 2,00,000+ NEET PG Questions Free</h2>
      <p class="small text-white-50 mb-0">Timed mock tests, mistake queue analytics, audio lectures & zero attempt limits on i❤️Exams.</p>
      <a href="/neet_pg_ui.html" class="cta-btn"><i class="bi bi-play-circle-fill me-2"></i>Start Free Mock Test Now</a>
    </div>
  </main>
</body>
</html>`;

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        return res.send(html);
    } catch (e) {
        console.error('Question SSR error:', e);
        return res.status(500).send('Internal Server Error');
    }
});

// ─── DYNAMIC SUBJECT HUB PAGES (SEO Taxonomy & Category Landing Pages) ───
app.get(['/subject/:subjectSlug', '/subject/:subjectSlug/page/:page'], (req, res) => {
    const slug = req.params.subjectSlug;
    const page = Math.max(1, parseInt(req.params.page) || 1);
    const subjectName = SUBJECT_SLUG_MAP[slug];

    if (!subjectName) {
        return res.status(404).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head><title>Subject Not Found | iLoveExams</title><meta name="viewport" content="width=device-width, initial-scale=1"/></head>
            <body style="font-family:sans-serif; text-align:center; padding:50px;">
                <h1>Subject Not Found</h1>
                <p>The requested subject category could not be found.</p>
                <a href="/neet_pg.html" style="background:#e0004d; color:white; padding:10px 20px; border-radius:8px; text-decoration:none;">Explore 2 Lakh NEET PG Questions</a>
            </body>
            </html>
        `);
    }

    try {
        const pageSize = 50;
        const offset = (page - 1) * pageSize;

        const totalObj = db.prepare('SELECT COUNT(*) as c FROM questions WHERE subject = ?').get(subjectName);
        const totalCount = totalObj ? totalObj.c : 0;
        const totalPages = Math.ceil(totalCount / pageSize) || 1;

        const questions = db.prepare('SELECT id, question, topic, opa, opb, opc, opd FROM questions WHERE subject = ? ORDER BY rowid ASC LIMIT ? OFFSET ?').all(subjectName, pageSize, offset);

        const canonicalUrl = page === 1 ? `https://ilovexams.com/subject/${slug}` : `https://ilovexams.com/subject/${slug}/page/${page}`;
        const pageTitle = `NEET PG ${subjectName} MCQs & Free Mock Tests ${page > 1 ? `(Page ${page})` : ''} | i❤️Exams`;
        const metaDescription = escapeHtml(`Practice ${totalCount.toLocaleString()}+ NEET PG ${subjectName} high-yield clinical MCQs. Page ${page} of free medical test bank on i❤️Exams.`);

        const prevPageLink = page > 1 ? `<a href="${page - 1 === 1 ? `/subject/${slug}` : `/subject/${slug}/page/${page - 1}`}" class="btn btn-outline-dark btn-sm fw-bold">← Previous Page</a>` : '';
        const nextPageLink = page < totalPages ? `<a href="/subject/${slug}/page/${page + 1}" class="btn btn-outline-dark btn-sm fw-bold">Next Page →</a>` : '';

        const jsonLdCollection = {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": `NEET PG ${subjectName} Practice Questions`,
            "description": metaDescription,
            "url": canonicalUrl,
            "mainEntity": {
                "@type": "ItemList",
                "numberOfItems": questions.length,
                "itemListElement": questions.map((q, idx) => ({
                    "@type": "ListItem",
                    "position": offset + idx + 1,
                    "url": `https://ilovexams.com/question/${q.id}`,
                    "name": q.question.substring(0, 100)
                }))
            }
        };

        const jsonLdBreadcrumb = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "i❤️Exams Home", "item": "https://ilovexams.com/" },
                { "@type": "ListItem", "position": 2, "name": "NEET PG 2027", "item": "https://ilovexams.com/neet_pg.html" },
                { "@type": "ListItem", "position": 3, "name": `${subjectName} MCQs`, "item": canonicalUrl }
            ]
        };

        const html = `<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${pageTitle}</title>
  <meta name="description" content="${metaDescription}"/>
  <meta name="keywords" content="neet pg ${subjectName.toLowerCase()}, ${subjectName.toLowerCase()} mcqs, neet pg 2027, clinical medical questions, iloveexams"/>
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large"/>
  <link rel="canonical" href="${canonicalUrl}"/>
  
  <meta property="og:type" content="website"/>
  <meta property="og:site_name" content="i❤️Exams"/>
  <meta property="og:title" content="${pageTitle}"/>
  <meta property="og:description" content="${metaDescription}"/>
  <meta property="og:url" content="${canonicalUrl}"/>
  <meta property="og:image" content="https://ilovexams.com/dashboard.png"/>

  <script type="application/ld+json">${JSON.stringify(jsonLdCollection)}</script>
  <script type="application/ld+json">${JSON.stringify(jsonLdBreadcrumb)}</script>

  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"/>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"/>
  <style>
    body { background-color: #f8f9fa; color: #111; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding-bottom: 60px; }
    .header-bar { background: #000; color: #fff; padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #e0004d; }
    .header-logo { color: #fff; font-weight: 900; font-size: 1.25rem; text-decoration: none; display: flex; align-items: center; gap: 8px; }
    .header-logo span { color: #e0004d; }
    .q-item { background: #fff; border: 1px solid #dee2e6; border-radius: 10px; padding: 18px; margin-bottom: 14px; transition: transform 0.15s, box-shadow 0.15s; }
    .q-item:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-color: #e0004d; }
  </style>
</head>
<body>
  <header class="header-bar">
    <a href="/" class="header-logo">
      <i class="bi bi-heart-pulse-fill" style="color:#e0004d;"></i>
      iLove<span>Exams</span>
    </a>
    <a href="/neet_pg.html" class="btn btn-sm btn-outline-light fw-bold">Full 2L QBank</a>
  </header>

  <main class="container" style="max-width: 860px;">
    <nav aria-label="breadcrumb" class="my-3">
      <ol class="breadcrumb mb-0 small">
        <li class="breadcrumb-item"><a href="/" class="text-decoration-none text-secondary">Home</a></li>
        <li class="breadcrumb-item"><a href="/neet_pg.html" class="text-decoration-none text-secondary">NEET PG</a></li>
        <li class="breadcrumb-item active text-dark fw-semibold" aria-current="page">${subjectName}</li>
      </ol>
    </nav>

    <div class="p-4 bg-white rounded-3 border mb-4 shadow-sm">
      <span class="badge bg-danger text-uppercase fw-bold mb-2">NEET PG 2027 Medical QBank</span>
      <h1 class="h2 fw-extrabold text-dark mb-2">${subjectName} Practice MCQs</h1>
      <p class="text-muted mb-0">Browse ${totalCount.toLocaleString()} high-yield clinical questions in <strong>${subjectName}</strong>. Includes detailed explanations, options, and topic tags.</p>
    </div>

    <div class="questions-list">
      ${questions.map((q, idx) => {
          const qSnippet = escapeHtml(q.question);
          return `
            <article class="q-item">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <span class="badge bg-dark text-white font-monospace">#${offset + idx + 1}</span>
                <span class="badge bg-light text-dark border">${escapeHtml(q.topic || 'Clinical Case')}</span>
              </div>
              <h2 class="h6 fw-bold mb-3 text-dark">
                <a href="/question/${q.id}" class="text-decoration-none text-dark hover-danger">${qSnippet}</a>
              </h2>
              <div class="d-flex justify-content-between align-items-center">
                <a href="/question/${q.id}" class="btn btn-sm btn-outline-danger fw-bold">View Solution & Options →</a>
              </div>
            </article>
          `;
      }).join('')}
    </div>

    <div class="d-flex justify-content-between align-items-center mt-4">
      <div>${prevPageLink}</div>
      <span class="small text-muted fw-semibold">Page ${page} of ${totalPages}</span>
      <div>${nextPageLink}</div>
    </div>
  </main>
</body>
</html>`;

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Cache-Control', 'public, max-age=3600');
        return res.send(html);
    } catch (e) {
        console.error('Subject SSR error:', e);
        return res.status(500).send('Subject page error');
    }
});

// ─── DYNAMIC QUESTION SITEMAP INDEX (Optimized for Fast Googlebot Crawling) ──
const sitemapCache = new Map();
const SITEMAP_CACHE_TTL = 60 * 60 * 1000; // 1 hour in-memory TTL

app.get('/sitemap-questions.xml', (req, res) => {
    try {
        const cached = sitemapCache.get('index');
        if (cached && (Date.now() - cached.timestamp < SITEMAP_CACHE_TTL)) {
            res.setHeader('Content-Type', 'application/xml; charset=utf-8');
            res.setHeader('Cache-Control', 'public, max-age=3600');
            return res.send(cached.data);
        }

        const totalObj = db.prepare('SELECT COUNT(*) as c FROM questions').get();
        const total = totalObj ? totalObj.c : 0;
        const pageSize = 2000; // 2,000 URLs per chunk to ensure sub-30ms response & small payload (<200KB)
        const totalPages = Math.ceil(total / pageSize) || 1;
        const todayStr = new Date().toISOString().split('T')[0];

        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
        for (let i = 1; i <= totalPages; i++) {
            xml += `  <sitemap>\n    <loc>https://ilovexams.com/sitemap-questions-${i}.xml</loc>\n    <lastmod>${todayStr}</lastmod>\n  </sitemap>\n`;
        }
        xml += `</sitemapindex>`;

        sitemapCache.set('index', { data: xml, timestamp: Date.now() });

        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        res.setHeader('Cache-Control', 'public, max-age=3600');
        return res.send(xml);
    } catch (e) {
        console.error('Sitemap index error:', e);
        return res.status(500).send('Sitemap generation error');
    }
});

app.get('/sitemap-questions-:page.xml', (req, res) => {
    const page = parseInt(req.params.page) || 1;
    const cacheKey = `page_${page}`;

    try {
        const cached = sitemapCache.get(cacheKey);
        if (cached && (Date.now() - cached.timestamp < SITEMAP_CACHE_TTL)) {
            res.setHeader('Content-Type', 'application/xml; charset=utf-8');
            res.setHeader('Cache-Control', 'public, max-age=3600');
            return res.send(cached.data);
        }

        const pageSize = 2000; // 2,000 URLs per chunk
        const offset = (page - 1) * pageSize;

        const rows = db.prepare('SELECT id FROM questions ORDER BY rowid ASC LIMIT ? OFFSET ?').all(pageSize, offset);

        if (!rows || rows.length === 0) {
            return res.status(404).send('Sitemap page not found');
        }

        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
        rows.forEach(r => {
            xml += `  <url>\n    <loc>https://ilovexams.com/question/${r.id}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.70</priority>\n  </url>\n`;
        });
        xml += `</urlset>`;

        sitemapCache.set(cacheKey, { data: xml, timestamp: Date.now() });

        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        res.setHeader('Cache-Control', 'public, max-age=3600');
        return res.send(xml);
    } catch (e) {
        console.error(`Sitemap page ${page} error:`, e);
        return res.status(500).send('Sitemap page error');
    }
});


// Serve static files with anti-cache headers for HTML/JS
app.use(express.static(path.join(__dirname), {
    maxAge: 0,
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html') || filePath.endsWith('.js')) {
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
        }
    }
}));
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));
app.use('/podcasts', express.static(path.join(__dirname, 'podcasts')));
app.use('/videos', express.static(path.join(__dirname, 'videos')));

// ─── AUTH: Register / Login ───────────────────────────────────────────────────
/**
 * POST /api/auth/login
 * Body: { email, crushName }
 * Auto-creates account on first visit.
 */
app.post('/api/auth/login', authLimiter, (req, res) => {
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
    const isPro = user.tier === 'premium';
    const isAdmin = user.email === ADMIN_EMAIL;
    return res.json({ loggedIn: true, email: user.email, tier: user.tier, isPro, isAdmin });
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
    return res.json({ loggedIn: !!user, isPro: !!user, tier: user ? user.tier : 'free' });
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

// ─── QBANK: Get All User Attempts (For Resuming Progress) ────────────────────
app.get('/api/qbank/attempts', (req, res) => {
    const user = getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'Please log in first.' });

    try {
        const rows = db.prepare('SELECT question_id, selected, is_correct, bookmarked FROM user_answers WHERE user_id = ?').all(user.id);
        const attempts = {};
        rows.forEach(r => {
            attempts[r.question_id] = {
                selected: r.selected,
                isCorrect: !!r.is_correct,
                bookmarked: !!r.bookmarked
            };
        });
        return res.json({ attempts });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Failed to retrieve attempts.' });
    }
});

// ─── QBANK: Reset Specific Question Attempts ──────────────────────────────────
app.post('/api/qbank/reset-questions', (req, res) => {
    const user = getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'Please log in first.' });

    const { questionIds } = req.body;
    if (!questionIds || !Array.isArray(questionIds)) {
        return res.status(400).json({ error: 'Invalid questionIds list.' });
    }

    try {
        const deleteStmt = db.prepare('DELETE FROM user_answers WHERE user_id = ? AND question_id = ?');
        
        // Execute in transaction
        const deleteMany = db.transaction((userId, ids) => {
            for (const id of ids) {
                deleteStmt.run(userId, id);
            }
        });
        
        deleteMany(user.id, questionIds);
        return res.json({ success: true });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Failed to reset attempts.' });
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
// Configure multer for file uploads — with strict validation
const multer = require('multer');
const ALLOWED_TYPES = {
    pdfFile:   { mimetypes: ['application/pdf'], maxMB: 50 },
    audioFile: { mimetypes: ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/aac', 'audio/mp4'], maxMB: 200 },
    videoFile: { mimetypes: ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'], maxMB: 500 }
};

const uploadStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'pdfFile') cb(null, path.join(__dirname, 'pdfs'));
        else if (file.fieldname === 'audioFile') cb(null, path.join(__dirname, 'podcasts'));
        else if (file.fieldname === 'videoFile') cb(null, path.join(__dirname, 'videos'));
        else cb(new Error('Invalid field name'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        // Sanitise: strip non-alphanumeric from extension
        const ext = path.extname(file.originalname).toLowerCase().replace(/[^a-z0-9.]/g, '');
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const uploadFileFilter = (req, file, cb) => {
    const allowed = ALLOWED_TYPES[file.fieldname];
    if (!allowed) return cb(new Error('Invalid field name'));
    if (!allowed.mimetypes.includes(file.mimetype)) {
        return cb(new Error(`Invalid file type for ${file.fieldname}. Allowed: ${allowed.mimetypes.join(', ')}`));
    }
    cb(null, true);
};

const upload = multer({
    storage: uploadStorage,
    fileFilter: uploadFileFilter,
    limits: { fileSize: 500 * 1024 * 1024 } // 500 MB hard cap; individual routes enforce lower limits
});

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
app.post('/api/admin/upload/pdf', requireAdmin, upload.single('pdfFile'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'PDF file is required.' });
    // Enforce per-type size limit
    if (req.file.size > ALLOWED_TYPES.pdfFile.maxMB * 1024 * 1024) {
        fs.unlinkSync(req.file.path);
        return res.status(413).json({ error: `PDF must be under ${ALLOWED_TYPES.pdfFile.maxMB}MB.` });
    }

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

app.post('/api/admin/upload/podcast', requireAdmin, upload.single('audioFile'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'Audio file is required.' });
    if (req.file.size > ALLOWED_TYPES.audioFile.maxMB * 1024 * 1024) {
        fs.unlinkSync(req.file.path);
        return res.status(413).json({ error: `Audio must be under ${ALLOWED_TYPES.audioFile.maxMB}MB.` });
    }

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
app.post('/api/admin/upload/video', requireAdmin, upload.single('videoFile'), (req, res) => {
    if (req.file && req.file.size > ALLOWED_TYPES.videoFile.maxMB * 1024 * 1024) {
        fs.unlinkSync(req.file.path);
        return res.status(413).json({ error: `Video must be under ${ALLOWED_TYPES.videoFile.maxMB}MB.` });
    }
    
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
app.post('/api/admin/delete/media', requireAdmin, (req, res) => {
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
        cop:      qAnswer.cop,
        exp:      qAnswer.exp,
        hint_exp: qAnswer.hint_exp || null,
        locked:   false
    });
});

// ─── QBANK PROGRESS — total questions & how many user has completed ─────────
app.get('/api/qbank/progress', (req, res) => {
    const user = getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'Not logged in.' });

    try {
        const totalRow     = db.prepare('SELECT COUNT(*) as cnt FROM questions').get();
        const completedRow = db.prepare(
            'SELECT COUNT(DISTINCT question_id) as cnt FROM user_answers WHERE user_id = ? AND selected IS NOT NULL'
        ).get(user.id);
        const correctRow   = db.prepare(
            'SELECT COUNT(*) as cnt FROM user_answers WHERE user_id = ? AND is_correct = 1'
        ).get(user.id);

        return res.json({
            totalQuestions:     totalRow.cnt     || 0,
            completedQuestions: completedRow.cnt || 0,
            correctAnswers:     correctRow.cnt   || 0,
        });
    } catch (e) {
        console.error('Progress error:', e);
        return res.status(500).json({ error: 'Could not load progress.' });
    }
});

// ─── DEV RESET (disabled in production) ──────────────────────────────────────
app.post('/api/reset', (req, res) => {
    if (IS_PRODUCTION) return res.status(404).json({ error: 'Not found.' });
    const user = getSessionUser(req);
    if (user) {
        db.prepare('UPDATE users SET tier = ? WHERE id = ?').run('free', user.id);
        console.log(`🔄 Reset ${user.email} to free.`);
    }
    return res.json({ success: true });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
    // Handle multer errors (file type/size)
    if (err && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ error: 'File is too large.' });
    }
    if (err && err.message) {
        return res.status(400).json({ error: err.message });
    }
    console.error('Unhandled error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n🚀 iLoveExams NEET PG server running → http://localhost:${PORT}`);
    console.log(`   Login page  : http://localhost:${PORT}/neet_pg_login.html`);
    console.log(`   Dashboard   : http://localhost:${PORT}/neet_pg.html`);
    console.log(`   Exam Engine : http://localhost:${PORT}/neet_pg_ui.html\n`);
});
