import { useEffect, useState } from "react";

export function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const time = now
    ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "--:--";
  const date = now
    ? now.toLocaleDateString([], {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "\u00A0";

  return (
    <div className="animate-fade-up text-center select-none">
      <h1 className="font-display text-glow text-7xl font-medium tracking-tight text-primary-foreground md:text-8xl">
        {time}
      </h1>
      <p className="text-glow mt-2 text-lg font-light text-primary-foreground/80">
        {date}
      </p>
    </div>
  );
}