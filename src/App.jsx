import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { TextScramble } from '@/components/ui/text-scramble';

const TECH_FILES = [
  {
    name: 'MongoDB',
    fileName: 'connection.db.js',
    icon: 'database',
    color: '#d0e6d5',
    stickyNoteColor: 'sticky-note-mint',
    description: 'MongoDB for building scalable, schema-less document databases. Experienced in aggregation pipelines, data modeling, and performance optimization.',
    details: [
      'Built Quickshow database using Mongoose schema design.',
      'Designed efficient indexing for high-frequency queries.',
      'Constructed complex aggregation pipelines for real-time reporting.'
    ],
    codeLines: [
      <><span className="syntax-comment">// db/connection.js - DB Init</span></>,
      <><span className="syntax-keyword">import</span> mongoose <span className="syntax-keyword">from</span> <span className="syntax-string">"mongoose"</span>;</>,
      <></>,
      <><span className="syntax-keyword">export const</span> <span className="syntax-fn">connectDB</span> = <span className="syntax-keyword">async</span> () =&gt; &#123;</>,
      <>  <span className="syntax-keyword">try</span> &#123;</>,
      <>    <span className="syntax-keyword">const</span> conn = <span className="syntax-keyword">await</span> mongoose.<span className="syntax-fn">connect</span>(process.env.MONGO_URI);</>,
      <>    console.<span className="syntax-fn">log</span>(<span className="syntax-string">`Database: $&#123;conn.connection.host&#125;`</span>);</>,
      <>  &#125; <span className="syntax-keyword">catch</span> (err) &#123;</>,
      <>    console.<span className="syntax-fn">error</span>(<span className="syntax-string">`Mongo Error: $&#123;err.message&#125;`</span>);</>,
      <>    process.<span className="syntax-fn">exit</span>(<span className="syntax-num">1</span>);</>,
      <>  &#125;</>,
      <>&#125;;</>
    ]
  },
  {
    name: 'Express.js',
    fileName: 'server.js',
    icon: 'api',
    color: '#525861',
    stickyNoteColor: 'bg-[#efebdc]',
    description: 'Express.js for crafting robust RESTful APIs and middleware architectures. Focused on security, JWT authentication, and structured error handling.',
    details: [
      'Created custom middleware for secure authentication.',
      'Designed structured REST endpoints with complete validation.',
      'Implemented centralized error handling & rate-limiting.'
    ],
    codeLines: [
      <><span className="syntax-comment">// api/server.js - Router & Middleware</span></>,
      <><span className="syntax-keyword">import</span> express <span className="syntax-keyword">from</span> <span className="syntax-string">"express"</span>;</>,
      <><span className="syntax-keyword">import</span> cors <span className="syntax-keyword">from</span> <span className="syntax-string">"cors"</span>;</>,
      <></>,
      <><span className="syntax-keyword">const</span> app = <span className="syntax-fn">express</span>();</>,
      <></>,
      <>app.<span className="syntax-fn">use</span>(<span className="syntax-fn">cors</span>());</>,
      <>app.<span className="syntax-fn">use</span>(express.<span className="syntax-fn">json</span>());</>,
      <>app.<span className="syntax-fn">use</span>(<span className="syntax-string">"/api/projects"</span>, projectRoutes);</>,
      <>app.<span className="syntax-fn">use</span>(<span className="syntax-string">"/api/auth"</span>, authRoutes);</>,
      <></>,
      <>app.<span className="syntax-fn">listen</span>(<span className="syntax-num">5000</span>, () =&gt; console.<span className="syntax-fn">log</span>(<span className="syntax-string">"Server running on port 5000"</span>));</>
    ]
  },
  {
    name: 'React',
    fileName: 'App.jsx',
    icon: 'widgets',
    color: '#3884b0',
    stickyNoteColor: 'bg-[#bae6fd]',
    description: 'React for building interactive, component-driven client-side UIs. Expert in custom hooks, state management, and Framer Motion transitions.',
    details: [
      'Developed modular component system for fast reuse.',
      'Configured fluid motion-driven user flows with Framer Motion.',
      'Optimized performance with lazy-loading and hook memoization.'
    ],
    codeLines: [
      <><span className="syntax-comment">// components/AnimatedCard.jsx</span></>,
      <><span className="syntax-keyword">import</span> &#123; motion &#125; <span className="syntax-keyword">from</span> <span className="syntax-string">"framer-motion"</span>;</>,
      <></>,
      <><span className="syntax-keyword">export default function</span> <span className="syntax-fn">Card</span>(&#123; title, desc &#125;) &#123;</>,
      <>  <span className="syntax-keyword">return</span> (</>,
      <>    <span className="syntax-tag">&lt;motion.div</span></>,
      <>      <span className="syntax-attr">whileHover</span>=<span className="syntax-punct">&#123;</span>&#123; <span className="syntax-attr">scale</span>: <span className="syntax-num">1.05</span> &#125;&#125;</>,
      <>      <span className="syntax-attr">className</span>=<span className="syntax-string">"p-6 rounded-xl border border-notebook-ink"</span></>,
      <>    <span className="syntax-tag">&gt;</span></>,
      <>      <span className="syntax-tag">&lt;h3</span> <span className="syntax-attr">className</span>=<span className="syntax-string">"text-xl font-bold"</span><span className="syntax-tag">&gt;</span>&#123;title&#125;<span className="syntax-tag">&lt;/h3&gt;</span></>,
      <>      <span className="syntax-tag">&lt;p</span> <span className="syntax-attr">className</span>=<span className="syntax-string">"text-gray-600 mt-2"</span><span className="syntax-tag">&gt;</span>&#123;desc&#125;<span className="syntax-tag">&lt;/p&gt;</span></>,
      <>    <span className="syntax-tag">&lt;/motion.div&gt;</span></>,
      <>  );</>,
      <>&#125;</>
    ]
  },
  {
    name: 'Node.js',
    fileName: 'index.js',
    icon: 'terminal',
    color: '#1d253c',
    stickyNoteColor: 'bg-[#d9dbe2]',
    description: 'Node.js runtime environment for scalable asynchronous backend logic, CLI tools, package scripts, and full-stack development tooling.',
    details: [
      'Engineered asynchronous stream processing for data pipelines.',
      'Automated release scripting and project builds.',
      'Designed API integrations with robust error boundaries.'
    ],
    codeLines: [
      <><span className="syntax-comment">// node/cli-helper.js - Async File I/O</span></>,
      <><span className="syntax-keyword">import</span> fs <span className="syntax-keyword">from</span> <span className="syntax-string">"fs/2026/promises"</span>;</>,
      <><span className="syntax-keyword">import</span> path <span className="syntax-keyword">from</span> <span className="syntax-string">"path"</span>;</>,
      <></>,
      <><span className="syntax-keyword">async function</span> <span className="syntax-fn">readSettings</span>() &#123;</>,
      <>  <span className="syntax-keyword">try</span> &#123;</>,
      <>    <span className="syntax-keyword">const</span> filePath = path.<span className="syntax-fn">join</span>(process.<span className="syntax-fn">cwd</span>(), <span className="syntax-string">"config.json"</span>);</>,
      <>    <span className="syntax-keyword">const</span> data = <span className="syntax-keyword">await</span> fs.<span className="syntax-fn">readFile</span>(filePath, <span className="syntax-string">"utf-8"</span>);</>,
      <>    <span className="syntax-keyword">return</span> JSON.<span className="syntax-fn">parse</span>(data);</>,
      <>  &#125; <span className="syntax-keyword">catch</span> (error) &#123;</>,
      <>    console.<span className="syntax-fn">error</span>(<span className="syntax-string">"Read failed: "</span>, error);</>,
      <>  &#125;</>,
      <>&#125;</>
    ]
  },
  {
    name: 'Next.js',
    fileName: 'page.tsx',
    icon: 'lan',
    color: '#faf6e8',
    stickyNoteColor: 'bg-[#faf6e8]',
    description: 'Next.js for server-side rendering (SSR), static site generation (SSG), React Server Components, and optimized SEO file-based routing.',
    details: [
      'Built fast Server Components for optimal data loading.',
      'Created serverless API routes with secure database access.',
      'Optimized Core Web Vitals resulting in perfect SEO scores.'
    ],
    codeLines: [
      <><span className="syntax-comment">// app/projects/page.tsx - Server Components</span></>,
      <><span className="syntax-keyword">import</span> &#123; Suspense &#125; <span className="syntax-keyword">from</span> <span className="syntax-string">"react"</span>;</>,
      <><span className="syntax-keyword">import</span> ProjectList <span className="syntax-keyword">from</span> <span className="syntax-string">"@/components/ProjectList"</span>;</>,
      <></>,
      <><span className="syntax-keyword">export default async function</span> <span className="syntax-fn">ProjectsPage</span>() &#123;</>,
      <>  <span className="syntax-keyword">return</span> (</>,
      <>    <span className="syntax-tag">&lt;main</span> <span className="syntax-attr">className</span>=<span className="syntax-string">"max-w-6xl mx-auto py-12 px-6"</span><span className="syntax-tag">&gt;</span></>,
      <>      <span className="syntax-tag">&lt;h1</span> <span className="syntax-attr">className</span>=<span className="syntax-string">"text-4xl font-serif font-bold"</span><span className="syntax-tag">&gt;</span>Selected Works<span className="syntax-tag">&lt;/h1&gt;</span></>,
      <>      <span className="syntax-tag">&lt;Suspense</span> <span className="syntax-attr">fallback</span>=<span className="syntax-punct">&#123;</span><span className="syntax-tag">&lt;div&gt;</span>Loading projects...<span className="syntax-tag">&lt;/div&gt;</span><span className="syntax-punct">&#125;</span><span className="syntax-tag">&gt;</span></>,
      <>        <span className="syntax-tag">&lt;ProjectList</span> <span className="syntax-attr">apiUrl</span>=<span className="syntax-string">"/api/projects"</span> <span className="syntax-tag">/&gt;</span></>,
      <>      <span className="syntax-tag">&lt;/Suspense&gt;</span></>,
      <>    <span className="syntax-tag">&lt;/main&gt;</span></>,
      <>  );</>,
      <>&#125;</>
    ]
  },
  {
    name: 'Tailwind CSS',
    fileName: 'tailwind.config.js',
    icon: 'palette',
    color: '#f3cd4c',
    stickyNoteColor: 'sticky-note',
    description: 'Tailwind CSS for utility-first responsive layout design, theme extensions, custom animations, and utility-based aesthetic styling.',
    details: [
      'Engineered bespoke spacing grids matching physical ruled paper.',
      'Developed custom animations, easing, and gradients.',
      'Maintained fully responsive, modern design systems.'
    ],
    codeLines: [
      <><span className="syntax-comment">// tailwind.config.js - Extend Theme</span></>,
      <>module.<span className="syntax-var">exports</span> = &#123;</>,
      <>  content: [<span className="syntax-string">"./src/**/*.&#123;js,jsx,ts,tsx&#125;"</span>],</>,
      <>  theme: &#123;</>,
      <>    extend: &#123;</>,
      <>      colors: &#123;</>,
      <>        notebook: &#123;</>,
      <>          ink: <span className="syntax-string">"#1d253c"</span>,</>,
      <>          red: <span className="syntax-string">"#c93b2b"</span>,</>,
      <>          yellow: <span className="syntax-string">"#f3cd4c"</span></>,
      <>        &#125;</>,
      <>      &#125;</>,
      <>    &#125;</>,
      <>  &#125;,</>,
      <>  plugins: []</>,
      <>&#125;;</>
    ]
  },
  {
    name: 'Git',
    fileName: 'deploy.sh',
    icon: 'commit',
    color: '#e8a8a6',
    stickyNoteColor: 'sticky-note-pink',
    description: 'Git for version control, branch management, collaborative pull requests, and CI/CD deployment pipelines.',
    details: [
      'Automated semantic deployment scripts and releases.',
      'Maintained trunk-based clean Git history workflow.',
      'Set up Git hooks and workflows checking code quality.'
    ],
    codeLines: [
      <><span className="syntax-comment">#!/bin/bash</span></>,
      <>echo <span className="syntax-string">"🚀 Pre-flight checking code quality..."</span></>,
      <></>,
      <><span className="syntax-comment"># Check code linting</span></>,
      <>npm run lint</>,
      <></>,
      <><span className="syntax-comment"># Stage and Commit</span></>,
      <>git add .</>,
      <>git commit -m <span className="syntax-string">"feat: optimize interactive UI sections"</span></>,
      <></>,
      <><span className="syntax-comment"># Deploying production</span></>,
      <>git push origin main</>,
      <>echo <span className="syntax-string">"🎉 Version 2.0 deployed successfully!"</span></>
    ]
  }
];

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedTechIndex, setSelectedTechIndex] = useState(0);
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

      <div className="ruled-paper-bg selection:bg-notebook-yellow selection:text-notebook-ink font-body-md text-on-surface min-h-screen relative overflow-x-hidden w-full">
      {/* Notebook Margin Red Line and Binder Holes */}
      <div className="notebook-margin-line"></div>
      <div className="binder-holes"></div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[4px] bg-primary origin-left z-[60]"
        style={{ scaleX }}
      />
      
      {/* TopNavBar */}
      <header className="bg-surface/90 backdrop-blur-md border-b border-primary/25 border-dashed fixed top-0 left-0 right-0 z-50">
        <nav className="flex justify-between items-center w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto h-20">
          <a href="/" className="flex items-center gap-3 font-headline-lg hover:opacity-85 transition-opacity">
            <div className="w-8 h-8 bg-notebook-red rounded-lg flex items-center justify-center font-cursive text-white text-2xl font-bold rotate-[-6deg] border border-notebook-ink shadow-[2px_2px_0px_#1d253c]">N</div>
            <span className="font-cursive text-3xl font-bold text-notebook-ink tracking-tight">Neel Patel</span>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {['home', 'about', 'projects', 'contact'].map((section) => {
              const isActive = activeSection === section;
              return (
                <a 
                  key={section}
                  className={`font-label-mono text-label-mono pb-1 uppercase relative transition-colors duration-200 ${isActive ? 'text-notebook-red font-bold' : 'text-notebook-ink/75 hover:text-notebook-red'}`}
                  href={`#${section}`}
                  onClick={() => setActiveSection(section)}
                >
                  <TextScramble text={section.charAt(0).toUpperCase() + section.slice(1)} />
                  {isActive && (
                    <motion.div 
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-notebook-red"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>
          
          <div className="flex items-center gap-4">
            {/* Get in touch button - responsive display */}
            <a href="#contact" onClick={() => setActiveSection('contact')} className="hidden sm:inline-flex items-center sticker-btn-outline px-5 py-2 font-label-mono text-label-mono uppercase font-bold text-center rounded-lg">
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
              className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-surface border-l border-primary z-40 p-8 pt-28 flex flex-col justify-between shadow-2xl md:hidden"
            >
              <div className="flex flex-col gap-8">
                <span className="font-label-mono text-caption text-notebook-red uppercase tracking-[0.2em] block mb-2 border-b border-primary/25 border-dashed pb-2">Navigation</span>
                <div className="flex flex-col gap-6">
                  {['home', 'about', 'projects', 'contact'].map((section, idx) => {
                    const isActive = activeSection === section;
                    return (
                      <motion.a
                        key={section}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + idx * 0.04 }}
                        className={`font-headline-md text-[24px] font-bold uppercase transition-colors hover:text-notebook-red ${isActive ? 'text-notebook-red' : 'text-notebook-ink'}`}
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
                  className="w-full sticker-btn-red px-6 py-3.5 font-label-mono text-caption uppercase font-bold rounded-lg flex items-center justify-center gap-2 text-center"
                >
                  <TextScramble text="Get in touch" />
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
                
                <div className="flex justify-center gap-6 pt-4 border-t border-primary/25 border-dashed font-label-mono text-caption">
                  <a className="text-notebook-ink/75 hover:text-notebook-red transition-colors" href="https://github.com/neelpatel80358" target="_blank" rel="noreferrer">GitHub</a>
                  <a className="text-notebook-ink/75 hover:text-notebook-red transition-colors" href="https://www.linkedin.com/in/neel-patel-569b32233/" target="_blank" rel="noreferrer">LinkedIn</a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section id="home" className="pt-32 pb-16 md:pt-40 md:pb-24 px-margin-mobile md:px-gutter max-w-container-max mx-auto relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            
            <motion.div 
              className="flex flex-col gap-6 max-w-2xl"
              initial={{ opacity: 0, y: isMobile ? 20 : 60 }}
              animate={isLoading ? { opacity: 0, y: isMobile ? 20 : 60 } : { opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: isMobile ? 0 : heroTextY, opacity: isMobile ? 1 : heroOpacity }}
            >
              <div className="flex items-center gap-3">
                <div className="grade-stamp-container select-none scale-75 md:scale-90 origin-left">A+</div>
                <span className="font-label-mono text-label-mono text-notebook-ink uppercase tracking-widest font-bold bg-[#d0e6d5] border border-notebook-ink px-2.5 py-1 rounded shadow-[1.5px_1.5px_0px_#1d253c]">Available for hire</span>
              </div>
              <h1 className="font-serif text-[38px] sm:text-[48px] md:text-[58px] text-notebook-ink tracking-tight leading-[1.1] max-w-xl">
                Write code that <span className="text-notebook-red font-cursive text-5xl sm:text-6xl md:text-7xl inline-block rotate-[-2deg] mx-1">sticks,</span><br/>
                build webs that <span className="highlight-yellow px-2 font-semibold">run.</span>
              </h1>
              <p className="font-cursive text-2xl md:text-3xl text-notebook-red opacity-90 leading-tight">
                Neel Patel &mdash; Full Stack Web Developer | MERN &amp; Next.js
              </p>
              <p className="font-serif text-body-lg text-notebook-graphite max-w-xl leading-relaxed">
                I translate digital problems into clean, hand-ruled codebases. Specializing in responsive React systems, modular API design, and highly optimized web interfaces.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 md:pt-4">
                <a href="#projects" className="sticker-btn-red px-6 py-3.5 md:px-8 md:py-4 font-label-mono text-caption md:text-label-mono uppercase font-bold rounded-lg inline-flex items-center justify-center text-center">
                  <TextScramble text="View My Work" />
                </a>
                <a href="#contact" className="sticker-btn-outline px-6 py-3.5 md:px-8 md:py-4 font-label-mono text-caption md:text-label-mono uppercase font-bold rounded-lg inline-flex items-center justify-center text-center">
                  <TextScramble text="Contact Me" />
                </a>
              </div>
            </motion.div>

            {/* Ruled Card & Floating Sticky Note */}
            <div className="relative w-full lg:w-[460px] flex-shrink-0">
              <motion.div 
                className="w-full border-2 border-notebook-ink bg-white rounded-xl overflow-hidden shadow-[4px_4px_0px_#1d253c] flex flex-col"
                initial={{ opacity: 0, scale: 0.9, rotate: isMobile ? 0 : -5 }}
                animate={isLoading ? { opacity: 0, scale: 0.9, rotate: isMobile ? 0 : -5 } : { opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ y: isMobile ? 0 : terminalY, rotate: isMobile ? 0 : terminalRotate }}
              >
                <div className="bg-surface-container px-4 py-2 flex items-center justify-between border-b border-notebook-ink">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full border border-notebook-ink bg-notebook-red"></div>
                    <div className="w-2.5 h-2.5 rounded-full border border-notebook-ink bg-notebook-yellow"></div>
                    <div className="w-2.5 h-2.5 rounded-full border border-notebook-ink bg-notebook-mint"></div>
                  </div>
                  <span className="font-label-mono text-caption text-notebook-ink font-bold">portfolio.sh &mdash; 80x24</span>
                </div>
                <div className="ruled-paper-bg p-6 font-cursive text-xl md:text-2xl space-y-2 relative text-notebook-ink overflow-hidden min-h-[260px]">
                  {/* Left inner red margin line */}
                  <div className="absolute top-0 bottom-0 left-[35px] w-[1px] bg-notebook-red opacity-50"></div>
                  <div className="pl-6 select-text">
                    <p className="text-notebook-graphite font-mono text-[10px] opacity-60 leading-none"># dev syllabus</p>
                    <p><span className="text-notebook-red font-bold font-mono text-base">const</span> developer = &#123;</p>
                    <p className="pl-4">name: <span className="text-notebook-red font-semibold">"Neel Patel"</span>,</p>
                    <p className="pl-4">role: <span className="text-notebook-red font-semibold">"Full Stack Dev"</span>,</p>
                    <p className="pl-4">location: <span className="text-notebook-red font-semibold">"Surat, India"</span>,</p>
                    <p className="pl-4">specialty: [<span className="text-notebook-ink">"MERN"</span>, <span className="text-notebook-ink">"Next"</span>],</p>
                    <p className="pl-4">status: <span className="text-notebook-red font-semibold">"Ready to work"</span></p>
                    <p>&#125;;</p>
                    <div className="pt-2 text-notebook-graphite font-mono text-[11px] opacity-75">
                      <span className="text-notebook-red font-bold font-mono">$</span> npm install excellence
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Sticky Note */}
              <motion.div 
                className="sticky-note sticky-note-pink shadow-md max-w-[200px] absolute -top-[45px] -right-[15px] sm:-right-[25px] z-20"
                initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                animate={isLoading ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1, rotate: 3 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ rotate: 0, scale: 1.05 }}
              >
                <div className="sticky-tape"></div>
                <p className="font-cursive font-bold text-lg mb-0.5 text-notebook-ink">Goal</p>
                <p className="font-cursive text-sm text-notebook-ink leading-tight">
                  Be a Best &amp;Perfect developer.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tech Stack Row styled like an interactive developer IDE */}
        <motion.section 
          className="border-y-2 border-notebook-ink bg-surface-container py-16 md:py-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
            <span className="font-label-mono text-caption text-notebook-red uppercase tracking-[0.2em] mb-8 block text-center">
              WORKSPACE &bull; TECH STACK EXPLORER
            </span>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Side: IDE Window (Col span 8 on large screens) */}
              <div className="lg:col-span-8 flex flex-col border-2 border-notebook-ink bg-[#0f1322] rounded-xl overflow-hidden shadow-[6px_6px_0px_#1d253c] text-[#a1a1aa] min-h-[460px]">
                
                {/* IDE Header / Titlebar */}
                <div className="bg-[#0b0e17] px-4 py-3 flex items-center justify-between border-b border-notebook-ink select-none">
                  {/* MacOS style window controls */}
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-notebook-ink"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-notebook-ink"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-notebook-ink"></div>
                  </div>
                  {/* Active File / Workspace Title */}
                  <span className="font-label-mono text-[11px] text-zinc-400 font-bold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px] text-notebook-red">code</span>
                    neel-patel &mdash; {TECH_FILES[selectedTechIndex].fileName} &mdash; Editor
                  </span>
                  <div className="flex gap-2 text-zinc-500 font-label-mono text-[10px]">
                    <span>UTF-8</span>
                  </div>
                </div>

                {/* IDE Core Panels */}
                <div className="flex flex-1 flex-col md:flex-row min-h-0">
                  
                  {/* File Explorer Sidebar */}
                  <div className="w-full md:w-48 bg-[#0b0e17] border-b md:border-b-0 md:border-r border-notebook-ink flex flex-col py-3 select-none">
                    <div className="px-4 pb-2 mb-2 border-b border-[#273151]/30 font-label-mono text-[10px] uppercase tracking-wider font-bold text-zinc-500 flex justify-between items-center">
                      <span>Explorer: Skills</span>
                      <span className="material-symbols-outlined text-[14px]">unfold_more</span>
                    </div>
                    
                    {/* File List */}
                    <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible custom-scrollbar px-2 md:px-0 gap-1 md:gap-0">
                      {TECH_FILES.map((tech, idx) => {
                        const isSelected = selectedTechIndex === idx;
                        return (
                          <button
                            key={tech.name}
                            onClick={() => setSelectedTechIndex(idx)}
                            className={`w-auto md:w-full flex items-center gap-2 px-3 py-2 text-left font-label-mono text-xs cursor-pointer rounded md:rounded-none whitespace-nowrap transition-colors ${
                              isSelected 
                                ? 'bg-[#1e2538] text-white font-bold border-l-2 border-notebook-red' 
                                : 'text-zinc-400 hover:bg-[#151b2e] hover:text-zinc-200'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[16px] text-zinc-400" style={{ fontVariationSettings: "'opsz' 20" }}>
                              {tech.icon}
                            </span>
                            <span>{tech.fileName}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Code Editor Panel */}
                  <div className="flex-1 flex flex-col min-h-0 bg-[#0f1322] relative">
                    {/* Active Tabs Bar */}
                    <div className="bg-[#0b0e17] flex border-b border-notebook-ink overflow-x-auto custom-scrollbar select-none">
                      {TECH_FILES.map((tech, idx) => {
                        const isSelected = selectedTechIndex === idx;
                        return (
                          <div
                            key={tech.name}
                            onClick={() => setSelectedTechIndex(idx)}
                            className={`flex items-center gap-1.5 px-4 py-2 border-r border-[#273151]/40 text-xs font-label-mono cursor-pointer transition-colors ${
                              isSelected 
                                ? 'bg-[#0f1322] text-white border-t-2 border-t-notebook-red font-semibold' 
                                : 'bg-[#080a10]/60 text-zinc-500 hover:text-zinc-300'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'opsz' 20" }}>
                              {tech.icon}
                            </span>
                            <span>{tech.fileName}</span>
                            <span className="material-symbols-outlined text-[12px] opacity-40 hover:opacity-100 ml-1">close</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Code Editor Window */}
                    <div className="p-4 flex-1 overflow-y-auto max-h-[380px] custom-scrollbar font-label-mono select-text bg-[#0f1322]">
                      <div className="space-y-1">
                        {TECH_FILES[selectedTechIndex].codeLines.map((line, idx) => (
                          <div key={idx} className="flex leading-6 font-mono text-[13px] group">
                            {/* Line Number */}
                            <span className="w-8 select-none text-zinc-600 text-right pr-3 border-r border-[#273151] mr-3 font-label-mono text-xs">
                              {idx + 1}
                            </span>
                            {/* Code Text */}
                            <span className="whitespace-pre overflow-x-auto text-[#f8f8f2] flex-1 custom-scrollbar">
                              {line}
                            </span>
                          </div>
                        ))}
                        {/* Cursor indicator */}
                        <div className="flex leading-6 font-mono text-[13px] pl-11">
                          <span className="terminal-cursor text-zinc-500 font-label-mono text-xs"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Status Bar */}
                <div className="bg-[#0b0e17] px-4 py-1.5 flex items-center justify-between border-t border-notebook-ink font-label-mono text-[10px] text-zinc-500 select-none">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[#50fa7b]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#50fa7b]"></span>
                      main
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">sync</span>
                      0 errors
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>Ln {TECH_FILES[selectedTechIndex].codeLines.length + 1}, Col 1</span>
                    <span>UTF-8</span>
                    <span className="text-zinc-400 font-semibold">JavaScript</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Overlayed physical sticky note (Col span 4 on large screens) */}
              <div className="lg:col-span-4 flex items-center justify-center relative p-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedTechIndex}
                    initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                    animate={{ opacity: 1, scale: 1, rotate: 2 }}
                    exit={{ opacity: 0, scale: 0.9, rotate: 4 }}
                    transition={{ duration: 0.3 }}
                    className={`sticky-note ${TECH_FILES[selectedTechIndex].stickyNoteColor} w-full max-w-sm shadow-xl p-6 relative`}
                  >
                    <div className="sticky-tape"></div>
                    <div className="flex items-center gap-2 mb-3 border-b border-notebook-ink/20 pb-2">
                      <span className="w-3 h-3 rounded-full border border-notebook-ink" style={{ backgroundColor: TECH_FILES[selectedTechIndex].color }}></span>
                      <span className="font-cursive text-2xl font-bold text-notebook-ink">
                        {TECH_FILES[selectedTechIndex].name}
                      </span>
                    </div>
                    <p className="font-cursive text-lg text-notebook-ink leading-relaxed mb-4">
                      {TECH_FILES[selectedTechIndex].description}
                    </p>
                    
                    <div className="space-y-2 pt-2 border-t border-[#1d253c]/15 border-dashed">
                      <p className="font-cursive font-bold text-sm text-notebook-red uppercase tracking-wider mb-1">Key Usage:</p>
                      {TECH_FILES[selectedTechIndex].details.map((detail, idx) => (
                        <div key={idx} className="flex gap-2 items-start font-cursive text-sm text-[#1d253c]/85">
                          <span className="text-notebook-red font-bold select-none">&bull;</span>
                          <p className="leading-tight">{detail}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

            <p className="font-cursive text-lg text-notebook-ink/75 text-center mt-8 italic">
              Click files in the explorer sidebar to view actual snippets and key projects implementation notes.
            </p>
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
            <span className="font-label-mono text-label-mono text-notebook-red uppercase tracking-[0.2em] mb-2 block">Background</span>
            <h2 className="font-serif text-[36px] md:text-[44px] font-bold text-notebook-ink">About Me</h2>
            <div className="w-24 h-0.5 border-b border-notebook-red border-dashed mt-2"></div>
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
              <p className="font-serif text-body-lg text-notebook-graphite leading-relaxed">
                As a developer, I thrive on turning complex problems into elegant, robust digital solutions. With solid training and hands-on experience in full-stack architectures, I am dedicated to creating clean, performant codebases and engaging user experiences.
              </p>
              <div>
                <h3 className="font-serif text-2xl font-bold text-notebook-ink mb-4">Core Competencies</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: 'React', color: 'bg-[#3884b0] text-white' },
                    { name: 'Next.js', color: 'bg-[#faf6e8] text-notebook-ink' },
                    { name: 'Node.js', color: 'bg-[#1d253c] text-white' },
                    { name: 'Express.js', color: 'bg-[#525861] text-white' },
                    { name: 'MongoDB', color: 'bg-[#d0e6d5] text-notebook-ink' },
                    { name: 'PostgreSQL', color: 'bg-[#525861] text-white' },
                    { name: 'Tailwind CSS', color: 'bg-[#f3cd4c] text-notebook-ink' },
                    { name: 'Git', color: 'bg-[#e8a8a6] text-notebook-ink' },
                    { name: 'Vercel', color: 'bg-[#3884b0] text-white' }
                  ].map((skill, index) => (
                    <motion.span 
                      key={index} 
                      className={`px-4 py-2 border border-notebook-ink font-label-mono text-caption uppercase font-bold rounded shadow-[2.5px_2.5px_0px_#1d253c] hover:translate-y-[-1px] hover:shadow-[3.5px_3.5px_0px_#1d253c] transition-all cursor-pointer select-none ${skill.color}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {skill.name}
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
                <h3 className="font-serif text-2xl font-bold text-notebook-ink mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-notebook-red">work</span> Work Experience
                </h3>
                <div className="border-l-2 border-notebook-ink/35 border-dashed pl-6 space-y-6 relative">
                  <motion.div 
                    className="relative group"
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  >
                    {/* Metal binder clip bullet point */}
                    <div className="absolute w-4 h-4 bg-[#efebdc] border-2 border-notebook-ink rounded-full -left-[35px] top-1.5 group-hover:scale-125 transition-transform flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-notebook-red rounded-full"></div>
                    </div>
                    <h4 className="font-serif text-[20px] text-notebook-ink font-bold">Web Developer</h4>
                    <div className="font-label-mono text-caption text-notebook-red uppercase font-bold mb-2">MEPROTECH | March 2026 – Present</div>
                    <p className="font-serif text-body-md text-notebook-graphite leading-relaxed">
                      Leading implementation of scalable backend systems, database migrations, and responsive modern user interfaces.
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="font-serif text-2xl font-bold text-notebook-ink mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-notebook-red">school</span> Education & Training
                </h3>
                <div className="border-l-2 border-notebook-ink/35 border-dashed pl-6 space-y-6 relative">
                  <motion.div 
                    className="relative group"
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  >
                    <div className="absolute w-4 h-4 bg-[#efebdc] border-2 border-notebook-ink rounded-full -left-[35px] top-1.5 group-hover:scale-125 transition-transform flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-notebook-red rounded-full"></div>
                    </div>
                    <h4 className="font-serif text-[20px] text-notebook-ink font-bold">B.Com Honours</h4>
                    <div className="font-label-mono text-caption text-notebook-graphite uppercase font-bold mb-1">Sir K.P. College of Commerce | VNSGU | 2021–2024</div>
                  </motion.div>
                  <motion.div 
                    className="relative group"
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  >
                    <div className="absolute w-4 h-4 bg-[#efebdc] border-2 border-notebook-ink rounded-full -left-[35px] top-1.5 group-hover:scale-125 transition-transform flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-notebook-red rounded-full"></div>
                    </div>
                    <h4 className="font-serif text-[20px] text-notebook-ink font-bold">Full Stack Development Course</h4>
                    <div className="font-label-mono text-caption text-notebook-graphite uppercase font-bold">Skywin IT Academy</div>
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
            <span className="font-label-mono text-label-mono text-notebook-red uppercase tracking-[0.2em] mb-2 block">Portfolio</span>
            <h2 className="font-serif text-[36px] md:text-[44px] font-bold text-notebook-ink">Selected Works</h2>
            <div className="w-24 h-0.5 border-b border-notebook-red border-dashed mt-2"></div>
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
              className="lg:col-span-7 sticker-card overflow-hidden flex flex-col"
              variants={zoomIn}
            >
              <div className="h-72 md:h-96 relative overflow-hidden bg-notebook-ink">
                <img 
                  src="/quickshow.jpg" 
                  alt="Quickshow Movie Platform" 
                  className="w-full h-full object-cover opacity-65 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-notebook-ink via-transparent to-transparent opacity-75"></div>
                
                {/* Sticky Note Tag on Image */}
                <div className="absolute top-4 right-4 rotate-[4deg] z-20 sticky-note sticky-note-mint px-4 py-1.5 shadow-sm text-sm font-bold font-cursive">
                  <div className="sticky-tape" style={{ width: '45px', height: '14px', top: '-7px' }}></div>
                  Live Bookings
                </div>

                <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-20">
                  {['React.js', 'Node.js', 'Express', 'MongoDB'].map((tag, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white border border-notebook-ink font-label-mono text-[9px] text-notebook-ink font-bold uppercase rounded shadow-[1.5px_1.5px_0px_#1d253c]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="ruled-paper-bg p-5 sm:p-8 md:p-10 flex-grow flex flex-col justify-between relative z-10 border-t border-notebook-ink">
                {/* Red margin indicator */}
                <div className="absolute top-0 bottom-0 left-[35px] w-[1px] bg-notebook-red opacity-30"></div>
                <div className="pl-6 select-text">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-serif text-2xl font-bold text-notebook-ink">Quickshow &mdash; Movie Booking</h3>
                    <div className="flex gap-4">
                      <a href="https://github.com/neelpatel80358" target="_blank" rel="noreferrer" className="material-symbols-outlined text-notebook-ink hover:text-notebook-red cursor-pointer transition-colors" title="GitHub Source">code</a>
                      <a href="https://quickshow-xi.vercel.app/" target="_blank" rel="noreferrer" className="material-symbols-outlined text-notebook-ink hover:text-notebook-red cursor-pointer transition-colors" title="Live Site">open_in_new</a>
                    </div>
                  </div>
                  <p className="font-serif text-body-md text-notebook-graphite mb-8 leading-relaxed">
                    Developed a full-featured movie ticket booking platform where users can explore now-playing movies, view showtimes, and book tickets seamlessly. Integrated The Movie Database (TMDB) API for real-time movie data. Features include Clerk user authentication, secure booking flow, responsive UI, and admin panel for managing shows. Deployed on Vercel (frontend) and Render (Backend API).
                  </p>
                </div>
                <div className="pl-6">
                  <a className="inline-flex items-center gap-2 font-label-mono text-label-mono uppercase font-bold text-notebook-red hover:gap-4 transition-all" href="https://quickshow-xi.vercel.app/" target="_blank" rel="noreferrer">
                    <TextScramble text="Explore Live App" /> <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Project 2: Vivid - Anime streaming platform (md:col-span-5) */}
            <motion.div 
              className="lg:col-span-5 sticker-card overflow-hidden flex flex-col mt-0 lg:mt-24"
              variants={zoomIn}
            >
              <div className="h-72 md:h-96 relative overflow-hidden bg-notebook-ink">
                <img 
                  src="/vivid.png" 
                  alt="Vivid Anime Streaming" 
                  className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-notebook-ink via-transparent to-transparent opacity-75"></div>

                {/* Sticky Note Tag on Image */}
                <div className="absolute top-4 right-4 rotate-[-3deg] z-20 sticky-note sticky-note-pink px-4 py-1.5 shadow-sm text-sm font-bold font-cursive">
                  <div className="sticky-tape" style={{ width: '45px', height: '14px', top: '-7px' }}></div>
                  Anime Stream
                </div>

                <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-20">
                  {['React.js', 'Tailwind', 'Anime API'].map((tag, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white border border-notebook-ink font-label-mono text-[9px] text-notebook-ink font-bold uppercase rounded shadow-[1.5px_1.5px_0px_#1d253c]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="ruled-paper-bg p-5 sm:p-8 md:p-10 flex-grow flex flex-col justify-between relative z-10 border-t border-notebook-ink">
                {/* Red margin indicator */}
                <div className="absolute top-0 bottom-0 left-[35px] w-[1px] bg-notebook-red opacity-30"></div>
                <div className="pl-6 select-text">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-notebook-ink">Vivid &mdash; Anime Stream</h3>
                    <div className="flex gap-4">
                      <a href="https://github.com/neelpatel80358" target="_blank" rel="noreferrer" className="material-symbols-outlined text-notebook-ink hover:text-notebook-red cursor-pointer transition-colors" title="GitHub Source">code</a>
                      <a href="https://vivid-striming.vercel.app/" target="_blank" rel="noreferrer" className="material-symbols-outlined text-notebook-ink hover:text-notebook-red cursor-pointer transition-colors" title="Live Site">open_in_new</a>
                    </div>
                  </div>
                  <p className="font-serif text-body-md text-notebook-graphite mb-8 leading-relaxed">
                    Built a responsive anime streaming platform using React.js, focused on showcasing trending and popular anime content. Data including anime titles, posters, overviews, and ratings are loaded dynamically. Designed with Tailwind CSS for a clean and modern UI, the app provides users with an intuitive browsing experience. Deployed on Vercel for fast and scalable hosting.
                  </p>
                </div>
                <div className="pl-6">
                  <a className="inline-flex items-center gap-2 font-label-mono text-label-mono uppercase font-bold text-notebook-red hover:gap-4 transition-all" href="https://vivid-striming.vercel.app/" target="_blank" rel="noreferrer">
                    <TextScramble text="Explore Live App" /> <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          id="contact" 
          className="py-16 md:py-32 bg-surface-container border-y-2 border-notebook-ink"
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
        >
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={slideInLeft}>
                <h2 className="font-serif text-[38px] sm:text-[44px] md:text-[52px] text-notebook-ink mb-8 tracking-tight leading-tight">
                  Let's write a new <br/>
                  <span className="text-notebook-red font-cursive text-5xl sm:text-6xl md:text-7xl inline-block rotate-[-2deg]">chapter</span> together.
                </h2>
                <p className="font-serif text-body-lg text-notebook-graphite max-w-2xl mb-12">
                  Currently accepting new projects and full-time opportunities. If you have a syllabus or custom project request, I have the stack to build it.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 font-label-mono text-label-mono text-notebook-red font-bold">
                  <a href="mailto:neelpatel80358@gmail.com" className="flex items-center gap-2 hover:translate-x-2 transition-all">
                    <span className="material-symbols-outlined">mail</span> neelpatel80358@gmail.com
                  </a>
                  <a href="https://www.linkedin.com/in/neel-patel-569b32233/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:translate-x-2 transition-all">
                    <span className="material-symbols-outlined">link</span> LinkedIn
                  </a>
                </div>
              </motion.div>

              {/* Ruled Contact Form Card */}
              <motion.div 
                className="sticker-card p-5 sm:p-8 relative overflow-hidden"
                variants={slideInRight}
              >
                <h3 className="font-serif text-2xl font-bold text-notebook-ink mb-6">Add a new note...</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block font-label-mono text-caption text-notebook-red uppercase font-bold mb-1">Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required 
                      className="w-full notebook-input-line"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block font-label-mono text-caption text-notebook-red uppercase font-bold mb-1">Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                      className="w-full notebook-input-line"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block font-label-mono text-caption text-notebook-red uppercase font-bold mb-1">Message</label>
                    <textarea 
                      name="message" 
                      value={formData.message}
                      onChange={handleInputChange}
                      required 
                      rows="3" 
                      className="w-full notebook-input-line"
                      placeholder="Hello, I'd like to collaborate..."
                    ></textarea>
                  </div>
                  <motion.button 
                    type="submit" 
                    className="w-full sticker-btn-red px-8 py-4 font-label-mono text-label-mono uppercase font-bold rounded-lg flex items-center justify-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <TextScramble text="Send Note" />
                    <span className="material-symbols-outlined">send</span>
                  </motion.button>
                  {formSubmitted && (
                    <motion.div 
                      className="mt-4 p-3 bg-[#d0e6d5] border border-notebook-ink text-notebook-ink font-label-mono text-caption rounded-lg text-center font-bold shadow-[2px_2px_0px_#1d253c]"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      Message saved successfully!
                    </motion.div>
                  )}
                </form>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t-2 border-notebook-ink/25 border-dashed">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-mobile md:px-gutter py-12 max-w-container-max mx-auto gap-element-gap">
          <a href="/" className="flex items-center gap-3 hover:opacity-85 transition-opacity">
            <div className="w-6 h-6 bg-notebook-red rounded flex items-center justify-center font-cursive text-white text-lg font-bold rotate-[-6deg] border border-notebook-ink shadow-[1.5px_1.5px_0px_#1d253c]">N</div>
            <span className="font-cursive text-2xl font-bold text-notebook-ink tracking-tight">Neel Patel</span>
          </a>
          <div className="font-serif text-caption text-notebook-graphite text-center">
            © 2026 Neel Patel. Built with precision and notebook aesthetic.
          </div>
          <ul className="example-2">
            <li className="icon-content">
              <a
                href="https://www.linkedin.com/in/neel-patel-569b32233/"
                target="_blank"
                rel="noreferrer"
                data-social="linkedin"
                aria-label="LinkedIn"
              >
                <div className="filled"></div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <div className="tooltip">LinkedIn</div>
            </li>
            <li className="icon-content">
              <a
                href="https://github.com/neelpatel80358"
                target="_blank"
                rel="noreferrer"
                data-social="github"
                aria-label="GitHub"
              >
                <div className="filled"></div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <div className="tooltip">GitHub</div>
            </li>
            <li className="icon-content">
              <a
                href="mailto:neelpatel80358@gmail.com"
                data-social="mail"
                aria-label="Email"
              >
                <div className="filled"></div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
              <div className="tooltip">neelpatel80358@gmail.com</div>
            </li>
          </ul>
        </div>
      </footer>
    </div>
    </>
  );
}

export default App;
