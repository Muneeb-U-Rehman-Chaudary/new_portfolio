'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '900'],
  display: 'swap',
});

export default function Preloader() {
  const containerRef = useRef(null);
  const topPanelRef  = useRef(null);
  const botPanelRef  = useRef(null);
  const countRef     = useRef(null);
  const lineRef      = useRef(null);
  const lineWrapRef  = useRef(null);
  const labelRef     = useRef(null);
  const percentRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const proxy = { val: 0 };

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Fade-in the counter UI
      tl.fromTo(
        [countRef.current, percentRef.current],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.06 },
      )
        .fromTo(
          labelRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          '-=0.3',
        )

        // Count 0 → 100
        .to(
          proxy,
          {
            val: 100,
            duration: 2.4,
            ease: 'power2.inOut',
            onUpdate() {
              const n = Math.round(proxy.val);
              if (countRef.current)  countRef.current.textContent  = String(n).padStart(2, '0');
              if (lineRef.current)   lineRef.current.style.width   = `${n}%`;
            },
          },
          '-=0.1',
        )

        // Brief hold
        .to({}, { duration: 0.25 })

        // Fade out the text before panels slide
        .to(
          [countRef.current, percentRef.current, labelRef.current, lineWrapRef.current].filter(Boolean),
          { opacity: 0, duration: 0.3, ease: 'power2.in' },
        )

        // Split-curtain reveal: top panel slides up, bottom slides down simultaneously
        .to(
          topPanelRef.current,
          { yPercent: -100, duration: 1.1, ease: 'power4.inOut' },
        )
        .to(
          botPanelRef.current,
          { yPercent: 100, duration: 1.1, ease: 'power4.inOut' },
          '<',
        )

        // Remove from layout
        .set(containerRef.current, { display: 'none' });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="preloader"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'all',
      }}
    >
      {/* Top half panel */}
      <div
        ref={topPanelRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: '#080808',
          willChange: 'transform',
        }}
      />

      {/* Bottom half panel */}
      <div
        ref={botPanelRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: '#080808',
          willChange: 'transform',
        }}
      />

      {/* Centered counter — sits between the two panels */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        {/* Large number */}
        <div style={{ display: 'flex', alignItems: 'flex-start', lineHeight: 1 }}>
          <span
            ref={countRef}
            style={{
              fontFamily: poppins.style.fontFamily,
              fontWeight: 900,
              fontSize: 'clamp(5rem, 18vw, 20rem)',
              color: '#ffffff',
              lineHeight: 1,
              letterSpacing: '-0.05em',
              opacity: 0,
            }}
          >
            00
          </span>
          <span
            ref={percentRef}
            style={{
              fontFamily: poppins.style.fontFamily,
              fontWeight: 300,
              fontSize: 'clamp(1.5rem, 4vw, 5rem)',
              color: '#ff6b35',
              lineHeight: 1,
              marginTop: '0.6em',
              marginLeft: '0.1em',
              letterSpacing: '-0.02em',
              opacity: 0,
            }}
          >
            %
          </span>
        </div>

        {/* Progress line */}
        <div
          ref={lineWrapRef}
          style={{
            width: 'min(88vw, 520px)',
            height: '1px',
            background: 'rgba(255,255,255,0.07)',
            marginTop: '2.5rem',
            overflow: 'hidden',
          }}
        >
          <div
            ref={lineRef}
            style={{
              height: '100%',
              width: '0%',
              background: 'linear-gradient(90deg, #ff6b35, #ff9060)',
              boxShadow: '0 0 8px rgba(255,107,53,0.6)',
            }}
          />
        </div>

        {/* Label */}
        <span
          ref={labelRef}
          style={{
            fontFamily: "'JetBrains Mono', 'Geist Mono', ui-monospace, monospace",
            fontSize: '9px',
            letterSpacing: '0.28em',
            color: 'rgba(255,255,255,0.22)',
            marginTop: '14px',
            textTransform: 'uppercase',
            opacity: 0,
          }}
        >
          Loading
        </span>
      </div>
    </div>
  );
}
