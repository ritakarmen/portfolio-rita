"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

const focusAreas = ["React", "Next.js", "interfaces de alto tráfico"];

const experiences = [
  {
    period: "2017 — Actualidad",
    company: "Grupo La República",
    role: "Desarrolladora Front-End",
    description:
      "Desarrollo y mantenimiento de interfaces para medios digitales de alto tráfico, participando en rediseños, migraciones a React y Next.js y optimización de componentes reutilizables.",
    tags: ["React", "Next.js", "Performance", "UX/UI"],
  },
  {
    period: "2016 — 2017",
    company: "OSP",
    role: "Desarrolladora Web",
    description:
      "Construcción de soluciones personalizadas, integración de APIs y participación en proyectos de mediana escala con tecnologías Front-End, Vue y Laravel.",
    tags: ["JavaScript", "APIs", "Vue", "Laravel"],
  },
  {
    period: "12+ años",
    company: "Ministerio de Educación",
    role: "Docente de Matemática e Informática",
    description:
      "Formación de estudiantes en lógica matemática y habilidades tecnológicas, coordinación académica y liderazgo de proyectos pedagógicos.",
    tags: ["Docencia", "Liderazgo", "Lógica", "Comunicación"],
  },
];

const projects = [
  {
    number: "01",
    kind: "Medios digitales",
    title: "Ecosistemas editoriales de alto tráfico",
    description:
      "Interfaces que priorizan claridad, velocidad y estabilidad para audiencias masivas. Trabajo colaborativo con equipos de UX/UI y Back-End.",
    stack: "React · Next.js · JavaScript",
    theme: "project-violet",
    visual: "news",
  },
  {
    number: "02",
    kind: "Producto web",
    title: "Soluciones a medida conectadas por APIs",
    description:
      "Experiencias funcionales construidas alrededor de necesidades reales, integrando servicios y cuidando una arquitectura Front-End mantenible.",
    stack: "JavaScript · Vue · Laravel",
    theme: "project-lime",
    visual: "api",
  },
  {
    number: "03",
    kind: "Tecnología educativa",
    title: "Aprendizaje digital con pensamiento lógico",
    description:
      "Proyectos que conectan pedagogía y tecnología para comunicar conceptos complejos de forma simple, humana y estructurada.",
    stack: "Educación · Tecnología · Liderazgo",
    theme: "project-coral",
    visual: "edu",
  },
];

const skillGroups = {
  desarrollo: [
    ["HTML5 + CSS3", "Avanzado"],
    ["JavaScript ES6+", "Avanzado"],
    ["React", "Avanzado"],
    ["Next.js", "Avanzado"],
    ["TypeScript", "En desarrollo"],
    ["Vue + Laravel", "Base funcional"],
  ],
  diseño: [
    ["Figma", "Diseño de interfaces"],
    ["Canva", "Comunicación visual"],
    ["Responsive UI", "Mobile first"],
    ["Accesibilidad", "Buenas prácticas"],
    ["Sistemas visuales", "Consistencia"],
    ["UX colaborativo", "Trabajo en equipo"],
  ],
  flujo: [
    ["Git + GitHub", "Control de versiones"],
    ["Vite + Webpack", "Herramientas de build"],
    ["VS Code", "Entorno principal"],
    ["Scrum", "Metodología ágil"],
    ["Kanban", "Flujo de trabajo"],
    ["Comunicación", "Liderazgo docente"],
  ],
};

type SkillGroup = keyof typeof skillGroups;

export default function Home() {
  const [focus, setFocus] = useState(0);
  const [skillGroup, setSkillGroup] = useState<SkillGroup>("desarrollo");

  useEffect(() => {
    const timer = window.setInterval(
      () => setFocus((current) => (current + 1) % focusAreas.length),
      2200,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.16 },
    );

    document
      .querySelectorAll<HTMLElement>("[data-reveal]")
      .forEach((element) => observer.observe(element));

    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, []);

  const updatePointer = (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY}px`);
  };

  const tiltCard = (event: ReactPointerEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -7;
    const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 7;
    card.style.setProperty("--rx", `${rotateX}deg`);
    card.style.setProperty("--ry", `${rotateY}deg`);
  };

  const resetTilt = (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--rx", "0deg");
    event.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <main className="site-shell" onPointerMove={updatePointer}>
      <div className="noise" aria-hidden="true" />
      <div className="pointer-glow" aria-hidden="true" />

      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Ir al inicio">
          <span>R</span>ita Ortiz
        </a>
        <nav aria-label="Navegación principal">
          <a href="#experiencia">Experiencia</a>
          <a href="#proyectos">Proyectos</a>
          <a href="#habilidades">Habilidades</a>
          <a className="nav-cta" href="#contacto">Conversemos</a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Desarrolladora Front-End · Lima, Perú</p>
          <h1>
            Código que se siente
            <span>claro, humano y vivo.</span>
          </h1>
          <p className="hero-description">
            Soy <strong>Rita Carmen Ortiz Ochoa</strong>. Transformo ideas en
            experiencias web modernas, rápidas y funcionales, combinando más de
            ocho años en medios digitales con una mirada docente y estratégica.
          </p>
          <div className="rotating-line" aria-live="polite">
            <span>Ahora construyo con</span>
            <strong key={focus}>{focusAreas[focus]}</strong>
          </div>
          <div className="hero-actions">
            <a className="button button-primary" href="#proyectos">
              Ver mi trabajo <span aria-hidden="true">↗</span>
            </a>
            <a className="button button-ghost" href="/cv-rita-ortiz.pdf" download>
              Descargar CV
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Retrato de Rita Ortiz">
          <div className="orbit orbit-one" aria-hidden="true"><i /></div>
          <div className="orbit orbit-two" aria-hidden="true"><i /></div>
          <div className="portrait-frame">
            <img src="/profile.jpg" alt="Rita Carmen Ortiz Ochoa" />
          </div>
          <div className="floating-card card-code" aria-hidden="true">
            <span>01</span>
            <code>build<span>(</span>ideas<span>)</span></code>
          </div>
          <div className="floating-card card-status">
            <i aria-hidden="true" /> Disponible para nuevos retos
          </div>
        </div>

        <a className="scroll-cue" href="#experiencia" aria-label="Explorar el portafolio">
          <span>Explorar</span><i aria-hidden="true" />
        </a>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>REACT</span><i>✦</i><span>NEXT.JS</span><i>✦</i>
          <span>JAVASCRIPT</span><i>✦</i><span>DISEÑO RESPONSIVE</span><i>✦</i>
          <span>REACT</span><i>✦</i><span>NEXT.JS</span><i>✦</i>
          <span>JAVASCRIPT</span><i>✦</i><span>DISEÑO RESPONSIVE</span><i>✦</i>
        </div>
      </div>

      <section className="experience-section" id="experiencia">
        <div className="section-inner">
          <div className="section-heading light" data-reveal>
            <div>
              <p className="section-kicker">01 · Trayectoria</p>
              <h2>Experiencia que conecta<br /><em>personas y tecnología.</em></h2>
            </div>
            <p>
              Desarrollo, docencia y liderazgo reunidos en una práctica enfocada
              en resolver, comunicar y construir en equipo.
            </p>
          </div>

          <div className="experience-grid">
            <div className="experience-stats" data-reveal>
              <div><strong>8+</strong><span>años en desarrollo Front-End</span></div>
              <div><strong>12+</strong><span>años de experiencia docente</span></div>
              <div><strong>∞</strong><span>curiosidad por seguir aprendiendo</span></div>
            </div>
            <div className="timeline">
              {experiences.map((item, index) => (
                <article className="timeline-item" data-reveal key={item.company}>
                  <div className="timeline-marker"><span>{String(index + 1).padStart(2, "0")}</span></div>
                  <div className="timeline-content">
                    <p className="timeline-period">{item.period}</p>
                    <h3>{item.company}</h3>
                    <h4>{item.role}</h4>
                    <p>{item.description}</p>
                    <div className="tag-list">
                      {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="projects-section" id="proyectos">
        <div className="section-inner">
          <div className="section-heading" data-reveal>
            <div>
              <p className="section-kicker">02 · Trabajo seleccionado</p>
              <h2>Lo que sé construir,<br /><em>puesto en contexto.</em></h2>
            </div>
            <p>
              Casos representativos de mi recorrido profesional, presentados
              desde el reto, la colaboración y las tecnologías utilizadas.
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article
                className={`project-card ${project.theme}`}
                data-reveal
                key={project.number}
                onPointerMove={tiltCard}
                onPointerLeave={resetTilt}
              >
                <div className={`project-visual visual-${project.visual}`} aria-hidden="true">
                  <span className="project-number">{project.number}</span>
                  {project.visual === "news" && (
                    <div className="browser-mock">
                      <i /><i /><i />
                      <div className="browser-title" />
                      <div className="browser-grid"><b /><b /><b /></div>
                    </div>
                  )}
                  {project.visual === "api" && (
                    <div className="api-map">
                      <span>UI</span><i /><span>API</span><i /><span>DATA</span>
                    </div>
                  )}
                  {project.visual === "edu" && (
                    <div className="edu-code">
                      <span>APRENDER</span><b>+</b><span>CREAR</span>
                    </div>
                  )}
                </div>
                <div className="project-body">
                  <p>{project.kind}</p>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-footer">
                    <span>{project.stack}</span>
                    <i aria-hidden="true">↗</i>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="skills-section" id="habilidades">
        <div className="section-inner">
          <div className="skills-heading" data-reveal>
            <p className="section-kicker">03 · Caja de herramientas</p>
            <h2>Tecnología con<br /><em>intención.</em></h2>
            <p>
              Elijo herramientas por el valor que aportan al producto y al
              equipo, no solo por tendencia.
            </p>
          </div>

          <div className="skills-lab" data-reveal>
            <div className="skill-tabs" role="tablist" aria-label="Categorías de habilidades">
              {(Object.keys(skillGroups) as SkillGroup[]).map((group) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={skillGroup === group}
                  className={skillGroup === group ? "active" : ""}
                  key={group}
                  onClick={() => setSkillGroup(group)}
                >
                  {group === "desarrollo" ? "Desarrollo" : group === "diseño" ? "Diseño" : "Flujo"}
                </button>
              ))}
            </div>
            <div className="skill-list" role="tabpanel" key={skillGroup}>
              {skillGroups[skillGroup].map(([skill, detail], index) => (
                <div className="skill-row" key={skill} style={{ "--delay": `${index * 55}ms` } as CSSProperties}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{skill}</strong>
                  <p>{detail}</p>
                  <i aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-section" id="sobre-mi">
        <div className="section-inner about-grid">
          <div className="about-statement" data-reveal>
            <p className="section-kicker">04 · Mi diferencial</p>
            <blockquote>
              “La lógica me ayuda a estructurar. La docencia, a comunicar.
              El código, a <em>hacerlo realidad.</em>”
            </blockquote>
          </div>
          <div className="about-details" data-reveal>
            <p>
              Soy Licenciada en Matemática e Informática y desarrolladora de
              software. Esa combinación me permite abordar problemas con orden,
              explicar decisiones con claridad y acompañar a equipos diversos.
            </p>
            <div className="education-list">
              <div>
                <span>Formación universitaria</span>
                <strong>Licenciatura en Matemática e Informática</strong>
                <p>UNE “Enrique Guzmán y Valle”</p>
              </div>
              <div>
                <span>Especialización</span>
                <strong>Desarrollo de Software</strong>
                <p>ISIL</p>
              </div>
              <div>
                <span>Especialización</span>
                <strong>Desarrollo Web Front-End</strong>
                <p>Laboratoria</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contacto">
        <div className="contact-orbit" aria-hidden="true" />
        <div className="section-inner contact-inner" data-reveal>
          <p className="section-kicker">05 · Contacto</p>
          <h2>¿Construimos algo<br /><em>que importe?</em></h2>
          <p>
            Estoy abierta a oportunidades Front-End, colaboraciones y proyectos
            donde la tecnología necesite claridad, energía y propósito.
          </p>
          <a className="contact-email" href="mailto:ritacarmenortiz@gmail.com">
            ritacarmenortiz@gmail.com <span aria-hidden="true">↗</span>
          </a>
          <div className="contact-links">
            <a href="https://www.linkedin.com/in/ritacarmenortizochoa" target="_blank" rel="noreferrer">
              LinkedIn <span>↗</span>
            </a>
            <a href="https://github.com/ritakarmen/" target="_blank" rel="noreferrer">
              GitHub <span>↗</span>
            </a>
            <a href="tel:+51953797513">+51 953 797 513 <span>↗</span></a>
            <a href="/cv-rita-ortiz.pdf" download>Descargar CV <span>↓</span></a>
          </div>
        </div>
      </section>

      <footer>
        <span>Rita Carmen Ortiz Ochoa</span>
        <p>Diseñado y desarrollado con Next.js · Lima, Perú</p>
        <a href="#inicio">Volver arriba ↑</a>
      </footer>
    </main>
  );
}
