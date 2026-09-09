"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Fragment, useState } from "react";
import Reveal from "./components/Reveal";
import HomeBackground from "./components/HomeBackground";
import Hero from "./components/Hero";
import Counter from "./components/Counter";
import TimelineTrack from "./components/TimelineTrack";
import TimelineBullet from "./components/TimelineBullet";
import LampDemo from "./components/ui/lamp-demo";
import ProjectFilter from "./components/ProjectFilter";
import SkillsGrid from "./components/SkillsGrid";
import HoverTile from "./components/HoverTile";
import LanguageToggle from "./components/LanguageToggle";
import FlipCard from "./components/animata/card/flip-card";
import HighlightText from "./components/HighlightText";
import ScrollRevealText from "./components/ScrollRevealText";
import { GlowingEffect } from "./components/ui/glowing-effect";
import { useLanguage } from "./components/LanguageProvider";
import { getProjects } from "./lib/projects";

const statsFr = [
  { value: 5, label: "Années de formation" },
  { value: 4, label: "Stages réalisés" },
  { value: 6, suffix: "+", label: "Projets techniques" },
  { value: 8, label: "Outils maîtrisés" },
];

const statsEn = [
  { value: 5, label: "Years of training" },
  { value: 4, label: "Internships completed" },
  { value: 6, suffix: "+", label: "Technical projects" },
  { value: 8, label: "Tools mastered" },
];

const skillsFr = [
  { title: "Calcul & simulation", items: ["MATLAB", "Simulink", "Python", "GasTurb15", "VBA"] },
  {
    title: "CAO & simulation numérique",
    items: ["CATIA", "SolidWorks", "ANSYS", "STAR-CCM+", "Patran/Nastran", "Bambu Lab"],
  },
  {
    title: "Domaines d'ingénierie",
    items: [
      "Propulsion",
      "Écoulement compressible",
      "Thermodynamique",
      "Calculs thermodynamiques",
      "Transferts thermiques",
      "Dimensionnement mécanique",
      "Production & qualité",
    ],
  },
  { title: "Rédaction & développement", items: ["LaTeX", "Rapports formels", "Développement web", "Next.js / React"] },
];

const skillsEn = [
  { title: "Computation & simulation", items: ["MATLAB", "Simulink", "Python", "GasTurb15", "VBA"] },
  {
    title: "CAD & numerical simulation",
    items: ["CATIA", "SolidWorks", "ANSYS", "STAR-CCM+", "Patran/Nastran", "Bambu Lab"],
  },
  {
    title: "Engineering domains",
    items: [
      "Propulsion",
      "Compressible flow",
      "Thermodynamics",
      "Thermodynamic calculations",
      "Heat transfer calculations",
      "Mechanical sizing",
      "Production & quality",
    ],
  },
  { title: "Writing & development", items: ["LaTeX", "Formal reports", "Web development", "Next.js / React"] },
];

const timelineFr = [
  {
    duration: "",
    title: "Progression professionnelle",
    org: "MF Tech → Marelli → Strate Composites → Gruau",
    desc: [
      "J'ai débuté mon parcours industriel chez ",
      <HighlightText key="timeline-fr-mftech">MF Tech</HighlightText>,
      ", comme ",
      <HighlightText key="timeline-fr-technicien-rd">technicien R&D</HighlightText>,
      " sur des projets de filament winding et de prototypage robotisé. C'est là que j'ai commencé à observer le fonctionnement concret de la production industrielle. J'ai ensuite eu l'opportunité d'entrer dans un grand groupe international, ",
      <HighlightText key="timeline-fr-marelli">Marelli</HighlightText>,
      ", en tant que ",
      <HighlightText key="timeline-fr-quality-control">Responsable Qualité</HighlightText>,
      ". Ce fut une expérience marquante où j'ai pris la responsabilité d'une équipe dès 20 ans et pu apprendre les standards et la dynamique de la production à grande échelle. C'est là que j'ai effectué des tests sous vide, des mesures dimensionnelles sur machine tridimensionnelle (MMT) et appliqué les outils du Lean, le tout couplé à une expérience concrète de communication et de management d'équipe. Cette montée en compétences s'est concrétisée chez ",
      <HighlightText key="timeline-fr-strate">Strate Composites</HighlightText>,
      ", petite PME où j'ai occupé, en stage, un poste de ",
      <HighlightText key="timeline-fr-process-prod">responsable Process and Production</HighlightText>,
      ". C'est là que j'ai pu commencer à mettre en pratique ce que j'avais appris chez Marelli : conception d'outillages, optimisation des processus de fabrication, apport numérique pour les plans de production. J'ai également pu me déplacer sur site chez des clients afin de comprendre comment répondre au plus près à leurs besoins. Cette progression s'est poursuivie au sein d'une autre PME rattachée à un grand groupe : ",
      <HighlightText key="timeline-fr-gruau">Gruau</HighlightText>,
      ". Un environnement qui m'a permis de mettre à profit cette capacité, acquise auparavant, à prendre des responsabilités. J'y ai assisté au COMEX et consolidé le savoir-être et les logiques de pilotage nécessaires pour conduire un changement de produit, une pérennisation de montage et un projet d'ingénierie en thermodynamique et CFD : le changement de fluide réfrigérant pour un caisson de froid. ",
      <HighlightText key="timeline-fr-parcours-progressif">Un parcours progressif, du terrain au responsable, qui a forgé une vision complète des projets de conception et de la production industrielle.</HighlightText>,
    ],
  },
  {
    year: "2026",
    duration: "Juin — Septembre",
    title: "Assistant Directeur et projet d’industrialisation ingénieur",
    org: "Gruau — site d'Argentan",
    desc: "Rattaché directement au directeur de site, j'ai suivi les grands équilibres de pilotage d'une PME industrielle au sein d'un grand groupe : comités exécutifs, suivi de production, gestion des commandes et pilotage de la performance. En parallèle, une étude thermique, thermodynamique et CFD poussée sur un caisson réfrigérant m'a permis de mener une étude sur le cycle de transformation du fluide, ainsi qu'une étude sur le comportement de l'air à l'intérieur du caisson. Cela m'a permis d'identifier un fluide réfrigérant de remplacement et d'adapter les composants en conséquence. À cela s'ajoute la création de gammes de fabrication pour pérenniser et automatiser la production d'un produit, ainsi que l'application du 5S et d'autres outils du Lean manufacturing. Une expérience qui allie responsabilité exécutive, vision stratégique et projet d'ingénierie, au service de la performance industrielle.",
  },
  {
    year: "2024",
    duration: "Juin — Juillet",
    title: "Process & production",
    org: "Strate Composites",
    desc: "Au sein de l'équipe Process & Production de Strate Composites, j'ai contribué à la modernisation des équipements et au suivi de la production sur des procédés composites. J'ai conçu un système de préhension par ventouse pour le démoulage et la manutention sécurisée de pièces lourdes, développé des chariots de transport pour fluidifier les flux, et rédigé des instructions de travail pour standardiser la fabrication. Mes interventions chez plusieurs clients industriels et ma participation aux réunions de conception produit m'ont également donné une vision transversale de la rentabilité des produits et de leur contribution à la performance financière de l'entreprise. Une expérience alliant amélioration continue, ingénierie de production et vision client.",
  },
  {
    year: "2023",
    duration: "2 mois",
    title: "Quality Control Specialist",
    org: "Marelli",
    desc: "Premier grand pas dans une entreprise internationale, cette expérience chez Marelli a été l'occasion de mesurer ce que signifie la qualité à l'échelle d'un grand groupe. J'ai supervisé les opérations d'inspection en ligne pour garantir la conformité des produits en temps réel, et mené plusieurs investigations 5D/8D en m'appuyant sur des méthodologies telles que les 5 Pourquoi, Ishikawa, Gemba Walks et Kaizen pour remonter aux causes racines des non-conformités et optimiser les flux de production. Ce travail, mené en collaboration étroite avec les équipes ingénierie et production, m'a appris la rigueur nécessaire pour contribuer à la satisfaction client et à la réputation de Marelli comme fournisseur automobile de référence à l'échelle mondiale.",
  },
  {
    year: "2021",
    duration: "1 mois",
    title: "Fabrication composite",
    org: "MF-Tech",
    desc: "Production par enroulement filamentaire (filament winding) sur pièces composites.",
  },
  {
    year: "2017",
    duration: "1 mois",
    title: "Stage d'observation",
    org: "CEA Paris-Saclay",
    desc: "Observation des processus expérimentaux et des protocoles de recherche en laboratoire. Découverte des méthodologies scientifiques et de l'analyse de données dans un environnement de recherche de pointe.",
  },
];

const timelineEn = [
  {
    year: "2024 - 2025",
    duration: "Ongoing",
    title: "Engineering cycle — Propulsion major",
    org: "IPSA Toulouse",
    desc: "Final year of engineering school. Compressible fluid mechanics, applied thermodynamics, aerospace propulsion, turbomachinery, and nozzle sizing.",
  },
  {
    year: "2026",
    duration: "June — September",
    title: "Assistant director — industrialization project",
    org: "Gruau — Argentan site",
    desc: "An experience at the intersection of management, engineering, and industrial operations. Alongside the executive committee, I gained insight into the site's key business and production challenges. At the same time, a thermal, thermodynamic, and CFD study on a refrigerated body led to concrete improvements through 5S, refined models, and new manufacturing work instructions. A hands-on immersion in the decisions that drive industrial performance.",
  },
  {
    year: "2024",
    duration: "2 months",
    title: "Process & production",
    org: "Strate Composites",
    desc: "Equipment modernization and production monitoring on composite manufacturing processes.",
  },
  {
    year: "2023",
    duration: "2 months",
    title: "Quality Control Specialist",
    org: "Marelli",
    desc: "Non-conformity analysis and quality follow-up in automotive production environment.",
  },
  {
    year: "2021",
    duration: "1 month",
    title: "Composite manufacturing",
    org: "MF-Tech",
    desc: "Filament winding production on composite parts.",
  },
  {
    year: "2017",
    duration: "1 month",
    title: "Internship",
    org: "CEA Paris-Saclay",
    desc: "Observed experimental workflows and laboratory research protocols. Discovered scientific methodologies and advanced data analysis approaches.",
  },
];

const experienceBackgroundImages = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];

const persoFr = [
  {
    title: "Le sport",
    desc: [
      "Le sport a toujours été un pilier essentiel dans mon équilibre. Il m'a appris à rester discipliné, à être régulier et à aller au bout de ce que je commence. ",
      "Le sport m'a formé à la persévérance, à l'effort et au travail d'équipe.",
    ],
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=85",
  },
  {
    title: "La transmission des connaissances",
    desc: [
      "J'aime expliquer, faire comprendre et rendre les choses concrètes. Que ce soit dans le cadre professionnel ou autour d'un sujet qui me tient à cœur, j'aime transmettre ce que j'ai appris. ",
      "Je prends du plaisir à faire progresser les autres en leur donnant des clés claires.",
    ],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=85",
  },
  {
    title: "L'accompagnement et la pédagogie",
    desc: [
      "J'ai toujours eu envie d'accompagner les gens, de les guider et de les aider à progresser dans des situations concrètes. J'aime m'adapter au niveau et au profil de chacun pour expliquer autrement. ",
      "Aider les autres à avancer est pour moi à la fois une satisfaction et une vraie compétence.",
    ],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=85",
  },
  {
    title: "L'apprentissage constant",
    desc: [
      "J'aime l'envie d'apprendre, la curiosité, et le fait d'aller plus loin dans la compréhension. C'est ce qui me pousse à chercher, à comprendre et à m'améliorer sans cesse. ",
      "L'apprentissage n'est pas une fin, c'est une manière de vivre et de progresser.",
    ],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=85",
  },
];

const persoEn = [
  {
    title: "Sport",
    desc: [
      "Sport has always been a central pillar in my balance. It taught me discipline, consistency, and the ability to keep pushing forward. ",
      "Sport shaped my perseverance, rigor, and team spirit.",
    ],
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=85",
  },
  {
    title: "Transmission of knowledge",
    desc: [
      "I enjoy explaining, making things clear, and turning complex ideas into something practical. Whether in a professional setting or around a topic I care about, I like sharing what I have learned. ",
      "I enjoy helping others move forward by giving them clear and usable keys.",
    ],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=85",
  },
  {
    title: "Guidance and teaching",
    desc: [
      "I have always enjoyed helping people, guiding them, and supporting their progress in concrete situations. I like adapting the message to the person and the context. ",
      "Helping others progress is both a source of fulfillment and a real skill.",
    ],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=85",
  },
  {
    title: "Continuous learning",
    desc: [
      "I enjoy curiosity, the desire to understand more, and the urge to go beyond what is already known. It is what drives me to keep improving every day. ",
      "Learning is not an end point; it is a way of living and progressing.",
    ],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=85",
  },
];

const contactsFr = [
  { label: "Email", value: "alexi.grandperret@ipsa.fr" },
  { label: "Téléphone", value: "+33 6 82 45 61 80" },
  { label: "LinkedIn", value: "https://www.linkedin.com/in/alexi0" },
  { label: "GitHub", value: "https://fredetrickspace.wixsite.com/aegis" },
  { label: "CV — Français", value: "/Grandperret_Alexi_CV_fr.pdf" },
  { label: "CV — English", value: "/Grandperret_Alexi_CV_English.pdf" },
];

const contactsEn = [
  { label: "Email", value: "alexi.grandperret@ipsa.fr" },
  { label: "Phone", value: "+33 6 82 45 61 80" },
  { label: "LinkedIn", value: "https://www.linkedin.com/in/alexi0" },
  { label: "GitHub", value: "https://fredetrickspace.wixsite.com/aegis" },
  { label: "CV — French", value: "/Grandperret_Alexi_CV_fr.pdf" },
  { label: "CV — English", value: "/Grandperret_Alexi_CV_English.pdf" },
];

const isValidLink = (value: string) => Boolean(value && !value.startsWith("["));

const contactHref = (contact: { label: string; value: string }) => {
  const { label, value } = contact;
  if (!isValidLink(value)) return undefined;
  if (value.startsWith("mailto:") || value.startsWith("tel:") || value.startsWith("http")) {
    return value;
  }
  if (label.toLowerCase().includes("email") && value.includes("@")) {
    return `mailto:${value}`;
  }
  if (label.toLowerCase().includes("téléphone") || label.toLowerCase().includes("phone")) {
    return `tel:${value.replace(/[^\d+]/g, "")}`;
  }
  return value;
};

const socialLinks = [
  {
    label: "LinkedIn",
    href: contactsFr.find((item) => item.label === "LinkedIn")?.value,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current">
        <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm.02 6.5H2v12h3V10zm7.5 0h-3v12h3v-6.1c0-3.1 4-3.3 4 0v6.1h3v-7.4c0-6-6.8-5.8-7 0V10z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: contactsFr.find((item) => item.label === "GitHub")?.value,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current">
        <path d="M12 2.5s5 2 5 7.5c0 4.5-3.5 7.5-5 9-1.5-1.5-5-4.5-5-9 0-5.5 5-7.5 5-7.5Zm0 4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-6.5 8.5C4.5 16.5 4 18 4 20c2 0 3.5-.5 4.5-1.5L10 17l-3-3-1.5 1.5Zm13 0L17 14l-3 3 1.5 1.5C16.5 19.5 18 20 20 20c0-2-.5-3.5-1.5-4.5Z" />
      </svg>
    ),
  },
  {
    label: "CV FR",
    href: contactsFr.find((item) => item.label === "CV — Français")?.value,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm1 7V3.5L20.5 9H15Zm-3 7H8v-2h4v2Zm5-4H8v-2h8v2Z" />
      </svg>
    ),
  },
  {
    label: "CV EN",
    href: contactsEn.find((item) => item.label === "CV — English")?.value,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm1 7V3.5L20.5 9H15Zm-3 7H8v-2h4v2Zm5-4H8v-2h8v2Z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: contactsFr.find((item) => item.label === "Email")?.value,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current">
        <path d="M21 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 2-9 6-9-6h18Zm-18 10V8.46l8.47 5.64c.24.16.53.16.77 0L21 8.46V17Z" />
      </svg>
    ),
  },
];

const headerLinks = socialLinks.filter((item) => ["LinkedIn", "GitHub", "Email"].includes(item.label));
export default function Home() {
  const { lang } = useLanguage();
  const [hoveredInterest, setHoveredInterest] = useState<string | null>(null);
  const stats = lang === "fr" ? statsFr : statsEn;
  const skills = lang === "fr" ? skillsFr : skillsEn;
  const timeline = lang === "fr" ? timelineFr : timelineEn;
  const perso = lang === "fr" ? persoFr : persoEn;
  const contacts = lang === "fr" ? contactsFr : contactsEn;
  const cvContact = lang === "fr"
    ? contactsFr.find((item) => item.label === "CV — Français")
    : contactsEn.find((item) => item.label === "CV — English");
  const cvLink = contactHref(cvContact ?? { label: "CV", value: "" });
  const projects = getProjects(lang);
  const navText = {
    professionalTop: lang === "fr" ? "Professionnel" : "Professional",
    personalTop: lang === "fr" ? "Personnel" : "Personal",
    contactTop: lang === "fr" ? "Contact" : "Contact",
    navProfile: lang === "fr" ? "Profil de vol" : "Flight profile",
    navEducation: lang === "fr" ? "Éducation" : "Education",
    navJourney: lang === "fr" ? "Expérience" : "Experience",
    navProjects: lang === "fr" ? "Projets" : "Projects",
    navSkills: lang === "fr" ? "Compétences" : "Skills",
    navPersonal: lang === "fr" ? "Perso" : "Personal",
    navContact: lang === "fr" ? "Contact" : "Contact",
    profileHeadingLabel: lang === "fr" ? "01 — PROFIL DE VOL" : "01 — FLIGHT PROFILE",
    profileHeadingTitleLead: lang === "fr" ? "Comprendre le moteur," : "Understanding the engine,",
    profileHeadingTitleTail: lang === "fr" ? "puis l'usine qui le fabrique" : "then the factory that builds it",
    educationLabel: lang === "fr" ? "02 — ÉDUCATION" : "02 — EDUCATION",
    educationTitle: lang === "fr" ? "Base académique et trajectoire" : "Academic base and trajectory",
    educationDesc:
      lang === "fr"
        ? "Le socle théorique qui structure mon parcours : formation d'ingénieur, spécialisation propulsion et progression vers les enjeux industriels de l'aérospatial."
        : "The academic foundation behind my path: engineering training, propulsion specialization, and progression toward aerospace industrial challenges.",
    profileBody1:
      lang === "fr"
        ? [
            "Élève-ingénieur en dernière année à l’IPSA, spécialisé en propulsion aérospatiale, ",
            <HighlightText key="profile-body-1-emphasis">je m’intéresse à la mécanique des fluides, la simulation numérique par CFD et la production industrielle.</HighlightText>,
            " J’ai choisi ce domaine pour contribuer à la conception de systèmes complexes et repousser les limites du vol et de l’exploration spatiale.",
          ]
        : [
            "Final-year engineering student at IPSA, specialized in aerospace propulsion, ",
            <HighlightText key="profile-body-1-emphasis-en">I am interested in fluid mechanics, numerical CFD simulation, and industrial production.</HighlightText>,
            " I chose this field to contribute to the design of complex systems and push the boundaries of flight and space exploration.",
          ],
    profileBody2:
      lang === "fr"
        ? [
            "Mon expérience en production automobile m’a permis de mieux comprendre les processus industriels, le travail en équipe et les exigences de la fabrication en série. ",
            <HighlightText key="profile-body-2-emphasis">Je souhaite aujourd’hui mettre ces compétences au service du secteur aérospatial.</HighlightText>,
          ]
        : [
            "My experience in automotive production has helped me better understand industrial processes, teamwork, and the requirements of series manufacturing. ",
            <HighlightText key="profile-body-2-emphasis-en">I now want to apply these skills to the aerospace sector.</HighlightText>,
          ],
    profileBody3:
      lang === "fr"
        ? [
            "Mes principales forces sont ma capacité à créer un dialogue constructif, à garder mon sang-froid sous pression et à hiérarchiser efficacement les tâches complexes. ",
            <HighlightText key="profile-body-3-emphasis">Je m’intègre facilement à des équipes diversifiées et j’adapte ma communication à différents profils.</HighlightText>,
          ]
        : [
            "My main strengths are my ability to create constructive dialogue, stay calm under pressure, and prioritize complex tasks effectively. ",
            <HighlightText key="profile-body-3-emphasis-en">I integrate easily into diverse teams and adapt my communication to different profiles.</HighlightText>,
          ],
    profileBody4:
      lang === "fr"
        ? [
            "Mes quatre nationalités représentent une richesse personnelle et un atout dans un contexte international. ",
            <HighlightText key="profile-body-4-emphasis">Elles facilitent mon adaptation à de nouveaux environnements ainsi que mes échanges au sein d’équipes multiculturelles.</HighlightText>,
          ]
        : [
            "My four nationalities represent a personal wealth and an asset in an international context. ",
            <HighlightText key="profile-body-4-emphasis-en">They make it easier for me to adapt to new environments and communicate within multicultural teams.</HighlightText>,
          ],
    parcoursLabel: lang === "fr" ? "03 — TRAJECTOIRE" : "03 — EXPERIENCE",
    parcoursTitle: lang === "fr" ? "Expériences" : "Experience",
    parcoursDesc:
      lang === "fr"
        ? "Du terrain de production aux calculs de mécanique des fluides — quatre stages et un cursus construits autour de la même trajectoire."
        : "From production floor work to fluid mechanics calculations — four internships and one curriculum built around the same trajectory.",
    projectsLabel: lang === "fr" ? "04 — PROJETS" : "04 — PROJECTS",
    projectsTitle: lang === "fr" ? "Journal de bord technique" : "Technical logbook",
    projectsDesc:
      lang === "fr"
        ? "Une sélection de travaux menés en cours, de la théorie de l'écoulement compressible à la simulation sur logiciel métier. Filtre par domaine pour explorer."
        : "A selection of coursework projects, from compressible flow theory to engineering software simulation. Filter by domain to explore.",
    skillsLabel: lang === "fr" ? "05 — COMPÉTENCES" : "05 — SKILLS",
    skillsTitle: lang === "fr" ? "Boîte à outils" : "Toolbox",
    persoLabel: lang === "fr" ? "06 — CENTRES D’INTÉRÊTS" : "06 — INTERESTS",
    persoTitle: lang === "fr" ? "Mes centres d’intérêts" : "My interests",
    contactLabel: lang === "fr" ? "07 — CONTACT" : "07 — CONTACT",
    contactTitle: lang === "fr" ? "Entrons en liaison" : "Let's connect",
    contactDesc:
      lang === "fr"
        ? "Propulsion, production aérospatiale, systèmes industriels : si votre trajectoire croise la mienne, écrivez-moi."
        : "Propulsion, aerospace production, industrial systems: if your trajectory crosses mine, feel free to reach out.",
    profileFacts: {
      formation: lang === "fr" ? "Formation" : "Education",
      specialite: lang === "fr" ? "Spécialité" : "Specialty",
      niveau: lang === "fr" ? "Niveau" : "Level",
      objectif: lang === "fr" ? "Objectif" : "Goal",
      base: lang === "fr" ? "Base" : "Location",
      nationalites: lang === "fr" ? "Nationalités" : "Nationalities",
      formationVal:
        lang === "fr"
          ? "Institut polytechnique des sciences avancées, campus Toulouse, ingénieur aérospatiale."
          : "Institut polytechnique des sciences avancées, Toulouse campus, aerospace engineering.",
      formationCardTitle: lang === "fr" ? "IPSA Toulouse / cycle ingénieur" : "IPSA Toulouse / engineering cycle",
      specialiteVal: lang === "fr" ? "Systèmes de propulsion, science des fusées et production industrielle" : "Propulsion systems, rocket science, and industrial production",
      niveauVal: lang === "fr" ? "Dernière année d'école d'ingénieur" : "Final year of engineering school",
      objectifVal: lang === "fr" ? "Contribuer à des projets innovants, avancer avec une équipe et continuer d'apprendre" : "Contribute to innovative projects, work with a team, and keep learning",
      baseVal: lang === "fr" ? "Toulouse, France" : "Toulouse, France",
      nationalitesVal: lang === "fr" ? "Français, Américain, Canadien, Mexicain" : "American, French, Canadian, Mexican",
    },
  };
  const educationCards = [
    {
      image: "/IPSA%20TOULOUSE.jpg",
      title: navText.profileFacts.formationCardTitle,
      subtitle: navText.profileFacts.formation,
      description:
        lang === "fr"
          ? "Cycle ingenieur a Toulouse, construit autour d'une montee en puissance progressive entre bases scientifiques, mecanique, systemes et vision industrielle."
          : "Engineering curriculum in Toulouse, built around a progressive ramp-up across scientific fundamentals, mechanics, systems, and industrial perspective.",
      rotate: "y" as const,
    },
    {
      image: "/Turbine.jpg",
      hoverImage: "/fus%C3%A9eee.jpg",
      title: navText.profileFacts.specialiteVal,
      subtitle: navText.profileFacts.specialite,
      description:
        lang === "fr"
          ? "Orientation vers la propulsion aérospatiale, avec un intérêt marqué pour la thermodynamique appliquée, l'écoulement compressible et le dimensionnement de systèmes propulsifs."
          : "Focus on aerospace propulsion, with strong interest in applied thermodynamics, compressible flow, and propulsion-system sizing.",
      rotate: "x" as const,
    },
    {
      image: "/Fus%C3%A9e/asset/carte%202%20.jpg",
      hoverImage: "/ipsafus%C3%A9.png",
      title: navText.profileFacts.niveauVal,
      subtitle: navText.profileFacts.niveau,
      description:
        lang === "fr"
          ? "Derniere annee de formation, avec une articulation claire entre savoir academique, projets techniques et projection vers des responsabilites en propulsion puis en production."
          : "Final training year, with a clear bridge between academic knowledge, technical projects, and a path toward propulsion then production responsibilities.",
      rotate: "y" as const,
    },
  ];

  return (
    <>
      <header id="top" className="halo-nav-blend">
        <nav className="mx-auto flex max-w-[1100px] items-center justify-between px-8 py-4.5">
          <Link
            href="/#top"
            aria-label="Alexi Grandperret - Accueil"
            className="flex items-center gap-2.5 font-display text-[15px] font-semibold tracking-wide text-metal-light"
          >
            <span className="h-2.5 w-2.5 rotate-45 bg-accent" />
            ALEXI&nbsp;GRANDPERRET
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-8 text-[14px] font-semibold sm:flex">
              <div className="group/pro-nav relative">
                <Link
                  href="/"
                  className="top-nav-link"
                >
                  {navText.professionalTop}
                </Link>
                <div className="pointer-events-none absolute left-0 top-full z-50 w-52 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-hover/pro-nav:pointer-events-auto group-hover/pro-nav:translate-y-0 group-hover/pro-nav:opacity-100 group-focus-within/pro-nav:pointer-events-auto group-focus-within/pro-nav:translate-y-0 group-focus-within/pro-nav:opacity-100">
                  <div className="rounded-lg border border-white/15 bg-black p-2 text-[12px] font-medium text-text-dim shadow-[0_18px_46px_rgba(0,0,0,0.28)]">
                    <a href="#profil" className="professional-menu-link">{navText.navProfile}</a>
                    <a href="#education" className="professional-menu-link">{navText.navEducation}</a>
                    <a href="#parcours" className="professional-menu-link">{navText.navJourney}</a>
                    <a href="#projets" className="professional-menu-link">{navText.navProjects}</a>
                    <a href="#competences" className="professional-menu-link">{navText.navSkills}</a>
                    <a href="#perso" className="professional-menu-link">{navText.navPersonal}</a>
                    <a href="#contact" className="professional-menu-link">{navText.navContact}</a>
                  </div>
                </div>
              </div>
              <Link
                href="/personal"
                className="top-nav-link"
              >
                {navText.personalTop}
              </Link>
              <Link
                href="/contact"
                className="top-nav-link"
              >
                {navText.contactTop}
              </Link>
            </div>
            <LanguageToggle />
          </div>
        </nav>
      </header>

      {/* HERO + PROFIL BACKGROUND WRAPPER */}
      <div className="relative overflow-hidden">
        <HomeBackground />

        <section className="relative z-10 border-b border-border pt-12 pb-24">
          <Hero headerLinks={headerLinks} cvLink={cvLink} />
          <div className="relative z-10 mx-auto mt-16 grid max-w-[1100px] grid-cols-2 gap-6 px-8 pt-10 sm:grid-cols-4">
            {stats.map((s) => (
              <Counter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </section>

        <section id="profil" className="relative z-10 border-b border-border py-24">
          <div className="mx-auto max-w-[1100px] px-8">
          <Reveal className="mb-12">
            <div className="mb-2.5 font-mono text-sm tracking-widest text-accent">
              {navText.profileHeadingLabel}
            </div>
            <h2 className="font-display text-3xl font-semibold text-metal-light">
              {navText.profileHeadingTitleLead}{" "}
              <span className="font-normal text-text-dim">
                {navText.profileHeadingTitleTail}
              </span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-14 md:grid-cols-[1.3fr_1fr]">
            <motion.div
              className="relative space-y-6 border-l border-accent/20 pl-5 text-[15.5px] leading-8 text-text-dim"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.16 } },
              }}
            >
              <motion.span
                aria-hidden="true"
                className="absolute -left-px top-0 w-px origin-top bg-accent shadow-[0_0_14px_rgba(65,105,225,0.7)]"
                variants={{ hidden: { scaleY: 0 }, visible: { scaleY: 1, transition: { duration: 1.2, ease: "easeOut" } } }}
              />
              {[navText.profileBody1, navText.profileBody2, navText.profileBody3, navText.profileBody4].map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={{ hidden: { opacity: 0, y: 18, filter: "blur(5px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  {Array.isArray(paragraph) ? paragraph.map((child, childIndex) =>
                    typeof child === "string" ? (
                      <span key={`${index}-${childIndex}`}>{child}</span>
                    ) : (
                      <HighlightText key={`${index}-${childIndex}`} delay={index * 0.06}>
                        {child}
                      </HighlightText>
                    )
                  ) : paragraph}
                </motion.p>
              ))}
            </motion.div>
            <div className="flex h-full flex-col gap-3">
              {[
                { label: navText.profileFacts.formation, value: navText.profileFacts.formationVal },
                { label: navText.profileFacts.specialite, value: navText.profileFacts.specialiteVal },
                { label: navText.profileFacts.niveau, value: navText.profileFacts.niveauVal },
                { label: navText.profileFacts.objectif, value: navText.profileFacts.objectifVal },
                { label: navText.profileFacts.base, value: navText.profileFacts.baseVal },
                { label: navText.profileFacts.nationalites, value: navText.profileFacts.nationalitesVal },
              ].map((fact, index) => (
                <Reveal
                  key={fact.label}
                  delay={index * 0.05}
                  repeat
                  className="relative flex-1 rounded-xl border border-white/10 bg-bg-panel/58 p-4.5 backdrop-blur-[1px]"
                >
                  <GlowingEffect spread={32} glow proximity={56} inactiveZone={0.01} borderWidth={1.2} />
                  <dl className="flex h-full flex-col justify-center gap-1.5 text-[13.5px]">
                    <dt
                      className="font-display text-[15px] font-semibold tracking-tight text-accent"
                      style={{ textShadow: "0 0 14px rgba(65,105,225,0.55), 0 0 28px rgba(65,105,225,0.25)" }}
                    >
                      {fact.label}
                    </dt>
                    <dd className="text-metal-light">{fact.value}</dd>
                  </dl>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="education" className="border-b border-border py-24">
        <div className="mx-auto max-w-[1100px] px-8">
          <Reveal className="mb-12">
            <div className="mb-2.5 font-mono text-sm tracking-widest text-accent">
              {navText.educationLabel}
            </div>
            <h2 className="font-display text-3xl font-semibold text-metal-light">
              {navText.educationTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] text-text-dim">
              {navText.educationDesc}
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {educationCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.05}>
                <FlipCard
                  image={card.image}
                  hoverImage={card.hoverImage}
                  title={card.title}
                  subtitle={card.subtitle}
                  description={card.description}
                  rotate={card.rotate}
                  className="mx-auto max-w-[18rem] md:max-w-none"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-top bg-no-repeat opacity-[0.34]"
            style={{
              backgroundImage: "url('/cellci.jpg')",
              backgroundSize: "100% auto",
              backgroundPosition: "center top",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-[38vh] bg-gradient-to-b from-bg via-bg/94 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[44vh] bg-gradient-to-b from-transparent via-bg/88 to-bg" />
        </div>

      {/* PARCOURS */}
      <section id="parcours" className="border-b border-border py-24 scroll-smooth">

        <div className="mx-auto max-w-[1100px] px-6">
          <div className="mb-12">
            <Reveal delay={0.02} repeat>
              <div className="mb-2.5 font-mono text-sm tracking-widest text-accent">
                {navText.parcoursLabel}
              </div>
            </Reveal>
            <Reveal delay={0.08} repeat>
              <h2 className="font-display text-3xl font-semibold text-metal-light">
                {navText.parcoursTitle}
              </h2>
            </Reveal>
            <Reveal delay={0.14} repeat>
              <p className="mt-3 max-w-lg text-[15px] text-text-dim">
                {navText.parcoursDesc}
              </p>
            </Reveal>
          </div>
          <TimelineTrack>
            {timeline.map((tItem, i) => (
              <Reveal
                key={tItem.title}
                delay={i * 0.05}
                repeat
                className="relative grid min-h-[110vh] grid-cols-[5rem_1fr] gap-x-6 pb-24 snap-start"
              >
                {experienceBackgroundImages[i] ? (
                  <div
                    className="pointer-events-none absolute inset-y-0 z-0 overflow-hidden"
                    style={{ left: "50%", width: "100vw", transform: "translateX(calc(-50% - 3rem))" }}
                  >
                    <motion.div
                      className="experience-background-image absolute inset-0 bg-top bg-no-repeat saturate-125 contrast-110"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.6 }}
                      viewport={{ amount: 0.2 }}
                      transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        backgroundImage: `url('${experienceBackgroundImages[i]}')`,
                        backgroundSize: "100% auto",
                        backgroundPosition: "center top",
                      }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(2,8,14,0.44),rgba(9,24,42,0.1)_52%,rgba(2,8,14,0.36))]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-bg/82 via-bg/8 to-bg/70" />
                  </div>
                ) : null}
                <div className="relative z-20">
                  <TimelineBullet year={tItem.year} duration={tItem.duration} />
                </div>
                <div className="relative z-20">
                  <div className="sticky top-16 z-10 flex flex-col self-start">
                    <Reveal className="font-display text-lg font-semibold" delay={0} repeat>
                      {tItem.title}
                    </Reveal>
                    <Reveal className="mt-1 text-[13px] text-text-faint" repeat>
                      {tItem.org}
                    </Reveal>
                    {Array.isArray(tItem.desc) ? (
                      <ScrollRevealText className={`timeline-desc mt-4 ${i === 1 || i === 2 || i === 3 ? "max-w-3xl" : "max-w-xl"} text-[14.5px] leading-7`}>
                        {tItem.desc}
                      </ScrollRevealText>
                    ) : (
                      <Reveal className={`timeline-desc mt-4 ${i === 1 || i === 2 || i === 3 ? "max-w-3xl" : "max-w-xl"} text-[14.5px] leading-7`} repeat>
                        {tItem.desc}
                      </Reveal>
                    )}
                    {i === 1 ? <LampDemo /> : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </TimelineTrack>
        </div>
      </section>

      {/* PROJETS */}
      <section id="projets" className="relative overflow-hidden border-b border-border py-24">
        <motion.div
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
          initial={{ opacity: 0, scale: 1.1, y: 28 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ backgroundImage: "url('/dassult.jpg')" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-black/45" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[46vh] bg-gradient-to-b from-bg via-bg/64 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[50vh] bg-gradient-to-b from-transparent via-bg/64 to-bg" />
        <div className="relative z-10 mx-auto max-w-[1100px] px-8">
          <Reveal className="mb-12">
            <div className="mb-2.5 font-mono text-sm tracking-widest text-accent">
              {navText.projectsLabel}
            </div>
            <h2 className="font-display text-3xl font-semibold text-metal-light">
              {navText.projectsTitle}
            </h2>
            <p className="mt-3 max-w-lg text-[15px] text-text-dim">
              {navText.projectsDesc}
            </p>
          </Reveal>
          <ProjectFilter projects={projects} />
        </div>
      </section>

      {/* COMPETENCES */}
      <section id="competences" className="border-b border-border py-24">
        <div className="mx-auto max-w-[1100px] px-8">
          <Reveal className="mb-12">
            <div className="mb-2.5 font-mono text-sm tracking-widest text-accent">
              {navText.skillsLabel}
            </div>
            <h2 className="font-display text-3xl font-semibold text-metal-light">
              {navText.skillsTitle}
            </h2>
          </Reveal>
          <Reveal>
            <SkillsGrid groups={skills} />
          </Reveal>
        </div>
      </section>

      <section id="perso" className="relative isolate overflow-hidden border-b border-border py-24">
        {perso.map((entry) => entry.title === hoveredInterest ? <div key={entry.title} className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.82), rgba(0, 0, 0, 0.9)), url('${entry.image}')` }} /> : null)}
        <div className="relative mx-auto max-w-[1100px] px-8">
          <Reveal className="mb-12">
            <div className="mb-2.5 font-mono text-sm tracking-widest text-accent">
              {navText.persoLabel}
            </div>
            <h2 className="font-display text-3xl font-semibold text-metal-light">
              {navText.persoTitle}
            </h2>
          </Reveal>
          <Reveal className="border-y border-border">
            {perso.map((entry) => (
              <HoverTile key={entry.title} className="grid gap-4 border-b border-border py-7 last:border-b-0 sm:grid-cols-[220px_1fr] sm:gap-10" onHoverStart={() => setHoveredInterest(entry.title)} onHoverEnd={() => setHoveredInterest(null)}>
                <h3 className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-metal-light">
                  {entry.title}
                </h3>
                <p className="max-w-3xl text-base leading-7 text-text-dim">
                  {Array.isArray(entry.desc) ? entry.desc.map((child, childIndex) =>
                    typeof child === "string" ? (
                      <span key={`${entry.title}-${childIndex}`}>{child}</span>
                    ) : (
                      <Fragment key={`${entry.title}-${childIndex}`}>{child}</Fragment>
                    )
                  ) : entry.desc}
                </p>
              </HoverTile>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24">
        <div className="mx-auto max-w-[1100px] px-8">
          <Reveal className="mb-12">
            <div className="mb-2.5 font-mono text-sm tracking-widest text-accent">
              {navText.contactLabel}
            </div>
            <h2 className="font-display text-3xl font-semibold text-metal-light">
              {navText.contactTitle}
            </h2>
            <p className="mt-3 max-w-lg text-[15px] text-text-dim">
              {navText.contactDesc}
            </p>
          </Reveal>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {socialLinks.map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="liquid-button liquid-button--circle inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent/30 bg-bg-panel text-metal-light"
                  style={{ "--liquid-color": "#4169e1" } as React.CSSProperties}
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ) : null
            )}
          </div>
          <Reveal className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 mt-10">
            {contacts.map((c) => {
              const href = contactHref(c);
              const tile = (
                <HoverTile
                  key={c.label}
                  className={`bg-bg-panel-2 p-6 px-7 transition ${href ? "cursor-pointer hover:bg-bg-panel" : ""}`}
                >
                  <div className="mb-2 font-mono text-[11px] uppercase tracking-wide text-text-faint">
                    {c.label}
                  </div>
                  <div className="italic text-text-faint">{c.value}</div>
                </HoverTile>
              );

              return href ? (
                <a key={c.label} href={href} target="_blank" rel="noreferrer">
                  {tile}
                </a>
              ) : (
                tile
              );
            })}
            <HoverTile className="bg-bg-panel-2 p-6 px-7 transition hover:bg-bg-panel">
              <div className="mb-2 font-mono text-[11px] uppercase tracking-wide text-text-faint">{navText.profileFacts.base}</div>
              <div className="text-metal-light">{navText.profileFacts.baseVal}</div>
            </HoverTile>
            <HoverTile className="bg-bg-panel-2 p-6 px-7 transition hover:bg-bg-panel">
              <div className="mb-2 font-mono text-[11px] uppercase tracking-wide text-text-faint">{navText.profileFacts.formation}</div>
              <div className="text-metal-light">{navText.profileFacts.formationVal}</div>
            </HoverTile>
          </Reveal>
        </div>
      </section>

      <footer className="py-9 text-center font-mono text-xs text-text-faint">
        © 2026 Alexi Grandperret
      </footer>
      </div>
    </>
  );
}
