'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// ─── Config ───────────────────────────────────────────────────────────────────
const WORDS = ['CODE', 'MERN', 'NEXT', 'NODE'];
const ROLL_DUR = 0.3; // rolling drum duration
const HOLD_DUR = 0.2; // word hold
const WORD_GAP_DUR = 0.55; // extra gap between words
const FINAL_HOLD = 0.5; // last word hold before exit
const FADE_DUR = 0.8; // overlay fade
const SPLIT_DUR = 0.9; // panel split duration
const LETTER_STAGGER = 0.1; // synchronized letter cascade
const TICK_COUNT = 36;

// ─── Colors ───────────────────────────────────────────────────────────────────
const BG_START = 'var(--bg-primary)';
const BG_END = 'var(--bg-primary)';
const TEXT_LIGHT = '#ff6b35';
const STROKE_WIDTH = '1.2px';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const wordRowRef = useRef(null);
  const lineRef = useRef(null);
  const ticksRef = useRef([]);
  const panelTopRef = useRef(null);
  const panelBotRef = useRef(null);
  const stripRefs = useRef([]);
  const topRefs = useRef([]);
  const midRefs = useRef([]);
  const bottomRefs = useRef([]);
  const tlRef = useRef(null);
  const [visible, setVisible] = useState(true);

  // Reset letter refs before each render
  stripRefs.current = [];
  topRefs.current = [];
  midRefs.current = [];
  bottomRefs.current = [];
  ticksRef.current = [];

  useLayoutEffect(() => {
    if (!visible) return;
    if (!containerRef.current || !wordRowRef.current) return;

    const maxLen = Math.max(...WORDS.map((word) => word.length));
    const strips = stripRefs.current.filter(Boolean);
    const tops = topRefs.current.filter(Boolean);
    const mids = midRefs.current.filter(Boolean);
    const bottoms = bottomRefs.current.filter(Boolean);
    if (!strips.length || !tops.length || !mids.length || !bottoms.length) return;

    const applyLetterStyle = (el, index) => {
      if (!el) return;
      if (index % 2 === 1) {
        el.style.color = 'transparent';
        el.style.webkitTextStroke = `${STROKE_WIDTH} ${TEXT_LIGHT}`;
      } else {
        el.style.color = TEXT_LIGHT;
        el.style.webkitTextStroke = '0px transparent';
      }
    };

    const setWordTriplet = (currentWord, nextWord, prevWord) => {
      const cur = currentWord.padEnd(maxLen, ' ');
      const next = nextWord.padEnd(maxLen, ' ');
      const prev = prevWord.padEnd(maxLen, ' ');
      tops.forEach((el, i) => {
        el.textContent = next[i] ?? ' ';
        applyLetterStyle(el, i);
      });
      mids.forEach((el, i) => {
        el.textContent = cur[i] ?? ' ';
        applyLetterStyle(el, i);
      });
      bottoms.forEach((el, i) => {
        el.textContent = prev[i] ?? ' ';
        applyLetterStyle(el, i);
      });
    };

    tlRef.current?.kill();

    const totalRolls = Math.max(WORDS.length - 1, 0);
    const totalDuration =
      totalRolls * (ROLL_DUR + HOLD_DUR + WORD_GAP_DUR) + FINAL_HOLD + SPLIT_DUR;

    const tl = gsap.timeline();
    tlRef.current = tl;

    // Stage 1: rolling drum transition per letter
    gsap.set(containerRef.current, { backgroundColor: BG_START });

    const restY = '-33.333%';
    gsap.set(strips, { y: restY });

    if (WORDS.length === 1) {
      setWordTriplet(WORDS[0], WORDS[0], WORDS[0]);
      tl.to({}, { duration: FINAL_HOLD });
    } else {
      const lastIndex = WORDS.length - 1;
      const lastWord = WORDS[lastIndex];

      tl.call(() => setWordTriplet(WORDS[0], WORDS[1], lastWord));
      tl.set(strips, { y: restY });

      WORDS.forEach((word, index) => {
        if (index === lastIndex) return;

        tl.to(strips, {
          y: '0%',
          duration: ROLL_DUR,
          ease: 'power2.inOut',
          stagger: LETTER_STAGGER,
        });

        const isFinalRoll = index === lastIndex - 1;
        tl.to({}, { duration: isFinalRoll ? FINAL_HOLD : HOLD_DUR });

        if (!isFinalRoll) {
          tl.to({}, { duration: WORD_GAP_DUR });
        }

        if (index < lastIndex - 1) {
          const currentWord = WORDS[index + 1];
          const nextWord = WORDS[index + 2];
          const prevWord = WORDS[index];
          tl.call(() => setWordTriplet(currentWord, nextWord, prevWord));
          tl.set(strips, { y: restY });
        }
      });
    }

    // Loading line progresses across the sequence
    if (lineRef.current) {
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' });
      tl.to(
        lineRef.current,
        {
          scaleX: 1,
          duration: totalDuration,
          ease: 'none',
        },
        0
      );
    }

    if (ticksRef.current.length) {
      gsap.set(ticksRef.current, { scaleY: 0, transformOrigin: 'bottom center' });
      tl.to(
        ticksRef.current,
        {
          scaleY: 1,
          duration: totalDuration * 0.6,
          ease: 'power2.out',
          stagger: 0.01,
        },
        0
      );
    }

    // Final exit: nudge, split panels, fade word, then fade overlay
    tl.to(wordRowRef.current, {
      color: '#ffffff',
      scale: 1.06,
      duration: 0.18,
      ease: 'power2.in',
    });

    tl.call(() => {
      setVisible(false);
      onComplete?.();
    });

    return () => tl.kill();
  }, [visible, onComplete]);

  if (!visible) return null;

  // ── Letter sizing (vw-based so it scales with the viewport) ───────────────
  const letterH = '5.6vw';
  const letterW = '3.1vw';
  const fontSize = '5.0vw';
  const maxLen = Math.max(...WORDS.map((word) => word.length));

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BG_START,
        overflow: 'hidden',
      }}
    >
      <div
        ref={panelTopRef}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: BG_START,
          transform: 'translateY(0%)',
        }}
      />
      <div
        ref={panelBotRef}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: BG_START,
          transform: 'translateY(0%)',
        }}
      />
      <div
        ref={wordRowRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.08vw',
          transformOrigin: 'center center',
          lineHeight: 1,
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '-0.045em',
          fontFamily: 'Oswald, Bebas Neue, Impact, "Arial Narrow", sans-serif',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {Array.from({ length: maxLen }).map((_, i) => (
          <div
            key={i}
            style={{
              width: letterW,
              height: letterH,
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              ref={(el) => {
                if (el) stripRefs.current[i] = el;
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                display: 'flex',
                flexDirection: 'column',
                height: `calc(${letterH} * 3)`,
                transform: 'translateY(-33.333%)',
              }}
            >
              <div
                ref={(el) => {
                  if (el) topRefs.current[i] = el;
                }}
                style={{
                  height: letterH,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize,
                  fontWeight: 600,
                  color: TEXT_LIGHT,
                  flexShrink: 0,
                }}
              />
              <div
                ref={(el) => {
                  if (el) midRefs.current[i] = el;
                }}
                style={{
                  height: letterH,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize,
                  fontWeight: 600,
                  color: TEXT_LIGHT,
                  flexShrink: 0,
                }}
              />
              <div
                ref={(el) => {
                  if (el) bottomRefs.current[i] = el;
                }}
                style={{
                  height: letterH,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize,
                  fontWeight: 600,
                  color: TEXT_LIGHT,
                  flexShrink: 0,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '10vh',
          width: '28vw',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: '0.55vw',
            color: 'rgba(255,107,53,0.5)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          <span>SYS.INIT</span>
          <span>LOADING...</span>
        </div>

        <div
          style={{
            width: '100%',
            height: '2px',
            backgroundColor: 'rgba(255,107,53,0.12)',
            position: 'relative',
          }}
        >
          <div
            ref={lineRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: TEXT_LIGHT,
              transform: 'scaleX(0)',
              transformOrigin: 'left center',
              boxShadow: `0 0 8px ${TEXT_LIGHT}, 0 0 18px rgba(255,107,53,0.4)`,
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          {Array.from({ length: TICK_COUNT }).map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) ticksRef.current[i] = el;
              }}
              style={{
                width: '1px',
                height: i % 5 === 0 ? '8px' : '4px',
                backgroundColor:
                  i % 5 === 0
                    ? 'rgba(255,107,53,0.65)'
                    : 'rgba(255,107,53,0.25)',
                transform: 'scaleY(0)',
                transformOrigin: 'bottom center',
              }}
            />
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: '0.5vw',
            color: 'rgba(255,107,53,0.3)',
            letterSpacing: '0.3em',
            marginTop: '2px',
          }}
        />
      </div>
    </div>
  );
}