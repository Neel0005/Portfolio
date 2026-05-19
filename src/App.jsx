import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { TextScramble } from '@/components/ui/text-scramble';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(() => {
    // Check if loader has been shown in the current browser session
    try {
      const hasShown = sessionStorage.getItem('portfolioLoaderShown');
      return hasShown === 'true' ? false : true;
    } catch (e) {
      return true;
    }
  });

  // Loading Screen Timer
  useEffect(() => {
    if (!isLoading) return;
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      try {
        sessionStorage.setItem('portfolioLoaderShown', 'true');
      } catch (e) {}
    }, 3200); // 3.2 seconds lets the 'Generating' letter animation cycle perfectly
    return () => clearTimeout(timer);
  }, [isLoading]);

  // Detect mobile screen width for performance and layout tuning
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Smooth Scrolling Setup with Lenis (only on desktop!)
  useEffect(() => {
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isMobile]);

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Hero Parallax Effects
  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 800], [0, 250]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  const terminalY = useTransform(scrollY, [0, 800], [0, 150]);
  const terminalRotate = useTransform(scrollY, [0, 800], [0, 5]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 5000);
    }
  };

  // Advanced Framer Motion Animation Presets
  const fadeInUp = {
    initial: { opacity: 0, y: isMobile ? 20 : 60, scale: isMobile ? 0.98 : 0.95 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: isMobile ? "-20px" : "-100px" },
    transition: { duration: isMobile ? 0.5 : 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const slideInLeft = {
    initial: { opacity: 0, x: isMobile ? -15 : -80 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: isMobile ? "-20px" : "-100px" },
    transition: { duration: isMobile ? 0.5 : 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const slideInRight = {
    initial: { opacity: 0, x: isMobile ? 15 : 80 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: isMobile ? "-20px" : "-100px" },
    transition: { duration: isMobile ? 0.5 : 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const zoomIn = {
    initial: { opacity: 0, scale: isMobile ? 0.95 : 0.8 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: isMobile ? "-20px" : "-100px" },
    transition: { duration: isMobile ? 0.5 : 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.2,
        delayChildren: 0.1
      }
    },
    viewport: { once: true, margin: isMobile ? "-20px" : "-100px" }
  };

  return (
    <>
      {/* Fullscreen Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              y: -30,
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
            }}
            className="loader-container-fullscreen"
          >
            <div className="loader-wrapper">
              <span className="loader-letter">L</span>
              <span className="loader-letter">o</span>
              <span className="loader-letter">a</span>
              <span className="loader-letter">d</span>
              <span className="loader-letter">i</span>
              <span className="loader-letter">n</span>
              <span className="loader-letter">g</span>
              <span className="loader-letter">.</span>
              <span className="loader-letter">.</span>
              <span className="loader-letter">.</span>
              <div className="loader"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-background selection:bg-primary selection:text-on-primary font-body-md text-on-surface min-h-screen relative overflow-x-hidden w-full">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[4px] bg-primary origin-left z-[60]"
        style={{ scaleX }}
      />
      
      {/* TopNavBar */}
      <header className="bg-surface-container-lowest/80 backdrop-blur-md border-b border-outline-variant fixed top-0 left-0 right-0 z-50">
        <nav className="flex justify-between items-center w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto h-20">
          <a href="/" className="font-headline-lg text-headline-lg-mobile font-bold text-primary tracking-tighter hover:opacity-80 transition-opacity">
            Neel Patel
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {['home', 'about', 'projects', 'contact'].map((section) => {
              const isActive = activeSection === section;
              return (
                <a 
                  key={section}
                  className={`font-label-mono text-label-mono pb-1 uppercase relative transition-colors duration-200 ${isActive ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}
                  href={`#${section}`}
                  onClick={() => setActiveSection(section)}
                >
                  <TextScramble text={section.charAt(0).toUpperCase() + section.slice(1)} />
                  {isActive && (
                    <motion.div 
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>
          
          <div className="flex items-center gap-4">
            {/* Get in touch button - responsive display */}
            <a href="#contact" onClick={() => setActiveSection('contact')} className="hidden sm:inline-flex items-center bg-primary text-on-primary px-6 py-2 font-label-mono text-label-mono uppercase font-bold transition-all duration-200 hover:bg-on-surface-variant active:scale-95 rounded-lg text-center">
              <TextScramble text="Get in touch" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden items-center justify-center p-2 text-on-surface hover:text-primary transition-colors focus:outline-none z-50 cursor-pointer"
              aria-label="Toggle Menu"
            >
              <span className="material-symbols-outlined text-[28px] select-none">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 md:hidden"
              transition={{ duration: 0.25 }}
            />

            {/* Sliding Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-surface-container-lowest border-l border-outline-variant z-40 p-8 pt-28 flex flex-col justify-between shadow-2xl md:hidden"
            >
              <div className="flex flex-col gap-8">
                <span className="font-label-mono text-caption text-primary uppercase tracking-[0.2em] block mb-2 border-b border-outline-variant pb-2">Navigation</span>
                <div className="flex flex-col gap-6">
                  {['home', 'about', 'projects', 'contact'].map((section, idx) => {
                    const isActive = activeSection === section;
                    return (
                      <motion.a
                        key={section}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + idx * 0.04 }}
                        className={`font-headline-md text-[20px] font-bold uppercase transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}
                        href={`#${section}`}
                        onClick={() => {
                          setActiveSection(section);
                          setMobileMenuOpen(false);
                        }}
                      >
                        <TextScramble text={section.charAt(0).toUpperCase() + section.slice(1)} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-6">
                <a 
                  href="#contact" 
                  onClick={() => {
                    setActiveSection('contact');
                    setMobileMenuOpen(false);
                  }} 
                  className="w-full bg-primary text-on-primary px-6 py-3.5 font-label-mono text-caption uppercase font-bold transition-all duration-200 hover:bg-on-surface-variant active:scale-95 rounded-lg flex items-center justify-center gap-2 text-center"
                >
                  <TextScramble text="Get in touch" />
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
                
                <div className="flex justify-center gap-6 pt-4 border-t border-outline-variant font-label-mono text-caption">
                  <a className="text-on-surface-variant hover:text-primary transition-colors" href="https://github.com/neelpatel80358" target="_blank" rel="noreferrer">GitHub</a>
                  <a className="text-on-surface-variant hover:text-primary transition-colors" href="https://www.linkedin.com/in/neel-patel-569b32233/" target="_blank" rel="noreferrer">LinkedIn</a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section id="home" className="pt-32 pb-16 md:pt-40 md:pb-24 px-margin-mobile md:px-gutter max-w-container-max mx-auto relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-30 -z-10"></div>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            
            <motion.div 
              className="flex flex-col gap-6 max-w-2xl"
              initial={{ opacity: 0, y: isMobile ? 20 : 60 }}
              animate={isLoading ? { opacity: 0, y: isMobile ? 20 : 60 } : { opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: isMobile ? 0 : heroTextY, opacity: isMobile ? 1 : heroOpacity }}
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest">Available for hire</span>
              </div>
              <h1 className="font-headline-xl text-[36px] sm:text-[44px] md:text-headline-xl text-on-surface tracking-tighter leading-none">
                Neel Patel
              </h1>
              <p className="font-headline-md text-[20px] md:text-headline-md text-primary opacity-90 leading-tight">
                Full Stack Developer | MERN Stack | React &amp; Next.js
              </p>
              <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant max-w-xl">
                I build clean, scalable web apps — from landing pages to full-stack products. Focused on performance, accessibility, and high-quality code architecture. Based in Surat, India.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 md:pt-4">
                <a href="#projects" className="bg-primary text-on-primary px-6 py-3.5 md:px-8 md:py-4 font-label-mono text-caption md:text-label-mono uppercase font-bold hover:bg-on-surface-variant transition-all active:scale-95 rounded-lg inline-flex items-center justify-center text-center">
                  <TextScramble text="View My Work" />
                </a>
                <a href="#contact" className="border border-outline text-on-surface px-6 py-3.5 md:px-8 md:py-4 font-label-mono text-caption md:text-label-mono uppercase font-bold hover:text-yellow-500 hover:border-yellow-500 hover:bg-transparent transition-all active:scale-95 rounded-lg inline-flex items-center justify-center text-center">
                  <TextScramble text="Contact Me" />
                </a>
              </div>
            </motion.div>

            {/* Terminal Component */}
            <motion.div 
              className="w-full lg:w-[460px] border border-outline-variant bg-surface-container rounded-xl overflow-hidden shadow-sm flex-shrink-0"
              initial={{ opacity: 0, scale: 0.9, rotate: isMobile ? 0 : -5 }}
              animate={isLoading ? { opacity: 0, scale: 0.9, rotate: isMobile ? 0 : -5 } : { opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: isMobile ? 0 : terminalY, rotate: isMobile ? 0 : terminalRotate }}
            >
              <div className="bg-surface-container-high px-4 py-2 flex items-center justify-between border-b border-outline-variant">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-outline"></div>
                  <div className="w-3 h-3 rounded-full bg-outline"></div>
                  <div className="w-3 h-3 rounded-full bg-outline"></div>
                </div>
                <span className="font-label-mono text-caption text-on-surface-variant opacity-60">portfolio.sh — 80x24</span>
              </div>
              <div className="p-6 font-label-mono text-caption md:text-label-mono space-y-3">
                <div className="flex gap-4">
                  <span className="text-on-surface-variant opacity-30">01</span>
                  <p><span className="text-primary font-bold">const</span> developer = &#123;</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-on-surface-variant opacity-30">02</span>
                  <p className="pl-4">name: <span className="text-on-surface font-medium">"Neel Patel"</span>,</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-on-surface-variant opacity-30">03</span>
                  <p className="pl-4">role: <span className="text-on-surface font-medium">"Full Stack Developer"</span>,</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-on-surface-variant opacity-30">04</span>
                  <p className="pl-4">location: <span className="text-on-surface font-medium">"Surat, India"</span>,</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-on-surface-variant opacity-30">05</span>
                  <p className="pl-4">specialty: [<span className="text-on-surface font-medium">"MERN"</span>, <span className="text-on-surface font-medium">"Next.js"</span>],</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-on-surface-variant opacity-30">06</span>
                  <p className="pl-4">status: <span className="text-on-surface font-medium">"Building the future"</span></p>
                </div>
                <div className="flex gap-4">
                  <span className="text-on-surface-variant opacity-30">07</span>
                  <p>&#125;;</p>
                </div>
                <div className="flex gap-4 pt-2">
                  <span className="text-on-surface-variant opacity-30">08</span>
                  <p><span className="text-primary font-bold">$</span> <span className="terminal-cursor">npm install excellence</span></p>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Tech Stack Row */}
        <motion.section 
          className="border-y border-outline-variant bg-surface-container-low py-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 grayscale hover:grayscale-0 transition-all duration-300">
              <div className="flex items-center gap-2 font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'opsz' 20" }}>database</span> MongoDB
              </div>
              <div className="flex items-center gap-2 font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'opsz' 20" }}>terminal</span> Express.js
              </div>
              <div className="flex items-center gap-2 font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'opsz' 20" }}>deployed_code</span> React
              </div>
              <div className="flex items-center gap-2 font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'opsz' 20" }}>javascript</span> Node.js
              </div>
              <div className="flex items-center gap-2 font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'opsz' 20" }}>layers</span> Next.js
              </div>
              <div className="flex items-center gap-2 font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'opsz' 20" }}>palette</span> Tailwind CSS
              </div>
              <div className="flex items-center gap-2 font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'opsz' 20" }}>account_tree</span> Git
              </div>
            </div>
          </div>
        </motion.section>

        {/* Container Scroll Animation Section */}
        <section className="relative overflow-hidden">
          <ContainerScroll
            titleComponent={
              <>
                <h1 className="text-4xl font-semibold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-900 via-green-800 to-emerald-950 dark:from-emerald-600 dark:via-green-500 dark:to-emerald-700 drop-shadow-[0_2px_8px_rgba(4,120,87,0.3)]">
                    Crafting digital experiences
                  </span>
                  <br />
                  <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-green-700 to-teal-900 dark:from-emerald-500 dark:via-green-400 dark:to-teal-600 drop-shadow-[0_4px_12px_rgba(6,95,70,0.4)]">
                    with code & creativity
                  </span>
                </h1>
              </>
            }
          >
            <div className="h-full w-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-6 md:p-10 flex flex-col justify-center gap-4 md:gap-6 overflow-y-auto">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                </div>
                <span className="font-label-mono text-[10px] md:text-xs text-zinc-500 ml-2">~/neel-patel — zsh</span>
              </div>

              {/* Name & Role */}
              <div>
                <p className="font-label-mono text-xs md:text-sm text-emerald-400 mb-1"><span className="text-zinc-500">$</span> whoami</p>
                <h2 className="font-headline-lg text-2xl md:text-4xl font-bold text-white tracking-tight">
                  Neel Patel
                </h2>
                <p className="font-label-mono text-xs md:text-sm text-emerald-400 mt-1">
                  Full Stack Developer <span className="text-zinc-500">|</span> MERN Stack
                </p>
              </div>

              {/* Bio */}
              <div>
                <p className="font-label-mono text-xs md:text-sm text-zinc-500 mb-1"><span className="text-zinc-500">$</span> echo $bio</p>
                <p className="font-body-md text-xs md:text-sm text-zinc-300 leading-relaxed">
                  I build clean, scalable web apps — from landing pages to full-stack products.
                  Focused on performance, accessibility, and high-quality code architecture.
                  Based in Surat, India.
                </p>
              </div>

              {/* Skills Grid */}
              <div>
                <p className="font-label-mono text-xs md:text-sm text-zinc-500 mb-2"><span className="text-zinc-500">$</span> skills --list</p>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind', 'PostgreSQL', 'Git', 'Vercel'].map((skill, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 md:px-3 md:py-1 bg-zinc-800/80 border border-zinc-700/60 font-label-mono text-[10px] md:text-xs text-emerald-300/90 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="pt-1 border-t border-zinc-800/60">
                <p className="font-label-mono text-[10px] md:text-xs text-zinc-500">
                  <span className="text-zinc-500">$</span> cat contact.txt
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-1 mt-1 font-label-mono text-[10px] md:text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[12px] md:text-[14px] text-emerald-400" style={{ fontVariationSettings: "'opsz' 20" }}>mail</span>
                    neelpatel80358@gmail.com
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[12px] md:text-[14px] text-emerald-400" style={{ fontVariationSettings: "'opsz' 20" }}>link</span>
                    linkedin.com/in/neel-patel
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[12px] md:text-[14px] text-emerald-400" style={{ fontVariationSettings: "'opsz' 20" }}>code</span>
                    github.com/neelpatel80358
                  </span>
                </div>
              </div>

              {/* Cursor blink */}
              <p className="font-label-mono text-xs md:text-sm text-zinc-600 mt-1">
                <span className="text-zinc-500">$</span> <span className="terminal-cursor text-emerald-400">ready to collaborate</span>
              </p>
            </div>
          </ContainerScroll>
        </section>

        {/* About, Experience & Education Section */}
        <motion.section 
          id="about" 
          className="py-16 md:py-32 px-margin-mobile md:px-gutter max-w-container-max mx-auto overflow-hidden"
          {...fadeInUp}
        >
          <div className="mb-16">
            <span className="font-label-mono text-label-mono text-primary uppercase tracking-[0.2em] mb-4 block">Background</span>
            <h2 className="font-headline-lg text-headline-lg-mobile text-on-surface">About Me</h2>
            <div className="w-16 h-1 bg-primary mt-4"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter overflow-hidden">
            {/* Bio and Tech Skills */}
            <motion.div 
              className="lg:col-span-6 space-y-8"
              variants={slideInLeft}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-100px" }}
            >
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                As a developer, I thrive on turning complex problems into elegant, robust digital solutions. With solid training and hands-on experience in full-stack architectures, I am dedicated to creating clean, performant codebases and engaging user experiences.
              </p>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Core Competencies</h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'Git', 'Vercel'].map((skill, index) => (
                    <motion.span 
                      key={index} 
                      className="px-4 py-2 bg-surface-container-high border border-outline-variant font-label-mono text-caption text-primary uppercase font-bold rounded-lg hover:border-primary hover:scale-105 transition-all cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Experience & Education Timelines */}
            <motion.div 
              className="lg:col-span-6 space-y-10"
              variants={slideInRight}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Experience */}
              <div>
                <h3 className="font-headline-md text-[20px] font-bold text-on-surface mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">work</span> Work Experience
                </h3>
                <div className="border-l-2 border-outline-variant pl-6 space-y-6">
                  <motion.div 
                    className="relative group"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="absolute w-3.5 h-3.5 bg-background border-2 border-primary rounded-full -left-[31px] top-1.5 group-hover:scale-150 transition-transform"></div>
                    <h4 className="font-headline-md text-[18px] text-on-surface font-semibold">Web Developer</h4>
                    <div className="font-label-mono text-caption text-primary uppercase font-bold mb-2">MEPROTECH | March 2026 – Present</div>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Leading implementation of scalable backend systems, database migrations, and responsive modern user interfaces.
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="font-headline-md text-[20px] font-bold text-on-surface mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">school</span> Education & Training
                </h3>
                <div className="border-l-2 border-outline-variant pl-6 space-y-6">
                  <motion.div 
                    className="relative group"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="absolute w-3.5 h-3.5 bg-background border-2 border-primary rounded-full -left-[31px] top-1.5 group-hover:scale-150 transition-transform"></div>
                    <h4 className="font-headline-md text-[18px] text-on-surface font-semibold">B.Com Honours</h4>
                    <div className="font-label-mono text-caption text-on-surface-variant uppercase font-bold mb-1">Sir K.P. College of Commerce| VNSGU | 2021–2024</div>
                  </motion.div>
                  <motion.div 
                    className="relative group"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="absolute w-3.5 h-3.5 bg-background border-2 border-primary rounded-full -left-[31px] top-1.5 group-hover:scale-150 transition-transform"></div>
                    <h4 className="font-headline-md text-[18px] text-on-surface font-semibold">Full Stack Development Course</h4>
                    <div className="font-label-mono text-caption text-on-surface-variant uppercase font-bold">Skywin IT Academy</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Projects */}
        <motion.section 
          id="projects" 
          className="py-16 md:py-32 px-margin-mobile md:px-gutter max-w-container-max mx-auto overflow-hidden"
          {...fadeInUp}
        >
          <div className="mb-16">
            <span className="font-label-mono text-label-mono text-primary uppercase tracking-[0.2em] mb-4 block">Portfolio</span>
            <h2 className="font-headline-lg text-headline-lg-mobile text-on-surface">Selected Works</h2>
            <div className="w-16 h-1 bg-primary mt-4"></div>
          </div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-gutter"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Project 1: Quickshow - Movie Ticket Booking Platform (md:col-span-7) */}
            <motion.div 
              className="lg:col-span-7 border border-outline-variant bg-surface-container-lowest group hover:border-primary transition-all duration-300 overflow-hidden flex flex-col rounded-xl"
              variants={zoomIn}
            >
              <div className="h-72 md:h-96 relative overflow-hidden bg-zinc-950">
                <img 
                  src="/quickshow.jpg" 
                  alt="Quickshow Movie Platform" 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-90 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-85"></div>
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-20">
                  {['React.js', 'Tailwind', 'Node.js', 'Express', 'MongoDB', 'Clerk'].map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-background/80 backdrop-blur-sm border border-outline-variant font-label-mono text-caption text-primary font-bold uppercase rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-5 sm:p-8 md:p-10 flex-grow flex flex-col justify-between relative z-10 bg-surface-container-lowest">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-headline-md text-headline-md text-on-surface">Quickshow — Movie Booking</h3>
                    <div className="flex gap-4">
                      <a href="https://github.com/neelpatel80358" target="_blank" rel="noreferrer" className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">code</a>
                      <a href="https://quickshow-xi.vercel.app/" target="_blank" rel="noreferrer" className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">open_in_new</a>
                    </div>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-8 leading-relaxed">
                    Developed a full-featured movie ticket booking platform where users can explore now-playing movies, view showtimes, and book tickets seamlessly. Integrated The Movie Database (TMDB) API for real-time movie data. Features include Clerk user authentication, secure booking flow, responsive UI, and admin panel for managing shows. Deployed on Vercel (frontend) and Render (Backend API).
                  </p>
                </div>
                <a className="inline-flex items-center gap-3 font-label-mono text-label-mono uppercase font-bold text-primary hover:gap-5 transition-all" href="https://quickshow-xi.vercel.app/" target="_blank" rel="noreferrer">
                  <TextScramble text="Explore Live App" /> <span className="material-symbols-outlined" style={{ fontVariationSettings: "'wght' 600" }}>arrow_forward</span>
                </a>
              </div>
            </motion.div>

            {/* Project 2: Vivid - Anime streaming platform (md:col-span-5) */}
            <motion.div 
              className="lg:col-span-5 border border-outline-variant bg-surface-container-lowest group hover:border-primary transition-all duration-300 overflow-hidden flex flex-col rounded-xl mt-0 lg:mt-24"
              variants={zoomIn}
            >
              <div className="h-72 md:h-96 relative overflow-hidden bg-zinc-950">
                <img 
                  src="/vivid.png" 
                  alt="Vivid Anime Streaming" 
                  className="w-full h-full object-cover opacity-65 group-hover:scale-110 group-hover:opacity-90 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-85"></div>
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-20">
                  {['React.js', 'Tailwind', 'Anime API', 'Vercel'].map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-background/80 backdrop-blur-sm border border-outline-variant font-label-mono text-caption text-primary font-bold uppercase rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-5 sm:p-8 md:p-10 flex-grow flex flex-col justify-between relative z-10 bg-surface-container-lowest">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-headline-md text-[20px] font-bold text-on-surface">Vivid — Anime Streaming</h3>
                    <div className="flex gap-4">
                      <a href="https://github.com/neelpatel80358" target="_blank" rel="noreferrer" className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">code</a>
                      <a href="https://vivid-striming.vercel.app/" target="_blank" rel="noreferrer" className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">open_in_new</a>
                    </div>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-8 leading-relaxed">
                    Built a responsive anime streaming platform using React.js, focused on showcasing trending and popular anime content. Data including anime titles, posters, overviews, and ratings are loaded dynamically. Designed with Tailwind CSS for a clean and modern UI, the app provides users with an intuitive browsing experience. Deployed on Vercel for fast and scalable hosting.
                  </p>
                </div>
                <a className="inline-flex items-center gap-3 font-label-mono text-label-mono uppercase font-bold text-primary hover:gap-5 transition-all" href="https://vivid-striming.vercel.app/" target="_blank" rel="noreferrer">
                  <TextScramble text="Explore Live App" /> <span className="material-symbols-outlined" style={{ fontVariationSettings: "'wght' 600" }}>arrow_forward</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          id="contact" 
          className="py-16 md:py-32 bg-surface-container border-y border-outline-variant"
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
        >
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={slideInLeft}>
                <h2 className="font-headline-xl text-headline-xl text-on-surface mb-8 tracking-tighter leading-none">
                  Let's build something <br className="hidden md:block" /> remarkable together.
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-12">
                  Currently accepting new projects and full-time opportunities. If you have a vision, I have the stack to build it.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 font-label-mono text-label-mono text-primary font-bold">
                  <a href="mailto:neelpatel80358@gmail.com" className="flex items-center gap-2 hover:text-on-surface-variant hover:translate-x-2 transition-all">
                    <span className="material-symbols-outlined">mail</span> neelpatel80358@gmail.com
                  </a>
                  <a href="https://www.linkedin.com/in/neel-patel-569b32233/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-on-surface-variant hover:translate-x-2 transition-all">
                    <span className="material-symbols-outlined">link</span> LinkedIn
                  </a>
                </div>
              </motion.div>

              {/* Simple Contact Form */}
              <motion.div 
                className="bg-surface-container-lowest p-5 sm:p-8 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow"
                variants={slideInRight}
              >
                <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-label-mono text-caption text-on-surface-variant uppercase font-bold mb-2">Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required 
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-on-surface font-body-md focus:border-primary focus:outline-none transition-colors"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block font-label-mono text-caption text-on-surface-variant uppercase font-bold mb-2">Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-on-surface font-body-md focus:border-primary focus:outline-none transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block font-label-mono text-caption text-on-surface-variant uppercase font-bold mb-2">Message</label>
                    <textarea 
                      name="message" 
                      value={formData.message}
                      onChange={handleInputChange}
                      required 
                      rows="4" 
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-on-surface font-body-md focus:border-primary focus:outline-none transition-colors"
                      placeholder="Hello, I'd like to collaborate..."
                    ></textarea>
                  </div>
                  <motion.button 
                    type="submit" 
                    className="w-full bg-primary text-on-primary px-8 py-4 font-label-mono text-label-mono uppercase font-bold hover:bg-on-surface-variant transition-all active:scale-95 rounded-lg flex items-center justify-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <TextScramble text="Start a Conversation" />
                    <span className="material-symbols-outlined">send</span>
                  </motion.button>
                  {formSubmitted && (
                    <motion.div 
                      className="mt-4 p-3 bg-surface-container border border-green-500/50 text-green-700 font-label-mono text-caption rounded-lg text-center font-bold"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      Message sent successfully!
                    </motion.div>
                  )}
                </form>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-mobile md:px-gutter py-12 max-w-container-max mx-auto gap-element-gap">
          <div className="font-label-mono text-label-mono font-bold text-primary uppercase">
            Neel Patel
          </div>
          <div className="font-body-md text-caption text-on-surface-variant text-center">
            © 2026 Neel Patel. Built with precision.
          </div>
          <div className="flex gap-8">
            <a className="font-label-mono text-label-mono text-on-surface-variant hover:text-primary transition-colors uppercase" href="https://www.linkedin.com/in/neel-patel-569b32233/" target="_blank" rel="noreferrer"><TextScramble text="LinkedIn" /></a>
            <a className="font-label-mono text-label-mono text-on-surface-variant hover:text-primary transition-colors uppercase" href="https://github.com/neelpatel80358" target="_blank" rel="noreferrer"><TextScramble text="GitHub" /></a>
            <a className="font-label-mono text-label-mono text-on-surface-variant hover:text-primary transition-colors uppercase" href="mailto:neelpatel80358@gmail.com"><TextScramble text="Email" /></a>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}

export default App;
