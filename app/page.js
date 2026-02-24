'use client';

import dynamic from 'next/dynamic';

import AboutSection from '../Components/AboutSection/AboutSection';
import ContactSection from '../Components/ContactSection/ContactSection';
import Footer from '../Components/Footer/Footer';
import HeroSection from '../Components/HeroSection/HeroSection';
import Navbar from '../Components/NavBar/Navbar';
import ProjectsSection from '../Components/ProjectsSection/ProjectsSection';
import SkillsSection from '../Components/SkillsSection/SkillsSection';

export default function Home() {
  return (
    <div className="font-poppins">
      <Navbar />
      <HeroSection />
      <SkillsSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
