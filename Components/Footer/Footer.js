'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', href: 'home' },
  { name: 'About', href: 'about' },
  { name: 'Projects', href: 'project' },
  { name: 'Contact', href: 'contact' },
];

const socialLinks = [
  { icon: <FaGithub size={15} />, href: 'https://github.com/Muneeb-U-Rehman-Chaudary', label: 'GitHub' },
  { icon: <FaLinkedin size={15} />, href: 'https://www.linkedin.com/in/muneeb-u-rehman-a0151a31a', label: 'LinkedIn' },
  { icon: <FaInstagram size={15} />, href: 'https://www.instagram.com/muneeb_u_rehman329/', label: 'Instagram' },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <footer
      ref={ref}
      className="relative py-10 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 w-full h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,53,0.25), transparent)' }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <span className="font-display text-xl text-white tracking-[0.1em]">
            M<span style={{ color: 'var(--orange)' }}>.</span>R
            <span style={{ color: 'var(--orange)' }}>.</span>C
          </span>

          {/* Nav links */}
          <div className="flex items-center gap-6 md:gap-10">
            {navLinks.map((link, i) => (
              <ScrollLink
                key={link.name}
                to={link.href}
                smooth
                duration={500}
                offset={-80}
                className="font-mono-label cursor-pointer transition-colors duration-200 hover:text-white"
                style={{
                  fontSize: '9px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.28)',
                  letterSpacing: '0.18em',
                }}
              >
                <span style={{ color: 'rgba(255,107,53,0.7)', marginRight: '4px' }}>0{i + 1}.</span>
                {link.name.toUpperCase()}
              </ScrollLink>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300"
                style={{
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: 'rgba(255,255,255,0.3)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,107,53,0.4)';
                  e.currentTarget.style.color = 'var(--orange)';
                  e.currentTarget.style.background = 'rgba(255,107,53,0.06)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.05)' }}
        >
          <span
            className="font-mono-label"
            style={{ fontSize: '9px', fontWeight: 400, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.16em' }}
          >
            DESIGNED & DEVELOPED IN NEXT.JS — GSAP + FRAMER MOTION
          </span>
          <span
            className="font-mono-label"
            style={{ fontSize: '9px', fontWeight: 400, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.16em' }}
          >
            © {new Date().getFullYear()} MUNEEB U REHMAN CHAUDHARY
          </span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--orange)' }} />
            <span
              className="font-mono-label"
              style={{ fontSize: '9px', fontWeight: 400, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.16em' }}
            >
              ALL SYSTEMS OPERATIONAL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
