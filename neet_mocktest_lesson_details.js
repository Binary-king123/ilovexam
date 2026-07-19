 const lessons = {
     lesson1
    : {
      title: "Mechanical Properties of Solids",
      summary: "Covers stress, strain, elastic modulus, Hooke's Law, and applications of elastic behavior.",

      formulas: [
        {
          label: "Stress",
          formula: "Stress = Force / Area",
          unit: "N/m² (Pascal)"
        },
        {
          label: "Strain",
          formula: "Strain = Change in Length / Original Length",
          unit: "Dimensionless"
        },
        {
          label: "Hooke’s Law",
          formula: "Stress ∝ Strain → Stress = Y × Strain",
          unit: "Y = Young’s modulus"
        },
        {
          label: "Elastic Potential Energy",
          formula: "U = (1/2) × Stress × Strain × Volume",
          unit: "Joules"
        }
      ],

      key_points: [
        "Stress is the force applied per unit area.",
        "Strain is the fractional change in shape or size.",
        "Elastic limit is the maximum stretch without permanent deformation.",
        "Young’s modulus is a measure of stiffness.",
        "Energy is stored in the material when deformed elastically."
      ],

      note: "These formulas are vital for solving numerical questions in competitive exams like JEE & NEET."
    },

    lesson2: {
    title: "Motion in a Straight Line",
    summary: "Explores the concepts of displacement, velocity, acceleration, kinematic equations, and motion under gravity. Includes graphical analysis and real-world examples such as free fall and reaction time.",
    
    formulas: [
      {
        label: "Average Velocity",
        formula: "v_avg = Δx / Δt",
        unit: "m/s"
      },
      {
        label: "Instantaneous Velocity",
        formula: "v = dx/dt",
        unit: "m/s"
      },
      {
        label: "Average Acceleration",
        formula: "a_avg = Δv / Δt",
        unit: "m/s²"
      },
      {
        label: "Instantaneous Acceleration",
        formula: "a = dv/dt",
        unit: "m/s²"
      },
      {
        label: "First Equation of Motion",
        formula: "v = v₀ + at",
        unit: "m/s"
      },
      {
        label: "Second Equation of Motion",
        formula: "x = v₀t + (1/2)at²",
        unit: "m"
      },
      {
        label: "Third Equation of Motion",
        formula: "v² = v₀² + 2a(x - x₀)",
        unit: "m²/s²"
      },
      {
        label: "Stopping Distance",
        formula: "d_s = v₀² / (2a)",
        unit: "m"
      },
      {
        label: "Free Fall Displacement",
        formula: "y = - (1/2)gt²",
        unit: "m"
      }
    ],

    key_points: [
      "Motion is described as change in position over time.",
      "Velocity is the rate of change of displacement, and acceleration is the rate of change of velocity.",
      "Graphs (x-t, v-t, a-t) provide visual understanding of motion.",
      "Kinematic equations apply to motion with constant acceleration.",
      "Free fall is uniformly accelerated motion under gravity (g = 9.8 m/s²).",
      "Displacement is the area under velocity-time graph.",
      "Stopping distance increases with square of initial speed.",
      "Galileo’s law of odd numbers describes distance in equal time intervals for free fall."
    ],

    note: "Mastering these fundamentals is crucial for physics problems in JEE, NEET, and board exams."
  },
  lesson3: {
  title: "Motion in a Plane",
  summary: "Introduces vector treatment of motion in two dimensions including projectile and circular motion. Covers vector operations, position, velocity, and acceleration in a plane.",

  formulas: [
    {
      label: "Displacement Vector",
      formula: "∆r = r′ − r = ∆x î + ∆y ĵ",
      unit: "m"
    },
    {
      label: "Velocity Vector",
      formula: "v = dx/dt î + dy/dt ĵ",
      unit: "m/s"
    },
    {
      label: "Acceleration Vector",
      formula: "a = dvx/dt î + dvy/dt ĵ",
      unit: "m/s²"
    },
    {
      label: "Projectile Equation",
      formula: "y = x tanθ − (g x²) / (2 v₀² cos²θ)",
      unit: "m"
    },
    {
      label: "Centripetal Acceleration",
      formula: "a = v² / R = ω²R",
      unit: "m/s²"
    }
  ],

  key_points: [
    "Vector representation is used for 2D motion.",
    "Displacement, velocity, and acceleration are vector quantities.",
    "Projectile motion has a parabolic trajectory.",
    "Circular motion involves centripetal acceleration directed toward the center.",
    "Components of motion along x and y are treated independently."
  ],

  note: "Essential for NEET/JEE as it combines both conceptual understanding and vector-based calculations."
},lesson4: {
  title: "Laws of Motion",
  summary: "Covers Newton's laws, types of forces, friction, circular motion, and momentum conservation. Essential for understanding mechanics foundations.",

  formulas: [
    {
      label: "Newton's Second Law",
      formula: "F = ma",
      unit: "N (kg·m/s²)"
    },
    {
      label: "Momentum",
      formula: "p = mv",
      unit: "kg·m/s"
    },
    {
      label: "Impulse",
      formula: "Impulse = F × Δt = Δp",
      unit: "N·s"
    },
    {
      label: "Friction (Static)",
      formula: "fₛ ≤ μₛN",
      unit: "N"
    },
    {
      label: "Friction (Kinetic)",
      formula: "fₖ = μₖN",
      unit: "N"
    },
    {
      label: "Centripetal Force",
      formula: "F = mv² / R",
      unit: "N"
    }
  ],

  key_points: [
    "Newton’s First Law defines inertia and equilibrium conditions.",
    "Second Law relates force with acceleration (F = ma).",
    "Third Law: forces always occur in equal and opposite pairs.",
    "Impulse changes momentum and is used in short-duration force events.",
    "Friction opposes motion and has static and kinetic forms.",
    "Circular motion requires centripetal force directed toward the center."
  ],

  note: "Mastering this chapter builds a strong base for problem-solving in dynamics for JEE, NEET, and boards."
}
,lesson5: {
  title: "Work, Energy and Power",
  summary: "Explores the relationship between force and energy, covering work-energy theorem, types of energy, power, and collisions.",

  formulas: [
    {
      label: "Work (Constant Force)",
      formula: "W = F · d = Fd cosθ",
      unit: "Joule (J)"
    },
    {
      label: "Kinetic Energy",
      formula: "K = (1/2)mv²",
      unit: "J"
    },
    {
      label: "Potential Energy (Gravitational)",
      formula: "V = mgh",
      unit: "J"
    },
    {
      label: "Spring Potential Energy",
      formula: "V = (1/2)kx²",
      unit: "J"
    },
    {
      label: "Power",
      formula: "P = W/t = F · v",
      unit: "Watt (W)"
    },
    {
      label: "Centripetal Force",
      formula: "F = mv² / R",
      unit: "N"
    }
  ],

  key_points: [
    "Work is the dot product of force and displacement.",
    "Kinetic energy is energy of motion, proportional to v².",
    "The Work-Energy Theorem relates net work to change in kinetic energy.",
    "Power is the rate of doing work or transferring energy.",
    "Potential energy is stored energy due to position (e.g., gravity, spring).",
    "Mechanical energy is conserved in systems with only conservative forces.",
    "Collisions obey conservation of momentum; kinetic energy is conserved only in elastic collisions."
  ],

  note: "This chapter forms the backbone of dynamics and energy transfer, essential for both conceptual and numerical questions in NEET and JEE."
}
,
lesson6: {
  title: "System of Particles and Rotational Motion",
  summary: "Covers concepts like centre of mass, torque, angular momentum, rotational dynamics, and moment of inertia for rigid bodies.",

  formulas: [
    {
      label: "Centre of Mass (2 particles)",
      formula: "X = (m₁x₁ + m₂x₂) / (m₁ + m₂)",
      unit: "m"
    },
    {
      label: "Torque (Moment of Force)",
      formula: "τ = r × F = rF sinθ",
      unit: "N·m"
    },
    {
      label: "Angular Momentum (Single Particle)",
      formula: "L = r × p = mvr sinθ",
      unit: "kg·m²/s"
    },
    {
      label: "Relation: Torque & Angular Momentum",
      formula: "τ = dL/dt",
      unit: "N·m"
    },
    {
      label: "Linear Velocity in Rotation",
      formula: "v = ω × r",
      unit: "m/s"
    },
    {
      label: "Angular Acceleration",
      formula: "α = dω/dt",
      unit: "rad/s²"
    }
  ],

  key_points: [
    "Centre of mass is the weighted average position of mass in a system.",
    "Torque is the rotational analogue of force and causes angular acceleration.",
    "Angular momentum is conserved when external torque is zero.",
    "Moment of inertia quantifies rotational inertia; depends on mass distribution.",
    "Rigid body rotation involves same angular velocity for all particles.",
    "v = ω × r gives velocity of a point in rotating body."
  ],

  note: "This chapter connects linear and rotational mechanics — crucial for solving JEE/NEET advanced dynamics problems."
}
,lesson7: {
  title: "Gravitation",
  summary: "Explores Newton's law of universal gravitation, Kepler's laws, gravitational potential energy, escape speed, and satellite motion.",

  formulas: [
    {
      label: "Newton’s Law of Gravitation",
      formula: "F = G × (m₁m₂) / r²",
      unit: "N"
    },
    {
      label: "Gravitational Potential Energy",
      formula: "U = -G × (m₁m₂) / r",
      unit: "J"
    },
    {
      label: "Acceleration Due to Gravity",
      formula: "g = GM / R²",
      unit: "m/s²"
    },
    {
      label: "Escape Velocity",
      formula: "vₑ = √(2gR)",
      unit: "m/s"
    },
    {
      label: "Orbital Speed of Satellite",
      formula: "v = √(GM / (R + h))",
      unit: "m/s"
    },
    {
      label: "Kepler’s Third Law",
      formula: "T² ∝ R³",
      unit: "T in s, R in m"
    }
  ],

  key_points: [
    "Gravitational force is attractive, acts along line joining two masses.",
    "Kepler's laws describe planetary motion: elliptical orbits, equal areas in equal time, and T² ∝ R³.",
    "Acceleration due to gravity decreases with height and depth.",
    "Gravitational potential energy is negative; it becomes zero at infinity.",
    "Escape speed is independent of mass; for Earth it's ~11.2 km/s.",
    "Satellite motion is governed by gravity; total energy in orbit is negative.",
    "Cavendish measured G and 'weighed the Earth'."
  ],

  note: "Gravitation links celestial and terrestrial mechanics. High weightage chapter for NEET, JEE, and board exams."
}
,lesson8: {
  title: "Mechanical Properties of Solids",
  summary: "Explains how solids deform under external forces. Covers stress, strain, Hooke's law, elastic moduli, and practical applications in engineering design.",

  formulas: [
    {
      label: "Stress",
      formula: "Stress = Force / Area = F / A",
      unit: "N/m² (Pascal)"
    },
    {
      label: "Strain",
      formula: "Strain = Change in dimension / Original dimension",
      unit: "Dimensionless"
    },
    {
      label: "Hooke's Law",
      formula: "Stress ∝ Strain → Stress = k × Strain",
      unit: "k = Modulus of elasticity"
    },
    {
      label: "Young’s Modulus",
      formula: "Y = (F × L) / (A × ∆L)",
      unit: "N/m²"
    },
    {
      label: "Shear Modulus",
      formula: "G = (F × L) / (A × ∆x)",
      unit: "N/m²"
    },
    {
      label: "Bulk Modulus",
      formula: "B = -p / (∆V / V)",
      unit: "N/m²"
    },
    {
      label: "Elastic Potential Energy",
      formula: "U = (1/2) × Stress × Strain × Volume",
      unit: "J"
    }
  ],

  key_points: [
    "Stress is the internal restoring force per unit area.",
    "Strain is the fractional deformation of a solid body.",
    "Hooke’s law holds in the elastic region: stress ∝ strain.",
    "Young’s modulus applies to stretching/compression; G to shear; B to volume changes.",
    "Elastic potential energy is stored in deformed solids.",
    "Ductile materials deform significantly before breaking; brittle materials do not.",
    "Elastic properties guide structural design of bridges, buildings, ropes, and more."
  ],

  note: "A foundational chapter for understanding deformation and material strength — crucial for engineering, NEET, and JEE preparation."
}
,lesson9: {
  title: "Mechanical Properties of Fluids",
  summary: "Covers properties like pressure, viscosity, surface tension, Pascal’s law, Bernoulli’s principle, and applications such as blood flow, raindrop formation, and capillarity.",

  formulas: [
    {
      label: "Pressure in a Fluid",
      formula: "P = hρg",
      unit: "N/m² (Pa)"
    },
    {
      label: "Pascal’s Law",
      formula: "∆P = ρg∆h",
      unit: "Pa"
    },
    {
      label: "Bernoulli’s Equation",
      formula: "P + (1/2)ρv² + ρgh = constant",
      unit: "J/m³"
    },
    {
      label: "Viscous Force (Stoke’s Law)",
      formula: "F = 6πrηv",
      unit: "N"
    },
    {
      label: "Terminal Velocity",
      formula: "v_t = (2r²(ρ - σ)g) / (9η)",
      unit: "m/s"
    },
    {
      label: "Capillary Rise",
      formula: "h = (2T cosθ) / (rρg)",
      unit: "m"
    },
    {
      label: "Excess Pressure in a Bubble",
      formula: "ΔP = 4T / r",
      unit: "N/m²"
    }
  ],

  key_points: [
    "Pressure in a fluid increases with depth; depends on density and gravity.",
    "Pascal’s Law: pressure applied is transmitted equally in all directions.",
    "Bernoulli’s principle relates pressure, speed, and height in fluid flow.",
    "Viscosity is the internal friction; higher for thick fluids like honey.",
    "Terminal velocity is reached when net force on a falling object becomes zero.",
    "Surface tension causes liquids to minimize surface area (e.g., droplet shape).",
    "Capillarity explains rise or fall of liquid in narrow tubes, like in plants."
  ],

  note: "This chapter links real-life phenomena like blood flow, flying aircraft, and tree sap movement — highly application-oriented and important for NEET, JEE, and boards."
}
,lesson10: {
  title: "Thermal Properties of Matter",
  summary: "Explores heat, temperature, thermal expansion, specific heat, calorimetry, change of state, modes of heat transfer, blackbody radiation, and Newton's law of cooling.",

  formulas: [
    {
      label: "Heat Capacity",
      formula: "S = Q / ∆T",
      unit: "J/K"
    },
    {
      label: "Specific Heat Capacity",
      formula: "s = Q / (m × ∆T)",
      unit: "J/kg·K"
    },
    {
      label: "Latent Heat",
      formula: "Q = m × L",
      unit: "J"
    },
    {
      label: "Linear Expansion",
      formula: "∆L = αL × L × ∆T",
      unit: "m"
    },
    {
      label: "Volume Expansion (Ideal Gas)",
      formula: "α_v = 1/T",
      unit: "K⁻¹"
    },
    {
      label: "Stefan-Boltzmann Law",
      formula: "H = eσA(T⁴ - Tₛ⁴)",
      unit: "W"
    },
    {
      label: "Newton’s Law of Cooling",
      formula: "dT/dt ∝ (T - Tₛ)",
      unit: "K/s"
    }
  ],

  key_points: [
    "Heat is energy transferred due to temperature difference; measured in joules.",
    "Thermal expansion occurs in solids, liquids, and gases with temperature change.",
    "Specific heat varies by material and dictates temperature rise for given heat.",
    "Calorimetry is used to measure heat transfer; assumes no heat loss to surroundings.",
    "Change of state (melting, boiling) occurs at constant temperature and involves latent heat.",
    "Three modes of heat transfer: conduction (solids), convection (fluids), radiation (vacuum).",
    "Blackbody radiation emits energy based only on temperature (Wien’s law, Stefan’s law).",
    "Newton’s law of cooling applies when ∆T is small; cooling rate ∝ temperature difference."
  ],

  note: "This chapter is rich in real-life applications — ideal for numericals in JEE, NEET, and board exams."
}
,lesson11:
{
  "title": "Thermodynamics",
  "summary": "Introduces thermodynamic systems, internal energy, work, heat, enthalpy, calorimetry, and laws governing energy changes in chemical processes. Covers spontaneous processes, entropy, and Gibbs free energy.",
  
  "formulas": [
    {
      "label": "First Law of Thermodynamics",
      "formula": "ΔU = q + w",
      "unit": "J"
    },
    {
      "label": "Work Done (Constant External Pressure)",
      "formula": "w = –P_ext ΔV",
      "unit": "J"
    },
    {
      "label": "Enthalpy Definition",
      "formula": "H = U + PV",
      "unit": "J"
    },
    {
      "label": "Enthalpy Change at Constant Pressure",
      "formula": "ΔH = ΔU + PΔV",
      "unit": "J"
    },
    {
      "label": "Relation between Cp and Cv",
      "formula": "Cp – Cv = R",
      "unit": "J/mol·K"
    },
    {
      "label": "Isothermal Reversible Work",
      "formula": "w = –nRT ln(Vf/Vi)",
      "unit": "J"
    },
    {
      "label": "ΔH and ΔU Relation for Gases",
      "formula": "ΔH = ΔU + Δn_gas·RT",
      "unit": "J"
    },
    {
      "label": "Heat (Calorimetry)",
      "formula": "q = mcΔT",
      "unit": "J"
    }
  ],
  
  "key_points": [
    "System and surroundings form the universe; boundaries define the system.",
    "Internal energy is a state function; work and heat are path functions.",
    "Work done by or on the system affects internal energy.",
    "Enthalpy is useful in constant pressure processes; often used in chemistry.",
    "Cp > Cv for gases; related by Cp – Cv = R.",
    "Calorimetry helps measure heat changes at constant volume or pressure.",
    "Spontaneity of processes is judged using entropy and Gibbs free energy (ΔG).",
    "Thermodynamic transformations involve state functions and are independent of path."
  ],
  
  "note": "Thermodynamics connects chemistry with physics, making it essential for understanding chemical energetics, predicting reaction spontaneity, and solving JEE/NEET numerical problems. Real-world relevance includes engines, phase transitions, and biochemical processes."
}
,


lesson12:{
  "title": "Kinetic Theory",
  "summary": "Introduces the molecular nature of matter, the behavior of gases, the ideal gas equation, derivation of pressure from molecular motion, mean free path, degrees of freedom, and the law of equipartition of energy.",

  "formulas": [
    {
      "label": "Ideal Gas Equation",
      "formula": "PV = nRT",
      "unit": "J"
    },
    {
      "label": "Pressure from Kinetic Theory",
      formula: "P = (1/3) nm⟨v²⟩",
      "unit": "Pa"
    },
    {
      "label": "Average Kinetic Energy",
      "formula": "KE_avg = (3/2) k_B T",
      "unit": "J"
    },
    {
      "label": "Internal Energy of Ideal Gas",
      "formula": "E = (3/2) N k_B T",
      "unit": "J"
    },
    {
      "label": "Mean Free Path",
      "formula": "λ = (k_B T) / (√2 π d² P)",
      "unit": "m"
    },
    {
      "label": "Law of Equipartition of Energy",
      "formula": "E = (f/2) N k_B T",
      "unit": "J"
    }
  ],

  "key_points": [
    "Matter is made up of atoms in constant motion, with gases having the highest freedom of movement.",
    "Kinetic theory connects macroscopic gas laws to molecular-level behavior.",
    "Pressure arises from molecular collisions with the walls of the container.",
    "Kinetic energy of molecules is directly proportional to absolute temperature.",
    "Ideal gas behavior assumes negligible molecular interaction and elastic collisions.",
    "Mean free path is the average distance a molecule travels between collisions.",
    "The law of equipartition explains energy distribution across all degrees of freedom."
  ],

  "note": "Kinetic theory connects microscopic molecular motion with macroscopic properties like pressure and temperature — critical for NEET, JEE, and physics-based reasoning problems."
},
lesson13:{
  "title": "Oscillations",
  "summary": "Covers periodic and oscillatory motion, simple harmonic motion (SHM), its mathematical representation, relation with circular motion, velocity and acceleration in SHM, energy, force law, and the simple pendulum.",

  "formulas": [
    {
      "label": "Time Period and Frequency",
      "formula": "ν = 1/T",
      "unit": "Hz"
    },
    {
      "label": "Displacement in SHM",
      "formula": "x(t) = A cos(ωt + φ)",
      "unit": "m"
    },
    {
      "label": "Velocity in SHM",
      "formula": "v(t) = –ωA sin(ωt + φ)",
      "unit": "m/s"
    },
    {
      "label": "Acceleration in SHM",
      "formula": "a(t) = –ω²x(t)",
      "unit": "m/s²"
    },
    {
      "label": "Force in SHM",
      "formula": "F(t) = –k x(t)",
      "unit": "N"
    },
    {
      "label": "Angular Frequency",
      "formula": "ω = √(k/m)",
      "unit": "rad/s"
    },
    {
      "label": "Energy in SHM",
      "formula": "E = (1/2)kA²",
      "unit": "J"
    },
    {
      "label": "Simple Pendulum Time Period",
      "formula": "T = 2π√(L/g)",
      "unit": "s"
    }
  ],

  "key_points": [
    "Oscillatory motion is repetitive and occurs about a mean position.",
    "SHM is the simplest form of oscillatory motion with restoring force proportional to displacement.",
    "Displacement in SHM follows a sinusoidal function with amplitude, frequency, and phase.",
    "SHM is equivalent to the projection of uniform circular motion on a diameter.",
    "Velocity and acceleration in SHM are also sinusoidal but with phase shifts.",
    "Kinetic and potential energy interchange during SHM, but total energy remains constant.",
    "The restoring force in SHM is given by Hooke’s law: F = –kx.",
    "A simple pendulum performs SHM for small angles, with time period dependent on length and gravity."
  ],

  "note": "Oscillations form the foundation of understanding waves, vibrations, sound, and alternating currents — crucial for NEET, JEE, and board exams due to their rich mathematical and conceptual applications."
}
,lesson14:{
  "title": "Waves",
  "summary": "Explains mechanical waves, transverse and longitudinal waves, wave functions, wave speed, superposition, reflection, standing waves, resonance, and phenomena like beats. Covers progressive waves and their mathematical representation.",

  "formulas": [
    {
      "label": "Displacement in a Travelling Wave",
      "formula": "y(x, t) = a sin(kx – ωt + φ)",
      "unit": "m"
    },
    {
      "label": "Wave Speed",
      "formula": "v = λν = ω/k",
      "unit": "m/s"
    },
    {
      "label": "Speed of Transverse Wave on String",
      "formula": "v = √(T/μ)",
      "unit": "m/s"
    },
    {
      "label": "Speed of Longitudinal Wave in Fluid",
      "formula": "v = √(B/ρ)",
      "unit": "m/s"
    },
    {
      "label": "Speed of Sound in Gas (Laplace’s Correction)",
      "formula": "v = √(γP/ρ)",
      "unit": "m/s"
    },
    {
      "label": "Standing Wave Equation",
      "formula": "y(x, t) = 2a sin(kx) cos(ωt)",
      "unit": "m"
    },
    {
      "label": "Beat Frequency",
      "formula": "ν_beat = |ν₁ – ν₂|",
      "unit": "Hz"
    },
    {
      "label": "Wavelength of nth Harmonic (String)",
      "formula": "λ_n = 2L/n",
      "unit": "m"
    },
    {
      "label": "Frequency of nth Harmonic (String)",
      "formula": "ν_n = n(v/2L)",
      "unit": "Hz"
    },
    {
      "label": "Frequency of nth Mode (Closed Pipe)",
      "formula": "ν_n = (2n+1)(v/4L)",
      "unit": "Hz"
    }
  ],

  "key_points": [
    "Mechanical waves need a medium; energy propagates, not matter.",
    "Transverse waves: oscillations perpendicular to wave direction (possible in solids).",
    "Longitudinal waves: oscillations parallel to wave direction (possible in solids, liquids, gases).",
    "Wave displacement is described by sinusoidal functions of position and time.",
    "Wave speed depends on medium properties — tension and mass density for strings; bulk modulus and density for fluids.",
    "Reflection at rigid boundaries causes phase reversal; no phase change at open boundaries.",
    "Superposition leads to interference — constructive and destructive.",
    "Standing waves are formed from interference of two identical waves moving in opposite directions.",
    "Normal modes occur when boundary conditions restrict allowable frequencies — seen in strings, pipes, etc.",
    "Beats occur due to interference of close-frequency waves, heard as waxing and waning of sound intensity."
  ],

  "note": "This chapter unifies several key physics concepts — oscillations, sound, and wave mechanics — and provides a foundation for understanding topics in optics, acoustics, and signal transmission. High weightage in JEE, NEET, and board exams."
}
,lesson15: {
  title: "Electric Charges and Fields",
  summary: "Introduces the basic concept of electric charge, types of charges, conductors and insulators, Coulomb’s law, the principle of superposition, electric field, electric field lines, electric flux, and electric dipoles.",

  formulas: [
    { label: "Quantisation of Charge", formula: "q = n × e", unit: "C" },
    { label: "Coulomb’s Law", formula: "F = (1 / 4πε₀) × (q₁q₂ / r²)", unit: "N" },
    { label: "Coulomb’s Constant", formula: "k = 1 / (4πε₀) = 9 × 10⁹", unit: "Nm²/C²" },
    { label: "Electric Field due to a Point Charge", formula: "E = (1 / 4πε₀) × (q / r²)", unit: "N/C" },
    { label: "Electric Force using Field", formula: "F = q × E", unit: "N" },
    { label: "Electric Flux", formula: "Φ_E = EA cosθ", unit: "Nm²/C" },
    { label: "Dipole Moment", formula: "p = q × 2a", unit: "Cm" },
    { label: "Electric Field on Dipole Axis", formula: "E = (1 / 4πε₀) × (2p / r³)", unit: "N/C" },
    { label: "Electric Field on Equatorial Line", formula: "E = (1 / 4πε₀) × (–p / r³)", unit: "N/C" }
  ],

  key_points: [
    "There are two types of electric charges: positive and negative; like charges repel, unlike attract.",
    "Charge is conserved and quantised — q = ne.",
    "Conductors allow free movement of charges; insulators do not.",
    "Coulomb’s law gives the electrostatic force between two point charges.",
    "Superposition principle applies for vector addition of forces.",
    "Electric field is force per unit charge and is a vector field.",
    "Field lines never intersect; they originate from +ve and end at –ve charges.",
    "Electric flux helps visualize field crossing a surface; central in Gauss’s law.",
    "An electric dipole consists of two opposite charges separated by a distance.",
    "Dipole field falls off as 1/r³ compared to 1/r² for a point charge."
  ],

  note: "This chapter lays the foundation of electrostatics — highly relevant for understanding capacitors and electric potential. Important for JEE, NEET, and board exams."
}
,lesson16: {
  title: "Electrostatic Potential and Capacitance",
  summary: "Explores electrostatic potential, potential energy, equipotential surfaces, capacitors, capacitance, energy storage, combination of capacitors, and Van de Graaff generator.",

  formulas: [
    { label: "Potential due to Point Charge", formula: "V = (1 / 4πε₀) × (Q / r)", unit: "V" },
    { label: "Potential due to Dipole", formula: "V = (1 / 4πε₀) × (p·r̂ / r²)", unit: "V" },
    { label: "Potential Energy of Two Charges", formula: "U = (1 / 4πε₀) × (q₁q₂ / r)", unit: "J" },
    { label: "Potential Energy in Uniform Field", formula: "U = –p·E", unit: "J" },
    { label: "Capacitance of Parallel Plate", formula: "C = ε₀A / d", unit: "F" },
    { label: "Capacitance with Dielectric", formula: "C = Kε₀A / d", unit: "F" },
    { label: "Energy Stored in Capacitor", formula: "U = ½CV² = Q²/2C", unit: "J" },
    { label: "Energy Density", formula: "u = ½ε₀E²", unit: "J/m³" },
    { label: "Capacitance in Series", formula: "1/C = 1/C₁ + 1/C₂ + ...", unit: "F" },
    { label: "Capacitance in Parallel", formula: "C = C₁ + C₂ + ...", unit: "F" }
  ],

  key_points: [
    "Electrostatic potential is the work done per unit charge.",
    "Equipotential surfaces have constant potential and are perpendicular to field lines.",
    "Potential energy is scalar and relates to system configuration.",
    "A capacitor stores energy; its capacitance depends on geometry and medium.",
    "Dielectrics increase capacitance by reducing effective field.",
    "Capacitors in series reduce net capacitance; in parallel increase it.",
    "Electric field between parallel plates is uniform.",
    "Van de Graaff generator builds high voltage via mechanical charge transport."
  ],

  note: "Highly application-focused — central to electric circuits and devices. Frequently tested in NEET and JEE numericals."
}
,lesson17: {
  title: "Current Electricity",
  summary: "Discusses electric current, Ohm’s law, resistance, resistivity, combination of resistors, EMF, internal resistance, Kirchhoff’s laws, and Wheatstone bridge.",

  formulas: [
    { label: "Ohm’s Law", formula: "V = IR", unit: "V" },
    { label: "Resistance in Series", formula: "R = R₁ + R₂ + ...", unit: "Ω" },
    { label: "Resistance in Parallel", formula: "1/R = 1/R₁ + 1/R₂ + ...", unit: "Ω" },
    { label: "Resistivity", formula: "R = ρL / A", unit: "Ω" },
    { label: "Power", formula: "P = VI = I²R = V²/R", unit: "W" },
    { label: "Work Done", formula: "W = VIt", unit: "J" },
    { label: "Ohmic vs Non-ohmic", formula: "V–I graph is linear for ohmic devices", unit: "—" },
    { label: "Kirchhoff’s Current Law", formula: "ΣI_in = ΣI_out", unit: "A" },
    { label: "Kirchhoff’s Voltage Law", formula: "ΣV in loop = 0", unit: "V" },
    { label: "Wheatstone Bridge Balance", formula: "P/Q = R/S", unit: "—" }
  ],

  key_points: [
    "Current is flow of charge; direction is conventionally from + to –.",
    "Ohm’s law relates current to potential difference in resistors.",
    "Resistance depends on material, length, and area.",
    "Resistors in series and parallel affect total resistance differently.",
    "Internal resistance of a cell reduces terminal voltage.",
    "Power dissipation in resistors is key in real-world circuits.",
    "Kirchhoff’s laws are essential for multi-loop circuits.",
    "Wheatstone bridge helps find unknown resistances.",
    "Meter bridge and potentiometer are precision instruments for measurements.",
    "Superconductors exhibit zero resistance below a critical temperature."
  ],

  note: "Foundation of electric circuits — crucial for electronics, practicals, and JEE/NEET numericals."
}
,lesson17: {
  title: "Current Electricity",
  summary: "Discusses electric current, Ohm’s law, resistance, resistivity, combination of resistors, EMF, internal resistance, Kirchhoff’s laws, and Wheatstone bridge.",

  formulas: [
    { label: "Ohm’s Law", formula: "V = IR", unit: "V" },
    { label: "Resistance in Series", formula: "R = R₁ + R₂ + ...", unit: "Ω" },
    { label: "Resistance in Parallel", formula: "1/R = 1/R₁ + 1/R₂ + ...", unit: "Ω" },
    { label: "Resistivity", formula: "R = ρL / A", unit: "Ω" },
    { label: "Power", formula: "P = VI = I²R = V²/R", unit: "W" },
    { label: "Work Done", formula: "W = VIt", unit: "J" },
    { label: "Ohmic vs Non-ohmic", formula: "V–I graph is linear for ohmic devices", unit: "—" },
    { label: "Kirchhoff’s Current Law", formula: "ΣI_in = ΣI_out", unit: "A" },
    { label: "Kirchhoff’s Voltage Law", formula: "ΣV in loop = 0", unit: "V" },
    { label: "Wheatstone Bridge Balance", formula: "P/Q = R/S", unit: "—" }
  ],

  key_points: [
    "Current is flow of charge; direction is conventionally from + to –.",
    "Ohm’s law relates current to potential difference in resistors.",
    "Resistance depends on material, length, and area.",
    "Resistors in series and parallel affect total resistance differently.",
    "Internal resistance of a cell reduces terminal voltage.",
    "Power dissipation in resistors is key in real-world circuits.",
    "Kirchhoff’s laws are essential for multi-loop circuits.",
    "Wheatstone bridge helps find unknown resistances.",
    "Meter bridge and potentiometer are precision instruments for measurements.",
    "Superconductors exhibit zero resistance below a critical temperature."
  ],

  note: "Foundation of electric circuits — crucial for electronics, practicals, and JEE/NEET numericals."
}
,lesson18: {
  title: "Moving Charges and Magnetism",
  summary: "Covers magnetic fields produced by moving charges, Biot-Savart law, Ampere’s law, motion of charged particles in magnetic fields, magnetic force, and torques.",

  formulas: [
    { label: "Magnetic Force", formula: "F = q(v × B)", unit: "N" },
    { label: "Lorentz Force", formula: "F = q(E + v × B)", unit: "N" },
    { label: "Magnetic Field (Biot-Savart)", formula: "dB = (μ₀/4π) × (Idl × r̂) / r²", unit: "T" },
    { label: "Ampere’s Law", formula: "∮B · dl = μ₀I", unit: "T·m" },
    { label: "Cyclotron Frequency", formula: "f = qB / 2πm", unit: "Hz" },
    { label: "Radius of Circular Path", formula: "r = mv / qB", unit: "m" },
    { label: "Magnetic Moment", formula: "μ = NIA", unit: "A·m²" },
    { label: "Torque on Coil", formula: "τ = μ × B", unit: "N·m" }
  ],

  key_points: [
    "Moving charges produce magnetic fields.",
    "Right-hand rule determines direction of magnetic field or force.",
    "Biot–Savart law quantifies magnetic field due to current.",
    "Ampere’s law useful for symmetric geometries (e.g. solenoids).",
    "Charged particle moves in circle in uniform magnetic field.",
    "Magnetic force does no work — only alters direction, not speed.",
    "Magnetic dipoles experience torque in magnetic field.",
    "Torque on current loop = magnetic moment × magnetic field.",
    "Cyclotron accelerates charged particles using magnetic field.",
    "Applications include galvanometers and cyclotron."
  ],

  note: "Links electricity and magnetism; very important for JEE, NEET, and experimental physics."
}
,
lesson18: {
  title: "Moving Charges and Magnetism",
  summary: "Covers magnetic fields produced by moving charges, Biot-Savart law, Ampere’s law, motion of charged particles in magnetic fields, magnetic force, and torques.",

  formulas: [
    { label: "Magnetic Force", formula: "F = q(v × B)", unit: "N" },
    { label: "Lorentz Force", formula: "F = q(E + v × B)", unit: "N" },
    { label: "Magnetic Field (Biot-Savart)", formula: "dB = (μ₀/4π) × (Idl × r̂) / r²", unit: "T" },
    { label: "Ampere’s Law", formula: "∮B · dl = μ₀I", unit: "T·m" },
    { label: "Cyclotron Frequency", formula: "f = qB / 2πm", unit: "Hz" },
    { label: "Radius of Circular Path", formula: "r = mv / qB", unit: "m" },
    { label: "Magnetic Moment", formula: "μ = NIA", unit: "A·m²" },
    { label: "Torque on Coil", formula: "τ = μ × B", unit: "N·m" }
  ],

  key_points: [
    "Moving charges produce magnetic fields.",
    "Right-hand rule determines direction of magnetic field or force.",
    "Biot–Savart law quantifies magnetic field due to current.",
    "Ampere’s law useful for symmetric geometries (e.g. solenoids).",
    "Charged particle moves in circle in uniform magnetic field.",
    "Magnetic force does no work — only alters direction, not speed.",
    "Magnetic dipoles experience torque in magnetic field.",
    "Torque on current loop = magnetic moment × magnetic field.",
    "Cyclotron accelerates charged particles using magnetic field.",
    "Applications include galvanometers and cyclotron."
  ],

  note: "Links electricity and magnetism; very important for JEE, NEET, and experimental physics."
}
,lesson19: {
  title: "Magnetism and Matter",
  summary: "Discusses Earth's magnetism, magnetic materials, magnetic dipole, magnetisation, and hysteresis. Also explores torque on magnetic dipole and related laws.",

  formulas: [
    { label: "Torque on Magnetic Dipole", formula: "τ = m × B", unit: "N·m" },
    { label: "Potential Energy", formula: "U = –m·B", unit: "J" },
    { label: "Magnetisation", formula: "M = m / V", unit: "A/m" },
    { label: "Magnetic Susceptibility", formula: "χ_m = M / H", unit: "—" },
    { label: "Magnetic Intensity", formula: "B = μ₀(H + M)", unit: "T" },
    { label: "Relation", formula: "B = μH", unit: "T" }
  ],

  key_points: [
    "Magnetic dipole is analogous to electric dipole.",
    "Bar magnets have north and south poles; no monopoles exist.",
    "Earth’s magnetic field is tilted with respect to geographical axis.",
    "Inclination and declination describe field orientation on Earth.",
    "Diamagnetic: repelled by field (e.g. bismuth); χ < 0.",
    "Paramagnetic: weakly attracted (e.g. Al); χ > 0.",
    "Ferromagnetic: strongly attracted; permanent magnetism possible.",
    "Hysteresis curve shows energy loss in magnetisation cycle.",
    "Retentivity and coercivity define quality of magnetic materials."
  ],

  note: "Magnetic properties and Earth's field have real-world relevance — important for theory and practicals."
}
,lesson20: {
  title: "Electromagnetic Induction",
  summary: "Explains Faraday’s laws, Lenz’s law, induced EMF, self and mutual inductance, eddy currents, and energy stored in inductors.",

  formulas: [
    { label: "Faraday’s Law", formula: "ε = –dΦ/dt", unit: "V" },
    { label: "Magnetic Flux", formula: "Φ = B·A = BA cosθ", unit: "Wb" },
    { label: "Induced EMF in Rotating Coil", formula: "ε = NBAω sin(ωt)", unit: "V" },
    { label: "Self-Inductance", formula: "ε = –L (dI/dt)", unit: "V" },
    { label: "Mutual Inductance", formula: "ε = –M (dI/dt)", unit: "V" },
    { label: "Energy Stored in Inductor", formula: "U = ½LI²", unit: "J" }
  ],

  key_points: [
    "Changing magnetic flux induces EMF (Faraday’s law).",
    "Lenz’s law gives direction — opposes the cause.",
    "Self-inductance: property of coil to oppose current change in itself.",
    "Mutual inductance: EMF in one coil due to current in another.",
    "Eddy currents: circular currents causing heating, braking.",
    "Inductors store energy in magnetic fields.",
    "Transformers, generators, and electric brakes rely on induction."
  ],

  note: "Vital for understanding transformers, generators, and real-world electromagnetic devices — must-know for JEE and NEET."
},lesson21:{
  "title": "Alternating Current",
  "summary": "Introduces alternating current (AC), root mean square (rms) values, phasor diagrams, reactance, impedance, power in AC circuits, resonance, transformers, and LC oscillations.",

  "formulas": [
    {
      "label": "AC Voltage (Instantaneous)",
      "formula": "v(t) = v_m sin(ωt)",
      "unit": "V"
    },
    {
      "label": "RMS Values",
      "formula": "I_rms = I_m / √2, V_rms = V_m / √2",
      "unit": "A, V"
    },
    {
      "label": "Reactance (Inductive & Capacitive)",
      "formula": "X_L = ωL, X_C = 1 / (ωC)",
      "unit": "Ω"
    },
    {
      "label": "Impedance (RLC Circuit)",
      "formula": "Z = √(R² + (X_L - X_C)²)",
      "unit": "Ω"
    },
    {
      "label": "Power in AC Circuit",
      "formula": "P = V_rms × I_rms × cos(φ)",
      "unit": "W"
    },
    {
      "label": "Resonant Frequency",
      "formula": "ω₀ = 1 / √(LC)",
      "unit": "rad/s"
    },
    {
      "label": "Quality Factor",
      "formula": "Q = ω₀L / R",
      "unit": "—"
    },
    {
      "label": "Transformer Equations",
      "formula": "V_s / V_p = N_s / N_p, I_s / I_p = N_p / N_s",
      "unit": "—"
    }
  ],

  "key_points": [
    "Alternating current varies sinusoidally with time; described by amplitude and frequency.",
    "RMS values represent effective voltage/current equivalent to DC heating effect.",
    "Phasor diagrams help visualize phase relations among voltages and currents.",
    "Inductors and capacitors introduce reactance; they cause phase shifts.",
    "Impedance is the total opposition to AC and combines resistance and reactance.",
    "At resonance in an RLC circuit, current is maximum and power factor is 1.",
    "Transformers are used to step-up or step-down AC voltages in power transmission.",
    "Power factor (cosφ) indicates efficiency of power transfer in AC circuits."
  ],

  "note": "This chapter is crucial for understanding real-world AC systems, power distribution, and resonance — heavily emphasized in NEET, JEE, and board exams."
}
,
lesson22: {
  title: "Electromagnetic Waves",
  summary: "Covers Maxwell's equations, displacement current, wave nature of light, properties of EM waves, spectrum and its uses in communication.",

  formulas: [
    { label: "Speed of Light", formula: "c = 1 / √(μ₀ε₀)", unit: "m/s" },
    { label: "Wave Relation", formula: "c = νλ", unit: "m/s" },
    { label: "Electric–Magnetic Field Relation", formula: "E₀ / B₀ = c", unit: "m/s" },
    { label: "Energy Density", formula: "u = ε₀E² = B²/μ₀", unit: "J/m³" },
    { label: "Poynting Vector", formula: "S = E × B / μ₀", unit: "W/m²" }
  ],

  key_points: [
    "Time-varying E and B fields propagate as electromagnetic waves.",
    "Do not need a medium — can travel in vacuum.",
    "Maxwell unified electricity, magnetism, and light.",
    "Displacement current ensures continuity in Ampere’s law.",
    "All EM waves travel at same speed in vacuum (≈ 3×10⁸ m/s).",
    "Spectrum ranges from radio waves to gamma rays.",
    "Applications: X-rays, radio, microwave, communication, IR sensors."
  ],

  note: "Unites optics and electromagnetism. Central to modern communication, physics, and engineering."
}
,
lesson23:{
  "title": "Ray Optics and Optical Instruments",
  "summary": "Covers the behavior of light using ray models: reflection, refraction, total internal reflection, mirrors, lenses, and optical instruments like microscopes and telescopes.",

  "formulas": [
    {
      "label": "Mirror Equation",
      "formula": "1/f = 1/v + 1/u",
      "unit": "m⁻¹"
    },
    {
      "label": "Lens Maker’s Formula",
      "formula": "1/f = (μ - 1)(1/R₁ - 1/R₂)",
      "unit": "m⁻¹"
    },
    {
      "label": "Magnification",
      "formula": "m = h'/h = -v/u",
      "unit": "—"
    },
    {
      "label": "Refractive Index",
      "formula": "n = sin(i) / sin(r)",
      "unit": "—"
    },
    {
      "label": "Critical Angle",
      "formula": "sin(c) = 1/n",
      "unit": "—"
    }
  ],

  "key_points": [
    "Light travels in straight lines (ray approximation) unless interacting with surfaces.",
    "Reflection and refraction are governed by Snell’s law.",
    "Total internal reflection is used in fiber optics and prisms.",
    "Image formation by mirrors and lenses depends on object placement.",
    "Sign convention: distances measured from the pole or optical center.",
    "Optical instruments like microscopes and telescopes enhance visual capability."
  ],

  "note": "This chapter is critical for practical optics applications — important for JEE, NEET, and board diagrams and derivations."
},lesson24:{
  "title": "Wave Optics",
  "summary": "Explores the wave nature of light, including interference, diffraction, polarization, and applications such as Young’s experiment and resolution limits.",

  "formulas": [
    {
      "label": "Path Difference for Constructive Interference",
      "formula": "Δx = nλ",
      "unit": "m"
    },
    {
      "label": "Path Difference for Destructive Interference",
      "formula": "Δx = (2n + 1)λ/2",
      "unit": "m"
    },
    {
      "label": "Angular Fringe Width",
      "formula": "θ = λ/d",
      "unit": "rad"
    },
    {
      "label": "Brewster’s Law",
      "formula": "tan(i_B) = n₂/n₁",
      "unit": "—"
    }
  ],

  "key_points": [
    "Light exhibits interference and diffraction — wave phenomena.",
    "Young’s double slit experiment proves the wave nature of light.",
    "Diffraction limits resolution of optical instruments.",
    "Polarisation confirms light is a transverse wave.",
    "Huygens’ principle helps derive reflection and refraction laws."
  ],

  "note": "Wave optics builds the conceptual foundation for modern optical instruments and quantum physics — highly exam-relevant."
}
,lesson25:{
  "title": "Dual Nature of Radiation and Matter",
  "summary": "Discusses the particle and wave duality of light and matter, photoelectric effect, Einstein’s explanation, and de Broglie’s hypothesis.",

  "formulas": [
    {
      "label": "Photon Energy",
      "formula": "E = hν",
      "unit": "J"
    },
    {
      "label": "Photoelectric Equation",
      "formula": "K_max = hν - φ",
      "unit": "J"
    },
    {
      "label": "de Broglie Wavelength",
      "formula": "λ = h/p",
      "unit": "m"
    }
  ],

  "key_points": [
    "Light behaves as particles (photons) in the photoelectric effect.",
    "No electrons are emitted below the threshold frequency.",
    "Kinetic energy of photoelectrons is independent of intensity.",
    "de Broglie proposed that matter also exhibits wave nature.",
    "Electron diffraction confirmed matter waves."
  ],

  "note": "This chapter marks the entry to quantum physics — conceptually deep and critical for NEET, JEE, and modern physics topics."
}
,lesson26:{
  "title": "Atoms",
  "summary": "Describes atomic models, emission spectra, Bohr’s model for hydrogen, quantisation of angular momentum, and energy levels.",

  "formulas": [
    {
      "label": "Radius of nth Orbit",
      "formula": "r_n = n²h² / (4π²me²)",
      "unit": "m"
    },
    {
      "label": "Energy of nth Orbit",
      "formula": "E_n = -13.6 eV / n²",
      "unit": "eV"
    },
    {
      "label": "Bohr's Quantization Rule",
      "formula": "L = n(h/2π)",
      "unit": "kg·m²/s"
    }
  ],

  "key_points": [
    "Rutherford’s model introduced nucleus; Bohr added quantized orbits.",
    "Hydrogen spectrum lines arise from transitions between energy levels.",
    "Emission and absorption involve discrete photon energies.",
    "Bohr’s model explains line spectra but fails for multi-electron atoms."
  ],

  "note": "Bohr's atomic model forms the foundation of quantum theory — essential for modern physics, NEET, and board exams."
}
,lesson27:{
  "title": "Nuclei",
  "summary": "Covers structure and properties of atomic nuclei, radioactivity, nuclear reactions including fission and fusion, and binding energy.",

  "formulas": [
    {
      "label": "Mass-Energy Equivalence",
      "formula": "E = mc²",
      "unit": "J"
    },
    {
      "label": "Binding Energy per Nucleon",
      "formula": "BE = [Zmp + (A - Z)mn - M]c² / A",
      "unit": "MeV"
    },
    {
      "label": "Radioactive Decay Law",
      "formula": "N(t) = N₀e^(–λt)",
      "unit": "—"
    },
    {
      "label": "Half-Life",
      "formula": "T½ = ln(2)/λ",
      "unit": "s"
    }
  ],

  "key_points": [
    "Nuclei are made of protons and neutrons; held by strong nuclear force.",
    "Binding energy determines nuclear stability.",
    "Fission splits heavy nuclei; fusion joins light nuclei — both release energy.",
    "Radioactive decay is a random but statistically predictable process."
  ],

  "note": "A key chapter for understanding nuclear energy, reactors, and radiological applications — very important for NEET and competitive exams."
}
,lesson28:{
  "title": "Semiconductor Electronics",
  "summary": "Explains the basics of semiconductors, types (n- and p-type), diodes, transistors, logic gates, and applications in electronics.",

  "formulas": [
    {
      "label": "Resistivity Relation",
      "formula": "ρ = 1 / σ",
      "unit": "Ω·m"
    },
    {
      "label": "Current in a Diode",
      "formula": "I = I₀(e^(eV/kT) - 1)",
      "unit": "A"
    },
    {
      "label": "Cut-in Voltage (for Si diode)",
      "formula": "V ≈ 0.7 V",
      "unit": "V"
    }
  ],

  "key_points": [
    "Semiconductors have conductivity between conductors and insulators.",
    "Doping modifies conductivity — n-type (extra electrons), p-type (holes).",
    "Diodes allow current in one direction; transistors amplify or switch signals.",
    "Logic gates perform digital operations — NOT, AND, OR, NAND, NOR."
  ],

  "note": "Essential for understanding electronics and digital logic — high relevance for board exams and engineering entrance tests."
}
,lesson29:{
  "title": "Communication Systems",
  "summary": "Introduces the fundamentals of electronic communication: elements, modulation, bandwidth, and electromagnetic wave propagation.",

  "formulas": [
    {
      "label": "Modulation Index (AM)",
      "formula": "m = A_m / A_c",
      "unit": "—"
    },
    {
      "label": "Bandwidth of AM Wave",
      "formula": "BW = 2f_m",
      "unit": "Hz"
    }
  ],

  "key_points": [
    "Communication systems need a transmitter, channel, and receiver.",
    "Modulation (AM, FM) allows transmission over long distances.",
    "Bandwidth and frequency determine signal clarity and quality.",
    "Electromagnetic waves propagate via ground, sky, or space."
  ],

  "note": "A modern and practical chapter — connects physics with real-world technologies like radio, TV, and mobile communications."
}
,
  lesson30: {
    title: "Some Basic Concepts of Chemistry",
    summary: "Introduces fundamental chemical laws, atomic and molecular concepts, mole calculations, and stoichiometry.",
    formulas: [
      { label: "Mole Definition", formula: "1 mole = 6.022 × 10²³ entities", unit: "particles" },
      { label: "Molar Mass", formula: "Mass of 1 mole = Molar mass", unit: "g/mol" },
      { label: "Percentage Composition", formula: "% Element = (Mass of element / Molar mass) × 100", unit: "%" },
      { label: "Empirical Formula", formula: "Simplest whole number ratio of atoms", unit: "—" },
      { label: "Limiting Reagent", formula: "Determines the maximum product formed", unit: "—" }
    ],
    key_points: [
      "Chemistry deals with composition, structure, and properties of matter.",
      "Laws of chemical combination: conservation, definite proportions, multiple proportions.",
      "Mole concept links the microscopic world to measurable quantities.",
      "Avogadro number connects particles to moles.",
      "Empirical and molecular formulas help understand substance composition.",
      "Stoichiometry relates quantities of reactants and products.",
      "Limiting reagent controls how much product can be formed.",
      "Significant figures and dimensional analysis are important for accurate measurement.",
      "Essential for physical chemistry numerical problem-solving.",
      "Units and SI conventions are the base of quantitative chemistry."
    ],
    note: "Forms the foundation for all chemistry calculations — critical for NEET, JEE, and board numericals."
  },

  lesson31: {
    title: "Structure of Atom",
    summary: "Explains the structure of atoms, subatomic particles, atomic models, quantum numbers, and electronic configuration.",
    formulas: [
      { label: "Bohr’s Energy of Orbit", formula: "Eₙ = -13.6 Z² / n²", unit: "eV" },
      { label: "Radius of nth Orbit", formula: "rₙ = 0.529 × n² / Z", unit: "Å" },
      { label: "de Broglie Wavelength", formula: "λ = h / mv", unit: "m" },
      { label: "Heisenberg Uncertainty Principle", formula: "Δx × Δp ≥ h / 4π", unit: "—" }
    ],
    key_points: [
      "Atoms consist of protons, neutrons, and electrons.",
      "Rutherford's model introduced a dense nucleus.",
      "Bohr’s model explained hydrogen spectrum using quantized orbits.",
      "Electrons exhibit both particle and wave nature (de Broglie).",
      "Quantum numbers (n, l, m, s) describe electron position and energy.",
      "Pauli exclusion principle states no two electrons have same quantum set.",
      "Hund’s rule favors maximum multiplicity (unpaired electrons).",
      "Aufbau principle governs filling order of orbitals.",
      "Modern atomic theory uses quantum mechanical model.",
      "Electron density and orbitals shape modern atomic structure."
    ],
    note: "This chapter is crucial for understanding electronic structure — key to bonding, periodicity, and spectroscopy."
  },

  lesson32: {
    title: "Classification of Elements and Periodicity in Properties",
    summary: "Introduces the periodic table and periodic trends like atomic radius, ionization enthalpy, and electronegativity.",
    formulas: [],
    key_points: [
      "Modern periodic table is based on atomic number.",
      "Groups are vertical columns; periods are horizontal rows.",
      "Atomic size decreases across a period and increases down a group.",
      "Ionization enthalpy increases across a period, decreases down a group.",
      "Electron gain enthalpy becomes more negative across a period.",
      "Electronegativity increases across a period, decreases down a group.",
      "Valence electrons determine chemical reactivity.",
      "Noble gases are stable due to full outer shells.",
      "Periodic properties arise due to electron configurations.",
      "Essential for predicting chemical behavior."
    ],
    note: "This chapter builds the base for understanding element behavior — key for NEET and JEE."
  },

  lesson33: {
    title: "Chemical Bonding and Molecular Structure",
    summary: "Covers types of chemical bonding, VSEPR theory, hybridization, and molecular geometry.",
    formulas: [
      { label: "Formal Charge", formula: "FC = Valence e⁻ - (Lone e⁻ + ½ Bonding e⁻)", unit: "—" },
      { label: "Dipole Moment", formula: "μ = q × d", unit: "Debye (D)" }
    ],
    key_points: [
      "Ionic bond: transfer of electrons; covalent: sharing of electrons.",
      "Octet rule explains stability of atoms in molecules.",
      "Coordinate bond formed when lone pair is donated.",
      "VSEPR theory predicts molecular shapes based on repulsion.",
      "Hybridization: mixing of orbitals to form equivalent orbitals.",
      "Molecular Orbital Theory explains bonding using orbitals.",
      "Resonance stabilizes molecules via delocalized electrons.",
      "Polarity arises from unequal sharing and shape.",
      "Bond order predicts stability and length.",
      "Helps understand bonding in all types of compounds."
    ],
    note: "Fundamental for understanding molecular structures — heavily tested in NEET and JEE."
  },

  lesson34: {
    title: "Thermodynamics",
    summary: "Describes energy changes in chemical systems, laws of thermodynamics, and spontaneity.",
    formulas: [
      { label: "First Law", formula: "ΔU = q + w", unit: "J" },
      { label: "Enthalpy", formula: "H = U + PV", unit: "J" },
      { label: "Gibbs Free Energy", formula: "ΔG = ΔH – TΔS", unit: "J" },
      { label: "Work of Expansion", formula: "w = –PΔV", unit: "J" },
      { label: "Hess’s Law", formula: "ΔH = ΔH₁ + ΔH₂ + ...", unit: "J" }
    ],
    key_points: [
      "Internal energy, enthalpy, entropy, and free energy are key thermodynamic functions.",
      "First law relates energy transfer as heat and work.",
      "Second law introduces entropy and direction of spontaneity.",
      "Gibbs free energy indicates spontaneity (ΔG < 0).",
      "State functions depend only on state, not path.",
      "Enthalpy change is measurable via calorimetry.",
      "Hess’s Law allows indirect enthalpy calculation.",
      "Specific heat capacity affects heat absorption.",
      "Thermochemistry studies heat in reactions.",
      "Important for physical chemistry numericals."
    ],
    note: "Core topic in physical chemistry — critical for energy-based NEET/JEE questions."
  },

  lesson35: {
    title: "Equilibrium",
    summary: "Covers chemical and ionic equilibrium, Le Chatelier’s principle, acids and bases, and buffer solutions.",
    formulas: [
      { label: "Equilibrium Constant", formula: "Kc = [C]^c[D]^d / [A]^a[B]^b", unit: "—" },
      { label: "pH", formula: "pH = –log[H⁺]", unit: "—" },
      { label: "Ionization of Water", formula: "Kw = [H⁺][OH⁻] = 1 × 10⁻¹⁴", unit: "—" },
      { label: "Ka of Weak Acid", formula: "Ka = [H⁺][A⁻]/[HA]", unit: "—" },
      { label: "Solubility Product", formula: "Ksp = [A⁺]^m[B⁻]^n", unit: "—" }
    ],
    key_points: [
      "Equilibrium occurs when forward and reverse reaction rates are equal.",
      "Le Chatelier’s principle predicts direction of shift under changes.",
      "Kc and Kp express equilibrium positions quantitatively.",
      "Acids/bases can be Arrhenius, Bronsted, or Lewis types.",
      "Buffer solutions resist pH changes on adding small acid/base.",
      "Common ion effect reduces ionization.",
      "Titrations help determine unknown concentrations.",
      "Solubility product predicts precipitation.",
      "Strong acids/bases dissociate completely; weak do not.",
      "Crucial for physical and analytical chemistry."
    ],
    note: "Highly relevant for reaction dynamics and titration-based questions."
  },

  lesson36: {
    title: "Redox Reactions",
    summary: "Explains oxidation and reduction processes, oxidation number, and balancing of redox reactions.",
    formulas: [
      { label: "Oxidation Number Rule", formula: "Based on element position and bonding", unit: "—" },
      { label: "Equivalent Weight", formula: "Eq. wt. = Molar Mass / n-factor", unit: "g/equiv" }
    ],
    key_points: [
      "Oxidation is loss of electrons, reduction is gain of electrons.",
      "Redox reactions involve simultaneous oxidation and reduction.",
      "Oxidation number helps track electron transfer.",
      "Disproportionation: same species oxidized and reduced.",
      "Balancing uses ion-electron or oxidation number method.",
      "Redox reactions occur in batteries and metabolism.",
      "Oxidizing agent gets reduced; reducing agent gets oxidized.",
      "Redox titrations determine analyte concentration.",
      "Electron transfer is the essence of redox chemistry.",
      "Common in electrochemistry, metallurgy, and biology."
    ],
    note: "Forms the basis for electrochemical reactions — frequent in NEET/JEE MCQs."
  },

  lesson37: {
    title: "Organic Chemistry – Some Basic Principles & Techniques",
    summary: "Introduces classification, nomenclature, reaction types, electron displacement effects, and purification methods.",
    formulas: [],
    key_points: [
      "Organic compounds mainly contain carbon and hydrogen.",
      "IUPAC nomenclature standardizes compound naming.",
      "Functional groups define reactivity of molecules.",
      "Inductive, resonance, hyperconjugation affect electron density.",
      "Homolytic and heterolytic bond cleavage determine mechanisms.",
      "Types of reactions: substitution, elimination, addition, rearrangement.",
      "Purification methods include distillation, chromatography, crystallization.",
      "Qualitative tests identify elements like N, S, and halogens.",
      "Quantitative analysis estimates % composition.",
      "Reactivity is influenced by electronic effects and structure."
    ],
    note: "Foundational for organic reaction mechanisms — high yield in JEE/NEET."
  },

  lesson38: {
    title: "Hydrocarbons",
    summary: "Describes alkanes, alkenes, alkynes, and aromatic hydrocarbons with their preparation, properties, and reactions.",
    formulas: [],
    key_points: [
      "Hydrocarbons are classified as saturated, unsaturated, and aromatic.",
      "Alkanes undergo substitution reactions; alkenes and alkynes undergo addition.",
      "Markovnikov and anti-Markovnikov rules apply in electrophilic addition.",
      "Aromaticity follows Huckel’s rule (4n+2 π electrons).",
      "Benzene shows resonance and undergoes electrophilic substitution.",
      "Reactions include halogenation, nitration, sulphonation, Friedel–Crafts.",
      "Combustion of hydrocarbons releases CO₂ and energy.",
      "Alkynes are more reactive due to triple bond strain.",
      "Ozonolysis and Baeyer’s tests identify double/triple bonds.",
      "Hydrocarbons are fuels and feedstocks in industry."
    ],
    note: "Core organic chapter — important for reaction-based NEET/JEE questions."
  }
,

  lesson39: {
    title: "The s-Block Element",
    summary: "Covers properties of alkali and alkaline earth metals, their reactions, trends, and important compounds.",
    formulas: [],
    key_points: [
      "Group 1 (alkali metals) and Group 2 (alkaline earth metals) elements show increasing reactivity down the group.",
      "Their oxides and hydroxides are basic in nature.",
      "Hydration enthalpies decrease down the group.",
      "Solubility of hydroxides and carbonates increases down the group (for Group 2).",
      "Beryllium shows anomalous behavior due to small size and high charge density.",
      "Flame colorations are used to identify alkali/alkaline earth metals.",
      "Important compounds include sodium carbonate, calcium carbonate, quicklime, and slaked lime.",
      "Alkali metals form strong bases and are good reducing agents.",
      "Diagonal relationship exists between Li and Mg.",
      "Essential for metallurgy, daily applications, and ionic bonding understanding."
    ],
    note: "Highly conceptual for trends and periodicity — often asked in NEET/JEE."
  },

  lesson40: {
    title: "Some p-Block Elements",
    summary: "Explains Group 13 and 14 elements, their properties, oxides, compounds, and variations down the group.",
    formulas: [],
    key_points: [
      "Group 13 includes B, Al, Ga, In, Tl — shows +3 and +1 oxidation states.",
      "Boron is a metalloid; others are metals.",
      "Inert pair effect becomes prominent down the group.",
      "Group 14 includes C, Si, Ge, Sn, Pb — shows +4 and +2 oxidation states.",
      "Allotropes: diamond and graphite (C), white and red tin (Sn).",
      "CO₂ is acidic; SiO₂ is acidic; SnO and PbO are amphoteric.",
      "Anomalous behavior of boron due to small size, high electronegativity.",
      "Important compounds: borax, boric acid, aluminum chloride, silicones.",
      "Catenation is strong in carbon due to small size and high bond energy.",
      "Backbone of organic and inorganic compound structures."
    ],
    note: "Foundation for group chemistry — especially for s vs p-block comparison."
  },

  lesson41: {
    title: "Organic Chemistry – Some Basic Principles and Techniques",
    summary: "Introduces organic chemistry basics: structure, reactivity, IUPAC naming, and purification techniques.",
    formulas: [],
    key_points: [
      "Organic compounds contain mainly C and H with functional groups.",
      "Types of reactions: substitution, addition, elimination, rearrangement.",
      "IUPAC naming uses longest carbon chain and functional group priorities.",
      "Electron movement effects: inductive, resonance, hyperconjugation.",
      "Carbocations, carbanions, free radicals are reactive intermediates.",
      "Homolytic and heterolytic fission lead to different reaction paths.",
      "Purification includes distillation, crystallization, chromatography.",
      "Detection of elements: Lassaigne's test for N, S, halogens.",
      "Quantitative analysis: % composition of C, H, N etc.",
      "Key to understanding reaction mechanisms and structure-property relation."
    ],
    note: "Foundation for entire organic chemistry — important in NEET/JEE."
  },

  lesson42: {
    title: "Hydrocarbons",
    summary: "Describes classification, properties, reactions, and tests for alkanes, alkenes, alkynes, and aromatic compounds.",
    formulas: [],
    key_points: [
      "Hydrocarbons: alkanes (saturated), alkenes/alkynes (unsaturated), aromatic (benzene and derivatives).",
      "Alkanes: substitution reactions, low reactivity.",
      "Alkenes/alkynes: electrophilic addition reactions.",
      "Markovnikov’s and anti-Markovnikov’s rule explain orientation of additions.",
      "Aromaticity defined by Huckel’s rule (4n+2 π electrons).",
      "Benzene shows resonance and undergoes electrophilic substitution.",
      "Important reactions: halogenation, nitration, sulfonation, Friedel–Crafts.",
      "Oxidation tests: Baeyer’s test for unsaturation, ozonolysis.",
      "Combustion reactions produce energy — basis for fuel chemistry.",
      "Hydrocarbons are industrial feedstocks and energy sources."
    ],
    note: "Essential for organic chemistry reactions — many questions in NEET/JEE."
  },

  lesson43: {
    title: "Environmental Chemistry",
    summary: "Deals with environmental pollutants, greenhouse effect, acid rain, water and air pollution, and green chemistry.",
    formulas: [],
    key_points: [
      "Air pollution includes oxides of nitrogen, sulfur, carbon monoxide.",
      "Smog is of two types: classical and photochemical.",
      "Greenhouse gases (CO₂, CH₄, CFCs) contribute to global warming.",
      "Acid rain is caused by SO₂ and NOₓ forming sulfuric/nitric acids.",
      "Ozone layer depletion due to chlorofluorocarbons (CFCs).",
      "Water pollution: biological oxygen demand (BOD), chemical oxygen demand (COD).",
      "Common pollutants: detergents, heavy metals, pesticides.",
      "Green chemistry emphasizes eco-friendly and sustainable practices.",
      "Methods of waste disposal include recycling, treatment, incineration.",
      "Chemistry plays a key role in environment protection."
    ],
    note: "Interdisciplinary chapter — important for awareness and conceptual questions."
  }
,

  lesson44: {
    title: "The Solid State",
    summary: "Discusses types of solids, crystal lattices, unit cells, packing efficiency, and defects.",
    formulas: [
      { label: "Density of Unit Cell", formula: "ρ = (Z × M) / (a³ × Nₐ)", unit: "g/cm³" }
    ],
    key_points: [
      "Solids are classified as crystalline and amorphous.",
      "Crystal lattices have repeating unit cells — simple, body-centered, and face-centered.",
      "Packing efficiency varies: FCC > BCC > Simple Cubic.",
      "Imperfections include point defects like vacancies and interstitials.",
      "Ionic solids can exhibit Schottky and Frenkel defects.",
      "Conductors, semiconductors, and insulators differ in conductivity.",
      "Magnetic properties: diamagnetic, paramagnetic, ferromagnetic, etc.",
      "X-ray diffraction helps determine crystal structures."
    ],
    note: "Important for understanding physical structure and behavior of solids in NEET/JEE."
  },

  lesson45: {
    title: "Solutions",
    summary: "Covers concentration terms, solubility, Raoult’s law, colligative properties, and van’t Hoff factor.",
    formulas: [
      { label: "Molality", formula: "m = moles of solute / mass of solvent (kg)", unit: "mol/kg" },
      { label: "Mole Fraction", formula: "χ₁ = n₁ / (n₁ + n₂)", unit: "—" },
      { label: "Raoult’s Law", formula: "P₁ = χ₁ × P₁⁰", unit: "atm" },
      { label: "Elevation in Boiling Point", formula: "ΔT_b = i × K_b × m", unit: "K" },
      { label: "Depression in Freezing Point", formula: "ΔT_f = i × K_f × m", unit: "K" }
    ],
    key_points: [
      "Solution concentration can be expressed as molarity, molality, mole fraction, etc.",
      "Solubility depends on temperature and pressure (especially for gases).",
      "Raoult’s law applies to ideal solutions; deviations occur in non-ideal cases.",
      "Colligative properties depend on number, not type, of solute particles.",
      "Van’t Hoff factor accounts for ionization or association.",
      "Osmosis and reverse osmosis are key biological and industrial processes."
    ],
    note: "Fundamental for solution chemistry — highly numerical-based questions in exams."
  },

  lesson46: {
    title: "Electrochemistry",
    summary: "Explores electrochemical cells, electrode potential, Nernst equation, conductivity, and batteries.",
    formulas: [
      { label: "Nernst Equation", formula: "E = E° – (0.0591/n) log Q", unit: "V" },
      { label: "Gibbs Energy", formula: "ΔG = –nFE", unit: "J" },
      { label: "Conductivity", formula: "κ = 1/ρ", unit: "S/cm" },
      { label: "Molar Conductivity", formula: "Λₘ = κ × 1000 / c", unit: "S cm²/mol" }
    ],
    key_points: [
      "Galvanic cells convert chemical energy to electrical energy.",
      "Electrode potentials measure a half-cell’s tendency to gain/lose electrons.",
      "Nernst equation adjusts cell potential based on concentration.",
      "Kohlrausch’s law helps determine limiting molar conductivity.",
      "Electrolysis uses electricity to drive non-spontaneous reactions.",
      "Faraday’s laws quantify electrolysis products.",
      "Applications include batteries, corrosion, fuel cells, and electroplating."
    ],
    note: "Core for physical chemistry and electrochemical applications — must-know for NEET/JEE."
  },

  lesson47: {
    title: "Chemical Kinetics",
    summary: "Explains reaction rate, order, molecularity, rate laws, integrated rate equations, and catalysis.",
    formulas: [
      { label: "Rate Law", formula: "Rate = k[A]^m[B]^n", unit: "mol/L·s" },
      { label: "First Order", formula: "k = (2.303/t) log([A]₀/[A])", unit: "s⁻¹" },
      { label: "Half-Life (1st Order)", formula: "t½ = 0.693/k", unit: "s" },
      { label: "Arrhenius Equation", formula: "k = A·e^(–Ea/RT)", unit: "—" }
    ],
    key_points: [
      "Rate of reaction is change in concentration per unit time.",
      "Order is the sum of powers in the rate law — determined experimentally.",
      "Molecularity is theoretical and always a whole number.",
      "Integrated rate laws vary with order (0, 1, 2...).",
      "Temperature affects rate through Arrhenius equation.",
      "Catalysts alter rate without being consumed.",
      "Collision theory and activation energy explain reaction mechanism."
    ],
    note: "Essential for understanding dynamics of chemical reactions — key for concept + numericals."
  },

  lesson48: {
    title: "Surface Chemistry",
    summary: "Covers adsorption, catalysis, colloids, emulsions, and their applications.",
    formulas: [],
    key_points: [
      "Adsorption: accumulation of molecules on surface — physisorption vs chemisorption.",
      "Freundlich isotherm describes adsorption behavior.",
      "Catalysis: homogeneous and heterogeneous catalysis discussed with examples.",
      "Colloids are intermediate between true solutions and suspensions.",
      "Tyndall effect, Brownian motion, and charge stabilization characterize colloids.",
      "Emulsions are colloidal dispersions of liquids in liquids.",
      "Applications include cleansing actions, metallurgy, medicine, and environment."
    ],
    note: "Conceptual and real-world applications — useful for NEET and applied chemistry topics."
  }
,
  
  lesson48: {
    title: "The p-Block Elements",
    summary: "Discusses Group 15 elements, their physical and chemical properties, oxides, compounds like ammonia, nitric acid, phosphorus halides, and allotropes.",
    formulas: [],
    key_points: [
      "Group 15 elements: N, P, As, Sb, Bi — show +3 and +5 oxidation states.",
      "Nitrogen shows anomalous behavior (due to small size and high electronegativity).",
      "NH₃ is basic and forms hydrogen bonds; NO and NO₂ are important oxides.",
      "HNO₃ is a strong oxidizing agent and acid.",
      "Phosphorus exists as white, red, and black allotropes.",
      "Halides of phosphorus: PCl₃ and PCl₅ show different reactivity.",
      "Bonding and geometry vary with oxidation states.",
      "Industrial processes: Ostwald for HNO₃, Haber for NH₃.",
      "Environmental importance of nitrogen cycle and oxides.",
      "Essential for both theory and MCQ-type questions."
    ],
    note: "Key chapter for inorganic chemistry trends and structure — frequently appears in NEET/JEE."
  },

  lesson49: {
    title: "The d- and f-Block Elements",
    summary: "Explores transition and inner transition metals, their properties, oxidation states, complex formation, and color/magnetic behavior.",
    formulas: [],
    key_points: [
      "Transition metals: groups 3–12 — form colored ions and variable oxidation states.",
      "Properties: high melting points, conductivity, hardness, and catalytic activity.",
      "d-block shows gradual change in properties across periods.",
      "Magnetic behavior due to unpaired d-electrons.",
      "Interstitial compounds and alloy formation are common.",
      "Lanthanides (4f): show +3 oxidation state; small differences — lanthanide contraction.",
      "Actinides (5f): radioactive; +3 and variable oxidation states.",
      "Important compounds: KMnO₄, K₂Cr₂O₇ — strong oxidizers.",
      "Coordination and complex formation tendencies are high.",
      "Useful in electrochemistry, metallurgy, and catalysis."
    ],
    note: "Important for metallurgy, periodicity, and industrial applications — strong JEE/NEET focus."
  },

  lesson50: {
    title: "Coordination Compounds",
    summary: "Describes complex compounds, ligands, coordination numbers, IUPAC naming, isomerism, bonding, and applications.",
    formulas: [],
    key_points: [
      "Coordination compound = central metal + ligands.",
      "Ligands can be monodentate, bidentate, or polydentate.",
      "Coordination number = number of bonds with ligands.",
      "IUPAC naming uses oxidation state, ligand order.",
      "Types of isomerism: structural (linkage, ionization), stereo (geometrical, optical).",
      "Werner’s theory explains primary and secondary valency.",
      "Valence bond theory (VBT) explains hybridization of metal orbitals.",
      "Crystal field theory (CFT) discusses splitting of d-orbitals.",
      "Applications: bioinorganic chemistry (hemoglobin, chlorophyll), medicines, catalysts.",
      "Stability of complex depends on chelation, charge, and size of ligand."
    ],
    note: "Fundamental for understanding modern inorganic and bioinorganic chemistry."
  },
  lesson51: {
    title: "Haloalkanes and Haloarenes",
    summary: "Covers classification, nomenclature, preparation, properties, and reactions of haloalkanes and haloarenes. Highlights polyhalogen compounds and their environmental impacts.",
    formulas: [],
    key_points: [
      "Haloalkanes: Halogen atom(s) attached to sp³-hybridized carbon of alkyl group; Haloarenes: Halogen attached to sp²-hybridized carbon of aromatic ring.",
      "Classified as mono-, di-, or polyhalogen compounds; further subtypes include primary, secondary, and tertiary halides.",
      "Nomenclature follows IUPAC rules — common names still used in practice.",
      "Preparation methods: From alcohols, hydrocarbons (free radical halogenation, addition), Sandmeyer's reaction, halogen exchange (Finkelstein, Swarts reactions).",
      "Physical properties: Boiling points increase with molecular mass and decrease with branching; limited solubility in water but soluble in organic solvents.",
      "Chemical reactions include nucleophilic substitution (SN1 and SN2), elimination reactions (β-elimination), and reactions with metals (Grignard reagents, Wurtz reaction).",
      "SN1 proceeds via carbocation intermediate (racemisation); SN2 involves simultaneous bond breaking/forming (inversion of configuration).",
      "Aryl halides are less reactive in nucleophilic substitution due to resonance stabilization and sp² hybridization.",
      "Electrophilic substitutions in haloarenes are ortho, para-directed but occur slowly due to deactivation by halogens.",
      "Polyhalogen compounds (CH₂Cl₂, CHCl₃, CCl₄, Freons, DDT) have industrial uses but pose environmental hazards (ozone depletion, toxicity)."
    ],
    note: "Important chapter for reaction mechanisms (SN1/SN2), environmental chemistry, and real-world applications — highly relevant for NEET/JEE."
  },
  lesson52: {
    title: "Alcohols, Phenols and Ethers",
    summary: "Covers classification, nomenclature, preparation, properties, and reactions of alcohols, phenols, and ethers. Discusses their industrial importance, mechanisms, and environmental aspects.",
    formulas: [],
    key_points: [
      "Alcohols: Hydroxyl (-OH) group attached to an alkyl group; Phenols: -OH group attached to an aromatic ring; Ethers: Alkoxy (R–O–R') groups.",
      "Classified as mono-, di-, tri-, or polyhydric compounds based on the number of -OH groups; alcohols further classified as primary, secondary, tertiary based on the carbon atom's hybridization.",
      "Preparation of alcohols: hydration of alkenes, reduction of carbonyl compounds, Grignard reagent reactions; phenols: from haloarenes, cumene, diazonium salts; ethers: Williamson synthesis, dehydration of alcohols.",
      "Physical properties: Alcohols and phenols have higher boiling points due to hydrogen bonding; ethers have intermediate boiling points and are less polar.",
      "Chemical reactions of alcohols: nucleophilic substitution (to form alkyl halides), dehydration (to form alkenes), oxidation (forming aldehydes, ketones, acids).",
      "Phenols show acidic character, react with sodium to form phenoxides, undergo electrophilic substitution at ortho and para positions.",
      "Important reactions of phenols include Reimer-Tiemann (salicylaldehyde), Kolbe's reaction (hydroxybenzoic acids), bromination, and nitration.",
      "Ethers are relatively inert but cleave with hydrogen halides; aromatic ethers undergo electrophilic substitution directed ortho/para by alkoxy group.",
      "Boiling points increase with molecular mass and decrease with branching; solubility in water decreases with longer alkyl chains.",
      "Industrial and biological significance: ethanol as fuel and solvent, phenol in disinfectants, ethers as solvents and anesthetics."
    ],
    note: "Important chapter for functional group chemistry and reaction mechanisms — heavily emphasized in NEET/JEE and board exams."
  },

  lesson53: {
    title: "Aldehydes, Ketones and Carboxylic Acids",
    summary: "Discusses structure, nomenclature, preparation, and reactions of aldehydes, ketones, and carboxylic acids. Explores key industrial processes and tests.",
    formulas: [],
    key_points: [
      "Aldehydes: -CHO group; Ketones: >C=O group; Carboxylic acids: -COOH group.",
      "Preparation: oxidation of alcohols, hydration of alkynes, ozonolysis of alkenes, hydrolysis of nitriles.",
      "Aldehydes/ketones undergo nucleophilic addition: cyanohydrin, acetals, imines, hydrazones.",
      "Aldehydes oxidize easily (Tollens’, Fehling’s test); ketones resist mild oxidation.",
      "Reactions: Aldol condensation, Cannizzaro reaction, reduction (Clemmensen, Wolff-Kishner), halogenation of acids (HVZ reaction).",
      "Carboxylic acids prepared from oxidation, hydrolysis, and Grignard reagents with CO₂.",
      "Acids are more acidic than alcohols; strength influenced by substituents.",
      "Important examples: Formaldehyde, Acetaldehyde, Acetone, Acetic acid, Benzoic acid.",
      "Industrial uses: solvents, preservatives, plastics (e.g., formalin, bakelite).",
      "Essential for distinguishing functional groups and practicing mechanisms."
    ],
    note: "Core chapter for mechanisms, organic reactions, and practical applications in NEET/JEE."
  },

  lesson54: {
    title: "Amines",
    summary: "Covers structure, classification, nomenclature, preparation, and reactions of amines and diazonium salts. Highlights biological and industrial importance.",
    formulas: [],
    key_points: [
      "Amines: derivatives of ammonia classified as primary (1°), secondary (2°), tertiary (3°).",
      "Named as alkylamines or arylamines (e.g., methylamine, aniline).",
      "Preparation: reduction of nitro compounds, amides, nitriles, Hofmann bromamide reaction.",
      "Reactions: basic character, acylation, alkylation, reaction with nitrous acid, diazotization.",
      "Diazonium salts used in synthesis of azo dyes and other aromatic compounds.",
      "Physical properties influenced by hydrogen bonding and molecular mass.",
      "Aromatic amines are less basic than aliphatic amines due to electron delocalization.",
      "Biological role as neurotransmitters, medicines, and synthetic intermediates.",
      "Electrophilic substitution in aniline occurs at ortho and para positions.",
      "Important chapter for understanding basicity trends and aromatic substitution."
    ],
    note: "Crucial for mechanism-based questions and aromatic compound synthesis in NEET/JEE."
  },

  lesson55: {
    title: "Biomolecules",
    summary: "Explains the structure, classification, and biological functions of carbohydrates, proteins, enzymes, vitamins, and nucleic acids.",
    formulas: [],
    key_points: [
      "Carbohydrates: polyhydroxy aldehydes/ketones; classified as monosaccharides, oligosaccharides, polysaccharides.",
      "Proteins: composed of amino acids linked by peptide bonds; have primary to quaternary structures.",
      "Enzymes: biological catalysts with substrate specificity; follow lock-and-key mechanism.",
      "Vitamins: essential organic compounds classified as water-soluble and fat-soluble.",
      "Nucleic acids: DNA and RNA — store and transfer genetic information.",
      "Differences between DNA and RNA: sugar type, nitrogen bases, and structure.",
      "Carbohydrates and proteins are key food constituents; nucleic acids vital for heredity.",
      "Amino acids classified as acidic, basic, and neutral; exhibit zwitterionic nature.",
      "Deficiency of vitamins leads to diseases (scurvy, rickets, etc.).",
      "Important for biology-chemistry integration and bio-organic chemistry basics."
    ],
    note: "Essential for NEET; builds biochemical understanding relevant to life processes."
  },

  lesson56: {
    title: "Polymers",
    summary: "Covers the classification, preparation, and properties of natural and synthetic polymers, including biodegradable polymers and industrial applications.",
    formulas: [],
    key_points: [
      "Polymers: macromolecules made of repeating monomer units; formed via polymerization.",
      "Classified by source: natural (rubber, proteins), semi-synthetic (rayon), synthetic (plastics).",
      "Types by structure: linear, branched, cross-linked polymers.",
      "Polymerization types: addition (polyethene, PVC), condensation (nylon, terylene).",
      "Molecular mass and intermolecular forces determine polymer properties.",
      "Important polymers: polythene, PVC, teflon, bakelite, nylon 6,6, neoprene.",
      "Biodegradable polymers: PHBV, Nylon-2-Nylon-6 reduce environmental impact.",
      "Synthetic rubbers: Buna-S, Buna-N, neoprene — used in tyres, belts, hoses.",
      "Vulcanization improves rubber elasticity and durability.",
      "Integral for understanding material science and industrial chemistry."
    ],
    note: "Relevant for environment-friendly chemistry, polymer technology, and industrial uses — frequent NEET/JEE topic."
  },

  lesson57: {
    title: "Chemistry in Everyday Life",
    summary: "Explores the chemistry behind drugs, food additives, and cleansing agents. Covers their classification, mechanisms, and societal impacts.",
    formulas: [],
    key_points: [
      "Drugs classified as antacids, antihistamines, antibiotics, antiseptics, disinfectants, analgesics, tranquilizers, and antifertility agents.",
      "Drugs interact with enzymes and receptors as drug targets.",
      "Mechanism: drugs either inhibit enzyme action or block receptors.",
      "Food additives: preservatives, artificial sweeteners (aspartame, saccharin), antioxidants.",
      "Cleansing agents: soaps and synthetic detergents; detergents classified as anionic, cationic, and non-ionic.",
      "Synthetic detergents work in hard water; environmental concerns with non-biodegradable types.",
      "Examples: Dettol (antiseptic), chloramphenicol (antibiotic), ranitidine (antacid).",
      "Controlled drug design minimizes side effects and maximizes efficacy.",
      "Drugs act by altering physiological processes or killing pathogens.",
      "Chapter connects chemistry to health, hygiene, and quality of life."
    ],
    note: "Simple but high-scoring chapter in NEET/JEE; connects chemistry to real-world applications."
  }
,
  lesson58: {
    title: "The Living World",
    summary: "Introduces the characteristics of living organisms, diversity in the living world, and the basics of taxonomy and classification.",
    formulas: [],
    key_points: [
      "Living organisms show growth, reproduction, metabolism, cellular organization, consciousness, and homeostasis.",
      "Biodiversity refers to the variety of living forms on Earth.",
      "Taxonomy involves classification, identification, nomenclature, and documentation of species.",
      "Binomial nomenclature by Linnaeus uses a two-word naming system (Genus + species).",
      "Taxonomic hierarchy: Kingdom → Phylum → Class → Order → Family → Genus → Species.",
      "Taxonomic aids like herbaria, botanical gardens, zoos, and museums help study and preserve biodiversity.",
      "Species is the basic unit of classification; it defines organisms capable of interbreeding.",
      "Taxonomic keys are used to identify plants and animals based on contrasting characters.",
      "Scientific naming helps avoid confusion caused by common names.",
      "Emphasizes the need to document and conserve biodiversity."
    ],
    note: "Fundamental chapter for understanding biological classification and biodiversity conservation — important for NEET basics."
  },

  lesson59: {
    title: "Biological Classification",
    summary: "Explores the classification of living organisms into five kingdoms and the features of various microbial and lower organism groups.",
    formulas: [],
    key_points: [
      "Whittaker's five-kingdom classification: Monera, Protista, Fungi, Plantae, Animalia.",
      "Monera includes prokaryotic organisms like bacteria and cyanobacteria.",
      "Protista comprises unicellular eukaryotes like algae, protozoa, and slime molds.",
      "Fungi are heterotrophic, decomposers, or symbionts; reproduce through spores.",
      "Viruses, viroids, and lichens are discussed outside the five-kingdom system.",
      "Bacterial classification based on shape, mode of nutrition, and Gram staining.",
      "Protists show diverse modes of locomotion and nutrition.",
      "Fungi classified into Phycomycetes, Ascomycetes, Basidiomycetes, Deuteromycetes.",
      "Lichens are symbiotic associations between algae and fungi.",
      "Viruses are obligate parasites with a protein coat and nucleic acid core."
    ],
    note: "Core chapter to understand microbial world and basis of biological classification — frequently asked in NEET."
  },

  lesson60: {
    title: "Plant Kingdom",
    summary: "Describes the classification of plants into algae, bryophytes, pteridophytes, gymnosperms, and angiosperms, focusing on their life cycles and reproduction.",
    formulas: [],
    key_points: [
      "Algae: simple, autotrophic, aquatic plants — classified as Chlorophyceae, Phaeophyceae, Rhodophyceae.",
      "Bryophytes are non-vascular, require water for reproduction; include mosses and liverworts.",
      "Pteridophytes: first vascular plants; include ferns and horsetails.",
      "Gymnosperms produce naked seeds; examples: pines, cycads.",
      "Angiosperms produce covered seeds; classified into monocots and dicots.",
      "Plant life cycles show alternation of generations: haploid gametophyte and diploid sporophyte.",
      "Features like vascular tissue, seed formation, and flowers mark evolutionary advancements.",
      "Plant reproduction modes include vegetative, asexual, and sexual reproduction.",
      "Economic importance of plants as food, medicine, and raw materials.",
      "Familiarity with plant diversity is essential for understanding ecology and botany."
    ],
    note: "Key chapter for understanding plant diversity, evolution, and reproduction — vital for botany in NEET."
  },

  lesson61: {
    title: "Animal Kingdom",
    summary: "Explores the classification of animals from simple to complex forms based on organization, symmetry, and body plan.",
    formulas: [],
    key_points: [
      "Animal classification based on body symmetry, level of organization, coelom type, segmentation, and notochord presence.",
      "Non-chordates include Porifera (sponges), Cnidaria (jellyfish), Platyhelminthes (flatworms), and more.",
      "Chordates have a notochord, dorsal nerve cord, and pharyngeal gill slits at some stage of life.",
      "Phylum Chordata further classified into classes like Pisces, Amphibia, Reptilia, Aves, and Mammalia.",
      "Porifera are asymmetrical and have a porous body with canal systems.",
      "Cnidarians show radial symmetry and stinging cells (cnidocytes).",
      "Annelids, Arthropods, Molluscs, and Echinoderms show increasing complexity in body design.",
      "Vertebrates have a well-developed endoskeleton and advanced organ systems.",
      "Adaptations like feathers, limbs, and respiration modes distinguish various classes.",
      "Understanding animal phyla aids in comparative anatomy and evolution studies."
    ],
    note: "Crucial for animal classification questions in NEET; builds foundation for animal physiology topics."
  }
,

  lesson62: {
    title: "Morphology of Flowering Plants",
    summary: "Studies the external structure of plants, including roots, stems, leaves, flowers, fruits, and seeds, along with modifications and plant family characteristics.",
    formulas: [],
    key_points: [
      "Roots classified as tap, fibrous, and adventitious; modifications for storage, support, and respiration.",
      "Stems modified for storage (potato), climbing (tendrils), and protection (thorns).",
      "Leaf: structure includes petiole, lamina; types of venation and phyllotaxy.",
      "Inflorescence: racemose and cymose types.",
      "Flower structure: calyx, corolla, androecium, and gynoecium; floral formula and floral diagram.",
      "Fruits classified as simple, aggregate, or multiple.",
      "Seed structure varies between monocots and dicots.",
      "Key plant families: Fabaceae (legumes), Solanaceae (potato family), and Liliaceae (lilies).",
      "Morphological adaptations enhance plant survival.",
      "Essential for identification and classification in practical exams."
    ],
    note: "Frequently tested in NEET for floral formulas, plant parts, and examples from families."
  },

  lesson63: {
    title: "Anatomy of Flowering Plants",
    summary: "Explains the internal structure of plants, detailing various tissues, tissue systems, and the anatomy of dicot and monocot plants.",
    formulas: [],
    key_points: [
      "Tissues classified as meristematic and permanent (simple and complex).",
      "Vascular tissues: xylem and phloem conduct water and food.",
      "Three tissue systems: epidermal, ground, and vascular tissue systems.",
      "Dicot and monocot stem, root, and leaf have distinct anatomical features.",
      "Secondary growth in dicot stems and roots increases girth through vascular cambium activity.",
      "Annual rings form due to variations in xylem development in different seasons.",
      "Cork cambium forms protective bark layers.",
      "Stomatal apparatus regulates gas exchange and transpiration.",
      "Internal adaptations reflect environmental conditions (xerophytes, hydrophytes).",
      "Key for structural understanding of plant function and support."
    ],
    note: "Important for plant physiology basics and anatomical adaptations in NEET."
  },

  lesson64: {
    title: "Structural Organisation in Animals",
    summary: "Describes animal tissues and the anatomy of model organisms, focusing on tissue types and organ systems.",
    formulas: [],
    key_points: [
      "Animal tissues classified as epithelial, connective, muscular, and nervous tissue.",
      "Epithelial tissue: covers body surfaces and lines cavities; types include squamous, cuboidal, and columnar.",
      "Connective tissue types: loose (areolar), dense, skeletal (cartilage, bone), fluid (blood).",
      "Muscular tissue includes skeletal, smooth, and cardiac muscles.",
      "Nervous tissue composed of neurons and neuroglia.",
      "Morphology and anatomy of earthworm, cockroach, and frog explained in detail.",
      "Organ systems: digestive, circulatory, respiratory, excretory, and reproductive.",
      "Body organization: cell → tissue → organ → organ system → organism.",
      "Comparative anatomy highlights evolutionary trends.",
      "Key for animal physiology and NEET practical knowledge."
    ],
    note: "Core topic for understanding how structure supports animal function; heavily tested in NEET."
  },

  lesson65: {
    title: "Cell: The Unit of Life",
    summary: "Introduces the basic structural and functional unit of life, comparing prokaryotic and eukaryotic cells and explaining cell organelles.",
    formulas: [],
    key_points: [
      "Cell theory states that all living organisms are composed of cells and arise from pre-existing cells.",
      "Prokaryotic cells lack membrane-bound organelles; bacteria and cyanobacteria are examples.",
      "Eukaryotic cells have a defined nucleus and membrane-bound organelles.",
      "Cell organelles: mitochondria (powerhouse), chloroplasts (photosynthesis), ER (transport), Golgi apparatus (packaging), lysosomes (digestion).",
      "Plasma membrane is selectively permeable and made of phospholipid bilayer.",
      "Ribosomes synthesize proteins; found in both prokaryotes and eukaryotes.",
      "Cytoskeleton provides structural support and intracellular transport.",
      "Differences between plant and animal cells: chloroplast, cell wall, vacuoles.",
      "Cell functions include metabolism, growth, and reproduction.",
      "Foundation for molecular biology and genetics studies."
    ],
    note: "Fundamental for all biological processes and molecular biology — high NEET relevance."
  },

  lesson66: {
    title: "Biomolecules",
    summary: "Explores the structure and function of biomolecules like carbohydrates, proteins, lipids, nucleic acids, and enzymes.",
    formulas: [],
    key_points: [
      "Carbohydrates classified as monosaccharides, disaccharides, and polysaccharides; serve as energy sources and structural materials.",
      "Proteins are polymers of amino acids linked by peptide bonds; serve structural and enzymatic functions.",
      "Lipids include fats, oils, and phospholipids — provide energy storage and membrane structure.",
      "Nucleic acids (DNA and RNA) store and transfer genetic information.",
      "Enzymes are biological catalysts, highly specific for their substrates.",
      "Metabolic pathways: catabolism (breakdown) and anabolism (synthesis).",
      "Vitamins and minerals are essential micronutrients.",
      "Biomolecules form the molecular basis of life processes.",
      "Properties of biomolecules depend on their structure and bonding.",
      "Foundation for understanding cell chemistry and physiology."
    ],
    note: "Crucial for NEET and understanding metabolic and genetic processes."
  }
,

  lesson67: {
    title: "Cell Cycle and Cell Division",
    summary: "Explains the processes of growth and reproduction in cells, covering stages of the cell cycle, mitosis, meiosis, and the significance of each division.",
    formulas: [],
    key_points: [
      "The cell cycle includes interphase (G1, S, G2) and M phase (mitosis or meiosis).",
      "Mitosis results in two identical daughter cells; essential for growth and repair.",
      "Meiosis produces four haploid cells; introduces genetic variation through recombination.",
      "Chromosome number is maintained in mitosis but halved in meiosis.",
      "Prophase, metaphase, anaphase, telophase — stages of mitosis.",
      "Meiosis I (reductional) and Meiosis II (equational) — with distinct phases.",
      "Significance: genetic stability (mitosis), variation (meiosis), gamete formation.",
      "Checkpoints regulate progression through the cell cycle.",
      "Cancer results from uncontrolled cell division due to checkpoint failure.",
      "Essential for understanding reproduction and genetics in higher organisms."
    ],
    note: "Crucial for NEET and board questions on genetics and heredity."
  },

  lesson68: {
    title: "Transport in Plants",
    summary: "Discusses the movement of water, minerals, and food in plants through various physiological processes.",
    formulas: [],
    key_points: [
      "Transport occurs over short and long distances; includes diffusion, facilitated diffusion, and active transport.",
      "Water moves by osmosis; solute potential and pressure potential drive water movement.",
      "Long-distance transport by xylem (water/minerals) and phloem (food).",
      "Transpiration pull is the major force in xylem transport (cohesion-tension theory).",
      "Phloem transport explained by pressure flow hypothesis.",
      "Transport proteins and ATP are involved in active transport.",
      "Root pressure and capillarity also contribute to water ascent.",
      "Water and nutrient movement critical for photosynthesis and growth.",
      "Environmental conditions influence transpiration rate.",
      "Key for understanding plant physiology and environmental interactions."
    ],
    note: "Vital for NEET plant physiology section; integrates physics and biology."
  },

  lesson69: {
    title: "Mineral Nutrition",
    summary: "Explains the essential mineral elements for plants, their functions, deficiency symptoms, and nitrogen metabolism.",
    formulas: [],
    key_points: [
      "Macronutrients: N, P, K, Ca, Mg, S; Micronutrients: Fe, Zn, Cu, Mo, etc.",
      "Essential elements play roles in enzyme activation, osmoregulation, and structural functions.",
      "Deficiency symptoms include chlorosis, necrosis, stunted growth.",
      "Nitrogen cycle: nitrogen fixation, ammonification, nitrification, denitrification.",
      "Biological nitrogen fixation by Rhizobium, Azotobacter; industrial fixation (Haber process).",
      "Symbiotic nitrogen fixation in leguminous plants.",
      "Mineral uptake is selective and energy-dependent.",
      "Toxicity of minerals occurs when excess disrupts metabolic functions.",
      "Hydroponics helps study mineral requirements.",
      "Critical for agriculture, ecology, and plant metabolism studies."
    ],
    note: "Important for practical applications in agriculture and NEET questions."
  },

  lesson70: {
    title: "Photosynthesis in Higher Plants",
    summary: "Describes the process of photosynthesis, its light and dark reactions, and the factors affecting it.",
    formulas: [],
    key_points: [
      "Photosynthesis converts light energy into chemical energy (glucose).",
      "Occurs in chloroplasts — light reactions in thylakoids, Calvin cycle in stroma.",
      "Light reaction: photolysis of water, ATP and NADPH formation (Z-scheme).",
      "Calvin cycle fixes CO₂ using ATP and NADPH; occurs in three phases: carboxylation, reduction, regeneration.",
      "C₄ and CAM plants adapted to minimize photorespiration.",
      "Chlorophyll a, chlorophyll b, carotenoids absorb light energy.",
      "Factors: light intensity, CO₂ concentration, temperature, and water availability.",
      "Photosynthesis equation: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.",
      "Essential for oxygen production and energy flow in ecosystems.",
      "Foundation for bioenergetics and plant metabolism in NEET."
    ],
    note: "Central concept for understanding plant life processes and energy flow."
  },

  lesson71: {
    title: "Respiration in Plants",
    summary: "Covers the breakdown of glucose to release energy, describing glycolysis, Krebs cycle, electron transport chain, and fermentation.",
    formulas: [],
    key_points: [
      "Respiration releases energy (ATP) by breaking down organic molecules.",
      "Glycolysis occurs in cytoplasm; glucose breaks into pyruvate, yielding ATP and NADH.",
      "Krebs cycle occurs in mitochondria; produces NADH, FADH₂, and CO₂.",
      "Electron transport chain produces maximum ATP through oxidative phosphorylation.",
      "Anaerobic respiration (fermentation) occurs in absence of oxygen (alcoholic, lactic acid fermentation).",
      "Respiratory quotient (RQ) varies with substrate (carbohydrates, fats, proteins).",
      "ATP is the universal energy currency of the cell.",
      "Difference between aerobic and anaerobic respiration in energy yield.",
      "Respiration essential for plant growth, maintenance, and biosynthesis.",
      "Connects with human respiration and cellular energy management."
    ],
    note: "Essential for NEET cell respiration and energy conversion topics."
  }
,

  lesson72: {
    title: "Plant Growth and Development",
    summary: "Covers the phases of growth in plants, plant hormones, environmental effects, and physiological processes controlling growth and development.",
    formulas: [],
    key_points: [
      "Growth is an irreversible increase in size and dry mass.",
      "Phases: meristematic, elongation, and maturation regions.",
      "Growth measured by parameters like length, area, volume, and weight.",
      "Plant hormones: auxins, gibberellins, cytokinins, abscisic acid (ABA), and ethylene regulate growth.",
      "Photoperiodism controls flowering in response to day length.",
      "Vernalisation induces flowering by exposure to low temperatures.",
      "Seed dormancy and germination controlled by hormones and environmental conditions.",
      "Senescence and abscission are controlled physiological processes.",
      "Tropisms (phototropism, geotropism, etc.) direct plant movements.",
      "Growth and development are interdependent and hormonally regulated."
    ],
    note: "Key for NEET questions on hormones and plant responses to environmental factors."
  },

  lesson73: {
    title: "Digestion and Absorption",
    summary: "Explains the human digestive system, enzymes involved in digestion, absorption of nutrients, and common digestive disorders.",
    formulas: [],
    key_points: [
      "Human digestive system includes alimentary canal and associated glands.",
      "Mechanical and chemical digestion break food into absorbable units.",
      "Digestive enzymes: amylases, proteases, lipases, nucleases.",
      "Small intestine is the main site of absorption through villi and microvilli.",
      "Carbohydrates break down to monosaccharides; proteins to amino acids; lipids to fatty acids and glycerol.",
      "Bile aids in fat emulsification but has no enzymes.",
      "Common disorders: indigestion, constipation, diarrhea, jaundice.",
      "Peristalsis ensures the movement of food along the canal.",
      "Absorbed nutrients transported via blood and lymph.",
      "Vital for understanding energy supply and metabolism."
    ],
    note: "Frequently tested in NEET and board exams for processes and enzyme actions."
  },

  lesson74: {
    title: "Breathing and Exchange of Gases",
    summary: "Describes the mechanism of breathing, transport of gases, and respiratory disorders in humans.",
    formulas: [],
    key_points: [
      "Respiratory organs: lungs, alveoli, and airways.",
      "Breathing involves inspiration and expiration, controlled by diaphragm and intercostal muscles.",
      "Exchange of gases occurs by diffusion in alveoli and tissues.",
      "Oxygen transported by hemoglobin as oxyhemoglobin; CO₂ transported as bicarbonate, carbaminohemoglobin, and dissolved form.",
      "Respiratory volume terms: tidal volume, vital capacity, residual volume, etc.",
      "Neural and chemical regulation of breathing adjusts rate and depth.",
      "Disorders include asthma, emphysema, bronchitis, and occupational diseases.",
      "Partial pressure differences drive gas exchange.",
      "Respiratory quotient indicates the type of substrate used in respiration.",
      "Essential for understanding human physiology in NEET."
    ],
    note: "Core chapter for NEET questions on respiratory mechanics and gas transport."
  },

  lesson75: {
    title: "Body Fluids and Circulation",
    summary: "Covers the composition of blood and lymph, the heart’s anatomy, blood circulation pathways, and common cardiovascular disorders.",
    formulas: [],
    key_points: [
      "Blood composed of plasma, RBCs, WBCs, and platelets; transports gases, nutrients, and hormones.",
      "Blood groups and Rh factor important for transfusion compatibility.",
      "Heart has four chambers; pumps blood through pulmonary and systemic circuits.",
      "Cardiac cycle includes systole and diastole phases.",
      "Double circulation ensures oxygenated and deoxygenated blood don’t mix.",
      "ECG records electrical activity of the heart.",
      "Lymph helps return interstitial fluid to circulation and transport fats.",
      "Common disorders: hypertension, coronary artery disease, heart failure.",
      "Blood clotting prevents blood loss at injury sites.",
      "Circulatory system ensures efficient transport of essential substances."
    ],
    note: "Highly tested in NEET for physiology and human anatomy questions."
  },

  lesson76: {
    title: "Excretory Products and Their Elimination",
    summary: "Describes the human excretory system, formation of urine, osmoregulation, and related disorders.",
    formulas: [],
    key_points: [
      "Excretion removes metabolic wastes (mainly nitrogenous wastes) from the body.",
      "Human excretory system includes kidneys, ureters, bladder, and urethra.",
      "Nephron is the structural and functional unit of kidney.",
      "Urine formation involves filtration, reabsorption, secretion, and concentration.",
      "ADH, aldosterone, and renin regulate water and electrolyte balance.",
      "Ureotelic animals excrete urea; aquatic organisms are ammonotelic; reptiles and birds are uricotelic.",
      "Osmoregulation maintains water and ion balance in the body.",
      "Dialysis is used in kidney failure to remove waste from blood.",
      "Disorders: kidney stones, glomerulonephritis, and renal failure.",
      "Maintaining excretory health is crucial for homeostasis."
    ],
    note: "Common NEET topic; important for understanding human physiology and disorders."
  }
,

  lesson77: {
    title: "Locomotion and Movement",
    summary: "Explores types of movement in the human body, muscle contraction, and the skeletal system.",
    formulas: [],
    key_points: [
      "Movement types: amoeboid, ciliary, muscular — movement is essential for survival.",
      "Muscles classified as skeletal, smooth, and cardiac based on structure and function.",
      "Skeletal muscles show voluntary control and striations; basic contractile unit is the sarcomere.",
      "Muscle contraction explained by sliding filament theory (actin and myosin interaction).",
      "Calcium ions and ATP are essential for muscle contraction.",
      "Bones form the rigid endoskeleton; joints allow movement between bones.",
      "Axial skeleton includes skull, vertebral column, ribs, sternum; appendicular skeleton includes limb bones and girdles.",
      "Disorders: myasthenia gravis, muscular dystrophy, arthritis, osteoporosis.",
      "Locomotion involves coordination of muscles, bones, and nerves.",
      "Vital for understanding body movements in humans and animals."
    ],
    note: "Frequently tested in NEET for muscle contraction mechanism and skeletal anatomy."
  },

  lesson78: {
    title: "Neural Control and Coordination",
    summary: "Describes the structure and functioning of neurons, the nervous system, reflexes, and the human brain.",
    formulas: [],
    key_points: [
      "Neurons are the structural and functional units of the nervous system; conduct nerve impulses.",
      "Nervous system divided into central (CNS), peripheral (PNS), and autonomic (ANS) systems.",
      "Transmission of nerve impulse involves electrical and chemical changes across the synapse.",
      "CNS includes the brain and spinal cord; brain regions: cerebrum, cerebellum, diencephalon, and brainstem.",
      "Reflex arc explains involuntary actions; consists of receptor, sensory neuron, interneuron, motor neuron, and effector.",
      "Autonomic nervous system regulates involuntary activities; divided into sympathetic and parasympathetic systems.",
      "Sense organs (eye, ear) process stimuli into neural signals.",
      "Disorders: epilepsy, Alzheimer’s disease, Parkinson’s disease.",
      "Electrochemical gradients are key in nerve impulse conduction.",
      "Essential for NEET understanding of human physiology and response systems."
    ],
    note: "High-yield chapter for NEET neural physiology and reflex actions."
  },

  lesson79: {
    title: "Chemical Coordination and Integration",
    summary: "Explains the endocrine system in humans, hormones, their secretion, and physiological effects.",
    formulas: [],
    key_points: [
      "Endocrine glands secrete hormones directly into the bloodstream.",
      "Major glands: pituitary, thyroid, parathyroid, adrenal, pancreas, testes, and ovaries.",
      "Hormones regulate metabolism, growth, reproduction, and homeostasis.",
      "Pituitary gland is the master gland controlling other endocrine glands.",
      "Negative feedback mechanism maintains hormonal balance.",
      "Disorders include diabetes mellitus, hypothyroidism, hyperthyroidism, Addison’s disease, gigantism, and dwarfism.",
      "Pancreas secretes insulin and glucagon to regulate blood glucose levels.",
      "Adrenal glands produce adrenaline, cortisol — regulate stress response and metabolism.",
      "Chemical coordination complements neural control in body regulation.",
      "Hormonal actions are slow but long-lasting compared to neural signals."
    ],
    note: "Vital chapter for NEET questions on endocrine physiology and hormone disorders."
  }
,  lesson80: {
    title: "Reproduction in Organisms",
    summary: "Introduces modes of reproduction (asexual and sexual) in living organisms and explains their significance for continuity of species.",
    formulas: [],
    key_points: [
      "Reproduction enables species continuity over generations.",
      "Asexual reproduction involves a single parent; offspring are genetically identical (clones).",
      "Asexual methods: binary fission, budding, spore formation, vegetative propagation.",
      "Sexual reproduction involves gamete formation and fertilization; results in variation.",
      "Life span of organisms varies widely and determines their reproductive phase.",
      "Reproductive phases: juvenile/vegetative phase, reproductive phase, and senescence.",
      "Events of sexual reproduction: pre-fertilisation (gametogenesis, gamete transfer), fertilisation, post-fertilisation.",
      "Syngamy (fusion of gametes) forms the diploid zygote.",
      "Zygote develops into an embryo or a new organism.",
      "Reproduction balances birth and death in populations."
    ],
    note: "Essential for understanding the basics of reproduction; foundational for NEET questions."
  },

  lesson81: {
    title: "Sexual Reproduction in Flowering Plants",
    summary: "Explores flower structure, gametogenesis, pollination, fertilisation, seed and fruit formation in angiosperms.",
    formulas: [],
    key_points: [
      "Flowers are the reproductive organs of angiosperms.",
      "Male gametes form in anthers (microsporogenesis); female gametes in ovules (megasporogenesis).",
      "Pollination: transfer of pollen from anther to stigma; can be self or cross-pollination.",
      "Double fertilisation is unique to angiosperms (syngamy and triple fusion).",
      "Post-fertilisation events: zygote forms embryo, ovules form seeds, ovary forms fruit.",
      "Seed dispersal ensures species spread and survival.",
      "Apomixis and polyembryony are special reproductive strategies.",
      "Pollination adaptations involve biotic and abiotic agents.",
      "Floral formulae and diagrams summarize flower structure.",
      "Important for plant breeding and biodiversity."
    ],
    note: "Heavily tested for mechanisms of fertilisation and pollination in NEET."
  },

  lesson82: {
    title: "Human Reproduction",
    summary: "Describes the structure and function of male and female reproductive systems, gamete formation, fertilisation, pregnancy, and childbirth.",
    formulas: [],
    key_points: [
      "Male reproductive system produces sperm; female system produces ova.",
      "Gametogenesis includes spermatogenesis and oogenesis.",
      "Fertilisation occurs in the fallopian tube; forms a diploid zygote.",
      "Implantation of the embryo occurs in the uterus lining.",
      "Pregnancy involves embryonic development (gestation).",
      "Menstrual cycle regulates reproductive events in females.",
      "Birth process (parturition) triggered by hormonal changes.",
      "Lactation provides nourishment through breast milk.",
      "Hormonal control: FSH, LH, estrogen, progesterone, oxytocin.",
      "Viviparity increases offspring survival compared to oviparity."
    ],
    note: "Core chapter for NEET human physiology and reproductive system questions."
  },

  lesson83: {
    title: "Reproductive Health",
    summary: "Covers the importance of reproductive health, birth control methods, sexually transmitted diseases (STDs), infertility, and population control strategies.",
    formulas: [],
    key_points: [
      "Reproductive health means complete well-being in reproductive functioning (physical, emotional, social).",
      "Family planning includes contraception and birth control methods (barriers, pills, IUDs, sterilisation).",
      "Medically assisted reproduction includes IVF, ZIFT, and artificial insemination.",
      "Awareness programs promote reproductive health and prevent diseases.",
      "Population explosion managed through education and contraception.",
      "Sexually transmitted diseases (STDs): HIV/AIDS, syphilis, gonorrhea, hepatitis B.",
      "Early detection and treatment prevent complications from STDs.",
      "Government programs like RCH (Reproductive and Child Health) promote safe motherhood.",
      "Infertility causes: physical, hormonal, environmental, psychological.",
      "Balanced reproductive health ensures a healthier society."
    ],
    note: "Important for NEET questions on contraception, STDs, and public health."
  },

  lesson84: {
    title: "Principles of Inheritance and Variation",
    summary: "Introduces Mendelian genetics, inheritance patterns, sex determination, mutations, and genetic disorders.",
    formulas: [],
    key_points: [
      "Mendel’s laws: Law of Dominance, Segregation, and Independent Assortment.",
      "Monohybrid and dihybrid crosses explain inheritance of traits.",
      "Sex determination mechanisms: XY (humans), XO (insects), ZW (birds).",
      "Mutation introduces changes in DNA sequence, leading to variation.",
      "Genetic disorders: Mendelian (sickle cell anemia, hemophilia) and chromosomal (Down’s syndrome).",
      "Pedigree analysis traces inheritance in families.",
      "Genes located on chromosomes; follow chromosomal theory of inheritance.",
      "Linkage and recombination explain deviations from independent assortment.",
      "Alleles are alternate forms of a gene controlling a trait.",
      "Foundational for modern genetics and molecular biology."
    ],
    note: "Critical for NEET genetics problems and inheritance-based MCQs."
  },
  lesson85: {
    title: "Molecular Basis of Inheritance",
    summary: "Explains the structure of genetic material (DNA and RNA), its replication, transcription, translation, regulation of gene expression, and applications like DNA fingerprinting and the Human Genome Project.",
    formulas: [],
    key_points: [
      "DNA is the genetic material; RNA acts as a messenger or catalyst in some cases.",
      "Structure of DNA proposed by Watson and Crick as a double helix.",
      "DNA replication is semi-conservative, catalyzed by DNA polymerases.",
      "Transcription forms mRNA from DNA using RNA polymerase.",
      "Translation converts mRNA into proteins at ribosomes.",
      "Genetic code is universal, triplet-based, and degenerate.",
      "Gene expression is regulated through operons like the lac operon.",
      "Human Genome Project mapped the complete human DNA sequence.",
      "DNA fingerprinting identifies individuals based on unique DNA patterns.",
      "Foundational for genetics, biotechnology, and molecular biology applications."
    ],
    note: "Crucial for NEET genetics and biotechnology; frequent conceptual questions."
  },

  lesson86: {
    title: "Evolution",
    summary: "Describes the origin of life, theories of evolution, mechanisms driving changes in species, and evidence supporting evolution.",
    formulas: [],
    key_points: [
      "Life originated about 3.5 billion years ago; Big Bang explains the origin of the universe.",
      "Oparin-Haldane hypothesis proposes life arose from a primordial soup.",
      "Darwin’s theory of natural selection and branching descent explains evolution.",
      "Lamarck proposed inheritance of acquired characters; disproved.",
      "Evidence from fossils, anatomy, embryology, and molecular biology supports evolution.",
      "Adaptive radiation produces diversity from a common ancestor (e.g., Darwin’s finches).",
      "Hardy-Weinberg principle explains genetic equilibrium in populations.",
      "Mechanisms: mutation, recombination, gene flow, genetic drift, natural selection.",
      "Human evolution traced from primates to Homo sapiens.",
      "Key for understanding biodiversity and speciation processes."
    ],
    note: "Important for NEET questions on evolution theories and evidences."
  },

  lesson87: {
    title: "Human Health and Disease",
    summary: "Explores the concept of health, common diseases, immunity, AIDS, cancer, drug and alcohol abuse, and their prevention.",
    formulas: [],
    key_points: [
      "Health is a state of complete physical, mental, and social well-being.",
      "Diseases classified as infectious and non-infectious.",
      "Immune system: innate and acquired immunity; active and passive immunity.",
      "AIDS caused by HIV destroys the immune system; spread via body fluids.",
      "Cancer caused by uncontrolled cell division; treated by surgery, radiation, chemotherapy.",
      "Vaccines stimulate immunity against specific pathogens.",
      "Drug and alcohol abuse leads to addiction, organ damage, and social issues.",
      "Prevention through awareness, lifestyle changes, and hygiene.",
      "Pathogens: bacteria, viruses, fungi, protozoa, worms.",
      "Essential for NEET questions on immunity and diseases."
    ],
    note: "Frequently tested in NEET for immunity, AIDS, and health concepts."
  },

  lesson88: {
    title: "Strategies for Enhancement in Food Production",
    summary: "Covers techniques for improving food production through animal husbandry, plant breeding, single-cell protein, and tissue culture.",
    formulas: [],
    key_points: [
      "Animal husbandry includes breeding, care, and management of livestock and fisheries.",
      "Plant breeding develops high-yield, disease-resistant, and stress-tolerant varieties.",
      "Hybridisation and selection improve plant and animal traits.",
      "Single-cell protein (SCP) is a protein-rich food source from microbes like Spirulina.",
      "Tissue culture enables rapid multiplication of plants and production of virus-free specimens.",
      "Biofortification improves nutritional content of crops.",
      "Green Revolution increased food production using high-yield varieties and agrochemicals.",
      "Sustainable food production depends on improved breeds and farming practices.",
      "Modern breeding uses molecular markers and biotechnology.",
      "Essential for food security and reducing malnutrition."
    ],
    note: "NEET asks questions on breeding techniques and food production enhancement."
  },

  lesson89: {
    title: "Microbes in Human Welfare",
    summary: "Highlights the beneficial uses of microbes in food processing, industry, sewage treatment, biogas production, biocontrol, and biofertilisers.",
    formulas: [],
    key_points: [
      "Microbes used in producing curd, bread, cheese, vinegar, and alcoholic beverages.",
      "Industrial products include antibiotics (penicillin), enzymes, organic acids, and bioactive molecules.",
      "Sewage treatment plants use microbes to clean wastewater.",
      "Biogas production relies on methanogens breaking down waste anaerobically.",
      "Biocontrol agents like Bacillus thuringiensis control pests naturally.",
      "Biofertilisers (Rhizobium, Azotobacter, cyanobacteria) enrich soil fertility.",
      "Microbes contribute to sustainable agriculture and waste management.",
      "Some microbes fix atmospheric nitrogen, enhancing crop productivity.",
      "Not all microbes are harmful; many are essential for ecological balance.",
      "Fundamental for NEET questions on industrial microbiology and agriculture."
    ],
    note: "Important for understanding applied biology and biotechnology in NEET."
  }
,
  lesson90: {
    title: "Biotechnology: Principles and Processes",
    summary: "Introduces genetic engineering tools and techniques like recombinant DNA technology, vectors, enzymes, and bioreactors for large-scale production.",
    formulas: [],
    key_points: [
      "Biotechnology uses living organisms to create useful products.",
      "Genetic engineering involves altering DNA through recombinant DNA technology.",
      "Key tools: restriction enzymes (cut DNA), ligases (join DNA), plasmids/vectors (transfer genes).",
      "Recombinant DNA formed by inserting a foreign gene into a plasmid.",
      "Transformation: host cells uptake recombinant DNA.",
      "Bioreactors used for large-scale production of biological products.",
      "Processes include gene cloning, selection, expression, and downstream processing.",
      "Maintaining sterile conditions is crucial for industrial biotechnology.",
      "Applications in medicine, agriculture, and industry.",
      "Foundation for advanced biotechnology and genetic manipulation topics."
    ],
    note: "NEET often asks about enzymes and gene transfer techniques in this chapter."
  },

  lesson91: {
    title: "Biotechnology and Its Applications",
    summary: "Describes the practical uses of biotechnology in agriculture, medicine, industry, and environmental management.",
    formulas: [],
    key_points: [
      "Genetically modified crops (Bt cotton, Golden rice) resist pests and improve nutrition.",
      "Gene therapy treats genetic disorders by correcting defective genes.",
      "Recombinant vaccines (Hepatitis B) and insulin are produced using biotechnology.",
      "Bio-pharming creates proteins and medicines in plants and animals.",
      "DNA fingerprinting aids in crime investigations and paternity tests.",
      "Bioremediation uses microbes to clean pollutants.",
      "Biosafety guidelines ensure safe use of GMOs.",
      "Ethical issues concern GM food safety and biodiversity impact.",
      "Transgenic animals model human diseases and aid research.",
      "Industrial enzymes and antibiotics are produced on a large scale."
    ],
    note: "Practical applications frequently appear in NEET and board questions."
  },

  lesson92: {
    title: "Organisms and Populations",
    summary: "Focuses on the interactions between organisms and their environments, adaptations, and population ecology.",
    formulas: [],
    key_points: [
      "Ecology studies interactions among organisms and their environment.",
      "Abiotic factors: temperature, water, light, and soil influence life processes.",
      "Adaptations help organisms survive in extreme conditions (e.g., camels, cacti).",
      "Population attributes: size, density, growth rate, birth/death rates.",
      "Population growth patterns: exponential and logistic curves.",
      "Carrying capacity limits population size.",
      "Species interactions: mutualism, commensalism, predation, parasitism, competition.",
      "Behavioral adaptations: migration, hibernation, aestivation.",
      "Ecological niches define organism roles in ecosystems.",
      "Critical for understanding biodiversity and conservation strategies."
    ],
    note: "Frequently tested in NEET ecology section for adaptations and interactions."
  },

  lesson93: {
    title: "Ecosystem",
    summary: "Explains the structure and function of ecosystems, energy flow, nutrient cycling, and ecological succession.",
    formulas: [],
    key_points: [
      "Ecosystem = biotic + abiotic components interacting as a unit.",
      "Producers, consumers, and decomposers form food chains and food webs.",
      "Energy flow is unidirectional and follows the 10% law.",
      "Nutrient cycles: carbon, nitrogen, and phosphorus cycles maintain ecosystem balance.",
      "Primary productivity refers to energy captured by producers.",
      "Decomposition breaks down organic matter, recycling nutrients.",
      "Ecological succession changes the species composition over time.",
      "Ecosystem services: water purification, climate regulation, soil fertility.",
      "Aquatic and terrestrial ecosystems vary in structure and function.",
      "Essential for sustainability and conservation studies."
    ],
    note: "Core NEET topic; conceptual questions on productivity and energy flow are common."
  },

  lesson94: {
    title: "Biodiversity and Conservation",
    summary: "Highlights the importance of biodiversity, threats to its existence, and conservation efforts globally and in India.",
    formulas: [],
    key_points: [
      "Biodiversity includes genetic, species, and ecosystem diversity.",
      "Hotspots are regions of high species richness and endemism (e.g., Western Ghats).",
      "India has rich biodiversity across forests, wetlands, and marine areas.",
      "Threats: habitat destruction, pollution, overexploitation, climate change.",
      "In-situ conservation: national parks, wildlife sanctuaries, biosphere reserves.",
      "Ex-situ conservation: zoos, seed banks, botanical gardens.",
      "The Earth Summit (1992) and Biodiversity Act (2002) promote global conservation efforts.",
      "Ecosystem services provide essential human benefits (oxygen, food, recreation).",
      "Ethical responsibility to conserve species for future generations.",
      "Conservation strategies focus on sustainable use and community participation."
    ],
    note: "Frequently appears in NEET for conservation strategies and biodiversity importance."
  },

  lesson95: {
    title: "Environmental Issues",
    summary: "Discusses environmental pollution, global warming, ozone depletion, and sustainable resource management.",
    formulas: [],
    key_points: [
      "Air pollution from industries and vehicles causes respiratory problems.",
      "Water pollution harms aquatic ecosystems and human health.",
      "Solid waste management and recycling reduce land pollution.",
      "Global warming caused by greenhouse gases (CO₂, CH₄); leads to climate change.",
      "Ozone depletion caused by CFCs increases harmful UV radiation.",
      "E-waste management and noise pollution control are emerging concerns.",
      "Chipko movement, Silent Valley project highlight environmental activism in India.",
      "Afforestation and waste treatment improve environmental quality.",
      "Environmental laws: Environment Protection Act (1986), Air/Water Acts.",
      "Sustainable development balances human needs with environmental health."
    ],
    note: "NEET questions focus on pollution control and global environmental concerns."
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
          <a href="neet_ui.html?id=${id}" class="btn start-btn text-white mt-3"><i class="bi bi-play-circle-fill"></i> Start Test</a>
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