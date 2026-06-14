'use client';

import { useState, useEffect, useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';

const links = [
  { name: 'Home', href: 'home' },
  { name: 'About', href: 'about' },
  { name: 'Projects', href: 'project' },
  { name: 'Contact', href: 'contact' },
];

function MagneticLink({ children, className, style, ...props }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  };

  return (
    <span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ display: 'inline-block', ...style }}
    >
      {children}
    </span>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const logoRef = useRef(null);
  const navItemsRef = useRef([]);
  const rightRef = useRef(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 3.4 });

    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: -20, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
    );

    if (navItemsRef.current.length) {
      tl.fromTo(
        navItemsRef.current.filter(Boolean),
        { opacity: 0, y: -14 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
        '-=0.4'
      );
    }

    if (rightRef.current) {
      tl.fromTo(
        rightRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );
    }
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#080808]/96 backdrop-blur-2xl border-b border-[#1a1a1a]'
            : 'bg-transparent'
        }`}
      >
        {/* Top edge accent */}
        {scrolled && (
          <div
            className="absolute top-0 left-0 w-full h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,53,0.4), transparent)' }}
          />
        )}

        <div className="w-full px-6 md:px-10 lg:px-16 py-4 flex items-center justify-between">
          {/* Logo */}
          <div ref={logoRef} className="opacity-0">
            <MagneticLink>
              <Link href="/">
                <Image src={"/Images/logo.png"} width={50} height={50} alt="Logo" />
              </Link>
            </MagneticLink>
          </div>

          {/* Desktop: Nav Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {links.map((link, i) => (
              <div
                key={link.name}
                ref={el => (navItemsRef.current[i] = el)}
                className="opacity-0"
              >
                <ScrollLink
                  to={link.href}
                  smooth
                  duration={500}
                  offset={-80}
                  spy
                  activeClass="active-link"
                  className="relative font-mono-label cursor-pointer transition-colors duration-300 group"
                  style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.2em',
                    color: 'rgba(255,255,255,0.45)',
                  }}
                >
                  <span className="group-hover:text-white transition-colors duration-200">
                    {link.name.toUpperCase()}
                  </span>
                  <span
                    className="absolute -bottom-1 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-300"
                    style={{ background: 'linear-gradient(90deg, var(--orange), transparent)' }}
                  />
                </ScrollLink>
              </div>
            ))}
          </div>

          {/* Desktop Right: Clock + Resume */}
          <div ref={rightRef} className="hidden md:flex items-center gap-6 opacity-0">
            <div className="flex items-center gap-2">
             
            
            </div>

            <MagneticLink>
              <a
                href="/docs/Muneeb's_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-5 py-2.5 font-mono-label overflow-hidden group inline-block"
                style={{
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  border: '1px solid var(--orange)',
                  color: 'var(--orange)',
                }}
              >
                <span className="relative z-10 group-hover:text-[#080808] transition-colors duration-300">
                  RESUME ↗
                </span>
                <span
                  className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  style={{ background: 'var(--orange)' }}
                />
              </a>
            </MagneticLink>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-white/70 hover:text-white transition-colors"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-72 z-50 flex flex-col"
              style={{ background: '#0a0a0a', borderLeft: '1px solid #1e1e1e' }}
            >
              <div
                className="absolute top-0 left-0 w-full h-[1px]"
                style={{ background: 'linear-gradient(90deg, transparent, var(--orange), transparent)' }}
              />

              <div className="flex items-center justify-between p-6 border-b border-[#1e1e1e]">
                <span className="font-display text-lg text-white">M<span style={{ color: 'var(--orange)' }}>.</span>R<span style={{ color: 'var(--orange)' }}>.</span>C</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col p-6 gap-1">
                {links.map((link, i) => (
                  <ScrollLink
                    key={link.name}
                    to={link.href}
                    smooth
                    duration={400}
                    offset={-80}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-lg cursor-pointer group transition-all"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,53,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.9)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
                  >
                    <span
                      className="font-mono-label"
                      style={{ fontSize: '10px', color: 'var(--orange)', fontWeight: 500 }}
                    >
                      0{i + 1}
                    </span>
                    <span className="font-display text-base tracking-wider">{link.name}</span>
                  </ScrollLink>
                ))}
              </div>

              <div className="mt-auto p-6 border-t border-[#1e1e1e]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--orange)' }} />
                  <span className="font-mono-label" style={{ fontSize: '10px', fontWeight: 500 }}>PKT / {time}</span>
                </div>
                <a
                  href="/docs/Muneeb's_resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 font-mono-label"
                  style={{
                    fontSize: '10px',
                    fontWeight: 500,
                    background: 'var(--orange)',
                    color: '#080808',
                    borderRadius: '4px',
                  }}
                >
                  DOWNLOAD RESUME ↗
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
