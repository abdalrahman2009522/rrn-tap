import { Search } from "lucide-react";
import { useState } from "react";

const ENGINES = [
  { id: "google", name: "Google", url: "https://www.google.com/search?q=" },
  { id: "duckduckgo", name: "DuckDuckGo", url: "https://duckduckgo.com/?q=" },
  { id: "bing", name: "Bing", url: "https://www.bing.com/search?q=" },
] as const;

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [engineId, setEngineId] = useState<string>("google");
  const engine = ENGINES.find((e) => e.id === engineId) ?? ENGINES[0];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    window.location.href = engine.url + encodeURIComponent(q);
  };

  return (
    <form
      onSubmit={submit}
      className="glass animate-fade-up flex w-full max-w-xl items-center gap-2 rounded-full px-5 py-3 transition-shadow focus-within:shadow-[0_8px_40px_oklch(0_0_0_/_40%)]"
      style={{ animationDelay: "0.1s" }}
    >
      <Search className="h-5 w-5 shrink-0 text-primary-foreground/70" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Search ${engine.name}…`}
        className="w-full bg-transparent text-base text-primary-foreground outline-none placeholder:text-primary-foreground/50"
        autoFocus
      />
      <select
        value={engineId}
        onChange={(e) => setEngineId(e.target.value)}
        aria-label="Search engine"
        className="cursor-pointer rounded-full bg-transparent text-xs text-primary-foreground/60 outline-none [&>option]:text-foreground"
      >
        {ENGINES.map((e) => (
          <option key={e.id} value={e.id}>
            {e.name}
          </option>
        ))}
      </select>
    </form>
  );
}