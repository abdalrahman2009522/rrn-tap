import { useState } from "react";

export function InstallExtension() {
  const [open, setOpen] = useState(false);

  const download = () => {
    fetch("/newtab-extension.zip")
      .then((res) => {
        if (!res.ok) throw new Error(`Download failed: ${res.status}`);
        return res.blob();
      })
      .then((blob) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "newtab-extension.zip";
        a.click();
        URL.revokeObjectURL(a.href);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="glass fixed top-4 right-4 z-30 rounded-full px-4 py-2 text-sm font-medium text-foreground hover:bg-white/50 transition"
      >
        Install as extension
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="glass-strong max-w-md w-full rounded-2xl p-6 text-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-2 font-display text-xl font-semibold">
              Install Glass New Tab
            </h2>
            <p className="mb-4 text-sm opacity-80">
              Works in Google Chrome, Microsoft Edge, Brave, and other
              Chromium browsers.
            </p>
            <ol className="mb-4 list-decimal space-y-1 pl-5 text-sm">
              <li>Download and unzip the file.</li>
              <li>
                Open <code className="rounded bg-black/10 px-1">chrome://extensions</code>{" "}
                (or <code className="rounded bg-black/10 px-1">edge://extensions</code>,{" "}
                <code className="rounded bg-black/10 px-1">brave://extensions</code>).
              </li>
              <li>Enable <b>Developer mode</b> (top right).</li>
              <li>Click <b>Load unpacked</b> and pick the unzipped folder.</li>
              <li>Open a new tab — that's it!</li>
            </ol>
            <div className="flex gap-2">
              <button
                onClick={download}
                className="flex-1 rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
              >
                Download .zip
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl bg-black/10 px-4 py-2 text-sm hover:bg-black/20"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}