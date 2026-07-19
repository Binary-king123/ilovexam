// STEP CARD CONTENTS PRELOADED
const stepHTML = [
  `
  <p>Welcome to the mock test platform. Scroll to explore the steps.</p>
  <div class="card card-glassy p-4" style="height: 400px;">
    <div class="card-body d-flex justify-content-center align-items-center h-100">
      <button class="btn btn-primary px-4 bi bi-cursor-fill bounce-cursor">CLICK DISCOVER</button>
    </div>
  </div>
  <h2 class="fw-bold text-center m-4">Step 1</h2>
  `,
  `
  <p>Select your exam:</p>
  <div class="row text-center">
    <div class="col-6 mb-3"><div class="card bg-light p-3"><span class="badge bg-primary mb-2">NEET</span><i class="bi bi-heart-pulse fs-2"></i></div></div>
    <div class="col-6 mb-3"><div class="card bg-light p-3"><span class="badge bg-success mb-2">JEE</span><i class="bi bi-lightning-charge fs-2"></i></div></div>
    <div class="col-6"><div class="card bg-light p-3"><span class="badge bg-warning text-dark mb-2">CUET</span><i class="bi bi-book fs-2"></i></div></div>
    <div class="col-6"><div class="card bg-light p-3"><span class="badge bg-info text-dark mb-2">SAT</span><i class="bi bi-globe fs-2"></i></div></div>
  </div>
  <h2 class="fw-bold text-center m-4">Step 2</h2>
  `,
  `
  <div class="card card-glassy p-4" style="height: 400px;">
    <div class="card-body">
      <div class="card bg-light-subtle p-3 h-100">
        <div class="card-header d-flex align-items-center gap-2">
          <span class="badge text-black fs-6">Choose chapter / section</span>
          <i class="bi bi-sign-dead-end ms-auto fs-4"></i>
        </div>
        <div class="card-body">
          <div class="placeholder-glow d-flex flex-column gap-2">
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-cursor-fill bounce-cursor fs-5 text-primary"></i>
              <span class="placeholder col-6"></span>
            </div>
            <span class="placeholder col-8"></span>
            <span class="placeholder col-12"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <h2 class="fw-bold text-center m-4">Step 3</h2>
  `,
  `
  <div class="card card-glassy p-4" style="height: 400px;">
    <div class="card-body">
      <div class="text-center mb-3">
        <button class="btn btn-success position-relative">START TEST</button>
      </div>
      <div class="card p-3">
        <div class="d-flex justify-content-between mb-2">
          <strong>MOCK TEST 1</strong>
          <span class="badge bg-dark">20:00</span>
        </div>
        <div class="mb-2">Do you LOVE exams?</div>
        <ul class="list-unstyled">
          <li class="card p-2 mb-1">YES</li>
          <li class="card p-2">NO</li>
        </ul>
      </div>
    </div>
  </div>
  <h2 class="fw-bold text-center m-4">Step 4</h2>
  `,
  `
  <div class="card card-glassy p-4" style="height: 400px;">
    <div class="card-body d-flex justify-content-center align-items-center h-100">
      <button class="btn btn-primary px-4 bi bi-cursor-fill bounce-cursor">CLICK SUBMIT</button>
    </div>
  </div>
  <h2 class="fw-bold text-center m-4">Step 5</h2>
  `
];

// Function to update card content
function updateStepCardContent(step) {
  const card = document.getElementById("stepCardContent");
  if (!card) return;
  card.innerHTML = stepHTML[step - 1] || `<p>Unknown Step</p>`;
}

// Intersection Observer for scroll steps
const steps = document.querySelectorAll(".scroll-step");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const stepNum = parseInt(entry.target.id.replace("step", ""));
      updateStepCardContent(stepNum);
    }
  });
}, { threshold: 0.5 });

steps.forEach(step => observer.observe(step));

// Multilingual Text Switcher
const languageElement = document.getElementById("language");
const languages = [
  "I love exams","मुझे परीक्षाएँ पसंद हैं","எனக்கு தேர்வுகள் பிடிக்கும்",
  "నాకు పరీక్షలు ఇష్టం","എനിക്ക് പരീക്ഷകൾ ഇഷ്ടമാണ്","ನನಗೆ ಪರೀಕ್ಷೆಗಳು ಇಷ್ಟವಿದೆ",
  "আমি পরীক্ষা ভালোবাসি","મને પરીક્ષાઓ ગમે છે","मला परीक्षा आवडतात",
  "مجھے امتحانات پسند ہیں","J'aime les examens","Me encantan los exámenes",
  "Ich liebe Prüfungen","أنا أحب الامتحانات","私は試験が大好きです"
];

let langIndex = 0;
function switchText() {
  languageElement.textContent = languages[langIndex];
  langIndex = (langIndex + 1) % languages.length;
}
switchText();
setInterval(switchText, 2000); // Reduced frequency

// Disable copy/cut/paste
["copy","cut","paste"].forEach(evt => 
  document.addEventListener(evt, e => e.preventDefault())
);
