import type { CSSProperties } from "react";

export interface Shortcut {
  id: string;
  label: string;
  url: string;
}

export interface PresetBackground {
  id: string;
  name: string;
  className: string;
  style: CSSProperties;
}

export type BackgroundState =
  | { type: "preset"; presetId: string }
  | { type: "custom"; dataUrl: string; fileName: string };

export const PRESETS: PresetBackground[] = [
  {
    id: "aurora",
    name: "Aurora",
    className: "bg-animated-gradient",
    style: {
      backgroundImage:
        "linear-gradient(120deg, oklch(0.25 0.09 280), oklch(0.45 0.15 200), oklch(0.35 0.13 320), oklch(0.2 0.07 250))",
    },
  },
  {
    id: "sunset",
    name: "Sunset",
    className: "bg-animated-gradient",
    style: {
      backgroundImage:
        "linear-gradient(130deg, oklch(0.3 0.1 300), oklch(0.55 0.19 30), oklch(0.65 0.17 60), oklch(0.35 0.14 350))",
    },
  },
  {
    id: "ocean",
    name: "Ocean",
    className: "bg-animated-gradient",
    style: {
      backgroundImage:
        "linear-gradient(160deg, oklch(0.2 0.06 240), oklch(0.4 0.12 220), oklch(0.55 0.13 190), oklch(0.25 0.08 260))",
    },
  },
  {
    id: "forest",
    name: "Forest",
    className: "bg-animated-gradient",
    style: {
      backgroundImage:
        "linear-gradient(140deg, oklch(0.2 0.05 160), oklch(0.4 0.11 150), oklch(0.5 0.12 120), oklch(0.22 0.06 200))",
    },
  },
];

export const DEFAULT_SHORTCUTS: Shortcut[] = [
  { id: "1", label: "YouTube", url: "https://youtube.com" },
  { id: "2", label: "Gmail", url: "https://mail.google.com" },
  { id: "3", label: "GitHub", url: "https://github.com" },
  { id: "4", label: "X", url: "https://x.com" },
  { id: "5", label: "Reddit", url: "https://reddit.com" },
  { id: "6", label: "Netflix", url: "https://netflix.com" },
];