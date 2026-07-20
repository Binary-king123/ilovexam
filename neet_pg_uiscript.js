// ========================================================
// iLoveExams NEET PG — Practice Mode Engine
// Instant answer reveal on option click
// ========================================================
let questionBank = [];
let currentIndex = 0;
let userAnswers = []; // { selected, marked, visited, isCorrect, cop, exp, locked, revealed }
let timerInterval;
let totalTime = 20 * 60;
let candidateName = 'Candidate';
let tabSwitchCount = 0;
let fullscreenExitCount = 0;
let examActive = false;

// ──────────────────────────────────────────────────────
// AES Decryption
// ──────────────────────────────────────────────────────
function decryptPayload(base64Ciphertext, keyStr) {
    try {
        const rawData    = CryptoJS.enc.Base64.parse(base64Ciphertext);
        const iv         = CryptoJS.lib.WordArray.create(rawData.words.slice(0, 4), 16);
        const ciphertext = CryptoJS.lib.WordArray.create(rawData.words.slice(4), rawData.sigBytes - 16);
        const key        = CryptoJS.enc.Utf8.parse(keyStr.substring(0, 32));
        return CryptoJS.AES.decrypt(
            { ciphertext }, key,
            { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
        ).toString(CryptoJS.enc.Utf8);
    } catch (e) { console.error('Decryption failed:', e); return null; }
}

function getEpisodeNumber() {
    return parseInt(new URLSearchParams(window.location.search).get('episode')) || 1;
}

// ──────────────────────────────────────────────────────
// Auth Guard
// ──────────────────────────────────────────────────────
(async () => {
    try {
        const res  = await fetch('/api/auth/me');
        const data = await res.json();
        if (!data.loggedIn) { window.location.href = 'neet_pg_login.html'; return; }
        candidateName = data.email.split('@')[0] || 'Candidate';
        document.getElementById('headerCandidateName').textContent = data.email;
    } catch { window.location.href = 'neet_pg_login.html'; }
})();

// ──────────────────────────────────────────────────────
// Razorpay Upgrade Trigger
// ──────────────────────────────────────────────────────
async function triggerUpgrade() {
    alert("All premium features are currently free during this preview!");
}

// ──────────────────────────────────────────────────────
// Load Questions
// ──────────────────────────────────────────────────────
// ──────────────────────────────────────────────────────
// Load Questions
// ──────────────────────────────────────────────────────
async function loadQuestions() {
    const urlParams = new URLSearchParams(window.location.search);
    const isCustom = (urlParams.get('episode') === 'custom');
    const epNum = getEpisodeNumber();

    if (isCustom) {
        const quizType = urlParams.get('quizType');
        const count = urlParams.get('count') || '10';
        let res;

        if (quizType === 'micro') {
            const subject = urlParams.get('subject') || '';
            const topic = urlParams.get('topic') || '';
            res = await fetch(`/api/qbank/quiz?subject=${encodeURIComponent(subject)}&topic=${encodeURIComponent(topic)}&count=${count}`);
        } else if (quizType === 'custom_builder') {
            const configStr = localStorage.getItem('neet_pg_custom_builder_config');
            let config = {};
            try { config = configStr ? JSON.parse(configStr) : {}; } catch (e) {
                console.warn('neet_pg_custom_builder_config corrupted, resetting.', e);
                localStorage.removeItem('neet_pg_custom_builder_config');
            }
            res = await fetch('/api/qbank/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subjects: config.subjects || [],
                    difficulties: config.difficulties || [],
                    source: config.source || 'all',
                    count: config.count || 10
                })
            });
        }

        if (!res || !res.ok) {
            alert('⚠️ Failed to load custom quiz.');
            window.location.href = 'neet_pg.html';
            return false;
        }

        const data = await res.json();
        const questions = data.questions || [];
        if (questions.length === 0) {
            alert('⚠️ No questions found matching your filter criteria. Try expanding subjects or difficulties.');
            window.location.href = 'neet_pg.html';
            return false;
        }

        questionBank = questions.map(q => ({
            id: q.id,
            questionText: q.question,
            options: [q.opa, q.opb, q.opc, q.opd],
            difficulty: q.difficulty || 'Medium'
        }));

        userAnswers = questions.map(q => ({
            selected: null,
            marked: false,
            visited: false,
            isCorrect: null,
            cop: null,
            exp: null,
            hint_exp: null,
            locked: false,
            revealed: false,
            bookmarked: !!q.bookmarked
        }));

        const titleStr = quizType === 'micro' ? 'NEET PG — MICRO-QUIZ' : 'NEET PG — CUSTOM QBANK';
        document.getElementById('examEpisodeTitle').innerText   = titleStr;
        document.getElementById('headerEpisodeTitle').innerText = titleStr;
        document.getElementById('cnameEpisode').innerText       = quizType === 'micro' ? 'Micro-Quiz' : 'Custom Builder';
        document.getElementById('headerBookmarkBtn').style.display = 'block';

        // SEO tags (Custom)
        document.title = `${titleStr} | iLovexams`;
        return true;
    } else {
        const subjects = [
          "Cardiology & Pulmonology",
          "Neurology & Endocrinology",
          "Nephrology & Hematology",
          "Pharmacology & Microbiology",
          "Obstetrics & Pediatrics",
          "Surgery & Psychiatry",
          "Dermatology & Ophthalmology",
          "Anatomy & Physiology",
          "Biochemistry & Genetics",
          "Pathology & Immunology"
        ];
        const subjectTitle = subjects[(epNum - 1) % subjects.length];

        // Dynamic SEO Configuration
        document.title = `NEET PG Free Practice Episode ${epNum} (${subjectTitle}) | iLovexams`;

        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = "description";
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = `Free NEET PG practice exam for ${subjectTitle} - Episode ${epNum}. Solve 50 high-yield clinical MCQs with detailed explanations.`;

        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.name = "keywords";
            document.head.appendChild(metaKeywords);
        }
        metaKeywords.content = `NEET PG 2027, NEET PG mock test, ${subjectTitle} MCQs, clinical case questions, AIIMS PG, clinical mock tests, iLovexams, free mock exam`;

        // Open Graph Tags
        let ogTitle = document.querySelector('meta[property="og:title"]');
        if (!ogTitle) {
            ogTitle = document.createElement('meta');
            ogTitle.setAttribute('property', 'og:title');
            document.head.appendChild(ogTitle);
        }
        ogTitle.content = `NEET PG Free Practice Episode ${epNum} (${subjectTitle}) - iLovexams`;

        let ogDesc = document.querySelector('meta[property="og:description"]');
        if (!ogDesc) {
            ogDesc = document.createElement('meta');
            ogDesc.setAttribute('property', 'og:description');
            document.head.appendChild(ogDesc);
        }
        ogDesc.content = `Practice 50 high-yield clinical questions on ${subjectTitle}. Instant results and detailed feedback.`;

        const titleStr = `NEET PG — EPISODE ${epNum} PRACTICE`;
        document.getElementById('examEpisodeTitle').innerText   = titleStr;
        document.getElementById('headerEpisodeTitle').innerText = titleStr;
        document.getElementById('cnameEpisode').innerText       = `Episode ${epNum}`;
        document.getElementById('headerBookmarkBtn').style.display = 'block';

        try {
            const res = await fetch(`/api/episode?id=${epNum}`);
            if (res.status === 401) { window.location.href = 'neet_pg_login.html'; return false; }
            if (res.status === 403) { await triggerUpgrade(); window.location.href = 'neet_pg.html'; return false; }
            if (!res.ok)            { alert('⚠️ Failed to load questions.'); window.location.href = 'neet_pg.html'; return false; }

            const data          = await res.json();
            const decryptedText = decryptPayload(data.ciphertext, data.key);
            if (!decryptedText) { alert('⚠️ Decryption error.'); window.location.href = 'neet_pg.html'; return false; }

            const payload   = JSON.parse(decryptedText);
            questionBank    = payload.questions.map(q => ({ id: q.id, questionText: q.question, options: [q.opa, q.opb, q.opc, q.opd] }));

            // Fetch all previous attempts and bookmarks for resuming
            const attRes = await fetch('/api/qbank/attempts');
            const attData = await attRes.json();
            const attempts = attData.attempts || {};

            userAnswers = questionBank.map(q => {
                const att = attempts[q.id];
                return {
                    selected: att ? att.selected : null,
                    marked: false,
                    visited: att ? true : false,
                    isCorrect: att ? att.isCorrect : null,
                    cop: null,
                    exp: null,
                    hint_exp: null,
                    locked: false,
                    revealed: att && att.selected !== null,
                    bookmarked: att ? att.bookmarked : false
                };
            });
            return true;
        } catch (e) {
            console.error(e); alert('⚠️ Connection error.'); window.location.href = 'neet_pg.html'; return false;
        }
    }
}

// ──────────────────────────────────────────────────────
// Fullscreen
// ──────────────────────────────────────────────────────
function requestFullscreen() {
    // Fullscreen disabled as requested: "no full screen for neet_pg and all other things"
}

// ──────────────────────────────────────────────────────
// Start Exam
// ──────────────────────────────────────────────────────
async function initExam() {
    candidateName = prompt('Enter your name for the exam record:') || candidateName;
    document.getElementById('cname').innerText               = candidateName.toUpperCase();
    document.getElementById('headerCandidateName').textContent = candidateName;

    // Call requestFullscreen synchronously within user gesture stack to prevent browser block
    requestFullscreen();

    const success = await loadQuestions();
    if (!success) {
        if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
        return;
    }

    document.getElementById('startBtnContainer').style.display = 'none';
    document.getElementById('testContainer').style.display     = 'block';
    // Show mobile nav only on small screens (≤ 767px)
    if (window.innerWidth <= 767) {
        document.getElementById('mobileNav').style.display = 'flex';
    }

    examActive = true;

    // Check if resuming from where user left off
    let startIndex = 0;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('resume') === 'true') {
        const savedEp = localStorage.getItem('neet_pg_last_episode');
        const savedIdx = localStorage.getItem('neet_pg_last_index');
        const epNum = getEpisodeNumber();
        if (savedEp && parseInt(savedEp) === epNum && savedIdx) {
            startIndex = parseInt(savedIdx);
        }
    }

    renderQuestion(startIndex);
    renderPalette();
    // startTimer(); // Disabled for free mode
}

// ──────────────────────────────────────────────────────
// Timer
// ──────────────────────────────────────────────────────
function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        if (totalTime <= 0) { clearInterval(timerInterval); alert('⏰ Time is up!'); submitTest(); }
        else { totalTime--; updateTimerDisplay(); }
    }, 1000);
}
function updateTimerDisplay() {
    const m = Math.floor(totalTime / 60), s = totalTime % 60;
    document.getElementById('timer').innerText = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

// ──────────────────────────────────────────────────────
// ★ INSTANT ANSWER REVEAL — core feature
// ──────────────────────────────────────────────────────
async function revealAnswer(optIdx, items, epNum, q, idx) {
    // Disable all options immediately to prevent double-clicks
    items.forEach(el => el.style.pointerEvents = 'none');

    // Show loading spinner on selected option
    items[optIdx].classList.add('checking');

    // Call server for answer
    let result;
    try {
        const res = await fetch('/api/content/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ episodeId: epNum, questionId: q.id, selectedOption: optIdx })
        });
        result = await res.json();
    } catch {
        result = { isCorrect: false, cop: 1, exp: null, locked: true };
    }

    // Remove checking state
    items[optIdx].classList.remove('checking');

    // Save to userAnswers
    const ua = userAnswers[idx];
    ua.selected   = optIdx;
    ua.isCorrect  = result.isCorrect;
    ua.cop        = result.cop;
    ua.exp        = result.exp;
    ua.hint_exp   = result.hint_exp || null;
    ua.locked     = result.locked;
    ua.revealed   = true;

    // Color the options: green = correct, red = wrong selected, muted = others
    const correctIdx = parseInt(result.cop) - 1; // server cop is 1-indexed
    items.forEach((el, i) => {
        el.classList.remove('selected');
        if (i === correctIdx) {
            el.classList.add('reveal-correct');   // always highlight correct in green
        } else if (i === optIdx && !result.isCorrect) {
            el.classList.add('reveal-wrong');     // user's wrong choice in red
        } else {
            el.classList.add('reveal-other');     // other options muted
        }
    });

    // Show instant feedback panel
    const feedbackEl = document.getElementById('instantFeedback');
    const alphabet   = ['A','B','C','D'];
    const badgeHtml  = result.isCorrect
        ? `<span style="color:#10b981; font-weight:900;"><i class="bi bi-check-circle-fill"></i> CORRECT! +4 marks</span>`
        : `<span style="color:#ef4444; font-weight:900;"><i class="bi bi-x-circle-fill"></i> INCORRECT — −1 mark</span>`;

    const correctText = q.options[correctIdx] || '';
    const expHtml = result.locked
        ? `<div class="border border-2 border-dark p-3 bg-light text-center" style="box-shadow:4px 4px 0 #000;">
             <i class="bi bi-shield-lock-fill text-warning fs-4 d-block mb-1"></i>
             <strong class="font-monospace">EXPLANATION LOCKED</strong>
             <p class="text-secondary font-monospace mb-2 mt-1" style="font-size:0.8rem;">Upgrade to PG Elite to unlock explanations for every question.</p>
             <button class="btn btn-danger btn-sm" onclick="triggerUpgrade()">⭐ Upgrade to Pro</button>
           </div>`
        : `<div class="border border-dark p-3 bg-light font-monospace" style="box-shadow:4px 4px 0 #000; font-size:0.9rem; line-height:1.6;">${result.exp || 'No explanation available.'}</div>`;

    const hintHtml = result.hint_exp
        ? `<div style="margin-top:12px;">
              <button onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display==='none'?'block':'none'; this.innerHTML=this.innerHTML.includes('Show')?'&#x1F4A1; Hide Story Hint':'&#x1F4A1; Show Story Hint';"
                style="font-family:monospace;font-size:0.75rem;font-weight:800;text-transform:uppercase;letter-spacing:1px;padding:8px 16px;background:#fffbeb;color:#000;border:2px solid #f59e0b;box-shadow:3px 3px 0 #f59e0b;cursor:pointer;transition:all 0.1s;">
                &#x1F4A1; Show Story Hint
              </button>
              <div style="display:none;margin-top:10px;padding:16px;background:linear-gradient(135deg,#fffbeb,#fff9c4);border:2px solid #f59e0b;box-shadow:4px 4px 0 #f59e0b;font-family:monospace;font-size:0.85rem;line-height:1.7;color:#333;">
                ${result.hint_exp}
              </div>
           </div>`
        : '';

    feedbackEl.innerHTML = `
        <div class="border border-3 border-dark p-3 bg-white font-monospace mb-3"
             style="box-shadow:6px 6px 0 #000;">
            <div class="d-flex justify-content-between align-items-center mb-2">
                ${badgeHtml}
                <span class="text-secondary" style="font-size:0.8rem;">Q${idx+1} / ${questionBank.length}</span>
            </div>
            <div class="mb-2" style="font-size:0.9rem;">
                Correct Answer: <strong class="text-success">${alphabet[correctIdx]}. ${correctText}</strong>
            </div>
            <div class="mb-3 text-uppercase fw-bold" style="font-size:0.78rem; letter-spacing:1px; color:#555;">
                Explanation:
            </div>
            ${expHtml}
            ${hintHtml}
        </div>
    `;
    feedbackEl.style.display = 'block';

    updatePaletteNode(idx);
    updateStatusCounts();
}

// ──────────────────────────────────────────────────────
// Render Question
// ──────────────────────────────────────────────────────
function renderQuestion(index) {
    if (index < 0 || index >= questionBank.length) return;
    currentIndex = index;
    userAnswers[currentIndex].visited = true;

    // Save learning history for Udemy-style resume feature
    const epNum = getEpisodeNumber();
    localStorage.setItem('neet_pg_last_episode', epNum);
    localStorage.setItem('neet_pg_last_index', index);

    // Sync header bookmark button state
    const bookmarkBtn = document.getElementById('headerBookmarkBtn');
    if (bookmarkBtn) {
        const ua = userAnswers[currentIndex];
        const isBookmarked = !!ua.bookmarked;
        const icon = bookmarkBtn.querySelector('i');
        const text = bookmarkBtn.querySelector('span');

        if (isBookmarked) {
            icon.className = 'bi bi-star-fill text-warning';
            bookmarkBtn.classList.remove('btn-outline-dark');
            bookmarkBtn.classList.add('btn-dark');
        } else {
            icon.className = 'bi bi-star';
            bookmarkBtn.classList.remove('btn-dark');
            bookmarkBtn.classList.add('btn-outline-dark');
        }
    }

    document.getElementById('questionNumLabel').innerText = `Question ${currentIndex + 1} of ${questionBank.length}`;
    document.getElementById('questions').innerText        = questionBank[currentIndex].questionText;

    const q              = questionBank[currentIndex];
    const ua             = userAnswers[currentIndex];
    const alphabet       = ['A','B','C','D'];
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    const items = q.options.map((optText, optIdx) => {
        const item = document.createElement('div');
        item.className = 'option-item';

        // If already revealed, restore color state
        if (ua.revealed) {
            const correctIdx = parseInt(ua.cop) - 1;
            item.style.pointerEvents = 'none';
            if (optIdx === correctIdx)                   item.classList.add('reveal-correct');
            else if (optIdx === ua.selected && !ua.isCorrect) item.classList.add('reveal-wrong');
            else                                         item.classList.add('reveal-other');
        }

        item.innerHTML = `
            <div class="option-letter">${alphabet[optIdx]}</div>
            <div class="option-text">${optText}</div>
            <div class="option-check-icon" id="optIcon-${optIdx}"></div>
        `;
        optionsContainer.appendChild(item);
        return item;
    });

    // Attach click listeners if not yet revealed
    if (!ua.revealed) {
        items.forEach((item, optIdx) => {
            item.addEventListener('click', () => {
                // Mark selected immediately for visual feedback
                items.forEach(el => el.classList.remove('selected'));
                item.classList.add('selected');
                revealAnswer(optIdx, items, epNum, q, currentIndex);
            });
        });
    }

    // Restore or hide feedback panel
    const feedbackEl = document.getElementById('instantFeedback');
    if (ua.revealed) {
        if (ua.cop === null) {
            // Fetch explanation in the background
            feedbackEl.innerHTML = '<div class="font-monospace text-secondary p-3">Retrieving explanation...</div>';
            feedbackEl.style.display = 'block';
            fetch('/api/content/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ episodeId: epNum, questionId: q.id, selectedOption: ua.selected })
            })
            .then(res => res.json())
            .then(result => {
                ua.cop = result.cop;
                ua.exp = result.exp;
                ua.hint_exp = result.hint_exp;
                ua.locked = result.locked;
                // Re-render if the user is still on this question
                if (currentIndex === index) {
                    renderQuestion(currentIndex);
                }
            })
            .catch(err => {
                console.error(err);
                feedbackEl.innerHTML = '<div class="text-danger p-3">Connection error. Could not load explanation.</div>';
            });
            return;
        }

        // Rebuild feedback without async
        const correctIdx = parseInt(ua.cop) - 1;
        const correctText = q.options[correctIdx] || '';
        const badgeHtml = ua.isCorrect
            ? `<span style="color:#10b981; font-weight:900;"><i class="bi bi-check-circle-fill"></i> CORRECT! +4 marks</span>`
            : `<span style="color:#ef4444; font-weight:900;"><i class="bi bi-x-circle-fill"></i> INCORRECT — −1 mark</span>`;
        const expHtml = ua.locked
            ? `<div class="border border-2 border-dark p-3 bg-light text-center" style="box-shadow:4px 4px 0 #000;">
                 <i class="bi bi-shield-lock-fill text-warning fs-4 d-block mb-1"></i>
                 <strong class="font-monospace">EXPLANATION LOCKED</strong>
                 <p class="text-secondary font-monospace mb-2 mt-1" style="font-size:0.8rem;">Upgrade to PG Elite to unlock explanations.</p>
                 <button class="btn btn-danger btn-sm" onclick="triggerUpgrade()">⭐ Upgrade to Pro</button>
               </div>`
            : `<div class="border border-dark p-3 bg-light font-monospace" style="box-shadow:4px 4px 0 #000; font-size:0.9rem; line-height:1.6;">${ua.exp || 'No explanation available.'}</div>`;

        const hintHtml = ua.hint_exp
            ? `<div style="margin-top:12px;">
                  <button onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display==='none'?'block':'none'; this.innerHTML=this.innerHTML.includes('Show')?'&#x1F4A1; Hide Story Hint':'&#x1F4A1; Show Story Hint';"
                    style="font-family:monospace;font-size:0.75rem;font-weight:800;text-transform:uppercase;letter-spacing:1px;padding:8px 16px;background:#fffbeb;color:#000;border:2px solid #f59e0b;box-shadow:3px 3px 0 #f59e0b;cursor:pointer;transition:all 0.1s;">
                    &#x1F4A1; Show Story Hint
                  </button>
                  <div style="display:none;margin-top:10px;padding:16px;background:linear-gradient(135deg,#fffbeb,#fff9c4);border:2px solid #f59e0b;box-shadow:4px 4px 0 #f59e0b;font-family:monospace;font-size:0.85rem;line-height:1.7;color:#333;">
                    ${ua.hint_exp}
                  </div>
               </div>`
            : '';

        feedbackEl.innerHTML = `
            <div class="border border-3 border-dark p-3 bg-white font-monospace mb-3" style="box-shadow:6px 6px 0 #000;">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    ${badgeHtml}
                    <span class="text-secondary" style="font-size:0.8rem;">Q${currentIndex+1} / ${questionBank.length}</span>
                </div>
                <div class="mb-2" style="font-size:0.9rem;">Correct Answer: <strong class="text-success">${alphabet[correctIdx]}. ${correctText}</strong></div>
                <div class="mb-3 text-uppercase fw-bold" style="font-size:0.78rem; letter-spacing:1px; color:#555;">Explanation:</div>
                ${expHtml}
                ${hintHtml}
            </div>
        `;
        feedbackEl.style.display = 'block';
    } else {
        feedbackEl.style.display = 'none';
    }

    // Palette highlight
    document.querySelectorAll('.palette-btn').forEach((btn, i) => btn.classList.toggle('current', i === currentIndex));

    // Mark button sync
    const markBtn = document.getElementById('btnMarkReview');
    if (markBtn) markBtn.innerHTML = ua.marked
        ? '<i class="bi bi-bookmark-star-fill text-warning"></i> Marked'
        : '<i class="bi bi-bookmark-star"></i> Mark &amp; Next';
}

// ──────────────────────────────────────────────────────
// Palette
// ──────────────────────────────────────────────────────
function renderPalette() {
    ['palette','paletteMobile'].forEach(gridId => {
        const grid = document.getElementById(gridId);
        grid.innerHTML = '';
        const prefix = gridId === 'palette' ? 'paletteBtn' : 'paletteBtnM';
        questionBank.forEach((_, idx) => {
            const btn = document.createElement('button');
            btn.className = 'palette-btn';
            btn.innerText = idx + 1;
            btn.id        = `${prefix}-${idx}`;
            btn.addEventListener('click', () => {
                renderQuestion(idx);
                const modalEl = document.getElementById('paletteModal');
                if (modalEl && typeof bootstrap !== 'undefined') {
                    const modal = bootstrap.Modal.getInstance(modalEl);
                    if (modal) modal.hide();
                }
            });
            grid.appendChild(btn);
        });
    });
    updateStatusCounts();
}

function updatePaletteNode(idx) {
    ['paletteBtn','paletteBtnM'].forEach(prefix => {
        const btn = document.getElementById(`${prefix}-${idx}`);
        if (!btn) return;
        btn.className = 'palette-btn';
        const ua = userAnswers[idx];
        if (ua.marked)             btn.classList.add('marked');
        else if (ua.revealed && ua.isCorrect)  btn.classList.add('answered');
        else if (ua.revealed && !ua.isCorrect) btn.classList.add('not-answered');
        else if (ua.visited)       btn.classList.add('not-answered');
        if (idx === currentIndex)  btn.classList.add('current');
    });
}

function updateStatusCounts() {
    let answered = 0, incorrect = 0, notVisited = 0, marked = 0;
    userAnswers.forEach(a => {
        if (a.marked)             marked++;
        if (a.revealed && a.isCorrect)  answered++;
        else if (a.revealed && !a.isCorrect) incorrect++;
        else if (!a.visited)      notVisited++;
    });
    document.getElementById('status-answered').innerText     = answered;
    document.getElementById('status-not-answered').innerText = incorrect;
    document.getElementById('status-not-visited').innerText  = notVisited;
    document.getElementById('status-review').innerText       = marked;
}

// ──────────────────────────────────────────────────────
// Navigation
// ──────────────────────────────────────────────────────
function goNext() {
    updatePaletteNode(currentIndex);
    if (currentIndex < questionBank.length - 1) renderQuestion(currentIndex + 1);
}
function goPrev() {
    updatePaletteNode(currentIndex);
    if (currentIndex > 0) renderQuestion(currentIndex - 1);
}
function markForReview() {
    userAnswers[currentIndex].marked = !userAnswers[currentIndex].marked;
    updatePaletteNode(currentIndex);
    updateStatusCounts();
    const btn = document.getElementById('btnMarkReview');
    if (btn) btn.innerHTML = userAnswers[currentIndex].marked
        ? '<i class="bi bi-bookmark-star-fill text-warning"></i> Marked'
        : '<i class="bi bi-bookmark-star"></i> Mark &amp; Next';
    goNext();
}
function clearAnswer() {
    // Can't un-reveal in practice mode — move to next
    goNext();
}

document.getElementById('btnNextQuestion').addEventListener('click',  goNext);
document.getElementById('btnPrevQuestion').addEventListener('click',  goPrev);
document.getElementById('btnMarkReview').addEventListener('click',    markForReview);
document.getElementById('btnClearResponse').addEventListener('click', clearAnswer);
document.getElementById('btnNextMobile').addEventListener('click',    goNext);
document.getElementById('btnPrevMobile').addEventListener('click',    goPrev);
document.getElementById('btnMarkMobile').addEventListener('click',    markForReview);

const headerBookmarkBtn = document.getElementById('headerBookmarkBtn');
if (headerBookmarkBtn) {
    headerBookmarkBtn.addEventListener('click', async () => {
        const q = questionBank[currentIndex];
        const ua = userAnswers[currentIndex];
        if (!q) return;

        const newBookmarkState = !ua.bookmarked;
        
        // Optimistic UI update
        ua.bookmarked = newBookmarkState;
        
        const icon = headerBookmarkBtn.querySelector('i');
        if (newBookmarkState) {
            icon.className = 'bi bi-star-fill text-warning';
            headerBookmarkBtn.classList.remove('btn-outline-dark');
            headerBookmarkBtn.classList.add('btn-dark');
        } else {
            icon.className = 'bi bi-star';
            headerBookmarkBtn.classList.remove('btn-dark');
            headerBookmarkBtn.classList.add('btn-outline-dark');
        }

        try {
            await fetch('/api/content/bookmark', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ questionId: q.id, bookmarked: newBookmarkState })
            });
        } catch (e) {
            console.error("Failed to sync bookmark to server:", e);
        }
    });
}

// ──────────────────────────────────────────────────────
// Final Submit — tabulates pre-verified results
// ──────────────────────────────────────────────────────
async function submitTest() {
    examActive = false;
    clearInterval(timerInterval);
    if (document.exitFullscreen) document.exitFullscreen().catch(() => {});

    document.getElementById('testContainer').style.display  = 'none';
    document.getElementById('mobileNav').style.display      = 'none';
    document.getElementById('startBtnContainer').style.display = 'none';
    document.getElementById('resultContainer').style.display = 'block';

    const alphabet = ['A','B','C','D'];
    const epNum    = getEpisodeNumber();

    // For any question not yet revealed, fetch answer now
    const pendingFetches = userAnswers.map(async (ua, idx) => {
        if (ua.revealed) return; // already done
        try {
            const res  = await fetch('/api/content/verify', {
                method: 'POST', headers: {'Content-Type':'application/json'},
                body: JSON.stringify({ episodeId: epNum, questionId: questionBank[idx].id, selectedOption: ua.selected ?? -1 })
            });
            const data = await res.json();
            ua.isCorrect = data.isCorrect;
            ua.cop       = data.cop;
            ua.exp       = data.exp;
            ua.locked    = data.locked;
            ua.revealed  = true;
        } catch { ua.cop = 1; ua.isCorrect = false; ua.locked = true; }
    });
    await Promise.all(pendingFetches);

    let correct = 0, incorrect = 0, unattempted = 0;
    userAnswers.forEach(ua => {
        if (ua.selected === null)     unattempted++;
        else if (ua.isCorrect)        correct++;
        else                          incorrect++;
    });

    const totalScore = correct * 4 - incorrect;
    document.getElementById('resultScore').innerText      = totalScore;
    document.getElementById('statCorrect').innerText      = correct;
    document.getElementById('statIncorrect').innerText    = incorrect;
    document.getElementById('statUnattempted').innerText  = unattempted;

    // Fill neubrutalist performance bar chart
    const totalQs = questionBank.length || 50;
    const correctPct = Math.round((correct / totalQs) * 100);
    const incorrectPct = Math.round((incorrect / totalQs) * 100);
    const unattemptedPct = Math.max(0, 100 - correctPct - incorrectPct);

    document.getElementById('barCorrect').style.width = correctPct + '%';
    document.getElementById('barIncorrect').style.width = incorrectPct + '%';
    document.getElementById('barUnattempted').style.width = unattemptedPct + '%';

    document.getElementById('labelCorrectPct').innerText = correctPct + '%';
    document.getElementById('labelIncorrectPct').innerText = incorrectPct + '%';
    document.getElementById('labelUnattemptedPct').innerText = unattemptedPct + '%';

    let rating = 'Needs Improvement — Keep Going!';
    if (totalScore >= 160)      rating = 'Excellent! Outstanding Competency 🏆';
    else if (totalScore >= 120) rating = 'Very Good Practice! 🌟';
    else if (totalScore >= 80)  rating = 'Good Attempt, Keep Practicing! 👍';
    document.getElementById('resultPerformanceLabel').innerText = rating;
    document.getElementById('resultHeaderSub').innerText = `${candidateName} • Episode ${epNum}`;

    // Build explanation cards (Attempted questions only)
    const expContainer = document.getElementById('explanationsContainer');
    expContainer.innerHTML = '';
    let renderedCount = 0;

    userAnswers.forEach((ua, idx) => {
        if (ua.selected === null) return; // Skip unattempted questions!
        renderedCount++;
        const q          = questionBank[idx];
        const correctIdx = ua.cop ? parseInt(ua.cop) - 1 : 0;
        const badge      = ua.isCorrect
            ? `<span class="badge bg-success me-2">CORRECT (+4)</span>`
            : `<span class="badge bg-danger me-2">INCORRECT (−1)</span>`;

        const expHtml = ua.locked
            ? `<em class="text-muted font-monospace" style="font-size:0.85rem;">Upgrade to Pro to unlock explanation.</em>`
            : `<span class="font-monospace" style="font-size:0.9rem;">${ua.exp || '—'}</span>`;

        const card = document.createElement('div');
        card.className = 'explanation-card';
        card.innerHTML = `
            <div class="d-flex justify-content-between align-items-start mb-2">
                <strong class="font-monospace">Q${idx+1}</strong>${badge}
            </div>
            <p class="fw-bold mb-2" style="line-height:1.5; font-size:0.95rem;">${q.questionText}</p>
            <p class="font-monospace mb-1" style="font-size:0.88rem;">
                ✅ Correct: <strong class="text-success">${alphabet[correctIdx]}. ${q.options[correctIdx]}</strong>
            </p>
            <p class="font-monospace mb-2" style="font-size:0.88rem;">
                Your Answer: <strong>${alphabet[ua.selected]}. ${q.options[ua.selected]}</strong>
            </p>
            <div class="border-top border-dark pt-2 mt-1">${expHtml}</div>
        `;
        expContainer.appendChild(card);
    });

    if (renderedCount === 0) {
        expContainer.innerHTML = `
            <div class="p-4 bg-white border border-dark text-center font-monospace" style="box-shadow: 4px 4px 0 #000;">
              <strong>No questions were attempted during this exam session.</strong>
              <p class="text-secondary small mb-0 mt-1">Explanations only display for questions you selected answers for.</p>
            </div>
        `;
    }
}

document.getElementById('btnSubmitExam').addEventListener('click',   () => { if (confirm('Submit exam now?')) submitTest(); });
document.getElementById('btnSubmitMobile').addEventListener('click', () => { if (confirm('Submit exam now?')) submitTest(); });
document.getElementById('btnLaunchExam').addEventListener('click',   initExam);

// ──────────────────────────────────────────────────────
// Anti-Cheat
// ──────────────────────────────────────────────────────
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('copy',        e => e.preventDefault());
document.addEventListener('cut',         e => e.preventDefault());
document.addEventListener('keydown', e => {
    if (e.ctrlKey || e.key === 'PrintScreen' || e.key === 'F12') {
        e.preventDefault(); alert('⚠️ Restricted inside the examination arena.');
    }
});
document.addEventListener('visibilitychange', () => {
    if (!examActive) return;
    if (document.hidden) {
        tabSwitchCount++;
        document.body.style.filter = 'blur(15px)';
        if (tabSwitchCount >= 2) { alert('🚨 Auto-submitting due to tab switching.'); submitTest(); }
        else alert('⚠️ Tab switching is prohibited!');
    } else { document.body.style.filter = 'none'; }
});
document.addEventListener('fullscreenchange', () => {
    // Disabled as requested: "no full screen for neet_pg and all other things"
});

// Show motivation modal on page load
window.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('exam_motivation_modal_shown')) {
        setTimeout(() => {
            const modalEl = document.getElementById('examMotivationModal');
            if (modalEl) {
                const bsModal = new bootstrap.Modal(modalEl);
                bsModal.show();
                localStorage.setItem('exam_motivation_modal_shown', 'true');
            }
        }, 1000);
    }
});
