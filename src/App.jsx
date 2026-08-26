import { useEffect, useState } from 'react';
import { interests, navigation, projects, skillGroups } from './data';

const terminalLines = [
  ['whoami', 'jose_ignacio_garcia_barrios'],
  ['cat rol.txt', 'Desarrollador Web Junior · Estudiante de Ingeniería de Sistemas'],
  ['cat ubicacion.txt', 'Sincelejo, Colombia'],
];

function SectionHeading({ path, title }) {
  return <div className="section-heading"><span className="section-path">{path}</span><span className="section-rule" /><h2 className="section-title">{title}</h2></div>;
}

function Tag({ children, tone = '' }) {
  return <span className={`tag ${tone}`}>{children}</span>;
}

function Terminal() {
  const [visibleLines, setVisibleLines] = useState([]);
  const [typedPrompt, setTypedPrompt] = useState('');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setVisibleLines(terminalLines);
      return undefined;
    }

    let cancelled = false;
    async function typeLines() {
      for (const [prompt, output] of terminalLines) {
        if (cancelled) return;
        for (let index = 1; index <= prompt.length; index += 1) {
          await new Promise((resolve) => setTimeout(resolve, 28));
          if (cancelled) return;
          setTypedPrompt(prompt.slice(0, index));
        }
        await new Promise((resolve) => setTimeout(resolve, 180));
        if (cancelled) return;
        setVisibleLines((current) => [...current, [prompt, output]]);
        setTypedPrompt('');
        await new Promise((resolve) => setTimeout(resolve, 320));
      }
    }
    typeLines();
    return () => { cancelled = true; };
  }, []);

  return <div className="terminal" aria-label="Información de terminal">
    <div className="terminal-bar"><span className="dot red" /><span className="dot amber" /><span className="dot mint" /><span className="terminal-title">jose@portafolio: ~</span></div>
    <div className="terminal-body">
      {visibleLines.map(([prompt, output]) => <div className="terminal-line" key={prompt}><div className="prompt"><span className="prompt-mark">➜</span> <span className="prompt-path">~</span> {prompt}</div><div>{output}</div></div>)}
      {!reducedMotion && visibleLines.length < terminalLines.length && <div className="terminal-line"><div className="prompt"><span className="prompt-mark">➜</span> <span className="prompt-path">~</span> {typedPrompt}<span className="cursor" /></div></div>}
    </div>
  </div>;
}

function ProjectCard({ project }) {
  return <article className="project"><div className="project-file">▰ {project.file}</div><div className="project-body"><h3>{project.title}</h3><p className="project-description">{project.description}</p><ul>{project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul><div className="tags">{project.tech.map((technology) => <Tag tone="amber" key={technology}>{technology}</Tag>)}</div></div></article>;
}

function App() {
  const [activeSection, setActiveSection] = useState('perfil');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
    navigation.forEach(({ id }) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  return <div className="app">
    <header className="site-header"><nav className="container nav" aria-label="Navegación principal">{navigation.map(({ id, label }) => <a className={`nav-link ${activeSection === id ? 'active' : ''}`} href={`#${id}`} key={id}>{label}</a>)}</nav></header>
    <main className="container">
      <section className="hero" aria-labelledby="nombre"><div><p className="eyebrow">Portafolio · CV</p><h1 id="nombre">José Ignacio<br />García Barrios</h1><p className="hero-intro">Desarrollador Web Junior en formación — construyendo interfaces y soluciones reales mientras curso Ingeniería de Sistemas.</p><div className="contact-meta"><span><span className="inline-icon">⌖</span>Sincelejo, Colombia</span><a href="mailto:jogarba005@gmail.com"><span className="inline-icon">✉</span>jogarba005@gmail.com</a><a href="https://github.com/Jogarba" target="_blank" rel="noreferrer"><span className="inline-icon">◉</span>github.com/Jogarba</a></div></div><Terminal /></section>
      <section id="perfil" className="section"><SectionHeading path="~/perfil.md" title="Perfil profesional" /><div className="profile-grid"><div className="line-numbers">01<br />02<br />03</div><div className="copy"><p>Estudiante de sexto semestre de Ingeniería de Sistemas con conocimientos en desarrollo web y experiencia académica y personal construyendo aplicaciones con JavaScript, React, HTML, CSS y SQL.</p><p>Manejo interfaces web, bases de datos, control de versiones con Git y GitHub, y desarrollo de aplicaciones orientadas a resolver problemas reales.</p><p>Busco oportunidades freelance y proyectos de desarrollo web donde aplicar mis conocimientos, seguir adquiriendo experiencia profesional y aportar soluciones funcionales y de calidad.</p></div></div></section>
      <section id="habilidades" className="section"><SectionHeading path="~/habilidades.json" title="Habilidades técnicas" /><div className="code-panel"><div className="code-brace">{'{'}</div>{skillGroups.map(({ group, items }, index) => <div className="skill-group" key={group}><div className="skill-label">"{group}"<span className="code-colon">: [</span></div><div className="tags">{items.map((item) => <Tag key={item}>{item}</Tag>)}</div><div className="code-close">]{index < skillGroups.length - 1 ? ',' : ''}</div></div>)}<div className="code-brace">{'}'}</div></div></section>
      <section id="proyectos" className="section"><SectionHeading path="~/proyectos/" title="Proyectos" /><div className="projects">{projects.map((project) => <ProjectCard project={project} key={project.file} />)}</div></section>
      <section id="educacion" className="section"><SectionHeading path="~/educacion.md" title="Educación" /><div className="education-card"><h3>Ingeniería de Sistemas</h3><p className="education-status">Sexto semestre — en curso</p><p className="education-country">Colombia</p></div><div className="education-grid"><div className="education-card subcard"><h3>Idiomas</h3><ul className="language-list"><li>Español <span className="language-level">Nativo</span></li><li>Inglés <span className="language-level">Básico</span></li></ul></div><div className="education-card subcard"><h3>Áreas de interés</h3><div className="tags interests">{interests.map((interest) => <Tag key={interest}>{interest}</Tag>)}</div></div></div></section>
      <section id="contacto" className="section"><SectionHeading path="~/contacto.sh" title="Hablemos" /><div className="contact-panel"><p className="contact-copy">Disponible para proyectos freelance y oportunidades de desarrollo web. Escríbeme y con gusto conversamos sobre tu proyecto.</p><div className="actions"><a className="button primary" href="mailto:jogarba005@gmail.com">✉ Enviar correo</a><a className="button secondary" href="https://github.com/Jogarba" target="_blank" rel="noreferrer">◉ Ver GitHub</a></div></div></section>
    </main>
    <footer className="footer">© 2026 José Ignacio García Barrios · Sincelejo, Colombia</footer>
  </div>;
}

export default App;
