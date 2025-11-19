import React from "react";

const Preview = ({ htmlString }) => {
  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="bg-slate-800/70 border border-blue-500/20 rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/70 border-b border-slate-700">
          <span className="text-sm text-blue-100">Preview</span>
          <span className="text-xs text-blue-300/70">Static render</span>
        </div>
        <div className="p-0">
          {htmlString ? (
            <iframe
              title="preview"
              className="w-full h-[540px] bg-white"
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
