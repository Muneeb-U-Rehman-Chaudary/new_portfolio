'use client';

import { useEffect, useRef, useState } from 'react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '900',
  variable: '--font-poppins-pre',
});

// SVG canvas — wide enough for M.R.C at 500px, tall enough with padding
const VW = 1600;
const VH = 580;

function buildWave(yBase, amplitude = 18, segments = 8) {
  const segW = VW / segments;
  let d = `M0 ${yBase}`;
  for (let i = 0; i < segments * 2; i++) {
    const sign = i % 2 === 0 ? -1 : 1;
    const cx1 = i * segW + segW * 0.25;
    const cy1 = yBase + sign * amplitude;
    const cx2 = i * segW + segW * 0.75;
    const cy2 = yBase + sign * amplitude;
    const ex  = (i + 1) * segW;
    d += ` C${cx1} ${cy1}, ${cx2} ${cy2}, ${ex} ${yBase}`;
  }
  d += ` V${VH} H0 Z`;
  return d;
}

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done,     setDone]     = useState(false);
  const frontRef     = useRef(null);
  const backRef      = useRef(null);
  const rafRef       = useRef(null);
  const preloaderRef = useRef(null);

  // Map progress 0–100 → yBase VH+50 → -50
  const yAt = (pct) => VH + 50 - (pct / 100) * (VH + 100);

  useEffect(() => {
    // Horizontal wave drift
    let x = 0;
    const drift = () => {
      x = (x - 0.6) % VW;
      const g = document.getElementById('pre-wave-g');
      if (g) g.setAttribute('transform', `translate(${x}, 0)`);
      rafRef.current = requestAnimationFrame(drift);
    };
    rafRef.current = requestAnimationFrame(drift);

    // Progress counter — ~6s total (60ms × 100)
    let count = 0;
    const interval = setInterval(() => {
      if (count >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setTimeout(() => {
            const el = preloaderRef.current;
            if (el) el.style.display = 'none';
          }, 800);
        }, 400);
      } else {
        count += 1;
        setProgress(count);
        const y = yAt(count);
        if (frontRef.current) frontRef.current.setAttribute('d', buildWave(y, 18));
        if (backRef.current)  backRef.current.setAttribute('d', buildWave(y + 16, 12));
      }
    }, 60);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const y0 = yAt(0);

  const fontFamily = `${poppins.style.fontFamily}, 'Poppins', sans-serif`;

  return (
    <div
      ref={preloaderRef}
      id="preloader"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: '#080808',
        opacity: done ? 0 : 1,
        transition: 'opacity 0.8s ease',
        pointerEvents: done ? 'none' : 'auto',
      }}
    >
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 35%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* SVG — responsive: fills viewport width on mobile, capped on desktop */}
      <div style={{ width: 'min(95vw, 1100px)', padding: '0', position: 'relative', zIndex: 1 }}>
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <clipPath id="pre-clip">
              <text
                x="50%"
                y="52%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="500"
                fontFamily={fontFamily}
                fontWeight="900"
                letterSpacing="-10"
              >
                M.R.C
              </text>
            </clipPath>
          </defs>

          {/* Ghost outline */}
          <text
            x="50%"
            y="52%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="500"
            fontFamily={fontFamily}
            fontWeight="900"
            letterSpacing="-10"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          >
            M.R.C
          </text>

          {/* Liquid fill clipped to text */}
          <g clipPath="url(#pre-clip)">
            <rect width={VW} height={VH} fill="#0d0d0d" />
            <g id="pre-wave-g">
              {/* Back wave — dimmer */}
              <path ref={backRef}  d={buildWave(y0 + 16, 12)} fill="rgba(255,107,53,0.28)" />
              {/* Front wave */}
              <path ref={frontRef} d={buildWave(y0, 18)}      fill="#ff6b35" opacity="0.9" />
              {/* Tiles for seamless scroll */}
              <path d={buildWave(y0 + 16, 12)} fill="rgba(255,107,53,0.28)" transform={`translate(${VW},0)`} />
              <path d={buildWave(y0, 18)}      fill="#ff6b35" opacity="0.9"  transform={`translate(${VW},0)`} />
            </g>
          </g>

          {/* Crisp outline on top */}
          <text
            x="50%"
            y="52%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="500"
            fontFamily={fontFamily}
            fontWeight="900"
            letterSpacing="-10"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.8"
            style={{ pointerEvents: 'none' }}
          >
            M.R.C
          </text>
        </svg>
      </div>

      {/* Progress bar */}
      <div style={{ width: 'min(95vw, 1100px)', padding: '12px 0 0', position: 'relative', zIndex: 1 }}>
        <div style={{
          width: '100%',
          height: 1,
          background: 'rgba(255,255,255,0.05)',
          borderRadius: 1,
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: '#ff6b35',
            transition: 'width 65ms linear',
            boxShadow: '0 0 10px rgba(255,107,53,0.5)',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            letterSpacing: '0.22em',
            color: 'rgba(255,255,255,0.16)',
            fontWeight: 500,
          }}>
            LOADING
          </span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            letterSpacing: '0.14em',
            color: 'rgba(255,107,53,0.6)',
            fontWeight: 600,
          }}>
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
