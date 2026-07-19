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

      note: "These formulas are vital for solving numerical questions in competitive exams like cuet & CUET."
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

    note: "Mastering these fundamentals is crucial for physics problems in cuet, CUET, and board exams."
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

  note: "Essential for CUET/cuet as it combines both conceptual understanding and vector-based calculations."
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

  note: "Mastering this chapter builds a strong base for problem-solving in dynamics for cuet, CUET, and boards."
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

  note: "This chapter forms the backbone of dynamics and energy transfer, essential for both conceptual and numerical questions in CUET and cuet."
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

  note: "This chapter connects linear and rotational mechanics — crucial for solving cuet/CUET advanced dynamics problems."
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

  note: "Gravitation links celestial and terrestrial mechanics. High weightage chapter for CUET, cuet, and board exams."
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

  note: "A foundational chapter for understanding deformation and material strength — crucial for engineering, CUET, and cuet preparation."
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

  note: "This chapter links real-life phenomena like blood flow, flying aircraft, and tree sap movement — highly application-oriented and important for CUET, cuet, and boards."
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

  note: "This chapter is rich in real-life applications — ideal for numericals in cuet, CUET, and board exams."
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
  
  "note": "Thermodynamics connects chemistry with physics, making it essential for understanding chemical energetics, predicting reaction spontaneity, and solving cuet/CUET numerical problems. Real-world relevance includes engines, phase transitions, and biochemical processes."
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

  "note": "Kinetic theory connects microscopic molecular motion with macroscopic properties like pressure and temperature — critical for CUET, cuet, and physics-based reasoning problems."
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

  "note": "Oscillations form the foundation of understanding waves, vibrations, sound, and alternating currents — crucial for CUET, cuet, and board exams due to their rich mathematical and conceptual applications."
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

  "note": "This chapter unifies several key physics concepts — oscillations, sound, and wave mechanics — and provides a foundation for understanding topics in optics, acoustics, and signal transmission. High weightage in cuet, CUET, and board exams."
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

  note: "This chapter lays the foundation of electrostatics — highly relevant for understanding capacitors and electric potential. Important for cuet, CUET, and board exams."
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

  note: "Highly application-focused — central to electric circuits and devices. Frequently tested in CUET and cuet numericals."
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

  note: "Foundation of electric circuits — crucial for electronics, practicals, and cuet/CUET numericals."
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

  note: "Foundation of electric circuits — crucial for electronics, practicals, and cuet/CUET numericals."
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

  note: "Links electricity and magnetism; very important for cuet, CUET, and experimental physics."
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

  note: "Links electricity and magnetism; very important for cuet, CUET, and experimental physics."
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

  note: "Vital for understanding transformers, generators, and real-world electromagnetic devices — must-know for cuet and CUET."
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

  "note": "This chapter is crucial for understanding real-world AC systems, power distribution, and resonance — heavily emphasized in CUET, cuet, and board exams."
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

  "note": "This chapter is critical for practical optics applications — important for cuet, CUET, and board diagrams and derivations."
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

  "note": "This chapter marks the entry to quantum physics — conceptually deep and critical for CUET, cuet, and modern physics topics."
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

  "note": "Bohr's atomic model forms the foundation of quantum theory — essential for modern physics, CUET, and board exams."
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

  "note": "A key chapter for understanding nuclear energy, reactors, and radiological applications — very important for CUET and competitive exams."
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
    note: "Forms the foundation for all chemistry calculations — critical for CUET, cuet, and board numericals."
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
    note: "This chapter builds the base for understanding element behavior — key for CUET and cuet."
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
    note: "Fundamental for understanding molecular structures — heavily tested in CUET and cuet."
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
    note: "Core topic in physical chemistry — critical for energy-based CUET/cuet questions."
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
    note: "Forms the basis for electrochemical reactions — frequent in CUET/cuet MCQs."
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
    note: "Foundational for organic reaction mechanisms — high yield in cuet/CUET."
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
    note: "Core organic chapter — important for reaction-based CUET/cuet questions."
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
    note: "Highly conceptual for trends and periodicity — often asked in CUET/cuet."
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
    note: "Foundation for entire organic chemistry — important in CUET/cuet."
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
    note: "Essential for organic chemistry reactions — many questions in CUET/cuet."
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
    note: "Important for understanding physical structure and behavior of solids in CUET/cuet."
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
    note: "Core for physical chemistry and electrochemical applications — must-know for CUET/cuet."
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
    note: "Conceptual and real-world applications — useful for CUET and applied chemistry topics."
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
    note: "Key chapter for inorganic chemistry trends and structure — frequently appears in CUET/cuet."
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
    note: "Important for metallurgy, periodicity, and industrial applications — strong cuet/CUET focus."
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
    note: "Important chapter for reaction mechanisms (SN1/SN2), environmental chemistry, and real-world applications — highly relevant for CUET/cuet."
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
    note: "Important chapter for functional group chemistry and reaction mechanisms — heavily emphasized in CUET/cuet and board exams."
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
    note: "Core chapter for mechanisms, organic reactions, and practical applications in CUET/cuet."
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
    note: "Crucial for mechanism-based questions and aromatic compound synthesis in CUET/cuet."
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
    note: "Essential for CUET; builds biochemical understanding relevant to life processes."
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
    note: "Relevant for environment-friendly chemistry, polymer technology, and industrial uses — frequent CUET/cuet topic."
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
    note: "Simple but high-scoring chapter in CUET/cuet; connects chemistry to real-world applications."
  }
,
lesson58: {
  title: "Sets, Relations and Functions",
  summary: "Introduces the foundational concepts of set theory, types of sets, and operations on sets. Explores relations and functions, laying the groundwork for advanced algebra and calculus.",
  formulas: [],
  key_points: [
    "Set definition, representation (roster and set-builder form), and types (finite, infinite, singleton, etc.).",
    "Venn diagrams used to illustrate union, intersection, and difference of sets.",
    "Important identities like De Morgan's laws and properties of complements.",
    "Cartesian product of sets and ordered pairs; important in defining relations and functions.",
    "Relations: domain, codomain, and range; types include reflexive, symmetric, and transitive.",
    "Functions: one-one, onto, into, bijective; composition of functions and inverse functions.",
    "Real-life applications in computer science, logic, and mathematics.",
    "Symbols used: ∈, ⊂, ∪, ∩, etc.",
    "Problems based on cardinality and number of relations/functions possible."
  ],
  note: "Important for building concepts in calculus and algebra; high-weightage in cuet exams."
},
lesson59: {
  title: "Trigonometric Functions",
  summary: "Explores the measurement of angles, trigonometric ratios, identities, and their applications. Establishes key concepts used in calculus and coordinate geometry.",
  formulas: [
    "sin²θ + cos²θ = 1",
    "1 + tan²θ = sec²θ",
    "1 + cot²θ = cosec²θ",
    "sin(A ± B) = sinAcosB ± cosAsinB",
    "cos(A ± B) = cosAcosB ∓ sinAsinB"
  ],
  key_points: [
    "Angles in radians and degrees; conversion between them.",
    "Trigonometric identities and their proofs.",
    "Graphs and periodicity of sine, cosine, and tangent functions.",
    "General solutions of trigonometric equations.",
    "Use of trigonometric identities to simplify expressions and solve problems.",
    "Inverse trigonometric functions introduced conceptually.",
    "Applications in physics and geometry."
  ],
  note: "Fundamental for calculus and physics; expect formula-based and conceptual problems in cuet."
},

lesson60: {
  title: "Complex Numbers and Quadratic Equations",
  summary: "Introduces imaginary numbers and operations with complex numbers, and explores roots of quadratic equations using the complex number system.",
  formulas: [
    "i² = -1",
    "|z| = √(x² + y²) for z = x + iy",
    "Conjugate of z = x - iy",
    "Quadratic formula: x = [-b ± √(b² - 4ac)] / 2a"
  ],
  key_points: [
    "Definition of complex numbers and their algebraic operations.",
    "Argand plane and graphical representation.",
    "Polar form and modulus-argument form.",
    "Solving quadratic equations with real and complex roots.",
    "Properties of conjugate and modulus.",
    "Equations reducible to quadratic form."
  ],
  note: "Frequently asked in cuet in both Algebra and Coordinate Geometry contexts."
},

lesson61: {
  title: "Sequences and Series",
  summary: "Focuses on number patterns and summations, including arithmetic and geometric progressions, with applications to mathematical reasoning and problem-solving.",
  formulas: [
    "n-th term of AP: aₙ = a + (n - 1)d",
    "Sum of n terms of AP: Sₙ = n/2 [2a + (n - 1)d]",
    "n-th term of GP: aₙ = arⁿ⁻¹",
    "Sum of n terms of GP: Sₙ = a(1 - rⁿ)/(1 - r), r ≠ 1",
    "Sum of infinite GP: S = a / (1 - r), |r| < 1"
  ],
  key_points: [
    "Introduction to sequences and general term formulas.",
    "Properties and summation techniques of AP and GP.",
    "Special series: sum of first n natural numbers, squares, and cubes.",
    "Problem solving using pattern recognition and summation formulas.",
    "Mathematical puzzles often use series logic."
  ],
  note: "Easy to score chapter if formulas are remembered; very common in cuet mains."
},

lesson62: {
  title: "Permutations and Combinations",
  summary: "Explores the fundamental principles of counting, arrangement, and selection. Essential for probability and algebra.",
  formulas: [
    "nPr = n! / (n - r)!",
    "nCr = n! / [r!(n - r)!]"
  ],
  key_points: [
    "Basic principle of counting (multiplication and addition rules).",
    "Factorials and their properties.",
    "Permutations: ordered arrangements.",
    "Combinations: unordered selections.",
    "Real-life problems involving teams, committees, digits, and arrangements.",
    "Applications in probability and statistics."
  ],
  note: "Foundation for probability; cuet often mixes it with logical reasoning."
},

lesson63: {
  title: "Binomial Theorem",
  summary: "Covers the expansion of binomial expressions using a general formula and its applications in algebraic manipulation.",
  formulas: [
    "(a + b)ⁿ = Σ[nCr × aⁿ⁻ʳ × bʳ]",
    "Middle term of (a + b)ⁿ when n is even: T₍ₙ/₂₊₁₎"
  ],
  key_points: [
    "Pascal’s triangle and binomial coefficients.",
    "General and specific terms in binomial expansions.",
    "Finding coefficients of particular terms.",
    "Properties of binomial coefficients (symmetry, identity).",
    "Applications to approximation and algebra."
  ],
  note: "Fast and formula-based; easy marks if practiced well."
},

lesson64: {
  title: "Straight Lines and Pair of Straight Lines",
  summary: "Focuses on equations of lines in 2D geometry, slope concepts, and conditions for parallelism, perpendicularity, and concurrency.",
  formulas: [
    "Slope: m = (y₂ - y₁) / (x₂ - x₁)",
    "Point-slope form: y - y₁ = m(x - x₁)",
    "Two-point form: (y - y₁) = [(y₂ - y₁)/(x₂ - x₁)](x - x₁)",
    "General form: Ax + By + C = 0"
  ],
  key_points: [
    "Slope and intercepts of lines.",
    "Angle between two lines.",
    "Condition for perpendicular and parallel lines.",
    "Distance of a point from a line.",
    "Family of lines and concurrent lines.",
    "Pair of straight lines represented by second-degree equations."
  ],
  note: "Crucial for Coordinate Geometry; expect multiple conceptual and calculation problems in cuet."
},

lesson65: {
  title: "Conic Sections (Parabola, Ellipse, Hyperbola)",
  summary: "Discusses curves formed by intersection of a plane with a double-napped cone — parabola, ellipse, and hyperbola — with focus on standard equations and properties.",
  formulas: [],
  key_points: [
    "Standard forms of conics and their graphs.",
    "Focus, directrix, latus rectum, and eccentricity.",
    "Parabola: y² = 4ax or x² = 4ay.",
    "Ellipse: x²/a² + y²/b² = 1, a > b.",
    "Hyperbola: x²/a² - y²/b² = 1.",
    "Locus-based problems and tangents/normals to conics."
  ],
  note: "Visual topic but requires formula memorization; heavy use in cuet Coordinate Geometry section."
},

lesson66: {
  title: "Limits and Derivatives (Intro to Calculus)",
  summary: "Introduces the foundational ideas of calculus through limits and derivatives, preparing students for more advanced calculus topics in Class 12.",
  formulas: [
    "limₓ→ₐ (xⁿ - aⁿ)/(x - a) = n·aⁿ⁻¹",
    "Derivative of xⁿ = n·xⁿ⁻¹"
  ],
  key_points: [
    "Concept of limits and indeterminate forms.",
    "Standard limits and algebra of limits.",
    "Derivatives as rate of change and slope of curves.",
    "Basic derivative rules: power, sum, product, quotient.",
    "Differentiation of polynomial and trigonometric functions."
  ],
  note: "Gateway to Class 12 calculus; very scoring if concepts are clear."
},

lesson67: {
  title: "Statistics and Probability",
  summary: "Deals with measures of dispersion (standard deviation, variance) and introduces basic probability theory.",
  formulas: [
    "Mean deviation, variance, standard deviation.",
    "P(E) = favorable outcomes / total outcomes"
  ],
  key_points: [
    "Types of data and frequency distribution.",
    "Mean, median, mode, and range.",
    "Standard deviation and variance calculations.",
    "Basic probability concepts and axioms.",
    "Problems based on cards, dice, coins, and selection."
  ],
  note: "Often paired with P&C in cuet; conceptual clarity needed more than heavy formulas."
},

lesson68: {
  title: "Mathematical Reasoning",
  summary: "Focuses on logic, statements, and validation through truth tables. Useful in improving analytical and logical skills.",
  formulas: [],
  key_points: [
    "Statements, truth values, and logical connectives.",
    "Implication, converse, contrapositive, and negation.",
    "Compound statements and their truth tables.",
    "Tautology and contradiction.",
    "Problems involving logical deduction."
  ],
  note: "Short but common in cuet for 1–2 conceptual questions."
},

lesson69: {
  title: "Three Dimensional Geometry",
  summary: "Introduces coordinate system in 3D space and equations of lines and planes.",
  formulas: [],
  key_points: [
    "Direction cosines and direction ratios.",
    "Distance between two points in 3D.",
    "Section formula and centroid in 3D space.",
    "Basic vector representation of points and lines."
  ],
  note: "Foundational topic for full 3D geometry in Class 12; keep diagrams handy."
},

lesson70: {
  title: "Linear Inequalities",
  summary: "Explores inequalities in one and two variables and their graphical representation.",
  formulas: [],
  key_points: [
    "Solving algebraic inequalities and representing solution sets.",
    "Inequalities involving modulus.",
    "Graphing linear inequalities in two variables.",
    "Intersection and union of solution sets."
  ],
  note: "Basic concept often used in optimization and constraints (linked to Linear Programming)."
},

lesson71: {
  title: "Principle of Mathematical Induction",
  summary: "Explains the method to prove mathematical statements for all natural numbers using base case and inductive step.",
  formulas: [],
  key_points: [
    "Process: Base case → Inductive hypothesis → Inductive step.",
    "Used to prove identities, inequalities, and divisibility results.",
    "Standard problems from sums and number theory."
  ],
  note: "Quick topic with direct questions in cuet; great scoring opportunity."
},

lesson72: {
  title: "Introduction to 3D Geometry",
  summary: "Simplified beginning of 3D coordinate geometry, focusing on the basics of the coordinate system.",
  formulas: [],
  key_points: [
    "Coordinate axes and planes in 3D.",
    "Distance formula in 3D.",
    "Section formula and centroid.",
    "Introduction to 3D vectors and basic geometric interpretation."
  ],
  note: "Serves as a bridge to vectors and full 3D geometry in Class 12."
},lesson73: {
  title: "Relations and Functions",
  summary: "Extends concepts of relations and functions, covering types of relations, domain, range, and function compositions. Sets the stage for advanced algebra and calculus.",
  formulas: [],
  key_points: [
    "Types of relations: reflexive, symmetric, transitive, equivalence.",
    "Functions: one-one, onto, bijective functions.",
    "Composition of functions and inverse of a function.",
    "Problems based on domain and range.",
    "Graphical and algebraic approach to function behavior."
  ],
  note: "Core topic in calculus and algebra; builds strong foundation for future chapters and cuet."
},

lesson74: {
  title: "Inverse Trigonometric Functions",
  summary: "Introduces inverse functions for basic trigonometric ratios and explores their properties and graphs. Essential for calculus and integration techniques.",
  formulas: [],
  key_points: [
    "Definition, domain, and range of inverse trig functions.",
    "Principal value branches for sin⁻¹x, cos⁻¹x, tan⁻¹x, etc.",
    "Properties: sin⁻¹x + cos⁻¹x = π/2, tan⁻¹x + cot⁻¹x = π/2.",
    "Graphs of inverse trig functions.",
    "Applications in calculus and integration techniques."
  ],
  note: "Short chapter but high-yield; direct questions in cuet and used in integrals."
},

lesson75: {
  title: "Matrices",
  summary: "Introduces matrix concepts, types, operations, and applications in solving systems of equations using matrices.",
  formulas: [],
  key_points: [
    "Definition and types: zero, identity, diagonal, symmetric, skew-symmetric.",
    "Matrix operations: addition, multiplication, transpose.",
    "Properties of matrix operations.",
    "Multiplicative inverse of a matrix (if exists).",
    "Solving linear equations using matrices."
  ],
  note: "Important for cuet; matrices form the basis for determinants and solving systems algebraically."
},

lesson76: {
  title: "Determinants",
  summary: "Explores determinant calculation, properties, and application in solving linear equations using Cramer's Rule.",
  formulas: [],
  key_points: [
    "Determinants of orders 2x2 and 3x3.",
    "Properties of determinants (row/column operations).",
    "Applications: area of triangle, checking collinearity.",
    "Adjoint and inverse of a matrix using determinants.",
    "Solving linear equations using Cramer's Rule."
  ],
  note: "Frequently tested in cuet; properties and simplification skills are essential."
},

lesson77: {
  title: "Continuity and Differentiability",
  summary: "Explains the rigorous definition of continuity and differentiability, along with rules for differentiation of composite and implicit functions.",
  formulas: [],
  key_points: [
    "Continuity at a point and in intervals.",
    "Differentiability and its relation to continuity.",
    "Chain rule, product and quotient rules.",
    "Derivatives of inverse and implicit functions.",
    "Logarithmic and parametric differentiation."
  ],
  note: "Very important for calculus-heavy cuet problems; conceptually deep and application-driven."
},

lesson78: {
  title: "Application of Derivatives",
  summary: "Applies differentiation to real-world problems including tangents, normals, rate of change, and optimization.",
  formulas: [],
  key_points: [
    "Rate of change of quantities.",
    "Equations of tangents and normals.",
    "Increasing and decreasing functions.",
    "Maxima and minima of functions.",
    "Use in optimization problems (real-life applications)."
  ],
  note: "Heavy weightage in cuet; graphical and logical thinking essential for solving word problems."
},

lesson79: {
  title: "Integrals",
  summary: "Covers indefinite and definite integration techniques including substitution, by parts, and partial fractions.",
  formulas: [],
  key_points: [
    "Basic integration formulas and rules.",
    "Integration by substitution, parts, and partial fractions.",
    "Definite integrals and their properties.",
    "Fundamental Theorem of Calculus.",
    "Evaluation of areas using definite integrals."
  ],
  note: "Key pillar of calculus; strong integration skills are crucial for cuet success."
},

lesson80: {
  title: "Application of Integrals",
  summary: "Applies definite integrals to compute areas bounded by curves. Focuses on graphical interpretation.",
  formulas: [],
  key_points: [
    "Finding area under curves and between two curves.",
    "Using symmetry to simplify area calculations.",
    "Problems based on x-axis, y-axis, and lines.",
    "Real-world application in physics and economics."
  ],
  note: "Visual and conceptual; cuet problems often combine curves with limits or derivatives."
},

lesson81: {
  title: "Differential Equations",
  summary: "Introduces basic differential equations, their formation, and methods of solution including variable separable and homogeneous methods.",
  formulas: [],
  key_points: [
    "Order and degree of a differential equation.",
    "Formation of DEs from given conditions.",
    "Solving DEs using variable separable method.",
    "Homogeneous differential equations.",
    "Applications in growth/decay models and motion."
  ],
  note: "Conceptual and application-based; often asked in cuet Advanced with a twist."
},

lesson82: {
  title: "Vector Algebra",
  summary: "Introduces vectors, operations, and their use in geometry and physics. Important for 3D geometry and mechanics.",
  formulas: [],
  key_points: [
    "Types of vectors: zero, unit, position, equal, etc.",
    "Vector addition and scalar multiplication.",
    "Dot product and cross product.",
    "Angle between vectors, projection, and scalar triple product.",
    "Geometrical interpretation and use in space geometry."
  ],
  note: "Very useful in physics and geometry; cuet often includes vector-based geometry questions."
},

lesson83: {
  title: "Three Dimensional Geometry",
  summary: "Extends coordinate geometry to 3D, covering direction cosines, equations of lines and planes, and angle/distance computations.",
  formulas: [],
  key_points: [
    "Direction cosines and direction ratios.",
    "Equations of a line in space (vector and Cartesian form).",
    "Angle between two lines or between line and plane.",
    "Shortest distance between skew lines.",
    "Plane equations in different forms and their intersections."
  ],
  note: "High-scoring chapter in cuet; diagrams help grasp orientation in space."
},

lesson84: {
  title: "Linear Programming",
  summary: "Focuses on optimization problems subject to constraints represented by linear inequalities, solved graphically.",
  formulas: [],
  key_points: [
    "Formulation of linear programming problems (LPP).",
    "Constraints represented as linear inequalities.",
    "Feasible region and corner point method.",
    "Maximization and minimization of objective function.",
    "Graphical method for solving 2-variable problems."
  ],
  note: "Very scoring if practiced; expect direct 4-mark graphical problem in cuet Main."
},

lesson85: {
  title: "Probability",
  summary: "Extends basic probability to conditional probability, Bayes’ Theorem, and random variables with distributions.",
  formulas: [],
  key_points: [
    "Classical and conditional probability.",
    "Multiplication theorem, total probability, and Bayes’ theorem.",
    "Independent and dependent events.",
    "Bernoulli trials and binomial distribution.",
    "Expected value of random variable."
  ],
  note: "Concept-heavy; common in cuet Advanced with tricky logic-based problems."
},
lesson86: {
  title: "History",
  summary: "Covers key themes in Indian history from the Harappan Civilization to Post-Independence India, focusing on cultural, political, and economic developments.",
  formulas: [],
  key_points: [
    "Harappan Civilization: urban planning, trade, and decline theories.",
    "Themes in Indian History – I (Ancient India): Vedic age, Mauryan & Gupta empires, religious developments.",
    "Themes in Indian History – II (Medieval India): Sultanate and Mughal rule, Bhakti and Sufi movements.",
    "Colonialism & Nationalism: British rule, freedom struggle, Gandhian movements, partition.",
    "Post-Independence India: constitution, socio-political reforms, economic challenges, and modernization."
  ],
  note: "Important for conceptual understanding; questions often test chronology, cause-effect, and socio-political insight."
},
lesson87: {
  title: "Geography",
  summary: "Focuses on human geography concepts, India's demographic and economic features, and essential map-based practical skills.",
  formulas: [],
  key_points: [
    "🌍 Human Geography: study of human activities, population, migration, and cultural patterns.",
    "🇮🇳 India – People and Economy: resources, industries, agriculture, population distribution, and development indicators.",
    "🗺️ Practical Work (Map Skills): interpretation of topographical maps, identification of physical and political features."
  ],
  note: "Requires conceptual clarity and map-reading accuracy; map skills often appear as application-based questions in exams."
},lesson88: {
  title: "Economics",
  summary: "Covers foundational and advanced economic concepts relevant to India, including development, national income, fiscal tools, and external trade balances.",
  formulas: [],
  key_points: [
    "📈 Indian Economic Development: economic reforms, poverty, infrastructure, rural development, and sectors of the Indian economy.",
    "💹 Macroeconomics: key concepts like national income, GDP, circular flow, money creation, and functions of commercial and central banks.",
    "🧾 Government Budget: budget components, types of deficits, taxation, and expenditure policies.",
    "🌍 Balance of Payments: current and capital accounts, foreign exchange, and trade imbalances."
  ],
  note: "Highly scoring with clear definitions and numerical applications; understanding graphs and flow concepts is critical."
}
,lesson89: {
  title: "English (Section 1A)",
  summary: "Focuses on reading skills, vocabulary usage, sentence structure, and grammar proficiency for effective comprehension and language accuracy.",
  formulas: [],
  key_points: [
    "📘 Reading Comprehension: Includes factual and literary passages with inference-based and direct questions.",
    "📝 Vocabulary: Covers word meanings, synonyms, antonyms, and contextual usage.",
    "🔄 Re-arranging Sentences: Logical sequence building to form meaningful paragraphs.",
    "✍️ Grammar: Focuses on error spotting, fill in the blanks, subject-verb agreement, tenses, and parts of speech."
  ],
  note: "Practicing a variety of comprehension and grammar exercises boosts speed and accuracy. Frequent revision helps reinforce rules and usage patterns."
}
,lesson90: {
  title: "Section 3 – General Test",
  summary: "Assesses overall aptitude through questions on math, reasoning, current affairs, and general awareness. Useful for a variety of competitive exams.",
  formulas: [],
  key_points: [
    "🧠 Quantitative Aptitude: Covers math topics up to Class 8–10 level including percentages, ratio, time, speed, profit & loss, and basic algebra.",
    "🔍 Logical Reasoning: Includes puzzles, syllogisms, coding-decoding, sequences, and pattern recognition.",
    "🌐 General Knowledge and Current Affairs: Questions on national & international events, important dates, personalities, awards, and developments.",
    "➗ Numerical and Arithmetic Ability: Focus on simplification, averages, data interpretation, HCF/LCM, and simple interest/compound interest."
  ],
  note: "Time management is key. Regular reading of news and practicing reasoning/math daily helps in scoring high in this section."
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
          <a href="cuet_ui.html?id=${id}" class="btn start-btn text-white mt-3"><i class="bi bi-play-circle-fill"></i> Start Test</a>
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