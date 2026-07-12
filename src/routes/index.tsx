import { createFileRoute } from "@tanstack/react-router";
import { BackgroundPanel } from "@/components/newtab/BackgroundPanel";
import { Clock } from "@/components/newtab/Clock";
import { InstallExtension } from "@/components/newtab/InstallExtension";
import { SearchBar } from "@/components/newtab/SearchBar";
import { Shortcuts } from "@/components/newtab/Shortcuts";
import { useStoredState } from "@/hooks/use-stored-state";
import {
  DEFAULT_SHORTCUTS,
  PRESETS,
  type BackgroundState,
  type Shortcut,
} from "@/lib/newtab-types";

export const Route = createFileRoute("/")({
  component: NewTab,
});

function NewTab() {
  const [background, setBackground] = useStoredState<BackgroundState>(
    "newtab-background",
    { type: "preset", presetId: "aurora" },
  );
  const [shortcuts, setShortcuts] = useStoredState<Shortcut[]>(
    "newtab-shortcuts",
    DEFAULT_SHORTCUTS,
  );

  const preset =
    background.type === "preset"
      ? (PRESETS.find((p) => p.id === background.presetId) ?? PRESETS[0])
      : null;

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background layer */}
      {preset ? (
        <div
          className={`absolute inset-0 ${preset.className}`}
          style={preset.style}
          aria-hidden
        />
      ) : background.type === "custom" ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${background.dataUrl})` }}
          aria-hidden
        />
      ) : null}

      {/* Floating light orbs for depth on presets */}
      {preset && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="animate-float-slow absolute top-[10%] left-[15%] h-72 w-72 rounded-full bg-primary-foreground/10 blur-3xl" />
          <div
            className="animate-float-slow absolute right-[10%] bottom-[15%] h-96 w-96 rounded-full bg-primary-foreground/10 blur-3xl"
            style={{ animationDelay: "-7s" }}
          />
        </div>
      )}

      {/* Subtle scrim so glass and text stay readable on any photo */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/25 via-transparent to-foreground/35" aria-hidden />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-10 px-4 py-16">
        <Clock />
        <SearchBar />
        <Shortcuts shortcuts={shortcuts} onChange={setShortcuts} />
      </div>

      <BackgroundPanel background={background} onChange={setBackground} />
      <InstallExtension />
    </main>
  );
}
