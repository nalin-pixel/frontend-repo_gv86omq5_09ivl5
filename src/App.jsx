import React, { useMemo, useState } from "react";
import Header from "./components/Header";
import PromptForm from "./components/PromptForm";
import Preview from "./components/Preview";
import ChatBot from "./components/ChatBot";

function App() {
  const [siteType, setSiteType] = useState("Blog");
  const [brandName, setBrandName] = useState("NovaByte");
  const [tagline, setTagline] = useState("Build something brilliant");
  const [palette, setPalette] = useState("blue");
  const [customSections, setCustomSections] = useState("");
  const [extras, setExtras] = useState({ animations: true, responsive: true, accessibility: true, seo: true });

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
      "Footer",
    ],
    "E-commerce Product Page": [
      "Navbar",
      "Product Gallery",
      "Product Details",
      "Reviews",
      "Related Products",
      "Footer",
    ],
    Documentation: ["Navbar", "Sidebar", "Docs Content Area", "Footer"],
    Restaurant: ["Hero", "Menu Highlights", "Gallery", "Reservations CTA", "Location & Hours", "Footer"],
    "Event/Conference": ["Hero", "Speakers", "Schedule", "Tickets CTA", "Sponsors", "FAQ", "Footer"],
    "Agency/Services": ["Hero", "Services", "Case Studies", "Process", "Testimonials", "Contact", "Footer"],
    "Personal Bio/Link-in-bio": ["Avatar + Bio", "Links List", "Socials", "Footer"],
    "Dashboard (static data)": ["Sidebar", "Topbar", "Cards", "Charts Placeholder", "Table", "Footer"],
  };

  const sections = useMemo(() => {
    if (customSections.trim()) {
      return customSections
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
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
      gray: "Use neutral gray with clean minimalism.",
    }[palette];

    const check = (b) => (b ? "Yes" : "No");

    return `You are a senior front-end developer. Create a COMPLETE single-file website using plain HTML, CSS, and JavaScript (no frameworks, no external CDNs except Google Fonts allowed).\n\nProject goal: A ${siteType} website for "${brandName}" with the tagline "${tagline}".\n\nDesign requirements:\n- ${colorGuide}\n- Modern, responsive layout that scales from mobile to desktop\n- Clear visual hierarchy, generous spacing, smooth hover states\n- Use the Inter or Manrope font from Google Fonts\n- Include a favicon placeholder data URL\n- Include a sticky navbar or header if appropriate\n\nContent sections to include (in order):\n- ${sections.join("\n- ")}\n\nFunctionality requirements:\n- ${check(extras.animations)} to subtle animations: fade/slide on scroll, button micro-interactions\n- ${check(extras.responsive)} to fully responsive behavior with a mobile-first approach\n- ${check(extras.accessibility)} to proper semantics, aria-labels, focus states, color contrast\n- ${check(extras.seo)} to basic SEO meta tags (title, description, social preview)\n\nImplementation details:\n- Provide ALL code in one HTML file between <html>...</html>\n- Write clean, commented CSS inside a <style> tag; prefer CSS variables for theme colors\n- Add small vanilla JS for interactivity (e.g., mobile nav toggle, FAQ accordion, testimonial slider if present)\n- Include sample placeholder content and images using placeholders (e.g., viaPicsum or data URLs)\n- Validate with WAI-ARIA best practices where relevant\n\nOutput format:\n- Return only the final HTML document, nothing else.\n`;
  }, [siteType, brandName, tagline, palette, sections, extras]);

  const [previewHtml, setPreviewHtml] = useState("");

  const buildDemoHtml = ({ brandName, tagline, siteType, palette, sections, prompt }) => {
    const palettes = {
      blue: { bg: "#0f172a", primary: "#3b82f6", accent: "#38bdf8" },
      purple: { bg: "#0b1020", primary: "#6366f1", accent: "#a78bfa" },
      emerald: { bg: "#071a14", primary: "#10b981", accent: "#34d399" },
      rose: { bg: "#1b0b13", primary: "#f43f5e", accent: "#fb7185" },
      orange: { bg: "#1a1206", primary: "#f59e0b", accent: "#fb923c" },
      gray: { bg: "#0b0f14", primary: "#94a3b8", accent: "#cbd5e1" },
    };
    const theme = palettes[palette] || palettes.blue;

    const sectionHtml = (s) => {
      const id = s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return `<section id="${id}" class="section"><h2>${s}</h2><p>Placeholder content for ${s.toLowerCase()}.</p></section>`;
    };

    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${brandName} — ${siteType}</title>
  <meta name="description" content="${tagline}" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
  <style>
    :root{--bg:${theme.bg};--primary:${theme.primary};--accent:${theme.accent};--text:#e5e7eb;--muted:#94a3b8}
    *{box-sizing:border-box}
    html,body{height:100%}
    body{margin:0;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,"Helvetica Neue",Arial;line-height:1.6;background:radial-gradient(1200px 600px at 50% -10%,rgba(59,130,246,.2),transparent),var(--bg);color:var(--text)}
    .container{max-width:1100px;margin:0 auto;padding:24px}
    .nav{position:sticky;top:0;backdrop-filter:saturate(140%) blur(8px);background:rgba(2,6,23,.6);border-bottom:1px solid rgba(148,163,184,.15);z-index:50}
    .nav-inner{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:14px 24px}
    .brand{display:flex;align-items:center;gap:10px;font-weight:800;color:#fff;text-decoration:none}
    .brand-badge{width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,var(--primary),var(--accent));box-shadow:0 8px 24px rgba(59,130,246,.35)}
    .cta{padding:10px 14px;border-radius:10px;background:var(--primary);color:white;border:none;cursor:pointer;font-weight:600}
    .cta:hover{filter:brightness(1.1)}
    .hero{padding:80px 24px 40px}
    .title{font-size:clamp(32px,5vw,56px);line-height:1.1;margin:0 0 10px;font-weight:800}
    .tag{font-size:clamp(16px,2.6vw,22px);color:var(--muted);margin-bottom:24px}
    .pill{display:inline-block;padding:6px 10px;border:1px solid rgba(148,163,184,.2);border-radius:999px;color:#cbd5e1;background:rgba(2,6,23,.6)}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-top:24px}
    .card{background:rgba(2,6,23,.6);border:1px solid rgba(148,163,184,.15);border-radius:16px;padding:18px}
    .section{padding:48px 24px;margin:24px;border:1px dashed rgba(148,163,184,.25);border-radius:16px;background:rgba(2,6,23,.4)}
    footer{padding:48px 24px;color:var(--muted);text-align:center;border-top:1px solid rgba(148,163,184,.15);margin-top:48px}
    a{color:var(--accent)}
    @media (max-width:640px){.nav-inner{padding:10px 16px}.hero{padding-top:48px}}
  </style>
  <!-- Generated by your prompt builder. Original prompt: \n${prompt.replace(/</g, "&lt;") } -->
</head>
<body>
  <nav class="nav">
    <div class="nav-inner container">
      <a class="brand" href="#"><span class="brand-badge"></span>${brandName}</a>
      <div style="display:flex;gap:10px;align-items:center">
        <a href="#features" class="pill">Features</a>
        <a href="#contact" class="pill">Contact</a>
        <button class="cta">Get Started</button>
      </div>
    </div>
  </nav>

  <header class="hero container">
    <p class="pill">${siteType}</p>
    <h1 class="title">${brandName}</h1>
    <p class="tag">${tagline}</p>
    <div class="grid">
      <div class="card"><strong>Responsive</strong><br/>Scales from mobile to desktop.</div>
      <div class="card"><strong>Accessible</strong><br/>Semantic HTML, proper contrast.</div>
      <div class="card"><strong>Fast</strong><br/>No external frameworks required.</div>
    </div>
  </header>

  ${sections.map(sectionHtml).join("\n")}

  <footer>
    <div class="container">© ${new Date().getFullYear()} ${brandName}. Built from a generated prompt. <a href="#">Privacy</a> · <a href="#">Terms</a></div>
  </footer>

  <script>
    // Simple fade-in on scroll
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.style.transition='opacity .6s ease, transform .6s ease'; e.target.style.opacity=1; e.target.style.transform='translateY(0)'; }});
    },{threshold:.1});
    document.querySelectorAll('.section,.card').forEach(el=>{ el.style.opacity=.001; el.style.transform='translateY(10px)'; io.observe(el); });
  </script>
</body>
</html>`;
  };

  const handleGenerate = (overridePrompt, overrideData) => {
    const data = overrideData || { brandName, tagline, siteType, palette, sections };
    const html = buildDemoHtml({ ...data, prompt: overridePrompt || prompt });
    setPreviewHtml(html);
  };

  const handleUpdate = (updates) => {
    if (updates.siteType !== undefined) setSiteType(updates.siteType);
    if (updates.brandName !== undefined) setBrandName(updates.brandName);
    if (updates.tagline !== undefined) setTagline(updates.tagline);
    if (updates.palette !== undefined) setPalette(updates.palette);
    if (updates.customSections !== undefined) setCustomSections(updates.customSections);
    if (updates.extras !== undefined) setExtras(updates.extras);
  };

  const values = { siteType, brandName, tagline, palette, customSections, extras };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-20%,rgba(59,130,246,0.15),transparent_50%),radial-gradient(circle_at_120%_20%,rgba(168,85,247,0.12),transparent_50%)]" />
      <div className="relative">
        <Header />
        <PromptForm
          values={values}
          setValues={handleUpdate}
          prompt={prompt}
          onGenerate={() => handleGenerate()}
        />
        <ChatBot
          {...values}
          onUpdate={handleUpdate}
          onPreview={() => handleGenerate()}
        />
        <Preview htmlString={previewHtml} />
      </div>
    </div>
  );
}

export default App;
