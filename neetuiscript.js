let questionBank = [];
let currentIndex = 0;
let userAnswers = [];
let timerInterval;
let totalTime = 20 * 60; // 20 min
let username = "Candidate";
let fullscreenExitCount = 0;
let tabSwitchCount = 0;

// ================== Anti-Cheat ==================
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('copy', e => e.preventDefault());
document.addEventListener('cut', e => e.preventDefault());
document.addEventListener('paste', e => e.preventDefault());
document.addEventListener('selectstart', e => e.preventDefault());

document.addEventListener('keydown', e => {
    // Block shortcuts
    if (e.ctrlKey || e.key === 'PrintScreen' || e.key === 'F12') {
        e.preventDefault();
        alert("Keyboard shortcuts are disabled!");
    }
});

// Detect tab switch / window blur
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        tabSwitchCount++;
        document.body.style.filter = "blur(15px)";
        if (tabSwitchCount >= 2) {
            alert("You switched tabs multiple times! Test will auto-submit.");
            submitTest();
        }
    } else {
        document.body.style.filter = "none";
    }
});

// Force fullscreen
function enableFullscreen() {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
}

document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
        fullscreenExitCount++;
        if (fullscreenExitCount >= 2) {
            alert("You exited fullscreen twice! Auto-submitting test.");
            submitTest();
        }
    }
});

// ================== Exam Start ==================
function startExam() {
    username = prompt("Enter your name to start test:") || "Candidate";
    document.getElementById("cname").innerText = username;

    document.getElementById("startBtnContainer").style.display = "none";
    document.getElementById("testContainer").style.display = "block";
    document.querySelector(".mobile-fixed-nav").style.display = "flex";

    enableFullscreen();
    loadQuestions();
}

// ================== Load Questions ==================
function loadQuestions() {
    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get("id") || "lesson1";

    fetch(`questions/${lessonId}.json`)
        .then(res => res.json())
        .then(data => {
            questionBank = data.test.map(q => {
                // Shuffle options to prevent cheating
                const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
                const correctIndex = shuffledOptions.indexOf(q.options[q.correct]);
                return { ...q, options: shuffledOptions, correct: correctIndex };
            });

            userAnswers = questionBank.map(() => ({ selected: null, marked: false, visited: false }));

            renderPalette();
            renderQuestion();
            startTimer();
        })
        .catch(err => alert("⚠️ Unable to load questions."));
}

// ================== Timer ==================
function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        totalTime--;
        updateTimerDisplay();

        if (totalTime === 300) { // 5-min warning
            document.getElementById("timer").classList.add("text-danger");
            alert("⚠️ Only 5 minutes left!");
        }
        if (totalTime <= 0) {
            clearInterval(timerInterval);
            submitTest();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const mins = Math.floor(totalTime/60).toString().padStart(2,'0');
    const secs = (totalTime%60).toString().padStart(2,'0');
    document.getElementById("timer").innerText = `${mins}:${secs}`;
}

// ================== Palette Rendering ==================
function renderPalette() {
    const palette = document.getElementById("palette");
    const paletteMobile = document.getElementById("paletteMobile");
    palette.innerHTML = "";
    paletteMobile.innerHTML = "";

    questionBank.forEach((_, i) => {
        const btnDesktop = createPaletteButton(i);
        const btnMobile = createPaletteButton(i);
        palette.appendChild(btnDesktop);
        paletteMobile.appendChild(btnMobile);
    });
    updatePalette();
}

function createPaletteButton(i) {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-secondary palette-button";
    btn.innerText = i+1;
    btn.id = `qbtn${i}`;
    btn.onclick = () => { currentIndex = i; renderQuestion(); };
    return btn;
}

function updatePalette() {
    let answered = 0, notAnswered = 0, review = 0, notVisited = 0;

    userAnswers.forEach((ans, i) => {
        // Update all palette buttons for this question
        document.querySelectorAll(`#qbtn${i}`).forEach(btn => {
            btn.className = "btn palette-button";
            if (!ans.visited) btn.classList.add("status-not-visited");
            else if (ans.marked) btn.classList.add("status-review");
            else if (ans.selected != null) btn.classList.add("status-answered");
            else btn.classList.add("status-not-answered");
        });

        // Count status **once per question**
        if (!ans.visited) notVisited++;
        else if (ans.marked) review++;
        else if (ans.selected != null) answered++;
        else notAnswered++;
    });

    document.getElementById("status-answered").innerText = answered;
    document.getElementById("status-not-answered").innerText = notAnswered;
    document.getElementById("status-not-visited").innerText = notVisited;
    document.getElementById("status-review").innerText = review;
}


// ================== Render Question ==================
function renderQuestion() {
    userAnswers[currentIndex].visited = true;
    const q=questionBank[currentIndex];
    document.getElementById("questions").innerText=`Q${currentIndex+1}: ${q.question}`;
    document.getElementById("options").innerHTML = q.options.map((opt,i)=>`
        <div class="option-btn ${userAnswers[currentIndex].selected===i?'option-selected':''}"
             onclick="selectOption(${i})">${opt}</div>
    `).join("");
    updatePalette();

    // Enable/Disable nav buttons
    document.querySelectorAll(".btn-prev").forEach(btn => btn.disabled = currentIndex===0);
    document.querySelectorAll(".btn-next").forEach(btn => btn.disabled = currentIndex===questionBank.length-1);
}

function selectOption(i){
    userAnswers[currentIndex].selected=i;
    userAnswers[currentIndex].marked=false;
    renderQuestion();
}

// ================== Navigation ==================
function nextQuestion(){if(currentIndex<questionBank.length-1)currentIndex++;renderQuestion();}
function prevQuestion(){if(currentIndex>0)currentIndex--;renderQuestion();}
function clearAnswer(){userAnswers[currentIndex].selected=null;renderQuestion();}
function markForReview(){userAnswers[currentIndex].marked=true;nextQuestion();}

// ================== Submit Test ==================
function submitTest(){
    clearInterval(timerInterval);
    document.getElementById("testContainer").style.display="none";
    document.querySelector(".mobile-fixed-nav").style.display="none";

    const attempted=userAnswers.filter(a=>a.selected!=null).length;
    const correct=userAnswers.filter((a,i)=>a.selected===questionBank[i].correct).length;
    const wrong=attempted-correct;
    const accuracy=attempted?((correct/attempted)*100).toFixed(2):0; 
    const speed=(attempted/(20-(totalTime/60))).toFixed(2);

    let resultHTML=`
      <div class="card p-4 shadow text-center mb-4">
        <h2 class="text-success">Test Completed</h2>
        <h4 class="mt-2">Score: ${correct}/${questionBank.length} (${((correct/questionBank.length)*100).toFixed(2)}%)</h4>
        <p>Attempted: ${attempted} | Correct: ${correct} | Wrong: ${wrong}</p>
        <p>Accuracy: ${accuracy}% | Speed: ${speed} Q/min</p>
      </div>
      <h5>Attempted Questions:</h5>
    `;

    userAnswers.forEach((ans,i)=>{
        if(ans.selected!=null){
            const q=questionBank[i];
            resultHTML+=`
              <div class='card mb-2 p-2 ${ans.selected===q.correct?"border-success":"border-danger"}'>
                <strong>Q${i+1}:</strong> ${q.question}<br>
                Your Answer: ${q.options[ans.selected]}<br>
                Correct Answer: ${q.options[q.correct]}
              </div>`;
        }
    });

    const container=document.getElementById("resultContainer");
    container.innerHTML=resultHTML;
    container.style.display="block";
}
