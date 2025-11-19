import React, { useMemo, useState } from "react";

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
  "Dashboard (static data)"
];

const colorPalettes = [
  { name: "Blue / Slate", value: "blue" },
  { name: "Purple / Indigo", value: "purple" },
  { name: "Emerald / Teal", value: "emerald" },
  { name: "Rose / Pink", value: "rose" },
  { name: "Orange / Amber", value: "orange" },
  { name: "Neutral / Gray", value: "gray" }
];

const sectionsByType = {
  Blog: ["Hero", "Featured Posts", "Latest Posts Grid", "Newsletter", "Footer"],
  Portfolio: ["Hero", "Projects Grid", "About Me", "Testimonials", "Contact", "Footer"],
  "SaaS Landing Page": [
    "Navbar",
    "Hero",
    "Feature Highlights",
    "Product Screenshots",
    "Pricing",
    "Testimonials",
    "FAQ",
    "CTA",
    "Footer"
  ],
  "E-commerce Product Page": [
    "Navbar",
    "Product Gallery",
    "Product Details",
    "Reviews",
    "Related Products",
    "Footer"
  ],
  Documentation: ["Navbar", "Sidebar", "Docs Content Area", "Footer"],
  Restaurant: ["Hero", "Menu Highlights", "Gallery", "Reservations CTA", "Location & Hours", "Footer"],
  "Event/Conference": ["Hero", "Speakers", "Schedule", "Tickets CTA", "Sponsors", "FAQ", "Footer"],
  "Agency/Services": ["Hero", "Services", "Case Studies", "Process", "Testimonials", "Contact", "Footer"],
  "Personal Bio/Link-in-bio": ["Avatar + Bio", "Links List", "Socials", "Footer"],
  "Dashboard (static data)": ["Sidebar", "Topbar", "Cards", "Charts Placeholder", "Table", "Footer"]
};

const PromptForm = ({ onGenerate }) => {
  const [siteType, setSiteType] = useState(siteTypes[0]);
  const [brandName, setBrandName] = useState("NovaByte");
  const [tagline, setTagline] = useState("Build something brilliant");
  const [palette, setPalette] = useState(colorPalettes[0].value);
  const [customSections, setCustomSections] = useState("");
  const [extras, setExtras] = useState({ animations: true, responsive: true, accessibility: true, seo: true });

  const sections = useMemo(() => {
    if (customSections.trim()) {
      return customSections.split(",").map((s) => s.trim()).filter(Boolean);
    }
    return sectionsByType[siteType] || [];
  }, [siteType, customSections]);

  const prompt = useMemo(() => {
    const colorGuide = {
      blue: "Use a blue/slate palette with subtle gradients and focus rings.",
      purple: "Use purple/indigo with glassmorphism accents.",
      emerald: "Use emerald/teal with soft shadows.",
      rose: "Use rose/pink with vibrant gradients.",
      orange: "Use orange/amber with warm highlights.",
      gray: "Use neutral gray with clean minimalism."
    }[palette];

    const check = (b) => (b ? "Yes" : "No");

    return `You are a senior front-end developer. Create a COMPLETE single-file website using plain HTML, CSS, and JavaScript (no frameworks, no external CDNs except Google Fonts allowed).\n\nProject goal: A ${siteType} website for "${brandName}" with the tagline "${tagline}".\n\nDesign requirements:\n- ${colorGuide}\n- Modern, responsive layout that scales from mobile to desktop\n- Clear visual hierarchy, generous spacing, smooth hover states\n- Use the Inter or Manrope font from Google Fonts\n- Include a favicon placeholder data URL\n- Include a sticky navbar or header if appropriate\n\nContent sections to include (in order):\n- ${sections.join("\n- ")}\n\nFunctionality requirements:\n- ${check(extras.animations)} to subtle animations: fade/slide on scroll, button micro-interactions\n- ${check(extras.responsive)} to fully responsive behavior with a mobile-first approach\n- ${check(extras.accessibility)} to proper semantics, aria-labels, focus states, color contrast\n- ${check(extras.seo)} to basic SEO meta tags (title, description, social preview)\n\nImplementation details:\n- Provide ALL code in one HTML file between <html>...</html>\n- Write clean, commented CSS inside a <style> tag; prefer CSS variables for theme colors\n- Add small vanilla JS for interactivity (e.g., mobile nav toggle, FAQ accordion, testimonial slider if present)\n- Include sample placeholder content and images using placeholders (e.g., viaPicsum or data URLs)\n- Validate with WAI-ARIA best practices where relevant\n\nOutput format:\n- Return only the final HTML document, nothing else.
`;
  }, [siteType, brandName, tagline, palette, sections, extras]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(prompt);
  };

  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 -mt-6">
      <form onSubmit={handleSubmit} className="bg-slate-800/70 border border-blue-500/20 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm text-blue-100">Site type</span>
              <select value={siteType} onChange={(e) => setSiteType(e.target.value)} className="mt-1 w-full bg-slate-900/70 border border-slate-700 rounded-lg p-2.5 text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {siteTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm text-blue-100">Brand / Website name</span>
              <input value={brandName} onChange={(e) => setBrandName(e.target.value)} className="mt-1 w-full bg-slate-900/70 border border-slate-700 rounded-lg p-2.5 text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., NovaByte" />
            </label>

            <label className="block">
              <span className="text-sm text-blue-100">Tagline</span>
              <input value={tagline} onChange={(e) => setTagline(e.target.value)} className="mt-1 w-full bg-slate-900/70 border border-slate-700 rounded-lg p-2.5 text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Build something brilliant" />
            </label>

            <label className="block">
              <span className="text-sm text-blue-100">Color palette</span>
              <div className="mt-1 grid grid-cols-3 gap-2">
                {colorPalettes.map((p) => (
                  <button key={p.value} type="button" onClick={() => setPalette(p.value)} className={`rounded-lg border p-2 text-sm ${palette === p.value ? "border-blue-500 bg-slate-900" : "border-slate-700 bg-slate-900/50"}`}>
                    {p.name}
                  </button>
                ))}
              </div>
            </label>

            <label className="block">
              <span className="text-sm text-blue-100">Custom sections (comma separated, overrides type)</span>
              <input value={customSections} onChange={(e) => setCustomSections(e.target.value)} className="mt-1 w-full bg-slate-900/70 border border-slate-700 rounded-lg p-2.5 text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Hero, Features, Pricing, FAQ, Footer" />
            </label>

            <fieldset className="grid grid-cols-2 gap-3 pt-2">
              {Object.entries(extras).map(([key, value]) => (
                <label key={key} className="flex items-center gap-2 text-blue-100/90">
                  <input type="checkbox" checked={value} onChange={(e) => setExtras((prev) => ({ ...prev, [key]: e.target.checked }))} />
                  <span className="capitalize">{key}</span>
                </label>
              ))}
            </fieldset>
          </div>

          <div className="space-y-3">
            <label className="block">
              <span className="text-sm text-blue-100">Generated prompt</span>
              <textarea readOnly value={prompt} className="mt-1 h-[340px] w-full bg-slate-950/70 border border-slate-700 rounded-lg p-3 text-blue-50 font-mono text-xs leading-5 focus:outline-none" />
            </label>
            <div className="flex items-center gap-3">
              <button type="button" onClick={handleCopy} className="inline-flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition px-4 py-2 text-white">
                Copy prompt
              </button>
              <button type="submit" className="inline-flex items-center justify-center rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition px-4 py-2 text-white">
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
