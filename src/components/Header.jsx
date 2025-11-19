import React from "react";

const Header = () => {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-20%,rgba(59,130,246,0.3),transparent_50%),radial-gradient(circle_at_120%_20%,rgba(168,85,247,0.25),transparent_50%)]" />
      <div className="relative mx-auto max-w-5xl px-6 py-14 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm">
          AI Website Prompt Builder
        </h1>
        <p className="mt-4 text-lg md:text-xl text-blue-100/90">
          Describe the site you want and get a perfectly structured prompt to generate a full HTML, CSS, and JS website in any AI tool.
        </p>
      </div>
    </header>
  );
};

export default Header;
