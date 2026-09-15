export type Project = {
  slug: string;
  tag: string;
  title: string;
  desc: string;
  tools: string[];
  externalUrl?: string;
  details?: string[];
  steps?: { label: string; description: string }[];
};

type ProjectTranslation = {
  tag: string;
  title: string;
  desc: string;
  tools: string[];
  externalUrl?: string;
  details?: string[];
  steps?: { label: string; description: string }[];
};

export const projects: Project[] = [
  {
    slug: "ecoulement-supersonique-jet-star-ccm",
    tag: "CFD / Aérodynamique",
    title: "Écoulement supersonique d'un jet — STAR-CCM+",
    desc: "Simulation CFD d'un jet supersonique : extraction de l'angle de choc oblique, fonctions de champ Schlieren pour visualiser les discontinuités de l'écoulement.",
    tools: ["STAR-CCM+", "Écoulement compressible"],
    details: [
      "Construction du domaine de calcul et conditions aux limites supersoniques.",
      "Maillage affine autour du choc et calibration du modèle de turbulence.",
      "Post-traitement Schlieren pour identifier et mesurer l'angle de choc.",
    ],
    steps: [
      {
        label: "Objectif",
        description: "Analyser l'écoulement supersonique d'un jet et extraire les caractéristiques de choc.",
      },
      {
        label: "Mise en œuvre",
        description: "Configuration de STAR-CCM+ avec domaine 2D/3D, conditions d'entrée supersoniques et sortie de pression statique.",
      },
      {
        label: "Résultats",
        description: "Lecture des champs de vitesse et pression, génération de Schlieren et comparaison avec la théorie du choc oblique.",
      },
    ],
  },
  {
    slug: "projet-astraf-microfusee",
    tag: "Conception",
    title: "ASTRAF - Conception et lancement d'une microfusée",
    desc: "Projet complet de conception, fabrication et lancement d'une microfusée expérimentale : stabilité, CAO, électronique embarquée et analyse de vol.",
    tools: ["CATIA", "SabTraj", "Impression 3D", "MicroPython"],
    details: [
      "Étude de stabilité et trajectoire prévisionnelle avec SabTraj.",
      "Conception mécanique, fabrication additive et intégration électronique.",
      "Campagne d'essais, corrections de conception et analyse des données de vol.",
    ],
    steps: [
      {
        label: "Prévoir",
        description: "Valider la stabilité, la trajectoire et les paramètres de récupération avant fabrication.",
      },
      {
        label: "Réaliser",
        description: "Concevoir, imprimer, assembler et tester les sous-systèmes mécaniques et électroniques.",
      },
      {
        label: "Lancer",
        description: "Mettre en oeuvre une campagne de lancement et exploiter les mesures embarquées.",
      },
    ],
  },
  {
    slug: "dimensionnement-tuyere-fusee",
    tag: "Propulsion",
    title: "Dimensionnement de tuyère fusée",
    desc: "Calculs de dimensionnement d'une tuyère : détermination de la section au col et analyse de l'écoulement isentropique.",
    tools: ["Écoulement isentropique", "Calcul"],
    details: [
      "Calcul des surfaces de col et de sortie en fonction du rapport de pression.",
      "Application des relations isentropiques pour un gaz parfait et bilan énergétique.",
      "Comparaison des performances théoriques aux résultats de simulation.",
    ],
    steps: [
      {
        label: "Analyse",
        description: "Choix des conditions de fonctionnement et du rendement thermodynamique souhaité.",
      },
      {
        label: "Calculs",
        description: "Détermination de la distribution de section le long de la tuyère.",
      },
      {
        label: "Validation",
        description: "Vérification des pressions et de la Mach number au col.",
      },
    ],
  },
  {
    slug: "analyse-saf-virgin-atlantic-flight-100",
    tag: "Énergie / Aviation durable",
    title: "Analyse SAF — cas Virgin Atlantic Flight 100",
    desc: "Étude des carburants d'aviation durables (SAF) via simulation, avec étude de cas sur le vol Virgin Atlantic Flight 100, présentée en soutenance.",
    tools: ["SAF"],
    details: [
      "Modélisation du cycle de combustion avec mélange de SAF et kérosène classique.",
      "Évaluation des gains CO2 et de la performance en masse de carburant.",
      "Synthèse des contraintes d'utilisation sur des motorisations existantes.",
    ],
    steps: [
      {
        label: "Contexte",
        description: "Cadre réglementaire de l'aviation durable et enjeux carbone du vol étudié.",
      },
      {
        label: "Simulation",
        description: "Entrée des paramètres moteur dans le logiciel de simulation et validation des performances.",
      },
      {
        label: "Synthèse",
        description: "Comparaison des scénarios avec & sans SAF et recommandations.",
      },
    ],
  },
  {
    slug: "conception-tuyere-aerospike",
    tag: "Propulsion",
    title: "Conception d'une tuyère aerospike supersonique",
    desc: "Dimensionnement thermodynamique et tracé par caractéristiques d'une tuyère aerospike : de l'expansion isentropique à la poussée idéale.",
    tools: ["Thermodynamique", "Prandtl-Meyer", "Méthode des caractéristiques"],
    details: [
      "Calcul des grandeurs au col et en sortie à partir des relations isentropiques.",
      "Construction de l'éventail de Prandtl-Meyer et des réflexions sur la paroi.",
      "Comparaison entre géométrie idéale et section réelle pour interpréter les pertes.",
    ],
    steps: [
      {
        label: "Dimensionnement",
        description: "Détermination de la section de col et des conditions de sortie adaptées.",
      },
      {
        label: "Caractéristiques",
        description: "Tracé du réseau d'ondes à partir des invariants de Riemann.",
      },
      {
        label: "Performance",
        description: "Évaluation de la vitesse d'éjection et de la poussée théorique.",
      },
    ],
  },
  {
    slug: "aegis-vaisseau-exploration",
    tag: "Conception",
    title: "AEGIS - Vaisseau d'exploration interplanétaire",
    desc: "Conception collaborative d'un véhicule spatial habité : architecture, intégration des sous-systèmes et validation des interfaces mécaniques.",
    tools: ["Conception système", "Intégration", "Architecture spatiale"],
    externalUrl: "https://fredetrickspace.wixsite.com/aegis/team",
    details: [
      "Contribution à l'intégration d'un système spatial composé de structures, propulsion, navigation et survie.",
      "Vérification des interfaces mécaniques, de la masse et du centrage sous coiffe.",
      "Documentation des sous-systèmes et de leur cohérence dans l'architecture AEGIS.",
    ],
    steps: [
      { label: "Architecture", description: "Décomposition du véhicule en sous-systèmes et définition de leurs fonctions." },
      { label: "Intégration", description: "Vérification de l'encombrement et des interfaces entre les éléments du système." },
      { label: "Synthèse", description: "Mise à disposition de la documentation de conception du projet AEGIS." },
    ],
  },
  {
    slug: "drone-autonome-simulink",
    tag: "Automatique / Simulation",
    title: "Drone autonome - MATLAB/Simulink",
    desc: "Modélisation et commande d'un quadricoptère : asservissement de position, allocation moteurs et suivi autonome de trajectoire 3D.",
    tools: ["MATLAB", "Simulink", "Commande PD"],
    details: [
      "Modèle de quadricoptère en configuration X et commande selon x, y, z et lacet.",
      "Calcul des vitesses moteurs par allocation des commandes et compensation de gravité.",
      "Suivi séquentiel d'un parcours urbain de 17 positions en simulation.",
    ],
    steps: [
      {
        label: "Modélisation",
        description: "Représentation du drone et de ses quatre actionneurs dans Simulink.",
      },
      {
        label: "Commande",
        description: "Asservissement PD et allocation des commandes de position aux moteurs.",
      },
      {
        label: "Trajectoire",
        description: "Validation sur une liste de positions avec gestion automatique des points cibles.",
      },
    ],
  },
];

const projectsEn: Record<string, ProjectTranslation> = {
  "ecoulement-supersonique-jet-star-ccm": {
    tag: "CFD / Aerodynamics",
    title: "Supersonic jet flow — STAR-CCM+",
    desc: "CFD simulation of a supersonic jet: extracting the oblique shock angle and using Schlieren field functions to visualize flow discontinuities.",
    tools: ["STAR-CCM+", "Compressible flow"],
    details: [
      "Built the computational domain and supersonic boundary conditions.",
      "Refined mesh around the shock and calibrated the turbulence model.",
      "Used Schlieren post-processing to identify and measure the shock angle.",
    ],
    steps: [
      {
        label: "Goal",
        description: "Analyze supersonic jet flow and extract the shock characteristics.",
      },
      {
        label: "Implementation",
        description: "Configured STAR-CCM+ with 2D/3D domain, supersonic inlet conditions, and static pressure outlet.",
      },
      {
        label: "Results",
        description: "Read velocity and pressure fields, generated Schlieren images, and compared with oblique shock theory.",
      },
    ],
  },
  "projet-astraf-microfusee": {
    tag: "Design",
    title: "ASTRAF - Micro-rocket design and launch",
    desc: "End-to-end experimental micro-rocket project: stability, CAD, onboard electronics, launch, and flight-data analysis.",
    tools: ["CATIA", "SabTraj", "3D printing", "MicroPython"],
    details: [
      "Stability study and predicted trajectory using SabTraj.",
      "Mechanical design, additive manufacturing, and electronics integration.",
      "Launch campaign, design corrections, and flight-data analysis.",
    ],
    steps: [
      {
        label: "Predict",
        description: "Validate stability, trajectory, and recovery parameters before fabrication.",
      },
      {
        label: "Build",
        description: "Design, print, assemble, and test mechanical and electronic subsystems.",
      },
      {
        label: "Launch",
        description: "Run a launch campaign and use the onboard measurements.",
      },
    ],
  },
  "dimensionnement-tuyere-fusee": {
    tag: "Propulsion",
    title: "Rocket nozzle sizing",
    desc: "Nozzle sizing calculations: throat area determination and isentropic flow analysis.",
    tools: ["Isentropic flow", "Computation"],
    details: [
      "Computed throat and exit areas from pressure ratio requirements.",
      "Applied perfect-gas isentropic relations and energy balance.",
      "Compared theoretical performance with simulation outputs.",
    ],
    steps: [
      {
        label: "Analysis",
        description: "Selected operating conditions and target thermodynamic efficiency.",
      },
      {
        label: "Calculations",
        description: "Derived cross-section distribution along the nozzle.",
      },
      {
        label: "Validation",
        description: "Checked pressure levels and Mach number at the throat.",
      },
    ],
  },
  "analyse-saf-virgin-atlantic-flight-100": {
    tag: "Energy / Sustainable aviation",
    title: "SAF analysis — Virgin Atlantic Flight 100 case",
    desc: "Study of sustainable aviation fuels (SAF) using simulation, with a case study on Virgin Atlantic Flight 100, presented in oral defense.",
    tools: ["SAF"],
    details: [
      "Modeled combustion cycle with SAF and conventional kerosene blend.",
      "Evaluated CO2 gains and fuel-mass performance impacts.",
      "Synthesized operational constraints on existing engine architectures.",
    ],
    steps: [
      {
        label: "Context",
        description: "Regulatory framework for sustainable aviation and carbon challenges of the studied flight.",
      },
      {
        label: "Simulation",
        description: "Entered engine parameters in the simulation software and validated resulting performance.",
      },
      {
        label: "Synthesis",
        description: "Compared scenarios with and without SAF and proposed recommendations.",
      },
    ],
  },
  "conception-tuyere-aerospike": {
    tag: "Propulsion",
    title: "Supersonic aerospike nozzle design",
    desc: "Thermodynamic sizing and method-of-characteristics design of an aerospike nozzle, from isentropic expansion to ideal thrust.",
    tools: ["Thermodynamics", "Prandtl-Meyer", "Method of characteristics"],
    details: [
      "Calculated throat and outlet quantities from isentropic relations.",
      "Built the Prandtl-Meyer fan and wall reflections.",
      "Compared ideal geometry with the real section to interpret losses.",
    ],
    steps: [
      {
        label: "Sizing",
        description: "Derived throat area and adapted outlet conditions.",
      },
      {
        label: "Characteristics",
        description: "Traced the wave network from the Riemann invariants.",
      },
      {
        label: "Performance",
        description: "Evaluated ideal exhaust velocity and thrust.",
      },
    ],
  },
  "aegis-vaisseau-exploration": {
    tag: "Design",
    title: "AEGIS - Interplanetary exploration spacecraft",
    desc: "Collaborative design of a crewed spacecraft: architecture, subsystem integration, and mechanical-interface validation.",
    tools: ["Systems engineering", "Integration", "Space architecture"],
    externalUrl: "https://fredetrickspace.wixsite.com/aegis/team",
    details: [
      "Contributed to integration of a space system combining structures, propulsion, navigation, and survival systems.",
      "Verified mechanical interfaces, mass, and center-of-gravity positioning beneath the fairing.",
      "Documented subsystems and their consistency within the AEGIS architecture.",
    ],
    steps: [
      { label: "Architecture", description: "Decomposed the vehicle into subsystems and defined their functions." },
      { label: "Integration", description: "Verified volume allocation and interfaces between system elements." },
      { label: "Synthesis", description: "Published the AEGIS project design documentation." },
    ],
  },
  "drone-autonome-simulink": {
    tag: "Control / Simulation",
    title: "Autonomous drone - MATLAB/Simulink",
    desc: "Quadcopter modeling and control: position feedback, motor allocation, and autonomous 3D trajectory tracking.",
    tools: ["MATLAB", "Simulink", "PD control"],
    details: [
      "X-configuration quadcopter model controlled in x, y, z, and yaw.",
      "Motor-speed calculation through command allocation and gravity compensation.",
      "Sequential tracking of a 17-position urban route in simulation.",
    ],
    steps: [
      {
        label: "Modeling",
        description: "Represented the drone and its four actuators in Simulink.",
      },
      {
        label: "Control",
        description: "Used PD feedback and allocated position commands to the motors.",
      },
      {
        label: "Trajectory",
        description: "Validated a waypoint list with automatic target management.",
      },
    ],
  },
};

export function getProjects(lang: "fr" | "en") {
  if (lang === "fr") {
    return projects;
  }

  return projects.map((project) => {
    const translated = projectsEn[project.slug];
    if (!translated) return project;

    return {
      ...project,
      tag: translated.tag,
      title: translated.title,
      desc: translated.desc,
      tools: translated.tools,
      details: translated.details,
      steps: translated.steps,
    };
  });
}
