"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link as ScrollLink } from "react-scroll";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MapPin, Zap, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import FuzzyText from "../FuzzyText/FuzzyText";
gsap.registerPlugin(ScrollTrigger);

const DotGrid = dynamic(() => import("../Ogl_animated/Ogl_animated"), {
  ssr: false,
});

const MARQUEE_ITEMS = [
  "FULLSTACK DEVELOPER",
  "REACT",
  "NEXT.JS",
  "NODE.JS",
  "MONGODB",
  "EXPRESS",
  "UI/UX",
];

const socials = [
  {
    icon: <FaGithub />,
    href: "https://github.com/Muneeb-U-Rehman-Chaudary",
    label: "GitHub",
  },
  {
    icon: <FaLinkedin />,
    href: "https://www.linkedin.com/in/muneeb-u-rehman-a0151a31a",
    label: "LinkedIn",
  },
  {
    icon: <FaInstagram />,
    href: "https://www.instagram.com/muneeb_u_rehman329/",
    label: "Instagram",
  },
];

const techSpecs = [
  { label: "React / Next.js", value: "95%", width: "95%" },
  { label: "Node / Express", value: "90%", width: "90%" },
  { label: "MongoDB / DB", value: "85%", width: "85%" },
];

// Magnetic wrapper
function Magnetic({ children, strength = 0.35 }) {
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
      duration: 0.35,
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

// Animated counter
function Counter({ target, suffix = "", delay = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          let start = 0;
          const end = parseInt(target);
          const duration = 1800;
          const step = duration / end;
          setTimeout(() => {
            const timer = setInterval(() => {
              start += 1;
              setCount(start);
              if (start >= end) clearInterval(timer);
            }, step);
          }, delay);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, delay]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function HeroSection() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const nameRef = useRef(null);
  const subRef = useRef(null);
  const descRef = useRef(null);
  const socialRef = useRef(null);
  const ctaRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const lineRef = useRef(null);
  const badgeRef = useRef(null);
  const nameCharsRef = useRef([]);
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 3.5 });

    // Badge slide in
    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: -20, scale: 0.85 },
      { opacity: 1, y: 0, scale: 1, duration: 0.78, ease: "back.out(1.8)" },
    );

    // "Hi, I'm" word
    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 60, skewY: 5 },
      { opacity: 1, y: 0, skewY: 0, duration: 0.97, ease: "power4.out" },
      "-=0.15",
    );

    // Name chars stagger — character-by-character reveal
    if (nameCharsRef.current.length) {
      tl.fromTo(
        nameCharsRef.current.filter(Boolean),
        { opacity: 0, y: 80, rotateX: -60, filter: "blur(12px)" },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 0.97,
          stagger: 0.048,
          ease: "power4.out",
        },
        "-=0.55",
      );
    }

    // Sub heading
    tl.fromTo(
      subRef.current,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.82, ease: "power3.out" },
      "-=0.45",
    );

    // Line draw
    if (lineRef.current) {
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.82,
          ease: "power2.out",
          transformOrigin: "left",
        },
        "-=0.35",
      );
    }

    // Description
    tl.fromTo(
      descRef.current,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.78, ease: "power3.out" },
      "-=0.4",
    );

    // Socials
    tl.fromTo(
      socialRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.78, ease: "power3.out" },
      "-=0.3",
    );

    // CTAs
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.58, ease: "power3.out" },
      "-=0.3",
    );

    // Side cards with stagger
    if (leftCardRef.current) {
      tl.fromTo(
        leftCardRef.current,
        { opacity: 0, x: -60, filter: "blur(6px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.92,
          ease: "power3.out",
        },
        "-=0.85",
      );
    }
    if (rightCardRef.current) {
      tl.fromTo(
        rightCardRef.current,
        { opacity: 0, x: 60, filter: "blur(6px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.92,
          ease: "power3.out",
        },
        "-=0.9",
      );
    }

    // Parallax on scroll
    if (containerRef.current) {
      gsap.to(containerRef.current.querySelector(".hero-parallax"), {
        y: -300,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Grid overlay */}
      {/* <div className="absolute inset-0 bg-grid-dark opacity-100 pointer-events-none z-0" /> */}

      {/* Background radial glow */}
      <div
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[70vh] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,107,53,0.08) 0%, transparent 65%)",
        }}
      />

      {/* Secondary glow bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-[40vw] h-[50vh] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at bottom right, rgba(255,107,53,0.04) 0%, transparent 65%)",
        }}
      />

      {/* DotGrid — far right */}
      {/* <div className="absolute right-0 top-0 w-full h-full z-0 opacity-25 pointer-events-none hidden lg:block">
        <DotGrid
          dotSize={5}
          gap={30}
          baseColor="#303030"
          activeColor="#fa591e"
          proximity={160}
          shockRadius={200}
          shockStrength={15}
          resistance={900}
          returnDuration={1.2}
        />
      </div> */}

      {/* Scrolling marquee background text */}
      <div className="absolute top-[10%] left-0 w-full overflow-hidden whitespace-nowrap pointer-events-none z-0 select-none opacity-[0.03]">
        <div
          className="flex gap-16 animate-marquee"
          style={{ width: "max-content" }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="font-display text-[13vw] text-white">
              {item} •{" "}
            </span>
          ))}
        </div>
      </div>

      {/* Second marquee — reverse, bottom */}
      <div className="absolute bottom-[12%] left-0 w-full overflow-hidden whitespace-nowrap pointer-events-none z-0 select-none opacity-[0.03]">
        <div
          className="flex gap-16 animate-marquee-reverse"
          style={{ width: "max-content" }}
        >
          {[...MARQUEE_ITEMS.reverse(), ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="font-display text-[8vw] text-white">
              {item} /{" "}
            </span>
          ))}
        </div>
      </div>

      {/* Main content - Split Layout */}
      <div className="hero-parallax relative z-10 w-full h-full pt-24 pb-16 flex items-center">
        <div className="w-full max-w-[95rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-end">
            {/* Left Content */}
            <div className="flex flex-col justify-center lg:col-span-6 xl:col-span-5">
              {/* "Hi, I'm" */}
              <div ref={headingRef} className="opacity-0 mb-2">
                <h1
                  className="font-display text-white leading-[0.85]"
                  style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)" }}
                >
                  Hi, I'm
                </h1>
              </div>

              {/* Name — char by char */}
              <div
                ref={nameRef}
                className="mb-6"
                style={{ perspective: "800px" }}
              >
                <h1
                  className="font-display leading-[0.85]"
                  style={{
                    fontSize: "clamp(3rem, 8vw, 7.5rem)",
                    color: "var(--orange)",
                    textShadow: "0 0 80px rgba(255,107,53,0.2)",
                  }}
                >
                  {"MUNEEB".split("").map((c, i) => (
                    <span
                      key={i}
                      ref={(el) => (nameCharsRef.current[i] = el)}
                      className="inline-block"
                      style={{ opacity: 0, transformStyle: "preserve-3d" }}
                    >
                      {c}
                    </span>
                  ))}
                  <span
                    ref={(el) => (nameCharsRef.current[6] = el)}
                    className="inline-block text-white"
                    style={{ opacity: 0 }}
                  >
                    .
                  </span>
                </h1>
              </div>

              {/* Decorative line */}
              <div
                ref={lineRef}
                className="w-20 h-[2px] mb-6 origin-left"
                style={{
                  background:
                    "linear-gradient(90deg, var(--orange), rgba(255,107,53,0.08))",
                  transform: "scaleX(0)",
                }}
              />

              {/* Sub heading */}
              <div
                ref={subRef}
                className="opacity-0 flex flex-wrap lg:flex-nowrap gap-3 items-baseline mb-8"
              >
                <span
                  className="font-display flex gap-5 items-end"
                  style={{
                    fontSize: "clamp(1.2rem, 3vw, 3.2rem)",
                    color: "var(--orange)",
                  }}
                >
                  FULLSTACK
                  <p
                    style={{
                      fontSize: "clamp(1rem, 2.7vw, 2.7rem)",
                    }}
                    className="text-white"
                  >
                    Developer
                  </p>
                </span>
              </div>

              {/* Description */}
              <p
                ref={descRef}
                className="opacity-0 max-w-[540px] leading-relaxed mb-10"
                style={{
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.6)",
                  fontWeight: 400,
                  lineHeight: 1.9,
                }}
              >
                Building modern, scalable, high-performance web applications.
                Specializing in{" "}
                <span
                  style={{ color: "rgba(255,107,53,0.9)", fontWeight: 600 }}
                >
                  React, Next.js, Node.js
                </span>{" "}
                and{" "}
                <span
                  style={{ color: "rgba(255,107,53,0.9)", fontWeight: 600 }}
                >
                  Express
                </span>{" "}
                — crafting seamless digital experiences.
              </p>

              {/* Socials */}
              <div
                ref={socialRef}
                className="opacity-0 flex items-center gap-4 mb-10"
              >
                {socials.map(({ icon, href, label }) => (
                  <Magnetic key={label} strength={0.4}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex items-center justify-center w-14 h-14 rounded-full border transition-all duration-300"
                      style={{
                        borderColor: "rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.45)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--orange)";
                        e.currentTarget.style.color = "var(--orange)";
                        e.currentTarget.style.boxShadow =
                          "0 0 22px rgba(255,107,53,0.3)";
                        e.currentTarget.style.background =
                          "rgba(255,107,53,0.07)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.1)";
                        e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <span className="text-3xl">{icon}</span>
                    </a>
                  </Magnetic>
                ))}
                <div
                  className="h-[1px] w-8"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                />
                <span
                  className="font-mono-label"
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.25)",
                  }}
                >
                  CONNECT
                </span>
              </div>

              {/* CTA buttons */}
              <div ref={ctaRef} className="opacity-0 flex flex-wrap gap-4">
                <ScrollLink to="project" smooth duration={500} offset={-80}>
                  <Magnetic>
                    <button
                      className="relative px-7 py-3 font-display overflow-hidden group transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_45px_rgba(255,107,53,0.4)]"
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.16em",
                        background: "var(--orange)",
                        color: "#080808",
                        borderRadius: "5px",
                        boxShadow: "0 0 28px rgba(255,107,53,0.25)",
                      }}
                    >
                      VIEW PROJECTS ↗
                    </button>
                  </Magnetic>
                </ScrollLink>
                <ScrollLink to="contact" smooth duration={500} offset={-80}>
                  <Magnetic>
                    <button
                      className="relative px-7 py-3 font-display overflow-hidden group transition-all duration-300 hover:scale-[1.04]"
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.16em",
                        border: "1px solid rgba(255,107,53,0.35)",
                        color: "var(--orange)",
                        borderRadius: "5px",
                        background: "transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255,107,53,0.08)";
                        e.currentTarget.style.borderColor = "var(--orange)";
                        e.currentTarget.style.boxShadow =
                          "0 0 30px rgba(255,107,53,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderColor =
                          "rgba(255,107,53,0.35)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      BE IN TOUCH
                    </button>
                  </Magnetic>
                </ScrollLink>
              </div>
            </div>

            {/* Center Image Side */}
            <div className="hidden lg:flex items-end justify-center lg:col-span-6 xl:col-span-4">
              <div
                ref={leftCardRef}
                className="relative opacity-0 w-full max-w-[460px] mx-auto lg:mx-0"
                style={{
                  aspectRatio: "4/5",
                }}
              >
                <div
                  className="absolute inset-x-8 bottom-6 h-12 rounded-full"
                  style={{
                    background: "rgba(255,107,53,0.48)",
                    filter: "blur(25px)",
                  }}
                />

                <div
                  className="absolute inset-0 rounded-[2rem]"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 100%)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                />

                <div className="relative z-10 w-full h-full overflow-hidden rounded-[2rem] flex items-end justify-center">
                  <img
                    src="/Images/my_image1.jpeg"
                    alt="Muneeb - Full Stack Developer"
                    className="w-full h-full object-cover object-top rounded-[2rem] transition-transform duration-300 hover:scale-[1.02]"
                    style={{
                      filter:
                        "drop-shadow(0 26px 35px rgba(0,0,0,0.9)) brightness(1.05) contrast(1.05)",
                    }}
                  />

                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,107,53,0.08) 0%, transparent 35%, rgba(0,0,0,0.22) 100%)",
                    }}
                  />
                </div>

                <div
                  className="absolute left-1 top-1/3 w-1 h-28 rounded-full"
                  style={{
                    background:
                      "linear-gradient(180deg, var(--orange), rgba(255,107,53,0))",
                    boxShadow: "0 0 30px rgba(255,107,53,0.4)",
                  }}
                />

                <div
                  className="absolute -bottom-4 right-4 w-20 h-20 rounded-full opacity-40"
                  style={{
                    background:
                      "radial-gradient(circle, var(--orange), transparent)",
                    filter: "blur(30px)",
                  }}
                />
              </div>
            </div>

            {/* Right Info Side */}
            <div className="hidden lg:block lg:col-span-12 xl:col-span-3">
              <div
                ref={rightCardRef}
                className="flex flex-col gap-5 z-20 opacity-0 w-full max-w-[280px] xl:ml-auto"
              >
                <div className="cyber-card rounded-xl p-5 relative overflow-hidden">
                  <div className="scan-line" />
                  <div className="flex justify-between items-start mb-5">
                    <span
                      className="font-mono-label"
                      style={{
                        fontSize: "10px",
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.35)",
                      }}
                    >
                      TECH
                    </span>
                    <Zap size={12} style={{ color: "var(--orange)" }} />
                  </div>
                  <div className="space-y-4">
                    {techSpecs.map((s, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-1.5">
                          <span
                            className="font-mono-label"
                            style={{
                              fontSize: "10px",
                              fontWeight: 500,
                              color: "rgba(255,255,255,0.6)",
                            }}
                          >
                            {s.label}
                          </span>
                          <span
                            className="font-mono-label"
                            style={{
                              fontSize: "10px",
                              fontWeight: 600,
                              color: "var(--orange)",
                            }}
                          >
                            {s.value}
                          </span>
                        </div>
                        <div
                          className="w-full h-[2px] rounded-full"
                          style={{ background: "rgba(255,255,255,0.05)" }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: s.width }}
                            transition={{
                              duration: 1.6,
                              delay: 4.2 + i * 0.25,
                              ease: "easeOut",
                            }}
                            className="h-full rounded-full"
                            style={{
                              background: "var(--orange)",
                              boxShadow: "0 0 8px var(--orange)",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { num: "3", suffix: "+", label: "YEARS" },
                    { num: "10", suffix: "+", label: "PROJECTS" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="cyber-card rounded-xl p-3 text-center"
                    >
                      <div className="font-display text-xl text-white">
                        <Counter
                          target={stat.num}
                          suffix={stat.suffix}
                          delay={4600 + i * 200}
                        />
                      </div>
                      <div
                        className="font-mono-label mt-0.5"
                        style={{
                          fontSize: "9px",
                          fontWeight: 500,
                          color: "rgba(255,255,255,0.3)",
                        }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA card */}
                <ScrollLink to="contact" smooth duration={500} offset={-80}>
                  <Magnetic>
                    <div
                      className="rounded-xl p-4 flex items-center justify-center gap-2 cursor-pointer group transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_40px_rgba(255,107,53,0.3)]"
                      style={{
                        background: "var(--orange)",
                        boxShadow: "0 0 35px rgba(255,107,53,0.22)",
                      }}
                    >
                      <span className="font-display text-[11px] text-[#080808] tracking-widest">
                        LET'S WORK
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="text-[#080808] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </div>
                  </Magnetic>
                </ScrollLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scan line decoration */}
      <div
        className="absolute bottom-0 left-0 w-full h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,107,53,0.3), transparent)",
        }}
      />

      {/* Floating corner telemetry */}
    
    </section>
  );
}
