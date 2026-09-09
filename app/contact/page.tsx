"use client";

import { useMemo } from "react";
import Link from "next/link";
import LanguageToggle from "../components/LanguageToggle";
import { useLanguage } from "../components/LanguageProvider";
import { GlowingEffect } from "../components/ui/glowing-effect";

export default function ContactPage() {
  const { lang } = useLanguage();

  const text = useMemo(
    () => ({
      brand: "ALEXI GRANDPERRET",
      professionalTop: lang === "fr" ? "Professionnel" : "Professional",
      personalTop: lang === "fr" ? "Personnel" : "Personal",
      contactTop: lang === "fr" ? "Contact" : "Contact",
      navProfile: lang === "fr" ? "Profil de vol" : "Flight profile",
      navEducation: lang === "fr" ? "Éducation" : "Education",
      navJourney: lang === "fr" ? "Expérience" : "Experience",
      navProjects: lang === "fr" ? "Projets" : "Projects",
      navSkills: lang === "fr" ? "Competences" : "Skills",
      navPersonal: lang === "fr" ? "Perso" : "Personal",
      navContact: lang === "fr" ? "Contact" : "Contact",
      title: lang === "fr" ? "Entrons en liaison" : "Get in Touch",
      writeEmail: lang === "fr" ? "M'écrire un mail" : "Write me an email",
      boxCurrentLabel: lang === "fr" ? "Poste actuel" : "Current Position",
      boxCurrentValue:
        lang === "fr"
          ? "Etudiant ingenieur propulsion\nIPSA Toulouse"
          : "Propulsion engineering student\nIPSA Toulouse",
      boxFromLabel: lang === "fr" ? "Basé à" : "Based in",
      boxFromValue: lang === "fr" ? "France, Toulouse" : "France, Toulouse",
      boxLanguageLabel: lang === "fr" ? "Langues" : "Language",
      boxLanguageValue: lang === "fr" ? "Français, Anglais, Espagnol, Italien, Portugais" : "French, English, Spanish, Italian, Portuguese",
      boxExperienceLabel: lang === "fr" ? "Experience" : "Experience",
      boxExperienceValue: lang === "fr" ? "4+ stages" : "4+ internships",
      boxFreelanceLabel: lang === "fr" ? "Disponibilité" : "Availability",
      boxFreelanceValue: lang === "fr" ? "Début Février 2027" : "Early February 2027",
    }),
    [lang],
  );

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-md">
        <nav className="mx-auto flex max-w-[1100px] items-center justify-between px-8 py-4.5">
          <div className="flex items-center gap-2.5 font-display text-[15px] font-semibold tracking-wide text-metal-light">
            <span className="h-2.5 w-2.5 rotate-45 bg-accent" />
            {text.brand}
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-8 text-[14px] font-semibold sm:flex">
              <div className="group/pro-nav relative">
                <Link
                  href="/"
                  className="top-nav-link"
                >
                  {text.professionalTop}
                </Link>
                <div className="pointer-events-none absolute left-0 top-full z-50 w-52 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-hover/pro-nav:pointer-events-auto group-hover/pro-nav:translate-y-0 group-hover/pro-nav:opacity-100 group-focus-within/pro-nav:pointer-events-auto group-focus-within/pro-nav:translate-y-0 group-focus-within/pro-nav:opacity-100">
                  <div className="rounded-lg border border-border bg-bg-panel/95 p-2 text-[12px] font-medium text-text-dim shadow-[0_18px_46px_rgba(0,0,0,0.28)] backdrop-blur">
                    <Link href="/#profil" className="block rounded-md px-3 py-2 transition hover:bg-bg-panel-2 hover:text-metal-light">{text.navProfile}</Link>
                    <Link href="/#education" className="block rounded-md px-3 py-2 transition hover:bg-bg-panel-2 hover:text-metal-light">{text.navEducation}</Link>
                    <Link href="/#parcours" className="block rounded-md px-3 py-2 transition hover:bg-bg-panel-2 hover:text-metal-light">{text.navJourney}</Link>
                    <Link href="/#projets" className="block rounded-md px-3 py-2 transition hover:bg-bg-panel-2 hover:text-metal-light">{text.navProjects}</Link>
                    <Link href="/#competences" className="block rounded-md px-3 py-2 transition hover:bg-bg-panel-2 hover:text-metal-light">{text.navSkills}</Link>
                    <Link href="/#perso" className="block rounded-md px-3 py-2 transition hover:bg-bg-panel-2 hover:text-metal-light">{text.navPersonal}</Link>
                    <Link href="/#contact" className="block rounded-md px-3 py-2 transition hover:bg-bg-panel-2 hover:text-metal-light">{text.navContact}</Link>
                  </div>
                </div>
              </div>
              <Link
                href="/personal"
                className="top-nav-link"
              >
                {text.personalTop}
              </Link>
              <Link href="/contact" className="top-nav-link">
                {text.contactTop}
              </Link>
            </div>
            <LanguageToggle />
          </div>
        </nav>
      </header>

      <main className="relative min-h-screen overflow-hidden border-b border-border bg-bg py-20 text-text">
        <div className="contact-grid-bg pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -left-24 top-12 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -right-20 bottom-16 h-72 w-72 rounded-full bg-metal-light/10 blur-3xl" />
        </div>

        <section className="relative mx-auto grid w-full max-w-[1120px] gap-8 px-8 lg:grid-cols-[1.25fr_0.95fr]">
          <div className="contact-appear rounded-2xl border border-border bg-bg-panel/72 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur md:p-8">
            <h1 className="font-display text-4xl font-semibold leading-tight text-metal-light md:text-[52px]">{text.title}</h1>
            <a href="mailto:alexi.grandperret@ipsa.fr" className="liquid-button mt-10 inline-flex items-center gap-3 rounded-full border border-accent px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              {text.writeEmail}
            </a>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-2 rounded-3xl border border-accent/25 opacity-70 blur-[0.3px]" />
            <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_0.72fr_1fr]">
              <article className="contact-fact-card contact-fact-card--current lg:col-span-1">
                <GlowingEffect spread={32} glow proximity={56} inactiveZone={0.01} borderWidth={1.2} />
                <div className="contact-fact-icon">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="7" width="18" height="13" rx="2" />
                    <path d="M8 7V5a4 4 0 0 1 8 0v2" />
                  </svg>
                </div>
                <p className="contact-fact-title">{text.boxCurrentLabel}</p>
                <p className="contact-fact-value whitespace-pre-line">{text.boxCurrentValue}</p>
              </article>

              <article className="contact-fact-card contact-fact-card--language sm:row-span-2 lg:col-span-1 lg:row-span-2">
                <GlowingEffect spread={32} glow proximity={56} inactiveZone={0.01} borderWidth={1.2} />
                <div className="contact-fact-icon">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 5h10" />
                    <path d="M9 5v2a7 7 0 0 1-7 7" />
                    <path d="m5 11 4 4" />
                    <path d="m13 19 4-10 4 10" />
                    <path d="M14 16h6" />
                  </svg>
                </div>
                <p className="contact-fact-title">{text.boxLanguageLabel}</p>
                <p className="contact-fact-value">{text.boxLanguageValue}</p>
              </article>

              <article className="contact-fact-card contact-fact-card--experience lg:col-span-1">
                <GlowingEffect spread={32} glow proximity={56} inactiveZone={0.01} borderWidth={1.2} />
                <div className="contact-fact-icon">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v4l3 2" />
                  </svg>
                </div>
                <p className="contact-fact-title">{text.boxExperienceLabel}</p>
                <p className="contact-fact-value">{text.boxExperienceValue}</p>
              </article>

              <article className="contact-fact-card contact-fact-card--from lg:col-span-1">
                <GlowingEffect spread={32} glow proximity={56} inactiveZone={0.01} borderWidth={1.2} />
                <div className="contact-fact-icon">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21s7-4.7 7-11a7 7 0 1 0-14 0c0 6.3 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.3" />
                  </svg>
                </div>
                <p className="contact-fact-title">{text.boxFromLabel}</p>
                <p className="contact-fact-value">{text.boxFromValue}</p>
              </article>

              <article className="contact-fact-card contact-fact-card--freelance lg:col-span-1">
                <GlowingEffect spread={32} glow proximity={56} inactiveZone={0.01} borderWidth={1.2} />
                <div className="contact-fact-icon">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20a8 8 0 0 1 16 0" />
                  </svg>
                </div>
                <p className="contact-fact-title">{text.boxFreelanceLabel}</p>
                <p className="contact-fact-value">{text.boxFreelanceValue}</p>
              </article>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
