import React, { useMemo, useRef, useState } from "react";

const Preview = ({ htmlString }) => {
  const iframeRef = useRef(null);
  const [height, setHeight] = useState(540);

  const blobUrl = useMemo(() => {
    if (!htmlString) return null;
    const blob = new Blob([htmlString], { type: "text/html" });
    return URL.createObjectURL(blob);
  }, [htmlString]);

  const download = () => {
    if (!htmlString) return;
    const blob = new Blob([htmlString], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "website-demo.html";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const openNewTab = () => {
    if (!blobUrl) return;
    window.open(blobUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="bg-slate-800/70 border border-blue-500/20 rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/70 border-b border-slate-700">
          <span className="text-sm text-blue-100">Preview</span>
          <div className="flex items-center gap-2">
            <label className="text-xs text-blue-300/70 hidden sm:flex items-center gap-1">
              Height
              <select
                className="bg-slate-800/80 border border-slate-700 rounded px-2 py-1 text-xs text-blue-100"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
              >
                <option value={540}>540px</option>
                <option value={680}>680px</option>
                <option value={800}>800px</option>
                <option value={900}>900px</option>
              </select>
            </label>
            <button onClick={download} className="text-xs px-2 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white">Download HTML</button>
            <button onClick={openNewTab} className="text-xs px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white">Open in new tab</button>
          </div>
        </div>
        <div className="p-0">
          {htmlString ? (
            <iframe
              ref={iframeRef}
              title="preview"
              className="w-full bg-white"
              style={{ height: height + "px" }}
              srcDoc={htmlString}
            />
          ) : (
            <div className="p-8 text-blue-100/80 text-sm">
              Use the form above to generate a prompt, paste it into any AI that can return full HTML, and paste the result back here to preview. Or use the Preview button to see an instant demo of what the prompt might create.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Preview;
