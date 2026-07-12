import { Download, ImagePlus, Settings2, Trash2, X } from "lucide-react";
import { useRef, useState } from "react";
import { PRESETS, type BackgroundState } from "@/lib/newtab-types";

const MAX_SIZE = 4 * 1024 * 1024; // ~4MB fits localStorage after base64

export function BackgroundPanel({
  background,
  onChange,
}: {
  background: BackgroundState;
  onChange: (next: BackgroundState) => void;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const importFile = (file: File) => {
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image (JPG, PNG, WEBP or animated GIF).");
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("Image is too large — keep it under 4 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      try {
        onChange({ type: "custom", dataUrl: String(reader.result), fileName: file.name });
      } catch {
        setError("Couldn't save this image — try a smaller one.");
      }
    };
    reader.readAsDataURL(file);
  };

  const exportCurrent = () => {
    if (background.type !== "custom") return;
    const a = document.createElement("a");
    a.href = background.dataUrl;
    a.download = background.fileName || "background.png";
    a.click();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Background settings"
        className="glass hover-scale fixed right-5 bottom-5 z-20 flex h-11 w-11 items-center justify-center rounded-full text-primary-foreground/80"
      >
        <Settings2 className="h-5 w-5" />
      </button>

      {open && (
        <div className="glass-strong animate-enter fixed right-5 bottom-20 z-30 w-80 rounded-3xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-sm font-medium text-primary-foreground">
              Background
            </h2>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="text-primary-foreground/60 hover:text-primary-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="mb-2 text-xs text-primary-foreground/60">Animated presets</p>
          <div className="mb-4 grid grid-cols-4 gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => onChange({ type: "preset", presetId: p.id })}
                title={p.name}
                className={`${p.className} h-14 rounded-xl border-2 transition-transform hover:scale-105 ${
                  background.type === "preset" && background.presetId === p.id
                    ? "border-primary-foreground"
                    : "border-transparent"
                }`}
                style={p.style}
              />
            ))}
          </div>

          <p className="mb-2 text-xs text-primary-foreground/60">Custom photo</p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 rounded-xl bg-primary-foreground/10 px-3 py-2.5 text-sm text-primary-foreground transition-colors hover:bg-primary-foreground/20"
            >
              <ImagePlus className="h-4 w-4" />
              Import photo or animated GIF
            </button>
            {background.type === "custom" && (
              <>
                <button
                  onClick={exportCurrent}
                  className="flex items-center gap-2 rounded-xl bg-primary-foreground/10 px-3 py-2.5 text-sm text-primary-foreground transition-colors hover:bg-primary-foreground/20"
                >
                  <Download className="h-4 w-4" />
                  Export current photo
                </button>
                <button
                  onClick={() => onChange({ type: "preset", presetId: "aurora" })}
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove custom photo
                </button>
              </>
            )}
          </div>
          {error && <p className="mt-3 text-xs text-destructive">{error}</p>}

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) importFile(f);
              e.target.value = "";
            }}
          />
        </div>
      )}
    </>
  );
}