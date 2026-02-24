'use client';

import { useEffect, useState } from 'react';
import { Press_Start_2P } from 'next/font/google';
import gsap from 'gsap';

const pressStart2P = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-press-start-2p',
});

export default function Preloader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // Fade in the logo
    tl.fromTo(
      '#preloader-logo',
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
    );

    // Animate the fill wave
    tl.to('#wave', {
      y: 250,
      scaleY: 7.5,
      transformOrigin: 'center bottom',
      duration: 3,
      ease: 'power2.inOut',
    }, 0.3);

    // Animate glitch lines
    tl.fromTo(
      '.glitch-line',
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, stagger: 0.15, duration: 0.3, ease: 'power2.out' },
      0.2
    );

    let count = 0;
    const interval = setInterval(() => {
      if (count >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          gsap.to('#preloader', {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => {
              const el = document.getElementById('preloader');
              if (el) el.style.display = 'none';
            },
          });
        }, 400);
      } else {
        count += 1;
        setProgress(count);
      }
    }, 28);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="preloader"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,107,53,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,53,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glitch lines */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="glitch-line absolute left-0 h-[1px] w-full pointer-events-none"
          style={{
            top: `${25 + i * 25}%`,
            background: `linear-gradient(90deg, transparent, rgba(255,107,53,${0.15 - i * 0.04}), transparent)`,
            opacity: 0,
            transformOrigin: 'left center',
          }}
        />
      ))}

      {/* Logo SVG */}
      <div id="preloader-logo" className="w-full max-w-[700px] px-8 opacity-0">
        <svg
          width="100%"
          viewBox="0 0 1000 280"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="text-clip-pre">
              <text
                x="50%"
                y="55%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="170"
                letterSpacing="15"
                fontFamily={pressStart2P.style.fontFamily}
              >
                M.R.C
              </text>
            </clipPath>
          </defs>

          {/* Outline text */}
          <text
            x="50%"
            y="55%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="170"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            letterSpacing="15"
            fontFamily={pressStart2P.style.fontFamily}
          >
            M.R.C
          </text>

          {/* Fill wave inside text */}
          <g clipPath="url(#text-clip-pre)">
            <rect width="100%" height="100%" fill="#0d0d0d" />
            <path
              id="wave"
              d="M0 240 Q 125 195, 250 240 T 500 240 T 750 240 T 1000 240 V280 H0 Z"
              fill="var(--orange, #ff6b35)"
              opacity="0.9"
            />
          </g>
        </svg>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-[700px] px-8 mt-6">
        <div className="flex justify-between mb-2">
          <span
            className="font-mono-label text-[10px]"
            style={{ color: 'var(--orange)' }}
          >
            LOADING...
          </span>
          <span
            className="font-mono-label text-[10px]"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            {progress}%
          </span>
        </div>
        <div
          className="w-full h-[2px] rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          <div
            className="h-full rounded-full transition-all duration-75"
            style={{
              width: `${progress}%`,
              background: 'var(--orange)',
              boxShadow: '0 0 10px rgba(255,107,53,0.5)',
            }}
          />
        </div>
      </div>

      {/* Bottom status */}
      <div
        className="absolute bottom-8 flex items-center gap-3 font-mono-label text-[9px]"
        style={{ color: 'rgba(255,255,255,0.2)' }}
      >
        <div
          className="w-1 h-1 rounded-full animate-pulse"
          style={{ background: 'var(--orange)' }}
        />
        INITIALIZING SYSTEMS
      </div>
    </div>
  );
}
