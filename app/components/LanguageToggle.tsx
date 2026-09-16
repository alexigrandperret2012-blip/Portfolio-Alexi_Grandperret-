"use client";

import { useLanguage } from "./LanguageProvider";
import ToggleSwitch from "./animata/button/toggle-switch";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <ToggleSwitch
      checked={lang === "en"}
      onCheckedChange={(checked) => {
        setLang(checked ? "en" : "fr");
      }}
      leftText="FR"
      rightText="EN"
      ariaLabel={lang === "fr" ? "Passer le site en anglais" : "Switch the website to French"}
      className="translate-y-[1px]"
    />
  );
}
