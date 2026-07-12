import { Plus, X } from "lucide-react";
import { useState } from "react";
import type { Shortcut } from "@/lib/newtab-types";

function faviconFor(url: string) {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return "";
  }
}

export function Shortcuts({
  shortcuts,
  onChange,
}: {
  shortcuts: Shortcut[];
  onChange: (next: Shortcut[]) => void;
}) {
  const [adding, setAdding] = useState(false);
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
  const [editing, setEditing] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    let u = url.trim();
    if (!u) return;
    if (!/^https?:\/\//i.test(u)) u = "https://" + u;
    onChange([
      ...shortcuts,
      { id: crypto.randomUUID(), label: label.trim() || new URL(u).hostname, url: u },
    ]);
    setLabel("");
    setUrl("");
    setAdding(false);
  };

  return (
    <div className="animate-fade-up flex flex-col items-center gap-4" style={{ animationDelay: "0.2s" }}>
      <div className="flex max-w-2xl flex-wrap items-start justify-center gap-3">
        {shortcuts.map((s) => (
          <div key={s.id} className="group relative">
            <a
              href={s.url}
              className="glass hover-scale flex h-20 w-20 flex-col items-center justify-center gap-1.5 rounded-2xl p-2"
              title={s.url}
            >
              <img
                src={faviconFor(s.url)}
                alt=""
                className="h-7 w-7 rounded"
                loading="lazy"
              />
              <span className="w-full truncate text-center text-[11px] text-primary-foreground/80">
                {s.label}
              </span>
            </a>
            {editing && (
              <button
                onClick={() => onChange(shortcuts.filter((x) => x.id !== s.id))}
                aria-label={`Remove ${s.label}`}
                className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        ))}
        <button
          onClick={() => setAdding(true)}
          aria-label="Add shortcut"
          className="glass hover-scale flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-2xl text-primary-foreground/70"
        >
          <Plus className="h-6 w-6" />
          <span className="text-[11px]">Add</span>
        </button>
      </div>

      <button
        onClick={() => setEditing((v) => !v)}
        className="text-xs text-primary-foreground/50 transition-colors hover:text-primary-foreground/80"
      >
        {editing ? "Done" : "Edit shortcuts"}
      </button>

      {adding && (
        <form onSubmit={add} className="glass-strong animate-scale-in flex flex-col gap-2 rounded-2xl p-4 sm:flex-row">
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Name"
            className="rounded-lg bg-primary-foreground/10 px-3 py-2 text-sm text-primary-foreground outline-none placeholder:text-primary-foreground/40"
          />
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="example.com"
            required
            className="rounded-lg bg-primary-foreground/10 px-3 py-2 text-sm text-primary-foreground outline-none placeholder:text-primary-foreground/40"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-lg bg-primary-foreground/90 px-4 py-2 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setAdding(false)}
              className="rounded-lg px-3 py-2 text-sm text-primary-foreground/60 hover:text-primary-foreground"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}