"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Magnetic({ children, strength = 0.9 }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-block" }}
    >
      {children}
    </span>
  );
}
const projects = [
  {
    number: "01",
    title: "INSTAGRAM AUTH",
    category: "SOCIAL / ANALYTICS",
    description:
      "Web app for visualizing personalized Instagram data. View top profiles, data metrics, and detailed auth stats using the Instagram API.",
    tags: ["REACT", "EXPRESS", "INSTAGRAM API", "HEROKU"],
    link: "https://github.com/Muneeb-U-Rehman-Chaudary",
    image: "/Images/project_3.png",
    year: "2023",
    color: "#ff6b35",
  },
  {
    number: "02",
    title: "REALTIME CHAT APP",
    category: "FULLSTACK / REALTIME",
    description:
      "Production-grade real-time chat application with authentication, rooms, and typing indicators. Built with Socket.IO for sub-100ms latency.",
    tags: ["NEXT.JS", "NODE.JS", "SOCKET.IO", "MONGODB"],
    link: "https://github.com/Muneeb-U-Rehman-Chaudary",
    image: "/Images/project_1.png",
    year: "2024",
    color: "#ff6b35",
  },
  {
    number: "03",
    title: "PORTFOLIO V2",
    category: "FRONTEND / DESIGN",
    description:
      "Personal portfolio website with futuristic cyber aesthetics, GSAP scroll animations, and Framer Motion interactions. Built for maximum performance.",
    tags: ["NEXT.JS", "CHAKRA UI", "GSAP", "FRAMER"],
    link: "https://github.com/Muneeb-U-Rehman-Chaudary",
    image: "/Images/project_2.png",
    year: "2024",
    color: "#ff6b35",
  },
  {
    number: "04",
    title: "AI TIMETABLE GENERATOR",
    category: "AI / PRODUCTIVITY",
    description:
      "AI-powered university timetable generator. Upload your department's Excel file and the AI parses, analyzes, and organizes your schedule with smart conflict detection, PDF export, and multi-section support.",
    tags: ["NEXT.JS", "AI", "PDF EXPORT", "EXCEL PARSING"],
    link: "https://sup-time-table-generator-9yxi.vercel.app/",
    image: "/Images/project_4.png",
    year: "2025",
    color: "#ff6b35",
  },
];

function ProjectRow({ project, index }) {
  const ref = useRef(null);
  const imgRef = useRef(null);
  const lineRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    if (!imgRef.current) return;
    if (hovered) {
      gsap.to(imgRef.current, {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(imgRef.current, {
        opacity: 0,
        scale: 0.88,
        rotationY: -8,
        duration: 0.35,
        ease: "power2.in",
      });
    }
  }, [hovered]);

  useEffect(() => {
    if (!imgRef.current || !hovered) return;
    gsap.to(imgRef.current, {
      x: mousePos.x - 150,
      y: mousePos.y - 110,
      duration: 0.55,
      ease: "power2.out",
    });
  }, [mousePos, hovered]);

  // Slide-in line on view
  useEffect(() => {
    if (!lineRef.current || !isInView) return;
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.7, ease: "power3.out", delay: index * 0.08 },
    );
  }, [isInView, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.75,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative border-b group cursor-pointer overflow-hidden"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      {/* Hover fill gradient */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,107,53,0.05) 0%, transparent 70%)",
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Left edge accent bar */}
      <div
        ref={lineRef}
        className="absolute left-0 top-0 w-[2px] h-full origin-bottom"
        style={{
          background:
            "linear-gradient(180deg, var(--orange), rgba(255,107,53,0.2))",
          transform: hovered ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "bottom",
          transition: "transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      />

      {/* Floating image preview — follows cursor */}
      {/* <div
        ref={imgRef}
        className="absolute z-40 pointer-events-none rounded-xl overflow-hidden hidden lg:block"
        style={{
          width: "250px",
          height: "180px",
          opacity: 0,
          top: 0,
          left: 0,
          zIndex: 40,
          transformStyle: "preserve-3d",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,107,53,0.25), 0 0 40px rgba(255,107,53,0.08)",
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          style={{ filter: "saturate(0.85) brightness(0.8)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(255,107,53,0.07)" }}
        />
        <div className="scan-line opacity-40" />
        <div
          className="absolute bottom-0 left-0 right-0 px-3 py-2.5 flex justify-between items-center"
          style={{
            background:
              "linear-gradient(0deg, rgba(8,8,8,0.95) 0%, transparent 100%)",
            backdropFilter: "blur(2px)",
          }}
        >
          <span
            className="font-mono-label"
            style={{ fontSize: "9px", color: "var(--orange)" }}
          >
            {project.title}
          </span>
          <span
            className="font-mono-label"
            style={{ fontSize: "9px", color: "rgba(255,255,255,0.35)" }}
          >
            {project.year}
          </span>
        </div>
        <div
          className="absolute top-2 left-2 w-4 h-4 border-l border-t"
          style={{ borderColor: "var(--orange)", opacity: 0.6 }}
        />
        <div
          className="absolute top-2 right-2 w-4 h-4 border-r border-t"
          style={{ borderColor: "var(--orange)", opacity: 0.6 }}
        />
      </div> */}

      <div className="relative z-10 px-0 py-10 md:py-14 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
        {/* Left: Number + category */}
        <div className="flex-shrink-0 md:w-52 ml-4">
          <div className="flex items-center gap-3 mb-2">
            <span
              className="font-mono-label transition-colors duration-300"
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: hovered ? "var(--orange)" : "rgba(255,255,255,0.2)",
              }}
            >
              {project.number}
            </span>
            <div
              className="h-[1px] transition-all duration-500"
              style={{
                background: hovered
                  ? "var(--orange)"
                  : "rgba(255,255,255,0.08)",
                width: hovered ? "52px" : "24px",
              }}
            />
          </div>
          <span
            className="font-mono-label block transition-colors duration-300"
            style={{
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              color: hovered
                ? "rgba(255,107,53,0.7)"
                : "rgba(255,255,255,0.22)",
            }}
          >
            {project.category}
          </span>
          <span
            className="font-mono-label block mt-1"
            style={{
              fontSize: "10px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.18)",
            }}
          >
            {project.year}
          </span>
        </div>

        {/* Center: Title + desc + tags */}
        <div className="flex-1 min-w-0">
          <h3
            className="font-display mb-3"
            style={{
              fontSize: "clamp(1.7rem, 4vw, 4rem)",
              lineHeight: "0.9",
              color: hovered ? "#ffffff" : "rgba(255,255,255,0.80)",
              transform: hovered ? "translateX(10px)" : "translateX(0)",
              transition:
                "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), color 0.3s",
              fontStyle: "italic",
            }}
          >
            {project.title}
          </h3>

          <AnimatePresence>
            {hovered && (
              <motion.p
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: "14px" }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  fontSize: "0.84rem",
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.52)",
                  fontWeight: 400,
                  maxWidth: "520px",
                }}
              >
                {project.description}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-2">
            {project.tags.map((tag, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div
                  className="w-1 h-1 rounded-full transition-colors duration-300"
                  style={{
                    background: hovered
                      ? "var(--orange)"
                      : "rgba(255,255,255,0.2)",
                  }}
                />
                <span
                  className="font-mono-label transition-colors duration-300"
                  style={{
                    fontSize: "10px",
                    fontWeight: 500,
                    color: hovered
                      ? "rgba(255,255,255,0.55)"
                      : "rgba(255,255,255,0.3)",
                  }}
                >
                  {tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: ghost number + CTA */}
        <div
          className="relative flex-shrink-0 flex items-center justify-end"
          style={{ width: "160px" }}
        >
          <span
            className="absolute right-0 font-display pointer-events-none select-none transition-all duration-500"
            style={{
              fontSize: "clamp(5rem, 10vw, 8rem)",
              color: hovered
                ? "rgba(255,107,53,0.1)"
                : "rgba(255,255,255,0.045)",
              lineHeight: 1,
              transform: hovered ? "scale(1.1) translateX(-4px)" : "scale(1)",
            }}
          >
            {project.number}
          </span>
          <AnimatePresence>
            <Magnetic>
              {hovered && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: -15 }}
                  transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
                  className="relative z-50 flex flex lg:flex-col items-center gap-1.5 p-4 rounded-full mr-9"
                  style={{
                    background: "rgba(255,107,53,0.1)",
                    border: "1px solid rgba(255,107,53,0.4)",
                    backdropFilter: "blur(10px)",
                  }}
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{
                    scale: 1.1,
                    background: "rgba(255,107,53,0.2)",
                  }}
                >
                  <span
                    className="font-mono-label z-50"
                    style={{
                      fontSize: "8px",
                      fontWeight: 600,
                      color: "var(--orange)",
                    }}
                  >
                    OPEN
                  </span>
                  <ArrowUpRight size={14} style={{ color: "var(--orange)" }} />
                </motion.a>
              )}
            </Magnetic>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!titleRef.current) return;
    const chars = titleRef.current.querySelectorAll(".char");
    gsap.fromTo(
      chars,
      { opacity: 0, y: 70, rotateX: -50, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.04,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      },
    );
  }, []);

  return (
    <section
      id="project"
      ref={sectionRef}
      className="relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-0 w-[55vw] h-[65vh] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at bottom left, rgba(255,107,53,0.055) 0%, transparent 65%)",
        }}
      />

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono-label block mb-6"
          style={{
            color: "var(--orange)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.2em",
          }}
        >
          04 / SELECTED WORKS
        </motion.span>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2
            ref={titleRef}
            className="font-display overflow-hidden"
            style={{
              fontSize: "clamp(3rem, 8vw, 7.5rem)",
              lineHeight: "0.88",
              perspective: "800px",
            }}
          >
            {"SELECTED".split("").map((c, i) => (
              <span
                key={i}
                className="char inline-block text-white"
                style={{ opacity: 0 }}
              >
                {c === " " ? "\u00A0" : c}
              </span>
            ))}
            <br />
            {["W", "O", "R", "K", "S"].map((c, i) => (
              <span
                key={i}
                className="char inline-block"
                style={{
                  opacity: 0,
                  WebkitTextStroke: "1px var(--orange)",
                  color: "transparent",
                }}
              >
                {c}
              </span>
            ))}
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-12 pb-2"
          >
            <div>
              <div
                className="font-mono-label"
                style={{
                  fontSize: "10px",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.38)",
                  letterSpacing: "0.2em",
                }}
              >
                TOTAL PROJECTS
              </div>
              <div className="font-display text-2xl md:text-3xl text-white mt-1">
                0{projects.length}
              </div>
            </div>
            <div>
              <div
                className="font-mono-label"
                style={{
                  fontSize: "10px",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.38)",
                  letterSpacing: "0.2em",
                }}
              >
                LATEST
              </div>
              <div className="font-display text-2xl md:text-3xl text-white mt-1">
                2025
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Project list */}
      <div
        className="max-w-7xl mx-auto border-t"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        {projects.map((project, i) => (
          <ProjectRow key={project.number} project={project} index={i} />
        ))}
      </div>

      {/* Archive ghost text */}
      <div className="w-full flex justify-center pt-20 overflow-hidden opacity-[0.022] pointer-events-none select-none">
        <span
          className="font-display whitespace-nowrap"
          style={{
            fontSize: "16vw",
            WebkitTextStroke: "1px rgba(255,255,255,0.2)",
            color: "transparent",
          }}
        >
          ARCHIVE ARCHIVE
        </span>
      </div>

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-0 w-full h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,107,53,0.25), transparent)",
        }}
      />
    </section>
  );
}
