 const lessons = {
 lesson1: {
    title: "Algebra Basics",
    summary: "Introduces variables, expressions, equations, and core algebraic operations essential for SAT math.",
    formulas: [
      { label: "Linear Equation", formula: "y = mx + b", unit: "" },
      { label: "Slope Formula", formula: "m = (y2 - y1)/(x2 - x1)", unit: "" }
    ],
    key_points: [
      "Understand how to manipulate algebraic expressions.",
      "Learn to isolate variables and solve equations.",
      "Foundation for all higher-level math topics."
    ],
    note: "Mastering algebra is crucial for success in SAT math sections."
  },
  lesson2: {
    title: "Problem Solving & Data Analysis",
    summary: "Covers statistics, ratios, percentages, and interpreting data from charts and graphs.",
    formulas: [
      { label: "Mean", formula: "Mean = Sum of values / Number of values", unit: "" },
      { label: "Percentage", formula: "(Part / Whole) × 100", unit: "%" }
    ],
    key_points: [
      "Interpret tables, graphs, and charts accurately.",
      "Apply statistical concepts like mean, median, and mode.",
      "Use ratios and percentages in context."
    ],
    note: "Critical for data interpretation questions that frequently appear in the SAT."
  },
  lesson3: {
    title: "Advanced Math Foundations",
    summary: "Introduces functions, inverse functions, and solving non-linear equations.",
    formulas: [
      { label: "Quadratic Formula", formula: "x = (-b ± √(b²-4ac)) / 2a", unit: "" },
      { label: "Function Notation", formula: "f(x) = expression", unit: "" }
    ],
    key_points: [
      "Understand domain and range.",
      "Solve quadratic and higher-degree equations.",
      "Work with function transformations."
    ],
    note: "Lays the groundwork for harder algebra problems in SAT."
  },
  lesson4: {
    title: "Basic Geometry & Trigonometry",
    summary: "Includes geometric shapes, perimeter, area, volume, and intro to trigonometric ratios.",
    formulas: [
      { label: "Area of Triangle", formula: "(1/2) × base × height", unit: "sq. units" },
      { label: "SOH-CAH-TOA", formula: "sin = opp/hyp, cos = adj/hyp, tan = opp/adj", unit: "" }
    ],
    key_points: [
      "Apply geometric formulas to find areas and volumes.",
      "Understand angle relationships and basic trigonometry.",
      "Utilize coordinate geometry."
    ],
    note: "Geometry and trigonometry make up a substantial portion of SAT math."
  },
  // ... previous lessons ...

  lesson5: {
    title: "Linear & Quadratic Equations",
    summary: "Focuses on solving linear systems, graphing equations, and understanding quadratic behavior.",
    formulas: [
      { label: "Slope-Intercept Form", formula: "y = mx + b", unit: "" },
      { label: "Quadratic Formula", formula: "x = [-b ± √(b²-4ac)] / 2a", unit: "" }
    ],
    key_points: [
      "Recognize the structure of linear and quadratic equations.",
      "Graph and interpret solutions of equations.",
      "Apply the discriminant to understand solution types."
    ],
    note: "Essential for algebra mastery and commonly tested in both calculator and no-calculator sections."
  },

  lesson6: {
    title: "Ratios, Proportions & Percentages",
    summary: "Builds skills in comparing quantities and solving real-life math problems using proportions.",
    formulas: [
      { label: "Percentage", formula: "(Part / Whole) × 100", unit: "%" },
      { label: "Ratio to Fraction", formula: "a:b = a / (a + b)", unit: "" }
    ],
    key_points: [
      "Convert between ratios, fractions, and percentages.",
      "Set up and solve proportions in context.",
      "Solve multi-step percentage increase/decrease problems."
    ],
    note: "Real-world application is emphasized, particularly in data-based problem solving."
  },

  lesson7: {
    title: "Function Notation & Graphs",
    summary: "Introduces function representation, interpretation of graphs, and basic transformations.",
    formulas: [
      { label: "Function Notation", formula: "f(x) = expression in x", unit: "" },
      { label: "Vertical Shift", formula: "f(x) + k", unit: "Shifts graph up/down" }
    ],
    key_points: [
      "Understand inputs/outputs of a function.",
      "Interpret domain, range, and key features of graphs.",
      "Recognize transformations of parent functions."
    ],
    note: "Frequently tested for understanding real-world models and trends."
  },

  lesson8: {
    title: "Geometry: Angles, Triangles, Circles",
    summary: "Explores geometric principles involving lines, angles, triangle properties, and circle theorems.",
    formulas: [
      { label: "Sum of Interior Angles (Polygon)", formula: "(n - 2) × 180°", unit: "degrees" },
      { label: "Circle Circumference", formula: "C = 2πr", unit: "" }
    ],
    key_points: [
      "Classify and analyze triangle and angle relationships.",
      "Apply theorems involving circles and arcs.",
      "Use Pythagoras and triangle properties in problems."
    ],
    note: "Geometry appears heavily in medium-difficulty problem sets with diagrams."
  },

  lesson9: {
    title: "Polynomials and Rational Expressions",
    summary: "Covers operations on polynomials, factoring, and simplification of rational expressions.",
    formulas: [
      { label: "Factoring Quadratics", formula: "ax² + bx + c = (px + q)(rx + s)", unit: "" },
      { label: "Simplifying Rational", formula: "(a² - b²)/(a - b) = a + b", unit: "" }
    ],
    key_points: [
      "Add, subtract, and multiply polynomial expressions.",
      "Factor using identities and methods (AC method, grouping).",
      "Simplify complex fractions and rational expressions."
    ],
    note: "Mastery helps with algebraic manipulation under time constraints."
  },

  lesson10: {
    title: "Exponential & Radical Equations",
    summary: "Explores growth and decay models, as well as solving square root and radical equations.",
    formulas: [
      { label: "Exponential Growth", formula: "A = A₀ × (1 + r)^t", unit: "" },
      { label: "Radical Equation", formula: "√x = a ⇒ x = a²", unit: "" }
    ],
    key_points: [
      "Apply exponential formulas to model situations.",
      "Solve equations involving square roots and nth roots.",
      "Understand laws of exponents and radicals."
    ],
    note: "Common in both real-world modeling and symbolic manipulation problems."
  },

  lesson11: {
    title: "Advanced Statistics & Probability",
    summary: "Covers standard deviation, data distribution, and in-depth probability logic.",
    formulas: [
      { label: "Mean", formula: "μ = Σx / n", unit: "" },
      { label: "Standard Deviation", formula: "σ = √[Σ(x - μ)² / n]", unit: "" }
    ],
    key_points: [
      "Interpret histograms, box plots, and scatterplots.",
      "Compare data sets using center and spread.",
      "Apply probability rules and counting principles."
    ],
    note: "Heavy emphasis on interpreting and critiquing statistics in context."
  },

  lesson12: {
    title: "Trigonometric Functions",
    summary: "Extends basic trigonometry to unit circle, graphs of sine/cosine, and inverse trig functions.",
    formulas: [
      { label: "Unit Circle Coordinates", formula: "(cos θ, sin θ)", unit: "" },
      { label: "Trig Identity", formula: "sin²θ + cos²θ = 1", unit: "" }
    ],
    key_points: [
      "Graph trigonometric functions and understand amplitude/period.",
      "Use inverse trig to solve for angles.",
      "Connect trig with circular motion and geometry."
    ],
    note: "Common in advanced-level problem solving and modeling tasks."
  },

  lesson13: {
    title: "Information and Ideas – Foundations",
    summary: "Focuses on reading comprehension, identifying central ideas, and locating textual evidence.",
    formulas: [],
    key_points: [
      "Determine explicit and implicit ideas.",
      "Use evidence to support interpretations.",
      "Summarize text structure and main purpose."
    ],
    note: "Core to SAT Reading; appears in all passage types."
  },

  lesson14: {
    title: "Craft and Structure – Foundations",
    summary: "Introduces vocabulary in context, tone, and author's point of view.",
    formulas: [],
    key_points: [
      "Analyze how word choice affects meaning.",
      "Interpret tone and perspective.",
      "Understand structure of arguments and narratives."
    ],
    note: "Builds foundation for deeper textual analysis questions."
  },

  lesson15: {
    title: "Expression of Ideas + Standard English – Foundations",
    summary: "Covers clarity, conciseness, transitions, and grammar fundamentals.",
    formulas: [],
    key_points: [
      "Revise sentences for clarity and logic.",
      "Apply grammar rules: subject-verb agreement, punctuation, modifiers.",
      "Strengthen sentence structure and transitions."
    ],
    note: "Blends rhetorical and grammatical improvement — key to high scores."
  },

  lesson16: {
    title: "Information and Ideas – Medium",
    summary: "Focuses on evidence-based inference, summarizing arguments, and textual relationships.",
    formulas: [],
    key_points: [
      "Identify supporting evidence for a claim.",
      "Analyze cause-effect and comparison relationships.",
      "Evaluate reasoning and logic in passages."
    ],
    note: "Medium-level questions test nuance in comprehension and logic."
  },

  lesson17: {
    title: "Craft and Structure – Medium",
    summary: "Enhances understanding of rhetorical strategies and author's use of language.",
    formulas: [],
    key_points: [
      "Interpret metaphor, analogy, and rhetorical devices.",
      "Assess effectiveness of textual elements.",
      "Determine shifts in tone or point of view."
    ],
    note: "Requires close reading and attention to structure and intent."
  },

  lesson18: {
    title: "Expression of Ideas + Standard English – Medium",
    summary: "Tests parallel structure, logical transitions, and punctuation with complex sentences.",
    formulas: [],
    key_points: [
      "Edit for clarity and style in longer passages.",
      "Apply semicolon, colon, and dash usage correctly.",
      "Ensure consistency in verb tense and pronoun reference."
    ],
    note: "Grammar questions become less direct and more contextual at this level."
  },

  lesson19: {
    title: "Information and Ideas – Advanced",
    summary: "Demands synthesis of information, analysis of complex arguments, and drawing subtle conclusions.",
    formulas: [],
    key_points: [
      "Compare perspectives across texts.",
      "Draw inferences with minimal guidance.",
      "Critically evaluate arguments and assumptions."
    ],
    note: "Advanced reading sections test maturity of interpretation and critique."
  },

  lesson20: {
    title: "Craft and Structure – Advanced",
    summary: "Tests how rhetorical devices shape deeper meaning, persuasive techniques, and irony.",
    formulas: [],
    key_points: [
      "Interpret subtext and rhetorical strategies.",
      "Evaluate the effectiveness of arguments and evidence.",
      "Understand irony, satire, and sophisticated tone."
    ],
    note: "Targets students aiming for near-perfect verbal scores."
  },

  lesson21: {
    title: "Expression of Ideas + Standard English – Advanced",
    summary: "Advanced grammar, stylistic nuance, and coherence in complex argumentation.",
    formulas: [],
    key_points: [
      "Edit with precision for tone, purpose, and audience.",
      "Handle embedded clauses, ellipses, and advanced structures.",
      "Maintain rhetorical consistency throughout paragraphs."
    ],
    note: "Mastery here significantly boosts performance in Writing & Language."
  }






  };

  const listItems = document.querySelectorAll(".list-group-item");
  const contentArea = document.querySelector(".content-area");
  const lessonList = document.querySelector(".lesson-list");
  const lessonContent = document.querySelector(".lesson-content");
  const backBtn = document.querySelector(".back-btn");

  listItems.forEach(item => {
    item.addEventListener("click", () => {
      const id = item.dataset.id;
      const lesson = lessons[id];

      // Skeleton loader
      contentArea.innerHTML = `
        <div class="placeholder-glow">
          <h4 class="placeholder col-6"></h4>
          <p class="placeholder col-8"></p>
          <p class="placeholder col-5"></p>
          <p class="placeholder col-7"></p>
        </div>
      `;

      setTimeout(() => {
        if (!lesson) {
          contentArea.innerHTML = `<h4>Coming Soon</h4><p class="text-muted">This chapter is not yet added to our library.</p>`;
          return;
        }

        const formulasHTML = lesson.formulas.map(f => 
          `<li><strong>${f.label}</strong>: ${f.formula} <span class="text-muted">(${f.unit})</span></li>`
        ).join("");
        const keyPointsHTML = lesson.key_points.map(p => `<li>${p}</li>`).join("");

        contentArea.innerHTML = `
          <h3 class="fw-bold text-primary">${lesson.title}</h3>
          <p>${lesson.summary}</p>
          <div class="mt-3">
            <h6>🔢 Key Formulas:</h6><ul>${formulasHTML}</ul>
            <h6>📌 Key Points:</h6><ul>${keyPointsHTML}</ul>
          </div>
          <p class="text-success fw-semibold mt-3">${lesson.note}</p>
          <a href="sat_ui.html?id=${id}" class="btn start-btn text-white mt-3"><i class="bi bi-play-circle-fill"></i> Start Test</a>
        `;
      }, 80);

      if (window.innerWidth < 768) {
        lessonList.classList.add("hide");
        lessonContent.classList.add("active");
      }
    });
  });

  backBtn.addEventListener("click", () => {
    lessonList.classList.remove("hide");
    lessonContent.classList.remove("active");
  });