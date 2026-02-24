'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Mail, MapPin, Phone, ArrowUpRight, Send } from 'lucide-react';
import emailjs from 'emailjs-com';

export default function ContactSection() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({ user_name: '', user_email: '', message: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.user_name.trim()) newErrors.user_name = 'Name required';
    if (!formData.user_email.trim()) newErrors.user_email = 'Email required';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.user_email))
      newErrors.user_email = 'Invalid email';
    if (!formData.message.trim()) newErrors.message = 'Message required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    emailjs
      .sendForm('service_ih5sqe2', 'template_qq8s6dh', formRef.current, '4S21e3bysxDMDPmKV')
      .then(() => {
        setSent(true);
        setLoading(false);
        setFormData({ user_name: '', user_email: '', message: '' });
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  const socials = [
    { icon: <FaGithub size={18} />, href: 'https://github.com/Muneeb-U-Rehman-Chaudary', label: 'GitHub' },
    { icon: <FaLinkedin size={18} />, href: 'https://www.linkedin.com/in/muneeb-u-rehman-a0151a31a', label: 'LinkedIn' },
    { icon: <FaInstagram size={18} />, href: 'https://www.instagram.com/muneeb_u_rehman329/', label: 'Instagram' },
  ];

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    fontSize: '0.875rem',
    background: 'transparent',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    borderRadius: '6px',
    color: 'rgba(255,255,255,0.85)',
    fontWeight: 400,
    fontFamily: 'inherit',
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 right-0 w-[40vw] h-[60vh] pointer-events-none -translate-y-1/2"
        style={{ background: 'radial-gradient(ellipse at right, rgba(255,107,53,0.05) 0%, transparent 65%)' }}
      />

      {/* Ghost text watermark */}
      <div
        className="absolute left-0 bottom-0 font-display pointer-events-none select-none leading-none hidden xl:block"
        style={{ fontSize: '20vw', color: 'rgba(255,255,255,0.018)' }}
      >
        TALK
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          className="font-mono-label block mb-5"
          style={{ fontSize: '10px', fontWeight: 500, color: 'var(--orange)', letterSpacing: '0.2em' }}
        >
          05 / GET CONNECTED
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-display mb-16"
          style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: '0.88' }}
        >
          <span className="text-white">LET'S</span>
          <br />
          <span style={{ WebkitTextStroke: '1px var(--orange)', color: 'transparent' }}>CONNECT</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {sent ? (
              <div
                className="flex flex-col items-center justify-center h-64 gap-4 rounded-xl p-8"
                style={{ background: 'rgba(255,107,53,0.05)', border: '1px solid rgba(255,107,53,0.25)' }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,107,53,0.12)' }}
                >
                  <Send size={20} style={{ color: 'var(--orange)' }} />
                </div>
                <p className="font-display text-white text-xl">MESSAGE SENT!</p>
                <p
                  className="font-mono-label text-center"
                  style={{ fontSize: '10px', fontWeight: 400, color: 'rgba(255,255,255,0.38)' }}
                >
                  I'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    className="font-mono-label block mb-2"
                    style={{ fontSize: '9px', fontWeight: 500, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.2em' }}
                  >
                    NAME
                  </label>
                  <input
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    placeholder="Your name"
                    style={{
                      ...inputStyle,
                      border: `1px solid ${errors.user_name ? 'rgba(255,80,80,0.45)' : 'rgba(255,255,255,0.08)'}`,
                    }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(255,107,53,0.45)'; }}
                    onBlur={e => { e.target.style.borderColor = errors.user_name ? 'rgba(255,80,80,0.45)' : 'rgba(255,255,255,0.08)'; }}
                  />
                  {errors.user_name && (
                    <p className="font-mono-label mt-1" style={{ fontSize: '9px', color: 'rgba(255,80,80,0.75)' }}>{errors.user_name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    className="font-mono-label block mb-2"
                    style={{ fontSize: '9px', fontWeight: 500, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.2em' }}
                  >
                    EMAIL
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    style={{
                      ...inputStyle,
                      border: `1px solid ${errors.user_email ? 'rgba(255,80,80,0.45)' : 'rgba(255,255,255,0.08)'}`,
                    }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(255,107,53,0.45)'; }}
                    onBlur={e => { e.target.style.borderColor = errors.user_email ? 'rgba(255,80,80,0.45)' : 'rgba(255,255,255,0.08)'; }}
                  />
                  {errors.user_email && (
                    <p className="font-mono-label mt-1" style={{ fontSize: '9px', color: 'rgba(255,80,80,0.75)' }}>{errors.user_email}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    className="font-mono-label block mb-2"
                    style={{ fontSize: '9px', fontWeight: 500, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.2em' }}
                  >
                    PROPOSAL / MESSAGE
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Project details, collaboration ideas..."
                    rows={5}
                    style={{
                      ...inputStyle,
                      border: `1px solid ${errors.message ? 'rgba(255,80,80,0.45)' : 'rgba(255,255,255,0.08)'}`,
                      resize: 'none',
                    }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(255,107,53,0.45)'; }}
                    onBlur={e => { e.target.style.borderColor = errors.message ? 'rgba(255,80,80,0.45)' : 'rgba(255,255,255,0.08)'; }}
                  />
                  {errors.message && (
                    <p className="font-mono-label mt-1" style={{ fontSize: '9px', color: 'rgba(255,80,80,0.75)' }}>{errors.message}</p>
                  )}
                </div>

                {error && (
                  <p className="font-mono-label" style={{ fontSize: '9px', color: 'rgba(255,80,80,0.75)' }}>
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 flex items-center justify-center gap-2 font-display transition-all duration-300 rounded-md hover:scale-[1.01]"
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.18em',
                    background: loading ? 'rgba(255,107,53,0.5)' : 'var(--orange)',
                    color: '#080808',
                    boxShadow: loading ? 'none' : '0 0 28px rgba(255,107,53,0.25)',
                  }}
                >
                  {loading ? 'SENDING...' : 'SEND MESSAGE'}
                  <ArrowUpRight size={14} />
                </button>
              </form>
            )}
          </motion.div>

          {/* Right: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-8 lg:pt-2"
          >
            {/* Profile badge */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div
                  className="w-16 h-16 rounded-xl overflow-hidden"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <img
                    src="/Images/my_image2.jpeg"
                    alt="Muneeb U Rehman"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2"
                  style={{ background: '#22c55e', borderColor: 'var(--bg-primary)' }}
                />
              </div>
              <div>
                <p className="font-display text-white" style={{ fontSize: '1rem' }}>MUNEEB U REHMAN</p>
                <p
                  className="font-mono-label mt-0.5"
                  style={{ fontSize: '9px', fontWeight: 500, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.18em' }}
                >
                  FULLSTACK DEVELOPER
                </p>
              </div>
            </div>

            {/* Direct email */}
            <div>
              <span
                className="font-mono-label block mb-3"
                style={{ fontSize: '9px', fontWeight: 500, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em' }}
              >
                CONTACT DIRECTLY
              </span>
              <a
                href="mailto:muneebrehman.codes@gmail.com"
                className="group flex items-center gap-2 transition-colors"
                style={{ color: 'rgba(255,255,255,0.65)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.9)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
              >
                <Mail size={16} style={{ color: 'var(--orange)', flexShrink: 0 }} />
                <span style={{ fontSize: '1rem', fontWeight: 400, textDecoration: 'none' }}>
                  muneebrehman.codes@gmail.com
                </span>
              </a>
            </div>

            {/* Other info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone size={13} style={{ color: 'var(--orange)', flexShrink: 0 }} />
                <span
                  className="font-mono-label"
                  style={{ fontSize: '10px', fontWeight: 500, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em' }}
                >
                  +92 323 8691626
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={13} style={{ color: 'var(--orange)', flexShrink: 0 }} />
                <span
                  className="font-mono-label"
                  style={{ fontSize: '10px', fontWeight: 500, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em' }}
                >
                  LAHORE, PAKISTAN
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-[1px]" style={{ background: 'rgba(255,255,255,0.06)' }} />

            {/* Social links */}
            <div>
              <span
                className="font-mono-label block mb-4"
                style={{ fontSize: '9px', fontWeight: 500, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em' }}
              >
                FIND ME ON
              </span>
              <div className="flex gap-3">
                {socials.map(({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300"
                    style={{
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.38)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--orange)';
                      e.currentTarget.style.color = 'var(--orange)';
                      e.currentTarget.style.background = 'rgba(255,107,53,0.07)';
                      e.currentTarget.style.boxShadow = '0 0 16px rgba(255,107,53,0.15)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.38)';
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability status */}
            <div
              className="mt-auto p-4 rounded-xl flex items-center gap-3"
              style={{
                background: 'rgba(34,197,94,0.05)',
                border: '1px solid rgba(34,197,94,0.15)',
              }}
            >
              <div
                className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
                style={{ background: '#22c55e', boxShadow: '0 0 8px #22c55e' }}
              />
              <div>
                <p
                  className="font-mono-label"
                  style={{ fontSize: '9px', fontWeight: 500, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.18em' }}
                >
                  AVAILABLE FOR NEW PROJECTS
                </p>
                <p
                  className="font-mono-label mt-0.5"
                  style={{ fontSize: '8px', fontWeight: 400, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.16em' }}
                >
                  RESPONSE TIME: ~24 HOURS
                </p>
              </div>
            </div>
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
