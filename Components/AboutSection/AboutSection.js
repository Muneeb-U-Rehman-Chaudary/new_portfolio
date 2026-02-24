'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Coffee, BookOpen, Rocket, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const journeyData = [
  {
    year: '2021',
    phase: 'PHASE 01',
    title: 'THE BEGINNING',
    description:
      'Started the coding journey with HTML, CSS and JavaScript. Built my first static websites and fell in love with creating things on the internet.',
    icon: Coffee,
  },
  {
    year: '2022',
    phase: 'PHASE 02',
    title: 'GOING DEEPER',
    description:
      'Dived into React.js and Node.js. Started building full-stack apps, mastered REST APIs, and began working with MongoDB databases.',
    icon: BookOpen,
  },
  {
    year: '2023',
    phase: 'PHASE 03',
    title: 'REAL PROJECTS',
    description:
      'Completed a 3-month internship at Crickslab. Built production-ready applications with Next.js, contributed to real cricket analytics platforms.',
    icon: Rocket,
  },
  {
    year: '2024',
    phase: 'PHASE 04',
    title: 'LEVELING UP',
    description:
      'Enrolled in Software Engineering at Superior University. Building scalable fullstack applications with modern architecture patterns, ready for the next challenge.',
    icon: Award,
  },
];

function JourneyCard({ phase, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative border-l-2 pl-8 pb-12 last:pb-0 group"
      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
    >
      {/* Timeline dot */}
      <div
        className="absolute -left-[11px] top-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_16px_rgba(255,107,53,0.4)]"
        style={{
          background: 'var(--bg-primary)',
          borderColor: 'var(--orange)',
          boxShadow: '0 0 12px rgba(255,107,53,0.25)',
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--orange)' }} />
      </div>

      {/* Phase label */}
      <span
        className="font-mono-label block mb-2"
        style={{ fontSize: '9px', fontWeight: 500, color: 'rgba(255,107,53,0.65)', letterSpacing: '0.2em' }}
      >
        {phase.phase} — {phase.year}
      </span>

      {/* Icon */}
      <div
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg mb-3"
        style={{ background: 'rgba(255,107,53,0.09)', border: '1px solid rgba(255,107,53,0.18)' }}
      >
        <phase.icon size={16} style={{ color: 'var(--orange)' }} />
      </div>

      {/* Title */}
      <h3
        className="font-display mb-2"
        style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.7rem)', color: 'rgba(255,255,255,0.9)' }}
      >
        {phase.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: '0.85rem',
          lineHeight: 1.75,
          color: 'rgba(255,255,255,0.45)',
          fontWeight: 400,
        }}
      >
        {phase.description}
      </p>
    </motion.div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  useEffect(() => {
    // Title char-by-char GSAP reveal
    if (!titleRef.current) return;
    const chars = titleRef.current.querySelectorAll('.char');
    gsap.fromTo(
      chars,
      { opacity: 0, y: 40, rotateX: -30 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.7,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      }
    );

    // Image parallax
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-[50vw] h-[70vh] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(255,107,53,0.05) 0%, transparent 65%)',
        }}
      />

      {/* Ghost year watermark */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display pointer-events-none select-none leading-none hidden xl:block"
        style={{ fontSize: '20vw', color: 'rgba(255,255,255,0.012)' }}
      >
        2025
      </div>

      {/* Section label */}
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="font-mono-label block mb-6"
        style={{ fontSize: '10px', fontWeight: 500, color: 'var(--orange)', letterSpacing: '0.2em' }}
      >
        03 / THE PROFILE
      </motion.span>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-28 max-w-7xl mx-auto">

        {/* Left: Image + intro */}
        <div>
          {/* Title with char animation */}
          <h2
            ref={titleRef}
            className="font-display mb-8 overflow-hidden"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 6rem)', lineHeight: '0.88', perspective: '600px' }}
          >
            {'ABOUT'.split('').map((c, i) => (
              <span key={i} className="char inline-block text-white" style={{ opacity: 0 }}>{c}</span>
            ))}
            <br />
            {['M', 'E', '.'].map((c, i) => (
              <span
                key={i}
                className="char inline-block"
                style={{
                  opacity: 0,
                  WebkitTextStroke: '1px var(--orange)',
                  color: 'transparent',
                }}
              >{c}</span>
            ))}
          </h2>

          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.2 }}
            className="relative mb-8 overflow-hidden"
            style={{
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.07)',
              maxWidth: '450px',
            }}
          >
            <div ref={imageRef} className="relative aspect-square group">
              <img
                src="/Images/my_image1.jpeg"
                alt="Muneeb U Rehman — Fullstack Developer"
                className="w-full h-full object-cover object-top grayscale transition-all duration-700 group-hover:grayscale-0"
                style={{ display: 'block' }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'rgba(255,107,53,0.04)' }}
              />
              <div className="scan-line group-hover:opacity-50" />
            </div>

            <div
              className="px-4 py-3 flex justify-between"
              style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span className="font-mono-label" style={{ fontSize: '9px', fontWeight: 500, color: 'var(--orange)' }}>MUNEEB U REHMAN</span>
              <span className="font-mono-label" style={{ fontSize: '9px', fontWeight: 400, color: 'rgba(255,255,255,0.3)' }}>LAHORE, PK</span>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              fontSize: '0.88rem',
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.45)',
              fontWeight: 400,
              maxWidth: '460px',
              marginBottom: '1.5rem',
            }}
          >
            I am a Software Engineering student at Superior University with strong
            expertise in{' '}
            <span style={{ color: 'rgba(255,107,53,0.9)', fontWeight: 500 }}>HTML, CSS, JavaScript, React, Next.js, Node.js, Express</span>{' '}
            and <span style={{ color: 'rgba(255,107,53,0.9)', fontWeight: 500 }}>MongoDB</span>. I completed a 3-month internship at{' '}
            <span style={{ color: 'rgba(255,107,53,0.9)', fontWeight: 500 }}>Crickslab</span>, contributing to real-world production projects.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-3 gap-3"
          >
            {[
              { num: '3+', label: 'YEARS EXP' },
              { num: '10+', label: 'PROJECTS' },
              { num: '1', label: 'INTERNSHIP' },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-4 text-center group transition-all duration-300 hover:border-orange-500/30"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '6px',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,107,53,0.25)';
                  e.currentTarget.style.background = 'rgba(255,107,53,0.04)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.background = 'var(--bg-card)';
                }}
              >
                <div className="font-display text-2xl md:text-3xl mb-1" style={{ color: 'var(--orange)' }}>
                  {stat.num}
                </div>
                <div
                  className="font-mono-label"
                  style={{ fontSize: '8px', fontWeight: 500, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Journey timeline */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-white mb-10"
            style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)' }}
          >
            THE JOURNEY
            <div
              className="mt-2 h-[2px] w-14"
              style={{ background: 'linear-gradient(90deg, var(--orange), transparent)' }}
            />
          </motion.h3>

          <div className="space-y-0">
            {journeyData.map((phase, i) => (
              <JourneyCard key={phase.year} phase={phase} index={i} />
            ))}
          </div>

          {/* Education callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-10 p-5 relative overflow-hidden"
            style={{
              background: 'rgba(255,107,53,0.04)',
              border: '1px solid rgba(255,107,53,0.18)',
              borderRadius: '8px',
            }}
          >
            <div className="scan-line opacity-20" />
            <span
              className="font-mono-label block mb-2"
              style={{ fontSize: '9px', fontWeight: 500, color: 'var(--orange)' }}
            >
              CURRENTLY ENROLLED
            </span>
            <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
              B.S. Software Engineering
            </p>
            <p style={{ fontSize: '0.8rem', marginTop: '4px', color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>
              Superior University — 2024 to 2028
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-0 w-full h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,53,0.18), transparent)' }}
      />
    </section>
  );
}
