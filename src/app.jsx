import React from 'react';
import ReactDOM from 'react-dom/client';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Award,
  BriefcaseBusiness,
  Code2,
  ExternalLink,
  GitBranch,
  Mail,
  MessageCircle,
  Mic2,
  Rocket,
  Sparkles,
  UserRound,
} from 'lucide-react';
import AruAvatar from './AruAvatar';
import { certifications, experience, profile, projects, skills } from './portfolio-data';
import './portfolio.css';

const navItems = [
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'experiencia', label: 'Experiencia', icon: BriefcaseBusiness },
  { id: 'proyectos', label: 'Proyectos', icon: Rocket },
  { id: 'certificaciones', label: 'Certificaciones', icon: Award },
  { id: 'contacto', label: 'Contacto', icon: Mail },
];

function MotionSection({ id, icon: Icon, title, children }) {
  return (
    <motion.section
      id={id}
      className="content-section"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="section-heading">
        <Icon aria-hidden="true" />
        <h2>{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

function goToSection(event, id) {
  if (event) event.preventDefault();
  const target = document.getElementById(id);
  const scroller = document.querySelector('.portfolio-page');
  if (target) {
    const top = scroller
      ? target.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - 24
      : 0;
    if (scroller) scroller.scrollTop = top;
  }
  window.history.replaceState(null, '', `#${id}`);
}

function CustomCursor() {
  const [position, setPosition] = React.useState({ x: -80, y: -80 });
  const prefersReducedMotion = useReducedMotion();

  React.useEffect(() => {
    if (prefersReducedMotion) return undefined;
    function onMove(event) {
      setPosition({ x: event.clientX, y: event.clientY });
    }
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <>
      <motion.div className="portfolio-cursor" animate={{ x: position.x, y: position.y }} transition={{ duration: 0 }} />
      <motion.div
        className="portfolio-cursor-ring"
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 0.45 }}
      />
    </>
  );
}

function Hero() {
  return (
    <header className="hero" id="inicio">
      <motion.article
        className="manga-panel"
        initial={{ opacity: 0, x: -42, rotate: -1.4 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="eyebrow">{profile.availability}</p>
        <h1 className="hero-title">
          Kendall
          <span>Valverde</span>
        </h1>
        <p className="hero-role">{profile.role}</p>
        <p className="hero-summary">{profile.summary}</p>
        <div className="stat-grid" aria-label="Metricas profesionales">
          {profile.stats.map((stat) => (
            <motion.div key={stat.label} className="stat-card" whileHover={{ y: -4, rotate: -0.6 }}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.article>

      <motion.div
        className="avatar-stage"
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        <AruAvatar />
      </motion.div>

      <nav className="nav-stack" aria-label="Secciones del portfolio">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              className="nav-button"
              onClick={(event) => goToSection(event, item.id)}
              onPointerDown={(event) => goToSection(event, item.id)}
              initial={{ opacity: 0, x: 46 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.08, duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ x: 8, rotate: index % 2 === 0 ? 1.2 : -1.2, scale: 1.035 }}
              whileTap={{ scale: 0.96 }}
            >
              <Icon aria-hidden="true" />
              <span>{item.label}</span>
            </motion.a>
          );
        })}
      </nav>
    </header>
  );
}

function AboutSection() {
  return (
    <MotionSection id="sobre-mi" title="Sobre mi" icon={UserRound}>
      <div className="about-grid">
        <div className="about-copy">
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <aside className="fact-list" aria-label="Datos clave">
          <span className="fact-pill">{profile.fullName}</span>
          <span className="fact-pill">{profile.location}</span>
          <span className="fact-pill">{profile.email}</span>
          <span className="fact-pill">{profile.phone}</span>
          {profile.facts.map((fact) => (
            <span key={fact} className="fact-pill">{fact}</span>
          ))}
        </aside>
      </div>
    </MotionSection>
  );
}

function SkillsSection() {
  return (
    <MotionSection id="skills" title="Skills" icon={Code2}>
      <div className="skill-grid">
        {skills.map((group) => (
          <motion.article key={group.title} className="skill-card" whileHover={{ y: -6 }}>
            <h3>{group.title}</h3>
            <div className="tag-row">
              {group.items.map((skill) => <span key={skill} className="tag">{skill}</span>)}
            </div>
          </motion.article>
        ))}
      </div>
    </MotionSection>
  );
}

function ExperienceSection() {
  return (
    <MotionSection id="experiencia" title="Experiencia" icon={BriefcaseBusiness}>
      <div className="timeline">
        {experience.map((job) => (
          <article key={job.role} className="timeline-card">
            <p className="timeline-meta">{job.period}</p>
            <h3>{job.role}</h3>
            <p><strong>{job.company}</strong></p>
            <p>{job.description}</p>
            <ul>
              {job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
            <div className="tag-row">
              {job.stack.map((item) => <span key={item} className="tag">{item}</span>)}
            </div>
          </article>
        ))}
      </div>
    </MotionSection>
  );
}

function ProjectsSection() {
  return (
    <MotionSection id="proyectos" title="Proyectos" icon={Rocket}>
      <div className="project-grid">
        {projects.map((project) => (
          <motion.article key={project.title} className="project-card" whileHover={{ y: -6 }}>
            <p className="project-status">{project.status}</p>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tag-row">
              {project.highlights.map((item) => <span key={item} className="tag">{item}</span>)}
            </div>
            <div className="tag-row">
              {project.stack.map((item) => <span key={item} className="tag">{item}</span>)}
            </div>
            <div className="project-links">
              {project.links.map((link) => (
                <a key={link.href} className="project-link" href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                  <ExternalLink aria-hidden="true" size={14} />
                </a>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </MotionSection>
  );
}

function CertificationsSection() {
  return (
    <MotionSection id="certificaciones" title="Certificaciones" icon={Award}>
      <div className="cert-grid">
        {certifications.map((cert) => (
          <article key={`${cert.title}-${cert.issuer}`} className="cert-card">
            <p className="cert-meta">{cert.status}{cert.period ? ` · ${cert.period}` : ''}</p>
            <h3>{cert.title}</h3>
            <p>{cert.issuer}</p>
          </article>
        ))}
      </div>
    </MotionSection>
  );
}

function ContactSection() {
  return (
    <MotionSection id="contacto" title="Contacto" icon={MessageCircle}>
      <div className="contact-grid">
        <article className="contact-card">
          <p className="eyebrow">Trabajemos juntos</p>
          <h3>Disponible para roles fullstack, frontend, QA o IA</h3>
          <p>Remoto o presencial en Costa Rica. Respondo en espanol e ingles.</p>
          <div className="contact-actions">
            <a className="contact-link" href={`mailto:${profile.email}`}><Mail size={16} /> Email</a>
            <a className="contact-link" href={profile.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp</a>
            <a className="contact-link" href={profile.github} target="_blank" rel="noreferrer"><GitBranch size={16} /> GitHub</a>
            <a className="contact-link" href={profile.linkedin} target="_blank" rel="noreferrer"><ExternalLink size={16} /> LinkedIn</a>
          </div>
        </article>
        <article className="contact-card">
          <p className="eyebrow">Aru</p>
          <h3>Tambien puedes probar la version con voz</h3>
          <p>La pantalla de voz conserva el avatar interactivo con microfono, archivo de audio, parpadeos y sincronizacion de boca.</p>
          <a className="contact-link" href="voz.html"><Mic2 size={16} /> Abrir version con voz</a>
        </article>
      </div>
    </MotionSection>
  );
}

function App() {
  React.useEffect(() => {
    function scrollToHash() {
      if (!window.location.hash) return;
      const id = window.location.hash.slice(1);
      const target = document.getElementById(id);
      const scroller = document.querySelector('.portfolio-page');
      if (!target) return;
      const top = scroller
        ? target.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - 24
        : 0;
      if (scroller) scroller.scrollTop = top;
    }

    window.setTimeout(scrollToHash, 80);
    window.addEventListener('hashchange', scrollToHash);
    function onNativeNavActivate(event) {
      const link = event.target?.closest?.('.nav-button[href^="#"]');
      if (!link) return;
      goToSection(event, link.getAttribute('href').slice(1));
    }
    document.addEventListener('pointerdown', onNativeNavActivate, true);
    document.addEventListener('click', onNativeNavActivate, true);
    return () => {
      window.removeEventListener('hashchange', scrollToHash);
      document.removeEventListener('pointerdown', onNativeNavActivate, true);
      document.removeEventListener('click', onNativeNavActivate, true);
    };
  }, []);

  return (
    <main className="portfolio-page">
      <CustomCursor />
      <motion.a
        href="voz.html"
        className="voice-link"
        whileHover={{ y: -2, scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
      >
        <Mic2 size={16} />
        Version con voz
      </motion.a>
      <Hero />
      <div className="content">
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificationsSection />
        <ContactSection />
      </div>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
