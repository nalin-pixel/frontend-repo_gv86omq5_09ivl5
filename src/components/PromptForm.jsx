import React from "react";

const siteTypes = [
  "Blog",
  "Portfolio",
  "SaaS Landing Page",
  "E-commerce Product Page",
  "Documentation",
  "Restaurant",
  "Event/Conference",
  "Agency/Services",
  "Personal Bio/Link-in-bio",
  "Dashboard (static data)",
];

const colorPalettes = [
  { name: "Blue / Slate", value: "blue" },
  { name: "Purple / Indigo", value: "purple" },
  { name: "Emerald / Teal", value: "emerald" },
  { name: "Rose / Pink", value: "rose" },
  { name: "Orange / Amber", value: "orange" },
  { name: "Neutral / Gray", value: "gray" },
];

const PromptForm = ({ values, setValues, prompt, onGenerate }) => {
  const { siteType, brandName, tagline, palette, customSections, extras } = values;

  const handleToggle = (key) => (e) => setValues({ extras: { ...extras, [key]: e.target.checked } });

  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 -mt-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onGenerate();
        }}
        className="bg-slate-800/70 border border-blue-500/20 rounded-2xl p-6 md:p-8 shadow-xl"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm text-blue-100">Site type</span>
              <select
                value={siteType}
                onChange={(e) => setValues({ siteType: e.target.value })}
                className="mt-1 w-full bg-slate-900/70 border border-slate-700 rounded-lg p-2.5 text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {siteTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm text-blue-100">Brand / Website name</span>
              <input
                value={brandName}
                onChange={(e) => setValues({ brandName: e.target.value })}
                className="mt-1 w-full bg-slate-900/70 border border-slate-700 rounded-lg p-2.5 text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., NovaByte"
              />
            </label>

            <label className="block">
              <span className="text-sm text-blue-100">Tagline</span>
              <input
                value={tagline}
                onChange={(e) => setValues({ tagline: e.target.value })}
                className="mt-1 w-full bg-slate-900/70 border border-slate-700 rounded-lg p-2.5 text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Build something brilliant"
              />
            </label>

            <label className="block">
              <span className="text-sm text-blue-100">Color palette</span>
              <div className="mt-1 grid grid-cols-3 gap-2">
                {colorPalettes.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setValues({ palette: p.value })}
                    className={`rounded-lg border p-2 text-sm ${
                      palette === p.value ? "border-blue-500 bg-slate-900" : "border-slate-700 bg-slate-900/50"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </label>

            <label className="block">
              <span className="text-sm text-blue-100">Custom sections (comma separated, overrides type)</span>
              <input
                value={customSections}
                onChange={(e) => setValues({ customSections: e.target.value })}
                className="mt-1 w-full bg-slate-900/70 border border-slate-700 rounded-lg p-2.5 text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Hero, Features, Pricing, FAQ, Footer"
              />
            </label>

            <fieldset className="grid grid-cols-2 gap-3 pt-2">
              {Object.entries(extras).map(([key, value]) => (
                <label key={key} className="flex items-center gap-2 text-blue-100/90">
                  <input type="checkbox" checked={value} onChange={handleToggle(key)} />
                  <span className="capitalize">{key}</span>
                </label>
              ))}
            </fieldset>
          </div>

          <div className="space-y-3">
            <label className="block">
              <span className="text-sm text-blue-100">Generated prompt</span>
              <textarea
                readOnly
                value={prompt}
                className="mt-1 h-[340px] w-full bg-slate-950/70 border border-slate-700 rounded-lg p-3 text-blue-50 font-mono text-xs leading-5 focus:outline-none"
              />
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(prompt);
                }}
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition px-4 py-2 text-white"
              >
                Copy prompt
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition px-4 py-2 text-white"
              >
                Preview website
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default PromptForm;
