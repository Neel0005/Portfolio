import React, { useState } from 'react';
import { motion } from 'framer-motion';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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

  // Framer Motion Animation Presets
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.15
      }
    },
    viewport: { once: true, margin: "-100px" }
  };

  return (
    <div className="bg-background selection:bg-primary selection:text-on-primary font-body-md text-on-surface min-h-screen">
      {/* TopNavBar */}
      <header className="bg-surface-container-lowest/80 backdrop-blur-md border-b border-outline-variant fixed top-0 left-0 right-0 z-50">
        <nav className="flex justify-between items-center w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto h-20">
          <a href="/" className="font-headline-lg text-headline-lg-mobile font-bold text-primary tracking-tighter hover:opacity-80 transition-opacity">
            Neel Patel
          </a>
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
                  {section}
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
          <a href="#contact" onClick={() => setActiveSection('contact')} className="bg-primary text-on-primary px-6 py-2 font-label-mono text-label-mono uppercase font-bold transition-all duration-200 hover:bg-on-surface-variant active:scale-95 rounded-lg inline-block text-center">
            Get in touch
          </a>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="pt-40 pb-24 px-margin-mobile md:px-gutter max-w-container-max mx-auto relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-30 -z-10"></div>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            
            <motion.div 
              className="flex flex-col gap-6 max-w-2xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest">Available for hire</span>
              </div>
              <h1 className="font-headline-xl text-[48px] md:text-headline-xl text-on-surface tracking-tighter leading-none">
                Neel Patel
              </h1>
              <p className="font-headline-md text-headline-md text-primary opacity-90 leading-tight">
                Full Stack Developer | MERN Stack | React &amp; Next.js
              </p>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                I build clean, scalable web apps — from landing pages to full-stack products. Focused on performance, accessibility, and high-quality code architecture. Based in Surat, India.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a href="#projects" className="bg-primary text-on-primary px-8 py-4 font-label-mono text-label-mono uppercase font-bold hover:bg-on-surface-variant transition-all active:scale-95 rounded-lg inline-block">
                  View My Work
                </a>
                <a href="#contact" className="border border-outline text-on-surface px-8 py-4 font-label-mono text-label-mono uppercase font-bold hover:border-primary transition-all active:scale-95 rounded-lg inline-block">
                  Contact Me
                </a>
              </div>
            </motion.div>

            {/* Terminal Component */}
            <motion.div 
              className="w-full lg:w-[460px] border border-outline-variant bg-surface-container rounded-xl overflow-hidden shadow-sm flex-shrink-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
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
                  <p className="pl-4">role: <span className="text-on-surface font-medium">"Full Stack Architect"</span>,</p>
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
        <section className="border-y border-outline-variant bg-surface-container-low py-12">
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
        </section>

        {/* About, Experience & Education Section */}
        <motion.section 
          id="about" 
          className="py-section-gap px-margin-mobile md:px-gutter max-w-container-max mx-auto"
          {...fadeInUp}
        >
          <div className="mb-16">
            <span className="font-label-mono text-label-mono text-primary uppercase tracking-[0.2em] mb-4 block">Background</span>
            <h2 className="font-headline-lg text-headline-lg-mobile text-on-surface">About Me</h2>
            <div className="w-16 h-1 bg-primary mt-4"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {/* Bio and Tech Skills */}
            <div className="lg:col-span-6 space-y-8">
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                As a developer, I thrive on turning complex problems into elegant, robust digital solutions. With solid training and hands-on experience in full-stack architectures, I am dedicated to creating clean, performant codebases and engaging user experiences.
              </p>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Core Competencies</h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'Git', 'Vercel'].map((skill, index) => (
                    <span key={index} className="px-4 py-2 bg-surface-container-high border border-outline-variant font-label-mono text-caption text-primary uppercase font-bold rounded-lg hover:border-primary transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Experience & Education Timelines */}
            <div className="lg:col-span-6 space-y-10">
              {/* Experience */}
              <div>
                <h3 className="font-headline-md text-[20px] font-bold text-on-surface mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">work</span> Work Experience
                </h3>
                <div className="border-l-2 border-outline-variant pl-6 space-y-6">
                  <div className="relative">
                    <div className="absolute w-3.5 h-3.5 bg-background border-2 border-primary rounded-full -left-[31px] top-1.5"></div>
                    <h4 className="font-headline-md text-[18px] text-on-surface font-semibold">Web Developer</h4>
                    <div className="font-label-mono text-caption text-primary uppercase font-bold mb-2">MEPROTECH | March 2026 – Present</div>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Leading implementation of scalable backend systems, database migrations, and responsive modern user interfaces.
                    </p>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="font-headline-md text-[20px] font-bold text-on-surface mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">school</span> Education & Training
                </h3>
                <div className="border-l-2 border-outline-variant pl-6 space-y-6">
                  <div className="relative">
                    <div className="absolute w-3.5 h-3.5 bg-background border-2 border-primary rounded-full -left-[31px] top-1.5"></div>
                    <h4 className="font-headline-md text-[18px] text-on-surface font-semibold">B.Com Honours</h4>
                    <div className="font-label-mono text-caption text-on-surface-variant uppercase font-bold mb-1">Sir K.P. College of Commerce| VNSGU | 2021–2024</div>
                  </div>
                  <div className="relative">
                    <div className="absolute w-3.5 h-3.5 bg-background border-2 border-primary rounded-full -left-[31px] top-1.5"></div>
                    <h4 className="font-headline-md text-[18px] text-on-surface font-semibold">Full Stack Development Course</h4>
                    <div className="font-label-mono text-caption text-on-surface-variant uppercase font-bold">Skywin IT Academy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Featured Projects */}
        <motion.section 
          id="projects" 
          className="py-section-gap px-margin-mobile md:px-gutter max-w-container-max mx-auto"
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
              variants={fadeInUp}
            >
              <div className="h-72 md:h-96 relative overflow-hidden bg-zinc-950">
                <img 
                  src="/quickshow.jpg" 
                  alt="Quickshow Movie Platform" 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-500"
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
              <div className="p-8 md:p-10 flex-grow flex flex-col justify-between">
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
                  Explore Live App <span className="material-symbols-outlined" style={{ fontVariationSettings: "'wght' 600" }}>arrow_forward</span>
                </a>
              </div>
            </motion.div>

            {/* Project 2: Vivid - Anime streaming platform (md:col-span-5) */}
            <motion.div 
              className="lg:col-span-5 border border-outline-variant bg-surface-container-lowest group hover:border-primary transition-all duration-300 overflow-hidden flex flex-col rounded-xl"
              variants={fadeInUp}
            >
              <div className="h-72 md:h-96 relative overflow-hidden bg-zinc-950">
                <img 
                  src="/vivid.png" 
                  alt="Vivid Anime Streaming" 
                  className="w-full h-full object-cover opacity-65 group-hover:scale-105 group-hover:opacity-85 transition-all duration-500"
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
              <div className="p-8 md:p-10 flex-grow flex flex-col justify-between">
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
                  Explore Live App <span className="material-symbols-outlined" style={{ fontVariationSettings: "'wght' 600" }}>arrow_forward</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          id="contact" 
          className="py-section-gap bg-surface-container border-y border-outline-variant"
          {...fadeInUp}
        >
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-headline-xl text-headline-xl text-on-surface mb-8 tracking-tighter leading-none">
                  Let's build something <br className="hidden md:block" /> remarkable together.
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-12">
                  Currently accepting new projects and full-time opportunities. If you have a vision, I have the stack to build it.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 font-label-mono text-label-mono text-primary font-bold">
                  <a href="mailto:neelpatel80358@gmail.com" className="flex items-center gap-2 hover:text-on-surface-variant transition-colors">
                    <span className="material-symbols-outlined">mail</span> neelpatel80358@gmail.com
                  </a>
                  <a href="https://www.linkedin.com/in/neel-patel-569b32233/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-on-surface-variant transition-colors">
                    <span className="material-symbols-outlined">link</span> LinkedIn
                  </a>
                </div>
              </div>

              {/* Simple Contact Form */}
              <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-sm">
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
                  <button type="submit" className="w-full bg-primary text-on-primary px-8 py-4 font-label-mono text-label-mono uppercase font-bold hover:bg-on-surface-variant transition-all active:scale-95 rounded-lg flex items-center justify-center gap-3">
                    Start a Conversation
                    <span className="material-symbols-outlined">send</span>
                  </button>
                  {formSubmitted && (
                    <div className="mt-4 p-3 bg-surface-container border border-green-500/50 text-green-700 font-label-mono text-caption rounded-lg text-center font-bold">
                      Message sent successfully!
                    </div>
                  )}
                </form>
              </div>
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
            <a className="font-label-mono text-label-mono text-on-surface-variant hover:text-primary transition-colors uppercase" href="https://www.linkedin.com/in/neel-patel-569b32233/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="font-label-mono text-label-mono text-on-surface-variant hover:text-primary transition-colors uppercase" href="https://github.com/neelpatel80358" target="_blank" rel="noreferrer">GitHub</a>
            <a className="font-label-mono text-label-mono text-on-surface-variant hover:text-primary transition-colors uppercase" href="mailto:neelpatel80358@gmail.com">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
