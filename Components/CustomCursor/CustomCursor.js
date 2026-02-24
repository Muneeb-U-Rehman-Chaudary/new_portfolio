'use client';

import { useState, useEffect, useRef } from 'react';

export default function SmoothCursor() {
  const dotRef = useRef({ x: 0, y: 0 });
  const outerRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState({ dot: { x: 0, y: 0 }, outer: { x: 0, y: 0 } });
  const [mounted, setMounted] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    setMounted(true);

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    const interactables = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    const lerp = (a, b, t) => a + (b - a) * t;

    let raf;
    const animate = () => {
      dotRef.current.x = lerp(dotRef.current.x, mouseRef.current.x, 0.25);
      dotRef.current.y = lerp(dotRef.current.y, mouseRef.current.y, 0.25);
      outerRef.current.x = lerp(outerRef.current.x, mouseRef.current.x, 0.1);
      outerRef.current.y = lerp(outerRef.current.y, mouseRef.current.y, 0.1);

      setPos({
        dot: { x: dotRef.current.x, y: dotRef.current.y },
        outer: { x: outerRef.current.x, y: outerRef.current.y },
      });

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9998]">
      {/* Outer ring */}
      <div
        style={{
          position: 'absolute',
          left: pos.outer.x,
          top: pos.outer.y,
          transform: 'translate(-50%, -50%)',
          width: hovering ? '44px' : clicking ? '28px' : '36px',
          height: hovering ? '44px' : clicking ? '28px' : '36px',
          borderRadius: '50%',
          border: `1px solid ${hovering ? 'var(--orange)' : 'rgba(255,107,53,0.4)'}`,
          boxShadow: hovering ? '0 0 16px rgba(255,107,53,0.3)' : 'none',
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
          opacity: 0.8,
        }}
      />

      {/* Inner dot */}
      <div
        style={{
          position: 'absolute',
          left: pos.dot.x,
          top: pos.dot.y,
          transform: 'translate(-50%, -50%)',
          width: hovering ? '6px' : clicking ? '10px' : '8px',
          height: hovering ? '6px' : clicking ? '10px' : '8px',
          borderRadius: '50%',
          background: 'var(--orange)',
          boxShadow: '0 0 8px rgba(255,107,53,0.8), 0 0 20px rgba(255,107,53,0.3)',
          transition: 'width 0.15s ease, height 0.15s ease',
        }}
      />
    </div>
  );
}
