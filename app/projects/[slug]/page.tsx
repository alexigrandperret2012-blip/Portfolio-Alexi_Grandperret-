"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Bot, Check, Download, Gauge, GitCompareArrows, Route, SlidersHorizontal, type LucideIcon, Waves } from "lucide-react";
import { use, useLayoutEffect } from "react";
import { getProjects } from "@/app/lib/projects";
import AerospikeReportCarousel from "@/app/components/AerospikeReportCarousel";
import DroneReportCarousel from "@/app/components/DroneReportCarousel";
import RocketReportCarousel from "@/app/components/RocketReportCarousel";
import LavalJetCarousel from "@/app/components/LavalJetCarousel";
import LavalReportCarousel from "@/app/components/LavalReportCarousel";
import LanguageToggle from "@/app/components/LanguageToggle";
import { useLanguage } from "@/app/components/LanguageProvider";
import { HoverBorderGradient } from "@/app/components/ui/hover-border-gradient";

const lavalAssetPath = "/Laval/assets/RENDU_Dynamique_des_fluides";

function LavalProjectPage({ lang }: { lang: "fr" | "en" }) {
  const fr = lang === "fr";
  const overviewStats: { Icon: LucideIcon; value: string; label: string }[] = [
    { Icon: Gauge, value: "M = 2,33", label: fr ? "Mach de sortie théorique" : "Theoretical outlet Mach" },
    { Icon: GitCompareArrows, value: "0,35 %", label: fr ? "Écart débit numérique / théorie" : "Numerical / theoretical mass-flow gap" },
    { Icon: Waves, value: "3", label: fr ? "Configurations simulées" : "Simulated configurations" },
  ];
  const labels = {
    back: fr ? "Retour aux projets" : "Back to projects",
    report: fr ? "Lire le rapport complet" : "Read full report",
    overview: fr ? "Vue d'ensemble" : "Project overview",
    approach: fr ? "Approche numérique" : "Numerical approach",
    results: fr ? "Résultats clés" : "Key results",
    cases: fr ? "Trois régimes étudiés" : "Three studied regimes",
  };

  const cases = fr
    ? [
        ["01", "Tuyère adaptée", "Le nombre de Mach accélère continûment du convergent vers le divergent, sans discontinuité de choc.", "Régime isentropique jusqu'à M = 2,33", "019"],
        ["02", "Tuyère sur-détendue", "Le champ de température révèle le choc normal : le régime supersonique revient brutalement à un régime subsonique.", "Choc observé à M = 1,626", "028"],
        ["03", "Jet sur-détendu", "Le post-traitement Schlieren rend visibles les cellules de choc, les éventails de détente et leurs réflexions dans le panache.", "Disque de Mach et ondes obliques", "047"],
      ]
    : [
        ["01", "Ideally expanded nozzle", "The Mach number accelerates continuously from the convergent to the divergent section, with no shock discontinuity.", "Isentropic regime up to M = 2.33", "019"],
        ["02", "Over-expanded nozzle", "The temperature field exposes the normal shock: the supersonic regime abruptly returns to subsonic flow.", "Shock observed at M = 1.626", "028"],
        ["03", "Over-expanded jet", "Schlieren post-processing reveals shock cells, expansion fans, and their reflections in the plume.", "Mach disk and oblique shocks", "047"],
      ];
  return (
    <main className="min-h-screen overflow-x-clip bg-bg text-text">
      <header className="halo-nav-blend sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-10 lg:px-12">
          <HoverBorderGradient href="/#projets">
            <ArrowLeft className="size-4" aria-hidden="true" />
            {labels.back}
          </HoverBorderGradient>
          <LanguageToggle />
        </div>
      </header>
      <section className="relative isolate border-b border-border bg-bg-panel-2">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(143,163,179,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(143,163,179,0.13)_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-8 sm:px-10 lg:px-12 lg:pb-24">
          <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.34em] text-accent">Propulsion / CFD</p>
              <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.05] text-metal-light sm:text-6xl">
                {fr ? "Une tuyère de Laval, de la théorie au panache supersonique." : "A Laval nozzle, from theory to supersonic plume."}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-text-dim sm:text-lg">
                {fr ? "Étude numérique de trois écoulements compressibles stationnaires sous STAR-CCM+ : tuyère adaptée, choc normal interne et jet sur-détendu." : "Numerical study of three steady compressible flows in STAR-CCM+: adapted nozzle, internal normal shock, and over-expanded jet."}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="/Laval/RENDU_Dynamique_des_fluides_BUSOLINI_GRANDPERRET.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-accent px-4 py-3 font-mono text-xs uppercase tracking-wide text-white transition hover:bg-[#557cf0]">
                  <Download className="size-4" aria-hidden="true" />
                  {labels.report}
                </a>
                <a href="#resultats" className="inline-flex items-center gap-2 border border-border px-4 py-3 font-mono text-xs uppercase tracking-wide text-metal-light transition hover:border-metal hover:text-white">
                  {labels.results}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <LavalReportCarousel lang={lang} />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:px-12 lg:py-24">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">01 / {labels.overview}</p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-metal-light">{fr ? "Relier le dimensionnement à l'écoulement réel." : "Connecting sizing to real flow."}</h2>
          <p className="mt-5 max-w-md leading-8 text-text-dim">{fr ? "L'enjeu est de vérifier qu'une tuyère calculée à partir des relations isentropiques conserve le comportement attendu lorsque les conditions de sortie font apparaître des chocs." : "The goal is to verify that a nozzle sized from isentropic relations retains its expected behavior when outlet conditions produce shocks."}</p>
        </div>
        <div className="grid gap-px border border-border bg-border sm:grid-cols-3">
          {overviewStats.map(({ Icon, value, label }) => (
            <div key={value} className="bg-bg-panel-2 p-6">
              <Icon className="size-5 text-accent" aria-hidden="true" />
              <p className="mt-8 font-display text-3xl font-semibold text-metal-light">{value}</p>
              <p className="mt-2 text-sm leading-6 text-text-dim">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-bg-panel-2">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">02 / {labels.approach}</p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-metal-light">{fr ? "Construire un modèle dont les résultats sont vérifiables." : "Building a model with verifiable results."}</h2>
              <p className="mt-6 max-w-xl leading-8 text-text-dim">{fr ? "La géométrie convergente-divergente est traitée en coupe longitudinale 2D, avec le modèle axisymétrique par révolution. Le gaz parfait inviscide, le solveur couplé et un calcul stationnaire permettent de confronter directement les champs numériques aux relations théoriques." : "The converging-diverging geometry is modeled through a 2D longitudinal section using axisymmetry by revolution. An inviscid ideal gas, coupled solver, and steady calculation make it possible to compare numerical fields directly with theory."}</p>
              <ul className="mt-8 space-y-4 text-sm leading-6 text-text-dim">
                {(fr ? ["Col imposé à x = 0,03 m pour retrouver la géométrie théorique.", "Conditions totales à l'entrée, pression statique imposée en sortie.", "Validation par résidus, profils axiaux et bilans de débit massique."] : ["Throat imposed at x = 0.03 m to recover the theoretical geometry.", "Total inlet conditions and static pressure imposed at the outlet.", "Validation through residuals, axial profiles, and mass-flow balances."]).map((item) => <li key={item} className="flex gap-3"><Check className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />{item}</li>)}
              </ul>
            </div>
            <figure className="border border-border bg-bg p-3">
              <img src={`${lavalAssetPath}-013.png`} alt={fr ? "Géométrie de la tuyère convergente-divergente" : "Converging-diverging nozzle geometry"} className="w-full" />
              <figcaption className="border-t border-border px-2 pt-3 font-mono text-[10px] uppercase tracking-wide text-text-dim">{fr ? "Géométrie axisymétrique de la tuyère" : "Axisymmetric nozzle geometry"}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id="resultats" className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">03 / {labels.cases}</p>
        <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold text-metal-light">{fr ? "Faire varier la pression de sortie pour faire émerger les structures de choc." : "Varying outlet pressure to reveal shock structures."}</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {cases.map(([number, title, description, finding, image]) => (
            <article key={number} className="group border border-border bg-bg-panel-2">
              <div className="flex aspect-[1.8/1] items-center justify-center overflow-hidden border-b border-border bg-[#e8edf0] p-2">
                <img src={`${lavalAssetPath}-${image}.png`} alt="" className="size-full object-contain transition duration-700 group-hover:scale-[1.03]" />
              </div>
              <div className="p-6">
                <p className="font-mono text-xs tracking-[0.25em] text-accent">{number}</p>
                <h3 className="mt-4 font-display text-2xl font-semibold text-metal-light">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-text-dim">{description}</p>
                <p className="mt-7 border-l-2 border-accent pl-3 font-mono text-xs leading-5 text-metal-light">{finding}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-bg-panel-2">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">04 / {fr ? "Focus : jet sur-détendu" : "Focus: over-expanded jet"}</p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-metal-light">{fr ? "Quand la pression de sortie force le jet à se réadapter." : "When outlet pressure forces the jet to readjust."}</h2>
              <p className="mt-6 leading-8 text-text-dim">{fr ? "Un jet est sur-détendu lorsque sa pression à la sortie de la tuyère est inférieure à la pression ambiante. Le fluide ne peut pas retrouver instantanément l'équilibre avec le milieu extérieur : dès la lèvre de sortie, des ondes de compression apparaissent, suivies de phases de détente, puis de recompression. Ces ajustements successifs forment les cellules de choc caractéristiques du panache." : "A jet is over-expanded when its nozzle-exit pressure is lower than ambient pressure. The fluid cannot regain equilibrium instantly: from the nozzle lip, it compresses, expands, then compresses again. These successive adjustments form the plume's shock cells."}</p>
            </div>
            <LavalJetCarousel lang={lang} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
        <div className="grid gap-10 border-y border-border py-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">{fr ? "Conclusion" : "Conclusion"}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-metal-light">{fr ? "Ce que la simulation a permis d'établir." : "What the simulation established."}</h2>
          </div>
          <div className="grid gap-px border border-border bg-border sm:grid-cols-3">
            {(fr ? [
              ["Dimensionner", "Le régime adapté confirme les relations isentropiques jusqu'à Mach 2,33."],
              ["Prévoir", "La variation de pression de sortie anticipe l'apparition et la position du choc."],
              ["Interpréter", "Les visualisations CFD relient les écarts de pression aux structures du jet sur-détendu."],
            ] : [
              ["Size", "The adapted regime confirms isentropic relations up to Mach 2.33."],
              ["Predict", "Changing outlet pressure predicts the onset and position of the shock."],
              ["Interpret", "CFD visualizations connect pressure differences with the over-expanded jet structures."],
            ]).map(([title, description]) => (
              <div key={title} className="bg-bg-panel-2 p-6">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{title}</p>
                <p className="mt-5 text-sm leading-7 text-text-dim">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-12 sm:flex-row sm:items-center sm:px-10 lg:px-12">
        <p className="max-w-xl text-sm leading-6 text-text-dim">{fr ? "Projet réalisé avec Hugo Busolini dans le cadre du module MF421 — Computational Fluid Dynamics, IPSA Toulouse, 2025/2026." : "Project completed with Hugo Busolini for MF421 — Computational Fluid Dynamics, IPSA Toulouse, 2025/2026."}</p>
        <HoverBorderGradient href="/#projets"><ArrowLeft className="size-4" aria-hidden="true" />{labels.back}</HoverBorderGradient>
      </footer>
    </main>
  );
}

function DroneProjectPage({ lang }: { lang: "fr" | "en" }) {
  const fr = lang === "fr";
  const stats: { Icon: LucideIcon; value: string; label: string }[] = [
    { Icon: Bot, value: "4", label: fr ? "moteurs pilotés" : "controlled motors" },
    { Icon: SlidersHorizontal, value: "PD", label: fr ? "correcteurs de position" : "position controllers" },
    { Icon: Route, value: "17", label: fr ? "positions du parcours" : "route waypoints" },
  ];
  const labels = {
    back: fr ? "Retour aux projets" : "Back to projects",
    report: fr ? "Lire le rapport complet" : "Read full report",
    results: fr ? "Voir les résultats" : "View results",
  };

  return (
    <main className="min-h-screen overflow-x-clip bg-bg text-text">
      <header className="halo-nav-blend sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-10 lg:px-12">
          <HoverBorderGradient href="/#projets"><ArrowLeft className="size-4" aria-hidden="true" />{labels.back}</HoverBorderGradient>
          <LanguageToggle />
        </div>
      </header>

      <section className="relative isolate border-b border-border bg-bg-panel-2">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(143,163,179,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(143,163,179,0.13)_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-8 sm:px-10 lg:px-12 lg:pb-24">
          <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.34em] text-accent">Automatique / Simulation</p>
              <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.05] text-metal-light sm:text-6xl">{fr ? "Un drone autonome, du modèle à la trajectoire." : "An autonomous drone, from model to trajectory."}</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-text-dim sm:text-lg">{fr ? "Conception sous MATLAB/Simulink d'une chaîne de commande pour stabiliser un quadricoptère, allouer les efforts aux moteurs et suivre une trajectoire 3D." : "MATLAB/Simulink design of a control chain to stabilize a quadcopter, allocate motor effort, and follow a 3D trajectory."}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="/Drone/Projet_Drone.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-accent px-4 py-3 font-mono text-xs uppercase tracking-wide text-white transition hover:bg-[#557cf0]"><Download className="size-4" aria-hidden="true" />{labels.report}</a>
                <a href="#resultats-drone" className="inline-flex items-center gap-2 border border-border px-4 py-3 font-mono text-xs uppercase tracking-wide text-metal-light transition hover:border-metal hover:text-white">{labels.results}<ArrowUpRight className="size-4" aria-hidden="true" /></a>
              </div>
            </div>
            <DroneReportCarousel lang={lang} />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:px-12 lg:py-24">
        <div><p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">01 / {fr ? "Objectif" : "Objective"}</p><h2 className="mt-4 font-display text-3xl font-semibold text-metal-light">{fr ? "Transformer une consigne en mouvement contrôlé." : "Turning a target into controlled motion."}</h2><p className="mt-5 max-w-md leading-8 text-text-dim">{fr ? "Le projet relie la position cible du drone à ses quatre moteurs. Chaque étape doit préserver la stabilité tout en permettant de déplacer l'appareil selon les axes x, y, z et le lacet." : "The project connects the drone's target position to its four motors. Every step must preserve stability while moving the aircraft along x, y, z, and yaw."}</p></div>
        <div className="grid gap-px border border-border bg-border sm:grid-cols-3">{stats.map(({ Icon, value, label }) => <div key={value} className="bg-bg-panel-2 p-6"><Icon className="size-5 text-accent" aria-hidden="true" /><p className="mt-8 font-display text-3xl font-semibold text-metal-light">{value}</p><p className="mt-2 text-sm leading-6 text-text-dim">{label}</p></div>)}</div>
      </section>

      <section className="border-y border-border bg-bg-panel-2"><div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:px-12 lg:py-24"><div><p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">02 / {fr ? "Architecture de commande" : "Control architecture"}</p><h2 className="mt-4 font-display text-3xl font-semibold text-metal-light">{fr ? "Fermer la boucle entre consigne, capteur et moteurs." : "Closing the loop between target, sensor, and motors."}</h2><p className="mt-6 leading-8 text-text-dim">{fr ? "Des correcteurs PD calculent les corrections de position et d'attitude. Le calculateur transforme ensuite ces commandes globales en vitesses de rotation individuelles, avec compensation de la gravité et allocation selon la géométrie du quadricoptère." : "PD controllers calculate position and attitude corrections. The calculator then turns these global commands into individual rotor speeds, including gravity compensation and allocation based on the quadcopter geometry."}</p><ul className="mt-8 space-y-4 text-sm leading-6 text-text-dim">{(fr ? ["Retour d'état sur position et angles du drone.", "Commande en poussée, roulis, tangage et lacet.", "Conversion des efforts en vitesses des quatre moteurs."] : ["State feedback on the drone's position and angles.", "Command in thrust, roll, pitch, and yaw.", "Conversion of efforts into four motor speeds."]).map((item) => <li key={item} className="flex gap-3"><Check className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />{item}</li>)}</ul></div><figure className="border border-border bg-bg p-3"><img src="/Drone/assets/drone-report-15.png" alt={fr ? "Architecture Simulink de la commande du drone" : "Simulink architecture of the drone controller"} className="w-full" /><figcaption className="border-t border-border px-2 pt-3 font-mono text-[10px] uppercase tracking-wide text-text-dim">{fr ? "Boucle d'asservissement sous Simulink" : "Simulink feedback loop"}</figcaption></figure></div></section>

      <section id="resultats-drone" className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12 lg:py-24"><p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">03 / {fr ? "Suivi de trajectoire" : "Trajectory tracking"}</p><h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold text-metal-light">{fr ? "Passer d'une destination unique à un parcours autonome." : "Moving from a single destination to an autonomous route."}</h2><div className="mt-10 grid gap-5 lg:grid-cols-2"><figure className="border border-border bg-bg p-3"><img src="/Drone/assets/drone-report-18.png" alt={fr ? "Gestionnaire de points de passage Simulink" : "Simulink waypoint manager"} className="w-full" /><figcaption className="border-t border-border px-2 pt-3 text-sm leading-6 text-text-dim">{fr ? "Le gestionnaire compare la position actuelle à la cible, valide une arrivée selon une tolérance, puis sélectionne le point suivant." : "The manager compares the current position with the target, validates arrival through a tolerance, then selects the next waypoint."}</figcaption></figure><figure className="border border-border bg-bg p-3"><img src="/Drone/assets/drone-report-19.png" alt={fr ? "Trajectoire 3D simulée du drone" : "Simulated 3D drone trajectory"} className="w-full" /><figcaption className="border-t border-border px-2 pt-3 text-sm leading-6 text-text-dim">{fr ? "Le parcours de 17 positions est suivi dans l'espace. Les dépassements d'altitude observés révèlent la limite principale du réglage PD retenu." : "The 17-waypoint route is tracked in space. Observed altitude overshoots reveal the main limitation of the selected PD tuning."}</figcaption></figure></div></section>

      <section className="border-y border-border bg-bg-panel-2"><div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[0.75fr_1.25fr] lg:px-12 lg:py-24"><div><p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">{fr ? "Conclusion" : "Conclusion"}</p><h2 className="mt-4 font-display text-3xl font-semibold text-metal-light">{fr ? "Une chaîne autonome fonctionnelle, à affiner." : "A working autonomous chain, ready to refine."}</h2></div><div className="grid gap-px border border-border bg-border sm:grid-cols-3">{(fr ? [["Modéliser", "Le drone et ses actionneurs sont intégrés dans une même chaîne Simulink."], ["Automatiser", "Le gestionnaire de points permet d'enchaîner les cibles sans intervention."], ["Améliorer", "Un réglage PID et la prise en compte du bruit réduiraient les dépassements observés."]] : [["Model", "The drone and its actuators are integrated into one Simulink chain."], ["Automate", "The waypoint manager sequences targets without intervention."], ["Improve", "PID tuning and noise modeling would reduce the observed overshoots."]]).map(([title, description]) => <div key={title} className="bg-bg-panel-2 p-6"><p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{title}</p><p className="mt-5 text-sm leading-7 text-text-dim">{description}</p></div>)}</div></div></section>

      <footer className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-12 sm:flex-row sm:items-center sm:px-10 lg:px-12"><p className="max-w-xl text-sm leading-6 text-text-dim">{fr ? "Projet de modélisation, commande et simulation d'un drone autonome sous MATLAB/Simulink." : "Modeling, control, and simulation project for an autonomous drone in MATLAB/Simulink."}</p><HoverBorderGradient href="/#projets"><ArrowLeft className="size-4" aria-hidden="true" />{labels.back}</HoverBorderGradient></footer>
    </main>
  );
}

function RocketProjectPage({ lang }: { lang: "fr" | "en" }) {
  const fr = lang === "fr";
  const stats: { Icon: LucideIcon; value: string; label: string }[] = [
    { Icon: Gauge, value: "60-65 m", label: fr ? "apogée mesurée" : "measured apogee" },
    { Icon: Waves, value: "RP2040", label: fr ? "carte électronique embarquée" : "onboard electronics board" },
    { Icon: Check, value: "3", label: fr ? "lancements réalisés" : "launches completed" },
  ];
  const back = fr ? "Retour aux projets" : "Back to projects";

  return <main className="min-h-screen overflow-x-clip bg-bg text-text">
    <header className="halo-nav-blend sticky top-0 z-50"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-10 lg:px-12"><HoverBorderGradient href="/#projets"><ArrowLeft className="size-4" />{back}</HoverBorderGradient><LanguageToggle /></div></header>
    <section className="relative isolate border-b border-border bg-bg-panel-2"><div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(143,163,179,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(143,163,179,0.13)_1px,transparent_1px)] [background-size:42px_42px]" /><div className="relative mx-auto max-w-7xl px-6 pb-16 pt-8 sm:px-10 lg:px-12 lg:pb-24"><div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr]"><div><p className="font-mono text-xs uppercase tracking-[0.34em] text-accent">Propulsion / Projet ASTRAF</p><h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.05] text-metal-light sm:text-6xl">{fr ? "ASTRAF, concevoir et lancer une microfusée expérimentale." : "ASTRAF, designing and launching an experimental micro-rocket."}</h1><p className="mt-6 max-w-2xl text-base leading-8 text-text-dim sm:text-lg">{fr ? "Un projet complet, de l'étude de stabilité à l'analyse des données de vol : CAO, impression 3D, électronique embarquée et campagne de lancement." : "An end-to-end project, from stability study to flight-data analysis: CAD, 3D printing, onboard electronics, and launch campaign."}</p><div className="mt-9 flex flex-wrap gap-3"><a href="/Fusée/Mudule_électif_fuséee_Alexi_Fatima.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-accent px-4 py-3 font-mono text-xs uppercase tracking-wide text-white transition hover:bg-[#557cf0]"><Download className="size-4" />{fr ? "Lire le rapport complet" : "Read full report"}</a><a href="#lancement-final" className="inline-flex items-center gap-2 border border-border px-4 py-3 font-mono text-xs uppercase tracking-wide text-metal-light transition hover:border-metal hover:text-white">{fr ? "Voir le vol" : "See the flight"}<ArrowUpRight className="size-4" /></a></div></div><RocketReportCarousel lang={lang} /></div></div></section>
    <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:px-12 lg:py-24"><div><p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">01 / {fr ? "Prévoir" : "Predict"}</p><h2 className="mt-4 font-display text-3xl font-semibold text-metal-light">{fr ? "Valider la stabilité avant de fabriquer." : "Validating stability before fabrication."}</h2><p className="mt-5 max-w-md leading-8 text-text-dim">{fr ? "L'étude SabTraj relie masse, aérodynamique, rampe et parachute afin de vérifier que la configuration ASTRAF reste stable du décollage à la récupération." : "The SabTraj study connects mass, aerodynamics, launch rail, and parachute to verify that ASTRAF remains stable from lift-off to recovery."}</p></div><div className="grid gap-px border border-border bg-border sm:grid-cols-3">{stats.map(({ Icon, value, label }) => <div key={value} className="bg-bg-panel-2 p-6"><Icon className="size-5 text-accent" /><p className="mt-8 font-display text-3xl font-semibold text-metal-light">{value}</p><p className="mt-2 text-sm leading-6 text-text-dim">{label}</p></div>)}</div></section>
    <section className="border-y border-border bg-bg-panel-2"><div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:px-12 lg:py-24"><div><p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">02 / {fr ? "Concevoir et réaliser" : "Design and build"}</p><h2 className="mt-4 font-display text-3xl font-semibold text-metal-light">{fr ? "Faire passer une étude numérique à un objet volant." : "Turning a digital study into a flying object."}</h2><p className="mt-6 leading-8 text-text-dim">{fr ? "La CAO CATIA a défini le fuselage, l'ogive, les ailerons et le volume électronique. Les pièces sont ensuite préparées dans Bambu Studio, imprimées, assemblées puis testées avec leur carte embarquée." : "CATIA defined the fuselage, nose cone, fins, and electronics bay. Parts are then prepared in Bambu Studio, printed, assembled, and tested with their onboard board."}</p></div><RocketReportCarousel lang={lang} stage="build" /></div></section>
    <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">03 / {fr ? "Du plan au prototype" : "From plan to prototype"}</p>
      <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold text-metal-light">{fr ? "Les étapes concrètes de la réalisation." : "The concrete stages of the build."}</h2>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {(fr ? [
          ["01", "Conception CAO", "vue 1.png", "La vue d'ensemble CATIA fixe l'architecture du fuselage, de l'ogive et de l'empennage avant toute fabrication."],
          ["02", "Préparation 3D", "image-1788428668529.png", "Les pièces issues de la CAO sont préparées dans Bambu Studio : coiffe, gabarit d'empennage et ailerons."],
          ["03", "Électronique embarquée", "carte electr.png", "La carte associe le RP2040-Zero, les capteurs, l'alimentation et le buzzer pour enregistrer les données de vol."],
          ["04", "Assemblage final", "660D80BD-39E8-4445-8B2D-619C0165B440.png", "Les éléments mécaniques et électroniques sont intégrés, contrôlés puis préparés pour le lancement."],
        ] : [
          ["01", "CAD design", "vue 1.png", "The CATIA overview defines the fuselage, nose cone, and fin architecture before fabrication."],
          ["02", "3D preparation", "image-1788428668529.png", "CAD parts are prepared in Bambu Studio: nose cone, fin alignment jig, and fins."],
          ["03", "Onboard electronics", "carte electr.png", "The board combines the RP2040-Zero, sensors, power supply, and buzzer to record flight data."],
          ["04", "Final assembly", "660D80BD-39E8-4445-8B2D-619C0165B440.png", "Mechanical and electronic components are integrated, checked, and prepared for launch."],
        ]).map(([number, title, image, description]) => (
          <article key={title} className="border border-border bg-bg-panel-2">
            <div className="relative flex aspect-square items-center justify-center overflow-hidden border-b border-border bg-black">
              <img src={`/Fusée/asset/${image}`} alt={title} className={`size-full object-cover ${image === "660D80BD-39E8-4445-8B2D-619C0165B440.png" ? "object-bottom" : ""}`} />
            </div>
            <div className="p-5"><p className="font-mono text-xs tracking-[0.25em] text-accent">{number}</p><h3 className="mt-3 font-display text-xl font-semibold text-metal-light">{title}</h3><p className="mt-3 text-sm leading-6 text-text-dim">{description}</p></div>
          </article>
        ))}
      </div>
    </section>
    <section id="resultats-fusee" className="border-y border-border bg-bg-panel-2"><div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-24"><div><p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">04 / {fr ? "Vol et télémétrie" : "Flight and telemetry"}</p><h2 className="mt-4 font-display text-3xl font-semibold text-metal-light">{fr ? "Mesurer le vol pour en tirer des conclusions." : "Measuring flight to draw conclusions."}</h2><p className="mt-6 leading-8 text-text-dim">{fr ? "La carte embarquée enregistre pression, température, accélérations et vitesses angulaires. Les données confirment la chronologie du vol : impulsion au décollage, montée jusqu'à l'apogée, puis récupération." : "The onboard board records pressure, temperature, acceleration, and angular velocity. The data confirms the flight timeline: lift-off impulse, ascent to apogee, then recovery."}</p><ul className="mt-8 space-y-4 text-sm leading-6 text-text-dim">{(fr ? ["L'altitude maximale mesurée est d'environ 65 m.", "Les pics inertiels identifient nettement la phase de lancement.", "La télémétrie permet de comparer les prévisions au comportement réel."] : ["The measured peak altitude is approximately 65 m.", "Inertial peaks clearly identify the launch phase.", "Telemetry makes it possible to compare predictions with actual behavior."]).map((item) => <li key={item} className="flex gap-3"><Check className="mt-1 size-4 shrink-0 text-accent" />{item}</li>)}</ul></div><RocketReportCarousel lang={lang} stage="flight" /></div></section>
    <section id="lancement-final" className="scroll-mt-24 mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
      <div className="border-y border-border py-12">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">05 / {fr ? "Lancement final" : "Final launch"}</p>
        <h2 className="mt-4 font-display text-3xl font-semibold text-metal-light">{fr ? "La campagne en conditions réelles." : "The campaign in real conditions."}</h2>
        <figure className="mt-10 overflow-hidden border border-border bg-black p-2">
          <video controls preload="metadata" className="aspect-video w-full bg-black" aria-label={fr ? "Vidéo du lancement de la microfusée ASTRAF" : "Video of the ASTRAF micro-rocket launch"}>
            <source src="/Fusée/IMG_4357.mp4" type="video/mp4" />
            {fr ? "Votre navigateur ne prend pas en charge la lecture vidéo." : "Your browser does not support video playback."}
          </video>
          <figcaption className="px-2 pt-3 text-sm leading-6 text-text-dim">{fr ? "Séquence du lancement final de la microfusée ASTRAF." : "Footage from the final ASTRAF micro-rocket launch."}</figcaption>
        </figure>
      </div>
    </section>
    <footer className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-12 sm:flex-row sm:items-center sm:px-10 lg:px-12"><p className="max-w-xl text-sm leading-6 text-text-dim">{fr ? "Projet ASTRAF : conception, réalisation et lancement d'une microfusée expérimentale." : "ASTRAF project: design, build, and launch of an experimental micro-rocket."}</p><HoverBorderGradient href="/#projets"><ArrowLeft className="size-4" />{back}</HoverBorderGradient></footer>
  </main>;
}

function AerospikeProjectPage({ lang }: { lang: "fr" | "en" }) {
  const fr = lang === "fr";
  const stats: { Icon: LucideIcon; value: string; label: string }[] = [
    { Icon: Gauge, value: "M = 2,71", label: fr ? "Mach de sortie adapté" : "adapted exit Mach" },
    { Icon: Waves, value: "1618,28 m/s", label: fr ? "vitesse d'éjection idéale" : "ideal exhaust velocity" },
    { Icon: GitCompareArrows, value: "165,1 kN", label: fr ? "poussée brute idéale" : "ideal gross thrust" },
  ];
  const back = fr ? "Retour aux projets" : "Back to projects";
  return <main className="min-h-screen overflow-x-clip bg-bg text-text">
    <header className="halo-nav-blend sticky top-0 z-50"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-10 lg:px-12"><HoverBorderGradient href="/#projets"><ArrowLeft className="size-4" />{back}</HoverBorderGradient><LanguageToggle /></div></header>
    <section className="relative isolate border-b border-border bg-bg-panel-2"><div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(143,163,179,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(143,163,179,0.13)_1px,transparent_1px)] [background-size:42px_42px]" /><div className="relative mx-auto max-w-7xl px-6 pb-16 pt-8 sm:px-10 lg:px-12 lg:pb-24"><div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr]"><div><p className="font-mono text-xs uppercase tracking-[0.34em] text-accent">Propulsion / En422</p><h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.05] text-metal-light sm:text-6xl">{fr ? "Une tuyère aerospike, conçue par les équations." : "An aerospike nozzle, designed from equations."}</h1><p className="mt-6 max-w-2xl text-base leading-8 text-text-dim sm:text-lg">{fr ? "Étude thermodynamique et aérodynamique d'une tuyère aerospike supersonique : dimensionnement isentropique, éventail de Prandtl-Meyer et méthode des caractéristiques." : "Thermodynamic and aerodynamic study of a supersonic aerospike nozzle: isentropic sizing, Prandtl-Meyer expansion, and the method of characteristics."}</p><div className="mt-9 flex flex-wrap gap-3"><a href="/Turbomachine/En422_BUSOLINI_CORDOBA_GRANDPERRET_HASEGAWA.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-accent px-4 py-3 font-mono text-xs uppercase tracking-wide text-white transition hover:bg-[#557cf0]"><Download className="size-4" />{fr ? "Lire le rapport complet" : "Read full report"}</a><a href="#resultats-aerospike" className="inline-flex items-center gap-2 border border-border px-4 py-3 font-mono text-xs uppercase tracking-wide text-metal-light transition hover:border-metal hover:text-white">{fr ? "Voir les calculs" : "See the calculations"}<ArrowUpRight className="size-4" /></a></div></div><AerospikeReportCarousel lang={lang} /></div></div></section>
    <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:px-12 lg:py-24"><div><p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">01 / {fr ? "Cadrer le problème" : "Frame the problem"}</p><h2 className="mt-4 font-display text-3xl font-semibold text-metal-light">{fr ? "Transformer les conditions d'entrée en géométrie." : "Turning inlet conditions into geometry."}</h2><p className="mt-5 max-w-md leading-8 text-text-dim">{fr ? "Le calcul part du débit massique, de la pression et de la température totales. L'hypothèse d'expansion isentropique permet de fixer une première géométrie de col puis l'état adapté à la pression atmosphérique." : "The calculation starts with mass flow, total pressure, and total temperature. The isentropic-expansion assumption sets an initial throat geometry and the state adapted to ambient pressure."}</p></div><div className="grid gap-px border border-border bg-border sm:grid-cols-3">{stats.map(({ Icon, value, label }) => <div key={value} className="bg-bg-panel-2 p-6"><Icon className="size-5 text-accent" /><p className="mt-8 font-display text-3xl font-semibold text-metal-light">{value}</p><p className="mt-2 text-sm leading-6 text-text-dim">{label}</p></div>)}</div></section>
    <section className="border-y border-border bg-bg-panel-2"><div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:px-12 lg:py-24"><div><p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">02 / {fr ? "Dimensionner" : "Size"}</p><h2 className="mt-4 font-display text-3xl font-semibold text-metal-light">{fr ? "Du débit au col, puis du col à la poussée." : "From mass flow to throat, then from throat to thrust."}</h2><p className="mt-6 leading-8 text-text-dim">{fr ? "La fonction de débit massique isole la section de col. Les relations de Saint-Venant déterminent ensuite l'état de sortie adapté, puis la vitesse d'éjection. La poussée idéale découle alors directement de la conservation de la quantité de mouvement." : "The mass-flow function isolates the throat area. Saint-Venant relations then determine the adapted exit state and exhaust velocity. Ideal thrust follows directly from momentum conservation."}</p><ul className="mt-8 space-y-4 text-sm leading-6 text-text-dim">{(fr ? ["Section de col calculée : A_th = 0,187 m².", "Hauteur réelle associée : H_th = 0,3058 m.", "Section de sortie théorique adaptée : A_theo = 0,60 m²."] : ["Calculated throat area: A_th = 0.187 m².", "Associated real height: H_th = 0.3058 m.", "Adapted theoretical outlet area: A_theo = 0.60 m²."]).map((item) => <li key={item} className="flex gap-3"><Check className="mt-1 size-4 shrink-0 text-accent" />{item}</li>)}</ul></div><figure className="border border-border bg-bg p-3"><img src="/Turbomachine/assets/aerospike-report-014.png" alt={fr ? "Schéma de géométrie de la tuyère aerospike" : "Aerospike nozzle geometry diagram"} className="w-full" /><figcaption className="border-t border-border px-2 pt-3 font-mono text-[10px] uppercase tracking-wide text-text-dim">{fr ? "Col et éventail de détente de l'aerospike" : "Aerospike throat and expansion fan"}</figcaption></figure></div></section>
    <section id="resultats-aerospike" className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12 lg:py-24"><p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">03 / {fr ? "La méthode des caractéristiques" : "Method of characteristics"}</p><h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold text-metal-light">{fr ? "La méthode des caractéristiques donne sa forme à l'aerospike." : "The method of characteristics gives the aerospike its shape."}</h2><div className="mt-10 grid gap-5 lg:grid-cols-2"><figure className="border border-border bg-bg p-3"><img src="/Turbomachine/assets/aerospike-report-028.png" alt={fr ? "Schéma analytique des invariants de Riemann C plus et C moins avec beta initial" : "Analytical Riemann invariants C plus and C minus with initial beta"} className="w-full" /><figcaption className="border-t border-border px-2 pt-3 text-sm leading-6 text-text-dim">{fr ? "Les invariants C+/C- transmettent l'information de l'éventail depuis β_init et relient les caractéristiques descendantes aux caractéristiques montantes." : "The C+/C- invariants carry expansion-fan information from β_init and connect falling characteristics to rising characteristics."}</figcaption></figure><figure className="border border-border bg-bg p-3"><img src="/Turbomachine/assets/aerospike-report-045.png" alt={fr ? "Réseau de caractéristiques discrétisé avec points de réflexion et intersections" : "Discretized characteristic network with reflection points and intersections"} className="w-full" /><figcaption className="border-t border-border px-2 pt-3 text-sm leading-6 text-text-dim">{fr ? "Le graphe numérique distingue les points de réflexion et les intersections i+/j-. Chaque réflexion impose la tangence locale de l'écoulement à la paroi." : "The numerical graph distinguishes reflection points and i+/j- intersections. Each reflection imposes local flow tangency to the wall."}</figcaption></figure></div></section>
    <section className="border-y border-border bg-bg-panel-2"><div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[0.75fr_1.25fr] lg:px-12 lg:py-24"><div><p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">{fr ? "Conclusion" : "Conclusion"}</p><h2 className="mt-4 font-display text-3xl font-semibold text-metal-light">{fr ? "Une poussée idéale, puis les limites du modèle." : "Ideal thrust, then the model limits."}</h2></div><div className="grid gap-px border border-border bg-border sm:grid-cols-3">{(fr ? [["Modéliser", "L'expansion isentropique et les invariants de Riemann relient les conditions thermodynamiques à la forme de la paroi."], ["Calculer", "Le modèle donne une vitesse d'éjection de 1618,28 m/s et une poussée brute idéale de 165,1 kN."], ["Nuancer", "Les pertes sont négligées et la section réelle est plus faible que la section idéale : la poussée obtenue en pratique sera donc inférieure."]] : [["Model", "Isentropic expansion and Riemann invariants connect thermodynamic conditions to the wall shape."], ["Calculate", "The model gives a 1618.28 m/s exhaust velocity and 165.1 kN ideal gross thrust."], ["Qualify", "Losses are neglected and the real section is lower than the ideal one, so practical thrust will be lower."]]).map(([title, description]) => <div key={title} className="bg-bg-panel-2 p-6"><p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{title}</p><p className="mt-5 text-sm leading-7 text-text-dim">{description}</p></div>)}</div></div></section>
    <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12 lg:py-24"><div className="grid gap-8 border-y border-border py-12 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">{fr ? "Limites et perspectives" : "Limits and outlook"}</p><h2 className="mt-4 font-display text-3xl font-semibold text-metal-light">{fr ? "Vers une paroi réellement adaptée." : "Toward a truly adapted wall."}</h2></div><p className="max-w-3xl text-base leading-8 text-text-dim">{fr ? "Une géométrie par spline, tangente en tout point à l'écoulement local (β_curve = β_ij,local), a été identifiée comme l'évolution naturelle du modèle : en laissant l'écoulement imposer la géométrie plutôt que l'inverse, elle supprimerait les réflexions de caractéristiques et permettrait un gain de poussée par une détente plus complète en sortie." : "A spline geometry, tangent to the local flow at every point with β_curve = β_ij_local, was identified as the natural model improvement. It was not implemented due to time constraints, a deliberate choice to avoid relying on unmastered AI-generated code."}</p></div></section>
    <footer className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-12 sm:flex-row sm:items-center sm:px-10 lg:px-12"><p className="max-w-xl text-sm leading-6 text-text-dim">{fr ? "Projet EN422 : conception théorique d'une tuyère aerospike supersonique." : "EN422 project: theoretical design of a supersonic aerospike nozzle."}</p><HoverBorderGradient href="/#projets"><ArrowLeft className="size-4" />{back}</HoverBorderGradient></footer>
  </main>;
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { lang } = useLanguage();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event("project-page-open"));
  }, [slug]);
  const projects = getProjects(lang);
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  if (slug === "ecoulement-supersonique-jet-star-ccm") {
    return <LavalProjectPage lang={lang} />;
  }

  if (slug === "drone-autonome-simulink") {
    return <DroneProjectPage lang={lang} />;
  }

  if (slug === "projet-astraf-microfusee") {
    return <RocketProjectPage lang={lang} />;
  }

  if (slug === "conception-tuyere-aerospike") {
    return <AerospikeProjectPage lang={lang} />;
  }

  return (
    <div className="mx-auto max-w-[900px] px-8 py-20">
      <Link
        href="/"
        className="mb-8 inline-block rounded-sm border border-border bg-bg-panel px-4 py-2 text-sm text-text-dim transition hover:border-accent hover:text-white"
      >
        {lang === "fr" ? "← Retour aux projets" : "← Back to projects"}
      </Link>

      <div className="rounded-md border border-border bg-bg-panel-2 p-8">
        <div className="mb-4 font-mono text-[10.5px] uppercase tracking-wide text-accent">
          {project.tag}
        </div>
        <h1 className="mb-6 font-display text-3xl font-semibold text-metal-light">
          {project.title}
        </h1>
        <p className="mb-8 max-w-2xl text-base leading-8 text-text-dim">
          {project.desc}
        </p>

        {project.details?.length ? (
          <div className="mb-8 rounded-md border border-border bg-bg p-6 text-[15px] text-text-dim">
            {project.details.map((detail, index) => (
              <p key={index} className="mb-4 last:mb-0">
                {detail}
              </p>
            ))}
          </div>
        ) : null}

        <div className="grid gap-6 sm:grid-cols-[1fr_280px]">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-metal-light">
              {lang === "fr" ? "Déroulé du projet" : "Project breakdown"}
            </h2>
            <div className="space-y-4">
              {project.steps?.map((step) => (
                <div key={step.label} className="rounded-md border border-border bg-bg-panel p-5">
                  <h3 className="mb-2 text-base font-semibold text-metal-light">{step.label}</h3>
                  <p className="text-sm leading-7 text-text-dim">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-md border border-border bg-bg p-6 text-sm text-text-dim">
            <div className="mb-4 font-mono text-[10px] uppercase tracking-wide text-accent">
              {lang === "fr" ? "Outils & méthodologie" : "Tools & methodology"}
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="rounded-sm border border-border px-2 py-1 text-[12px]">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
