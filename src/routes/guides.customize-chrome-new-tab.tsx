import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/guides/customize-chrome-new-tab")({
  component: Guide,
  head: () => ({
    meta: [
      { title: "How to Customize Your Chrome New Tab Page — Glass Tab Guide" },
      {
        name: "description",
        content:
          "Step-by-step guide to personalizing your Chrome, Edge, or Brave new tab page with Glass Tab: animated backgrounds, custom photo imports, and editable shortcuts.",
      },
      { property: "og:title", content: "How to Customize Your Chrome New Tab Page — Glass Tab Guide" },
      {
        property: "og:description",
        content:
          "Replace the default Chrome new tab with a glassy dashboard: clock, search, animated backgrounds, and your own shortcuts.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://rrn-tap.lovable.app/guides/customize-chrome-new-tab" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "How to Customize Your Chrome New Tab Page — Glass Tab Guide" },
    ],
    links: [
      { rel: "canonical", href: "https://rrn-tap.lovable.app/guides/customize-chrome-new-tab" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to customize your Chrome new tab page with Glass Tab",
          description:
            "Install Glass Tab and personalize the Chrome, Edge, or Brave new tab page with animated backgrounds, custom photos, and shortcuts.",
          step: [
            { "@type": "HowToStep", name: "Install the extension", text: "Download the Glass Tab zip and load it as an unpacked extension." },
            { "@type": "HowToStep", name: "Pick a background", text: "Choose an animated preset or import your own photo." },
            { "@type": "HowToStep", name: "Add shortcuts", text: "Add and edit shortcuts to the sites you use most." },
          ],
        }),
      },
    ],
  }),
});

function Guide() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-6 py-16">
        <p className="mb-3 text-sm text-muted-foreground">
          <Link to="/" className="underline underline-offset-4 hover:text-foreground">
            ← Back to Glass Tab
          </Link>
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          How to customize your Chrome new tab page
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Chrome, Edge, and Brave all ship the same default new tab: a search bar, a
          Google logo, and a grid of recent sites. Glass Tab replaces it with a glassy
          dashboard — a live clock, universal search, editable shortcuts, and animated
          backgrounds you can swap out for your own photos.
        </p>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">1. Install Glass Tab as an extension</h2>
          <p>
            Download the extension zip from the home page, unzip it, then open
            <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-sm">chrome://extensions</code>
            (or <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-sm">edge://extensions</code> /
            <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-sm">brave://extensions</code>).
            Turn on Developer Mode and click <strong>Load unpacked</strong>, then select
            the unzipped folder. Open a new tab — Glass Tab takes over.
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">2. Pick an animated background</h2>
          <p>
            Glass Tab ships with four animated gradient presets — Aurora, Sunset, Ocean,
            and Forest — that gently pan behind the glassmorphic cards. Open the settings
            panel in the top-right and tap any preset to switch. The colors follow you
            through every new tab you open.
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">3. Import your own photo or animated background</h2>
          <p>
            Want a personal wallpaper? In the same settings panel, use <strong>Upload photo</strong>
            to pick any JPG, PNG, WebP, or GIF from your device (up to 4 MB). Animated
            GIFs keep playing behind the frosted cards. Hit the trash icon to revert to
            a preset.
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">4. Add and edit shortcuts</h2>
          <p>
            The default shortcut grid covers YouTube, Gmail, GitHub, X, Reddit, and
            Netflix. Click <strong>+ Add</strong> to add a new tile — Glass Tab pulls the
            favicon automatically from the site's domain. Choose <strong>Edit shortcuts</strong>
            to remove tiles you don't use.
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">5. Use the universal search</h2>
          <p>
            The search bar at the center searches Google by default, but you can switch to
            Bing or DuckDuckGo from the engine dropdown. Your choice is remembered across
            tabs, so every new tab is one keystroke away from a search.
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">Why replace the default Chrome new tab?</h2>
          <p>
            The stock new tab is functional but generic — the same layout everyone else
            sees. A customized start page turns a moment of dead time between tasks into
            something calmer and more personal, and puts the sites you actually use one
            click away instead of buried under "recently visited".
          </p>
        </section>

        <p className="mt-16 text-sm text-muted-foreground">
          Ready to try it?{" "}
          <Link to="/" className="underline underline-offset-4 hover:text-foreground">
            Open Glass Tab and download the extension →
          </Link>
        </p>
      </article>
    </main>
  );
}
