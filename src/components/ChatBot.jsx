import React, { useState } from "react";

// A lightweight, rules-based chat helper that lets users tweak the website spec using natural language
// Examples:
// - "Set brand to Alpha Labs"
// - "Change site type to Portfolio"
// - "Make the color palette purple"
// - "Sections: Hero, Features, Pricing, FAQ, Footer"
// - "Turn off animations" / "Enable SEO"
// - "Tagline: Build boldly"

const ChatBot = ({
  siteType,
  brandName,
  tagline,
  palette,
  customSections,
  extras,
  onUpdate,
  onPreview,
}) => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! Tell me how you want to change your website. For example: 'Set brand to NovaByte', 'Change site type to Portfolio', 'Palette purple', or 'Sections: Hero, Features, Pricing, FAQ, Footer'." },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);

    const wantsPreview = /\bpreview\b/i.test(text) || /\bshow\b.+\bpreview\b/i.test(text);
    const updates = parseCommand(text, { siteType, brandName, tagline, palette, customSections, extras });

    if (Object.keys(updates).length === 0) {
      // No updates detected. If they asked for preview, still render it.
      if (wantsPreview) {
        onPreview();
        const reply = { role: "assistant", content: "Rendering the latest preview now." };
        setMessages((m) => [...m, reply]);
        setInput("");
        return;
      }

      const reply = {
        role: "assistant",
        content:
          "I couldn't detect a change. Try: 'Set brand to Alpha', 'Site type Portfolio', 'Tagline: Build boldly', 'Palette blue', 'Sections: Hero, Features, Pricing', 'Disable animations', or 'Enable SEO'. You can also type 'preview' to render the current spec.",
      };
      setMessages((m) => [...m, reply]);
      setInput("");
      return;
    }

    onUpdate(updates);
    const summary = buildSummary(updates);
    const reply = { role: "assistant", content: summary + (wantsPreview ? "\nRendering a fresh preview..." : "\nType 'preview' to see the updated demo.") };
    setMessages((m) => [...m, reply]);

    if (wantsPreview) {
      onPreview();
    }

    setInput("");
  };

  return (
    <section className="mx-auto max-w-5xl px-6 py-8">
      <div className="bg-slate-800/70 border border-blue-500/20 rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/70 border-b border-slate-700">
          <span className="text-sm text-blue-100">Chat helper</span>
          <span className="text-xs text-blue-300/70">Type instructions to tweak the spec</span>
        </div>
        <div className="p-4 h-80 overflow-y-auto space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
              <div
                className={
                  "inline-block px-3 py-2 rounded-lg text-sm " +
                  (m.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-700 text-blue-50")
                }
              >
                {m.content}
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-slate-700 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="e.g., Palette purple, Set brand to Alpha Labs, Disable animations, Sections: Hero, Features, Pricing, FAQ, Footer, preview"
            className="flex-1 bg-slate-900/70 border border-slate-700 rounded-lg px-3 py-2 text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={send} className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white">
            Send
          </button>
        </div>
      </div>
    </section>
  );
};

function parseCommand(text, current) {
  const updates = {};

  // Brand name
  const brandMatch = text.match(/(?:set\s+brand\s+to|brand\s*:?)\s*([\w\s&-]{2,})/i);
  if (brandMatch) updates.brandName = brandMatch[1].trim();

  // Tagline
  const tagMatch = text.match(/(?:set\s+tagline\s+to|tagline\s*:?)\s*(.+)$/i);
  if (tagMatch) updates.tagline = tagMatch[1].trim();

  // Site type
  const typeMatch = text.match(/(?:set\s+site\s*type\s*to|site\s*type\s*|type\s*:?\s*)([\w\s\/-]{3,})/i);
  if (typeMatch) updates.siteType = toTitleCase(typeMatch[1].trim());

  // Palette (accepts: "palette purple", "palette: purple", "color to purple")
  const palMatch = text.match(/(?:palette|color|theme)\s*(?:to|:)?\s*(blue|purple|emerald|rose|orange|gray)/i);
  if (palMatch) updates.palette = palMatch[1].toLowerCase();

  // Sections list
  const secMatch = text.match(/(?:sections\s*:?\s*)(.+)$/i);
  if (secMatch) updates.customSections = secMatch[1].split(",").map((s) => s.trim()).filter(Boolean).join(", ");

  // Toggles
  if (/disable\s+animations|turn\s+off\s+animations/i.test(text)) updates.extras = { ...current.extras, animations: false };
  if (/enable\s+animations|turn\s+on\s+animations/i.test(text)) updates.extras = { ...current.extras, animations: true };
  if (/disable\s+seo/i.test(text)) updates.extras = { ...current.extras, seo: false };
  if (/enable\s+seo/i.test(text)) updates.extras = { ...current.extras, seo: true };
  if (/disable\s+accessibility|turn\s+off\s+a11y/i.test(text)) updates.extras = { ...current.extras, accessibility: false };
  if (/enable\s+accessibility|turn\s+on\s+a11y|enable\s+a11y/i.test(text)) updates.extras = { ...current.extras, accessibility: true };
  if (/disable\s+responsive/i.test(text)) updates.extras = { ...current.extras, responsive: false };
  if (/enable\s+responsive/i.test(text)) updates.extras = { ...current.extras, responsive: true };

  return updates;
}

function toTitleCase(str) {
  return str
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function buildSummary(updates) {
  const parts = [];
  if (updates.brandName) parts.push(`Brand → ${updates.brandName}`);
  if (updates.tagline) parts.push(`Tagline → ${updates.tagline}`);
  if (updates.siteType) parts.push(`Site type → ${updates.siteType}`);
  if (updates.palette) parts.push(`Palette → ${updates.palette}`);
  if (typeof updates.customSections === "string") parts.push(`Sections → ${updates.customSections}`);
  if (updates.extras) {
    parts.push(
      `Options → animations:${updates.extras.animations ? "on" : "off"}, responsive:${updates.extras.responsive ? "on" : "off"}, a11y:${updates.extras.accessibility ? "on" : "off"}, seo:${updates.extras.seo ? "on" : "off"}`
    );
  }
  return parts.length ? `Updated: ${parts.join("; ")}` : "No changes detected.";
}

export default ChatBot;
