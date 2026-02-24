'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNode, FaGithub, FaGit,
} from 'react-icons/fa';
import {
  SiNextdotjs, SiMongodb, SiExpress, SiTailwindcss, SiRedux, SiChakraui,
} from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  { id: 'SYS.01', name: 'HTML5', subtitle: 'Semantic Markup', icon: FaHtml5, iconColor: '#e44d26' },
  { id: 'SYS.02', name: 'CSS3', subtitle: 'Advanced Styling', icon: FaCss3Alt, iconColor: '#264de4' },
  { id: 'SYS.03', name: 'Tailwind', subtitle: 'Utility-First UI', icon: SiTailwindcss, iconColor: '#38bdf8' },
  { id: 'SYS.04', name: 'JavaScript', subtitle: 'ES6+ Mastery', icon: FaJs, iconColor: '#f7df1e' },
  { id: 'SYS.05', name: 'React.js', subtitle: 'Component Architecture', icon: FaReact, iconColor: '#61dafb' },
  { id: 'SYS.06', name: 'Next.js', subtitle: 'SSR & Server Actions', icon: SiNextdotjs, iconColor: '#ffffff' },
  { id: 'SYS.07', name: 'Chakra UI', subtitle: 'Design Systems', icon: SiChakraui, iconColor: '#319795' },
  { id: 'SYS.08', name: 'Redux', subtitle: 'State Management', icon: SiRedux, iconColor: '#764abc' },
  { id: 'SYS.09', name: 'Git', subtitle: 'Version Control', icon: FaGit, iconColor: '#f05032' },
  { id: 'SYS.10', name: 'GitHub', subtitle: 'Collaboration', icon: FaGithub, iconColor: '#ffffff' },
  { id: 'SYS.11', name: 'Node.js', subtitle: 'Scalable Runtimes', icon: FaNode, iconColor: '#68a063' },
  { id: 'SYS.12', name: 'Express.js', subtitle: 'REST API Design', icon: SiExpress, iconColor: '#ffffff' },
  { id: 'SYS.13', name: 'MongoDB', subtitle: 'NoSQL Databases', icon: SiMongodb, iconColor: '#47a248' },
];

function TechCard({ tech, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative overflow-hidden cursor-crosshair"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '4px',
        padding: '1.5rem',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(255,107,53,0.35)';
        e.currentTarget.style.boxShadow = '0 0 30px rgba(255,107,53,0.06), inset 0 0 20px rgba(255,107,53,0.02)';
        e.currentTarget.style.background = 'rgba(255,107,53,0.025)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.background = 'var(--bg-card)';
      }}
    >
      {/* Grid pattern on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,107,53,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,53,0.025) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      />

      {/* Scan line */}
      <div className="absolute top-0 left-0 w-full scan-line group-hover:opacity-50" />

      <div className="relative z-10 flex flex-col h-full justify-between gap-4">
        {/* Top row */}
        <div className="flex justify-between items-start">
          <div
            className="p-2.5 rounded-sm transition-all duration-300 group-hover:bg-white/[0.06]"
            style={{ background: 'rgba(255,255,255,0.035)' }}
          >
            <tech.icon
              size={20}
              className="transition-all duration-300 group-hover:scale-110"
              style={{ color: 'rgba(255,255,255,0.28)' }}
            />
          </div>
          <span
            className="font-mono-label group-hover:text-orange-400/60 transition-colors"
            style={{ fontSize: '9px', fontWeight: 500, color: 'rgba(255,255,255,0.18)' }}
          >
            {tech.id}
          </span>
        </div>

        {/* Content */}
        <div>
          <h3
            className="font-display text-white mb-1.5"
            style={{ fontSize: '1.05rem', letterSpacing: '-0.02em' }}
          >
            {tech.name}
          </h3>
          <p
            className="font-mono-label mb-4"
            style={{ fontSize: '9px', fontWeight: 500, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.16em' }}
          >
            {tech.subtitle}
          </p>

          {/* Progress bar */}
          <div className="flex items-center gap-3">
            <div
              className="flex-1 h-[2px] rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <div
                className="h-full rounded-full origin-left scale-x-[0.75] group-hover:scale-x-100 transition-transform duration-700"
                style={{
                  background: 'linear-gradient(90deg, var(--orange), rgba(255,107,53,0.4))',
                  boxShadow: '0 0 8px rgba(255,107,53,0.25)',
                }}
              />
            </div>
            <span
              className="font-mono-label"
              style={{ fontSize: '8px', fontWeight: 500, color: 'rgba(255,255,255,0.18)' }}
            >
              ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* Corner accent */}
      <div
        className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: 'var(--orange)', boxShadow: '0 0 6px var(--orange)' }}
      />
    </motion.div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!headingRef.current) return;
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 50, skewY: 2 },
      {
        opacity: 1,
        y: 0,
        skewY: 0,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 w-full h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,53,0.18), transparent)' }}
      />

      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,107,53,0.035) 0%, transparent 65%)' }}
      />

      {/* Section header */}
      <div className="text-center mb-16 relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono-label block mb-4"
          style={{ fontSize: '10px', fontWeight: 500, color: 'var(--orange)', letterSpacing: '0.2em' }}
        >
          02 / SYSTEM ARCHITECTURE
        </motion.span>

        <h2
          ref={headingRef}
          className="font-display text-white mb-4"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', opacity: 0 }}
        >
          TECH{' '}
          <span
            style={{
              WebkitTextStroke: '1px var(--orange)',
              color: 'transparent',
            }}
          >
            MATRIX
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{
            fontSize: '0.88rem',
            color: 'rgba(255,255,255,0.38)',
            fontWeight: 400,
            maxWidth: '40rem',
            margin: '0 auto',
            lineHeight: 1.75,
          }}
        >
          A curated arsenal of technologies, optimised for scalability, speed, and clean architecture.
          <span
            className="block mt-3 font-mono-label"
            style={{ fontSize: '9px', fontWeight: 500, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.28em' }}
          >
            // HOVER MODULES TO INSPECT
          </span>
        </motion.p>
      </div>

      {/* Matrix grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-w-6xl mx-auto relative z-10">
        {techStack.map((tech, i) => (
          <TechCard key={tech.id} tech={tech} index={i} />
        ))}
      </div>

      {/* Bottom telemetry */}
      <div
        className="flex justify-between mt-14 px-2 font-mono-label"
        style={{ fontSize: '9px', fontWeight: 500, color: 'rgba(255,255,255,0.15)', letterSpacing: '0.16em' }}
      >
        <span>&gt; TECH_MATRIX_LOADED</span>
        <span>MODULES: {techStack.length} / ONLINE</span>
      </div>

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-0 w-full h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,53,0.18), transparent)' }}
      />
    </section>
  );
}
