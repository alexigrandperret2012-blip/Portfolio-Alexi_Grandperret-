"use client";

import Link from "next/link";
import { Construction, HardHat } from "lucide-react";
import LanguageToggle from "../components/LanguageToggle";
import { useLanguage } from "../components/LanguageProvider";
import MusicWidget from "../components/animata/widget/music-widget";

export default function PersonalPage() {
  const { lang } = useLanguage();
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
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-md">
        <nav className="mx-auto flex max-w-[1100px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2 font-display text-[13px] font-semibold tracking-wide text-metal-light sm:gap-2.5 sm:text-[15px]">
            <span className="h-2.5 w-2.5 rotate-45 bg-accent" />
            <span className="truncate">ALEXI&nbsp;GRANDPERRET</span>
          </div>
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
                  <div className="rounded-lg border border-border bg-bg-panel/95 p-2 text-[12px] font-medium text-text-dim shadow-[0_18px_46px_rgba(0,0,0,0.28)] backdrop-blur">
                    <Link href="/#profil" className="block rounded-md px-3 py-2 transition hover:bg-bg-panel-2 hover:text-metal-light">{navText.navProfile}</Link>
                    <Link href="/#education" className="block rounded-md px-3 py-2 transition hover:bg-bg-panel-2 hover:text-metal-light">{navText.navEducation}</Link>
                    <Link href="/#parcours" className="block rounded-md px-3 py-2 transition hover:bg-bg-panel-2 hover:text-metal-light">{navText.navJourney}</Link>
                    <Link href="/#projets" className="block rounded-md px-3 py-2 transition hover:bg-bg-panel-2 hover:text-metal-light">{navText.navProjects}</Link>
                    <Link href="/#competences" className="block rounded-md px-3 py-2 transition hover:bg-bg-panel-2 hover:text-metal-light">{navText.navSkills}</Link>
                    <Link href="/#perso" className="block rounded-md px-3 py-2 transition hover:bg-bg-panel-2 hover:text-metal-light">{navText.navPersonal}</Link>
                    <Link href="/#contact" className="block rounded-md px-3 py-2 transition hover:bg-bg-panel-2 hover:text-metal-light">{navText.navContact}</Link>
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
            <Link href="/" className="rounded-full border border-white/15 px-3 py-2 font-mono text-[10px] uppercase tracking-wide text-metal-light sm:hidden">
              {navText.professionalTop}
            </Link>
            <LanguageToggle />
          </div>
        </nav>
      </header>

      <main className="relative min-h-screen overflow-hidden bg-bg px-4 py-12 text-text sm:px-6 sm:py-20 lg:px-8">
        <div className="construction-grid absolute inset-0 opacity-35" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1100px]">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            <HardHat className="size-4" aria-hidden="true" />
            {lang === "fr" ? "Zone personnelle en construction" : "Personal area under construction"}
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-3xl font-semibold leading-tight text-metal-light sm:text-5xl lg:text-6xl">
            {lang === "fr" ? "Centres d'intérêt : transmission en cours." : "Interests: transmission in progress."}
          </h1>
          <div className="construction-tapes mt-12 grid gap-4" aria-label={lang === "fr" ? "Contenu à venir" : "Upcoming content"}>
            {(lang === "fr" ? ["LECTURES & IDÉES", "PROJETS EXTÉRIEURS", "ANECDOTES DE PARCOURS"] : ["READING & IDEAS", "EXTERNAL PROJECTS", "JOURNEY ANECDOTES"]).map((label, index) => (
              <div key={label} className="construction-tape" style={{ "--tape-delay": `${index * 0.18}s` } as React.CSSProperties}>
                <Construction className="size-5 shrink-0" aria-hidden="true" />
                <span>{label}</span>
                <span className="ml-auto hidden text-[10px] sm:block">{lang === "fr" ? "ACCÈS EN PRÉPARATION" : "ACCESS IN PREPARATION"}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-3 sm:mt-12">
          <Link
            href="/"
            className="liquid-button rounded-full border border-accent px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.2em] text-accent"
          >
            {lang === "fr" ? "Retour à l'accueil" : "Back Home"}
          </Link>
        </div>
      </div>

        <MusicWidget
          compact
          defaultPlaying
          className="fixed bottom-5 left-5 z-40 sm:bottom-6 sm:left-6"
          coverUrl="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=420&h=420&q=80"
          tracks={
            lang === "fr"
              ? [
                  { title: "Ciels d'Altitude", artist: "Alexi Lab" },
                  { title: "Poussée orbitale", artist: "Nozzle Theory" },
                  { title: "Ligne de Vol", artist: "Blue Burn" },
                ]
              : [
                  { title: "High Altitude Skies", artist: "Alexi Lab" },
                  { title: "Orbital Thrust", artist: "Nozzle Theory" },
                  { title: "Flight Path", artist: "Blue Burn" },
                ]
          }
        />
      </main>
    </>
  );
}