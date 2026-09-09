"use client";

import { useId, useState } from "react";

type ToggleSwitchProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (value: boolean) => void;
  leftText?: string;
  rightText?: string;
  ariaLabel?: string;
  className?: string;
};

export default function ToggleSwitch({
  checked,
  defaultChecked,
  onCheckedChange,
  leftText = "FR",
  rightText = "EN",
  ariaLabel,
  className = "",
}: ToggleSwitchProps) {
  const isControlled = typeof checked === "boolean";
  const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked ?? false);
  const isChecked = isControlled ? (checked as boolean) : internalChecked;
  const id = useId();

  const handleCheckboxChange = () => {
    const next = !isChecked;
    if (!isControlled) {
      setInternalChecked(next);
    }
    onCheckedChange?.(next);
  };

  return (
    <label htmlFor={id} className={`inline-flex cursor-pointer select-none items-center ${className}`}>
      <div className="relative">
        <input
          id={id}
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="sr-only"
          aria-label={ariaLabel}
        />
        <div className="relative h-8 w-16 rounded-full border border-accent/35 bg-bg-panel-2/90 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] transition-colors">
          <span
            className={`pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 font-mono text-[10px] font-semibold tracking-wide transition-opacity ${
              isChecked ? "opacity-45 text-text-dim" : "opacity-100 text-metal-light"
            }`}
          >
            {leftText}
          </span>
          <span
            className={`pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[10px] font-semibold tracking-wide transition-opacity ${
              isChecked ? "opacity-100 text-metal-light" : "opacity-45 text-text-dim"
            }`}
          >
            {rightText}
          </span>

          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-accent/45 bg-accent/25 shadow-[0_0_12px_rgba(65,105,225,0.35)] transition-all duration-250 ${
              isChecked ? "translate-x-8" : "translate-x-0"
            }`}
          />
        </div>
      </div>
    </label>
  );
}
