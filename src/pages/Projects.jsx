import React, { useEffect, useState, useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { FiGithub, FiExternalLink, FiSearch, FiStar, FiGitBranch, FiCopy } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);
import { useSoundEffects } from "../hooks/useSoundEffects";

const GITHUB_USERNAME = "mohidqx";

const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Shell: "#89e051",
  Go: "#00ADD8",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Ruby: "#701516",
  Rust: "#dea584",
  Dart: "#00B4AB",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
};

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const containerRef = useRef();
  const cardsRef = useRef();
  const { playHover, playClick } = useSoundEffects();

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
        );
        if (!res.ok) throw new Error("Failed to fetch repositories");
        const data = await res.json();
        // Filter out .github and profile repos, keep non-archived
        const filtered = data.filter(
          (repo) =>
            repo.name !== ".github" &&
            repo.name !== GITHUB_USERNAME &&
            !repo.archived
        );
        setRepos(filtered);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  // Get unique languages for filter
  const languages = useMemo(() => {
    const langs = repos
      .map((r) => r.language)
      .filter(Boolean);
    return ["All", ...Array.from(new Set(langs)).sort()];
  }, [repos]);

  // Filtered repos
  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => {
      const matchesSearch =
        repo.name.toLowerCase().includes(search.toLowerCase()) ||
        (repo.description || "").toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        activeFilter === "All" || repo.language === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [repos, search, activeFilter]);

  // GSAP Animations
  useGSAP(
    () => {
      if (loading) return;

      const tl = gsap.timeline();

      tl.from(".projects-hero-title .char", {
        y: 120,
        opacity: 0,
        stagger: 0.03,
        duration: 1,
        ease: "power4.out",
      })
        .from(
          ".projects-subtitle",
          { y: 30, opacity: 0, duration: 1, ease: "power3.out" },
          "-=0.6"
        )
        .from(
          ".projects-search-bar",
          { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .from(
          ".filter-pill",
          {
            y: 15,
            opacity: 0,
            stagger: 0.04,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        );
    },
    { scope: containerRef, dependencies: [loading] }
  );

  // Animate cards as they scroll into view
  useGSAP(
    () => {
      if (loading || !cardsRef.current) return;

      const cards = cardsRef.current.querySelectorAll(".repo-card");
      // Set initial state
      gsap.set(cards, { y: 40, opacity: 0 });

      ScrollTrigger.batch(cards, {
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.7,
            ease: "power3.out",
          });
        },
        start: "top 92%",
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: cardsRef, dependencies: [filteredRepos] }
  );

  const splitText = (text) =>
    text.split("").map((char, i) => (
      <span key={i} className="char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <div className="relative w-16 h-16">
          <div
            className="absolute inset-0 border-2 border-accent/20 rounded-full"
            style={{ animation: "spin 2s linear infinite" }}
          />
          <div
            className="absolute inset-0 border-t-2 border-accent rounded-full"
            style={{ animation: "spin 1s linear infinite" }}
          />
        </div>
        <p className="text-main-text/60 uppercase tracking-[0.3em] text-xs font-bold">
          Loading Repositories
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-main-text">
        <h1 className="text-4xl font-bold mb-4 uppercase tracking-tighter">
          Something went wrong
        </h1>
        <p className="text-main-text/60 mb-8">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-accent underline uppercase tracking-widest text-xs"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <main ref={containerRef} className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full px-6 md:px-12 pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
        {/* Background number */}
        <div className="absolute top-16 right-6 md:right-12 text-[20vw] font-black text-accent/[0.04] leading-none select-none pointer-events-none">
          {repos.length}
        </div>

        <div className="max-w-7xl mx-auto">
          <h2 className="text-accent text-[10px] md:text-sm uppercase tracking-[0.3em] font-bold mb-3 md:mb-4 opacity-80">
            — Github Repositories
          </h2>
          <h1 className="projects-hero-title text-5xl md:text-[10vw] font-black uppercase tracking-tighter leading-[0.85] mb-8">
            {splitText("All")}
            <br />
            <span className="text-accent">{splitText("Projects")}</span>
          </h1>
          <div className="projects-subtitle flex items-center gap-4">
            <div className="h-1 w-12 bg-accent" />
            <p className="text-main-text/60 text-sm md:text-base uppercase tracking-widest">
              {repos.length} public repositories on{" "}
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="text-accent hover:underline"
              >
                @{GITHUB_USERNAME}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="w-full px-6 md:px-12 pb-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Search */}
          <div className="projects-search-bar relative max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-main-text/40 text-lg" />
            <input
              id="project-search"
              type="text"
              placeholder="Search repositories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={playClick}
              className="w-full pl-12 pr-4 py-3.5 bg-transparent border border-main-text/15 rounded-full text-main-text placeholder:text-main-text/30 text-sm tracking-wide outline-none transition-all duration-300 focus:border-accent/60 focus:shadow-[0_0_20px_rgba(255,152,162,0.1)] font-roboto"
            />
          </div>

          {/* Language Filters */}
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  playClick();
                  setActiveFilter(lang);
                }}
                onMouseEnter={playHover}
                className={`filter-pill px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.15em] font-bold border transition-all duration-300 cursor-pointer ${
                  activeFilter === lang
                    ? "bg-accent text-main-bg border-accent shadow-[0_4px_20px_rgba(255,152,162,0.3)]"
                    : "bg-transparent text-main-text/60 border-main-text/15 hover:border-accent/40 hover:text-main-text"
                }`}
              >
                {lang !== "All" && (
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-2"
                    style={{
                      backgroundColor: LANGUAGE_COLORS[lang] || "#888",
                    }}
                  />
                )}
                {lang}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Repo Grid */}
      <section className="w-full px-6 md:px-12 pb-32">
        <div
          ref={cardsRef}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filteredRepos.map((repo) => (
            <RepoCard
              key={repo.id}
              repo={repo}
              formatDate={formatDate}
              playHover={playHover}
              playClick={playClick}
            />
          ))}
        </div>

        {filteredRepos.length === 0 && (
          <div className="text-center py-24">
            <p className="text-main-text/30 text-lg uppercase tracking-widest">
              No repositories found
            </p>
            <button
              onClick={() => {
                playClick();
                setSearch("");
                setActiveFilter("All");
              }}
              className="mt-4 text-accent text-xs uppercase tracking-[0.2em] font-bold hover:underline cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

const RepoCard = ({ repo, formatDate, playHover, playClick }) => {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={playHover}
      onClick={playClick}
      className="repo-card group relative flex flex-col justify-between p-6 md:p-8 border border-main-text/10 rounded-2xl bg-main-bg transition-all duration-500 hover:border-accent/40 hover:shadow-[0_20px_60px_rgba(255,152,162,0.08)] overflow-hidden"
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Top section */}
      <div className="relative z-10">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            {repo.fork ? (
              <FiCopy className="text-main-text/40 text-lg flex-shrink-0" />
            ) : (
              <FiGithub className="text-main-text/40 text-lg flex-shrink-0" />
            )}
            {repo.fork && (
              <span className="text-[9px] uppercase tracking-wider text-main-text/30 font-bold bg-main-text/5 px-2 py-0.5 rounded-full">
                Fork
              </span>
            )}
          </div>
          <FiExternalLink className="text-main-text/20 group-hover:text-accent transition-colors duration-300 text-sm" />
        </div>

        {/* Repo name */}
        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-main-text group-hover:text-accent transition-colors duration-300 leading-tight mb-3">
          {repo.name}
        </h3>

        {/* Description */}
        <p className="text-main-text/50 text-xs md:text-sm leading-relaxed line-clamp-3 font-roboto mb-6">
          {repo.description || "No description provided."}
        </p>
      </div>

      {/* Bottom section */}
      <div className="relative z-10 flex items-center justify-between pt-4 border-t border-main-text/5">
        <div className="flex items-center gap-4">
          {/* Language */}
          {repo.language && (
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor:
                    LANGUAGE_COLORS[repo.language] || "#888",
                }}
              />
              <span className="text-[11px] text-main-text/50 font-medium">
                {repo.language}
              </span>
            </div>
          )}

          {/* Stars */}
          {repo.stargazers_count > 0 && (
            <div className="flex items-center gap-1">
              <FiStar className="text-[11px] text-main-text/40" />
              <span className="text-[11px] text-main-text/50 font-medium">
                {repo.stargazers_count}
              </span>
            </div>
          )}

          {/* Forks */}
          {repo.forks_count > 0 && (
            <div className="flex items-center gap-1">
              <FiGitBranch className="text-[11px] text-main-text/40" />
              <span className="text-[11px] text-main-text/50 font-medium">
                {repo.forks_count}
              </span>
            </div>
          )}
        </div>

        {/* Updated date */}
        <span className="text-[10px] text-main-text/30 uppercase tracking-wider font-medium">
          {formatDate(repo.updated_at)}
        </span>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
        <div className="absolute -top-8 -right-8 w-16 h-16 bg-accent/0 group-hover:bg-accent/10 rounded-full transition-all duration-500 group-hover:scale-150" />
      </div>
    </a>
  );
};

export default Projects;