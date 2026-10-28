import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import './App.css'
import { COPY, LINKS, PROJECTS, type Lang, type ProjectId } from './content'
import Shape from './Shape'

type Theme = 'dark' | 'light'

const YEAR = new Date().getFullYear()

function initialLang(): Lang {
  const saved = localStorage.getItem('cl-lang')
  if (saved === 'en' || saved === 'pt') return saved
  return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

function initialTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

function Arrow({ className = 'icon' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ThemeIcon({ theme }: { theme: Theme }) {
  return (
    <svg className="icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      {theme === 'dark' ? (
        <>
          <circle cx="10" cy="10" r="3.6" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M10 2.5v1.8M10 15.7v1.8M2.5 10h1.8M15.7 10h1.8M4.7 4.7l1.3 1.3M14 14l1.3 1.3M4.7 15.3 6 14M14 6l1.3-1.3" />
          </g>
        </>
      ) : (
        <path d="M15.8 12.4A6.5 6.5 0 0 1 7.6 4.2a6.5 6.5 0 1 0 8.2 8.2Z" fill="currentColor" />
      )}
    </svg>
  )
}

function Run({ label, code, copy, copied }: { label: string; code: string; copy: string; copied: string }) {
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (!done) return
    const id = setTimeout(() => setDone(false), 1800)
    return () => clearTimeout(id)
  }, [done])
  return (
    <figure className="run">
      <figcaption>
        <span>{label}</span>
        <button
          type="button"
          className="run-copy"
          onClick={() => navigator.clipboard?.writeText(code).then(() => setDone(true), () => {})}
        >
          {done ? copied : copy}
        </button>
      </figcaption>
      <pre tabIndex={0}>
        <code>{code}</code>
      </pre>
    </figure>
  )
}

function Mark() {
  return (
    <span className="mark" aria-hidden="true">
      {PROJECTS.map((p) => (
        <Shape key={p.id} id={p.id} />
      ))}
    </span>
  )
}

/** Fades blocks below the fold in as they arrive; anything already on screen stays put. */
function useReveal() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const els = [...document.querySelectorAll<HTMLElement>('[data-reveal]')].filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight * 0.92,
    )
    els.forEach((el) => el.classList.add('is-pending'))
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.remove('is-pending')
          io.unobserve(e.target)
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/** A specular highlight on glass that follows the pointer. */
function useGlassLight() {
  useEffect(() => {
    if (!matchMedia('(hover: hover)').matches) return
    let frame = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const pane = (e.target as Element | null)?.closest?.<HTMLElement>('.glass')
        if (!pane) return
        const r = pane.getBoundingClientRect()
        pane.style.setProperty('--mx', `${e.clientX - r.left}px`)
        pane.style.setProperty('--my', `${e.clientY - r.top}px`)
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])
}

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLang)
  const [theme, setTheme] = useState<Theme>(initialTheme)
  const [selected, setSelected] = useState(0)
  const [focus, setFocus] = useState<ProjectId | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const t = COPY[lang]
  const project = PROJECTS[selected]
  const p = t.project[project.id]

  useReveal()
  useGlassLight()

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
    localStorage.setItem('cl-lang', lang)
  }, [lang, t])

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0c0e16' : '#eceef3')
    localStorage.setItem('cl-theme', theme)
  }, [theme])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const choose = (i: number, scroll: boolean) => {
    setSelected(i)
    if (scroll) document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // 1-3 pick a project from anywhere on the page.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.target !== document.body) return
      if (e.key >= '1' && e.key <= '3') choose(Number(e.key) - 1, true)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const onTabKey = (e: ReactKeyboardEvent, i: number) => {
    const n = PROJECTS.length
    let next = -1
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % n
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + n) % n
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = n - 1
    if (next < 0) return
    e.preventDefault()
    choose(next, false)
    tabRefs.current[next]?.focus()
  }

  const toggleTheme = () => setTheme((v) => (v === 'dark' ? 'light' : 'dark'))
  const toggleLang = () => setLang((l) => (l === 'en' ? 'pt' : 'en'))
  const themeLabel = theme === 'dark' ? t.nav.toLight : t.nav.toDark

  return (
    <>
      <a className="skip" href="#projects">
        {t.skip}
      </a>

      <header className={`topbar${scrolled ? ' is-scrolled' : ''}`}>
        <div className="topbar-inner glass">
          <a className="brand" href="#top">
            <Mark />
            <span>CouraLabs</span>
          </a>
          <nav aria-label={t.nav.label}>
            <ul className="nav-links">
              <li>
                <a href="#projects">{t.nav.projects}</a>
              </li>
              <li>
                <a href="#about">{t.nav.about}</a>
              </li>
              <li>
                <a href="#contact">{t.nav.contact}</a>
              </li>
            </ul>
          </nav>
          <div className="nav-tools">
            <button type="button" className="tool" onClick={toggleLang} aria-label={t.nav.lang} title={t.nav.lang}>
              {lang === 'en' ? 'PT' : 'EN'}
            </button>
            <button type="button" className="tool" onClick={toggleTheme} aria-label={themeLabel} title={themeLabel}>
              <ThemeIcon theme={theme} />
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title" data-focus={focus ?? undefined}>
          <div className="field" aria-hidden="true">
            {PROJECTS.map((pr) => (
              <div key={pr.id} className={`field-shape field-${pr.id}`}>
                <Shape id={pr.id} shaded className="field-drift" />
              </div>
            ))}
          </div>

          <div className="hero-pane glass">
            <h1 id="hero-title">{t.hero.title}</h1>
            <p className="hero-sub">{t.hero.sub}</p>

            <h2 className="visually-hidden">{t.hero.index}</h2>
            <ul className="index" onMouseLeave={() => setFocus(null)}>
              {PROJECTS.map((pr, i) => (
                <li key={pr.id}>
                  <a
                    href="#projects"
                    className="index-row"
                    style={{ '--c': `var(--c-${pr.id})`, '--ci': `var(--c-${pr.id}-ink)` } as CSSProperties}
                    onMouseEnter={() => setFocus(pr.id)}
                    onFocus={() => setFocus(pr.id)}
                    onBlur={() => setFocus(null)}
                    onClick={(e) => {
                      e.preventDefault()
                      choose(i, true)
                    }}
                  >
                    <Shape id={pr.id} className="index-glyph" />
                    <span className="index-name">{pr.name}</span>
                    <span className="index-kind">{t.project[pr.id].kind}</span>
                    <span className="index-badge">{t.project[pr.id].badge}</span>
                    <Arrow className="icon index-arrow" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="actions">
              <a className="btn btn-primary" href={LINKS.github} rel="noopener">
                {t.hero.primary}
                <Arrow />
              </a>
              <a className="btn btn-glass" href="#about">
                {t.hero.secondary}
              </a>
            </div>
          </div>
        </section>

        <section id="projects" className="projects section" aria-labelledby="projects-title">
          <div className="section-head" data-reveal>
            <h2 id="projects-title">{t.projects.title}</h2>
            <p>{t.projects.lead}</p>
          </div>

          <div className="projects-body">
            <div className="tabs" role="tablist" aria-label={t.projects.list} aria-orientation="vertical" data-reveal>
              {PROJECTS.map((pr, i) => (
                <button
                  key={pr.id}
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  role="tab"
                  id={`tab-${pr.id}`}
                  aria-selected={selected === i}
                  aria-controls="project-panel"
                  tabIndex={selected === i ? 0 : -1}
                  className="tab"
                  style={{ '--c': `var(--c-${pr.id})`, '--ci': `var(--c-${pr.id}-ink)` } as CSSProperties}
                  onClick={() => {
                    choose(i, false)
                    if (matchMedia('(max-width: 900px)').matches)
                      document.getElementById('project-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  onKeyDown={(e) => onTabKey(e, i)}
                >
                  <Shape id={pr.id} className="tab-glyph" />
                  <span className="tab-text">
                    <span className="tab-name">{pr.name}</span>
                    <span className="tab-kind">{t.project[pr.id].kind}</span>
                  </span>
                  <kbd className="tab-key" aria-hidden="true">
                    {i + 1}
                  </kbd>
                </button>
              ))}
            </div>

            <div className="stage" data-reveal>
              <div className="stage-shapes" aria-hidden="true">
                {PROJECTS.map((pr) => (
                  <div key={pr.id} className={`stage-shape stage-${pr.id}${pr.id === project.id ? ' is-active' : ''}`}>
                    <Shape id={pr.id} shaded />
                  </div>
                ))}
              </div>

              <article
                id="project-panel"
                className="panel glass"
                role="tabpanel"
                aria-labelledby={`tab-${project.id}`}
                style={{ '--c': `var(--c-${project.id})`, '--ci': `var(--c-${project.id}-ink)` } as CSSProperties}
              >
                <div className="panel-body" key={project.id + lang}>
                  <header className="panel-head">
                    <h3>{project.name}</h3>
                    <p className="panel-kind">{p.kind}</p>
                    <p className="status">
                      <span className="status-dot" aria-hidden="true" />
                      {p.status}
                    </p>
                  </header>
                  <ul className="lines">
                    {p.lines.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                  <dl className="facts">
                    {p.stats.map(([k, v, code]) => (
                      <div key={k}>
                        <dt>{k}</dt>
                        <dd>{code ? <code>{v}</code> : v}</dd>
                      </div>
                    ))}
                  </dl>
                  {p.run && <Run {...p.run} copy={t.projects.copy} copied={t.projects.copied} />}
                  <div className="actions">
                    <a className="btn btn-primary" href={project.repo} rel="noopener">
                      {t.projects.source}
                      <Arrow />
                    </a>
                    {project.live && (
                      <a className="btn btn-glass" href={`https://${project.site}`} rel="noopener">
                        {project.site}
                      </a>
                    )}
                  </div>
                  {!project.live && <p className="pending-note">{t.projects.siteSoon}. {t.projects.hosted}.</p>}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="about" className="about section" aria-labelledby="about-title">
          <div className="about-id" data-reveal>
            <h2 id="about-title" className="visually-hidden">
              {t.about.title}
            </h2>
            <p className="about-name">Rodrigo Coura</p>
            <p className="about-role">{t.about.role}</p>
            <a className="btn btn-glass" href={LINKS.linkedin} rel="noopener">
              {t.about.career}
              <Arrow />
            </a>
          </div>
          <div className="about-text" data-reveal>
            {t.about.bio.map((b) => (
              <p key={b}>{b}</p>
            ))}
            <dl className="facts facts-wide">
              {t.about.facts.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <h3 className="skills-title">{t.about.skillsTitle}</h3>
            <ul className="skills">
              {t.about.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className="contact" aria-labelledby="contact-title">
          <div className="contact-field" aria-hidden="true">
            {PROJECTS.map((pr) => (
              <div key={pr.id} className={`contact-shape contact-${pr.id}`}>
                <Shape id={pr.id} shaded className="field-drift" />
              </div>
            ))}
          </div>
          <div className="contact-pane glass" data-reveal>
            <h2 id="contact-title">{t.contact.title}</h2>
            <p>{t.contact.lead}</p>
            <div className="actions">
              <a className="btn btn-primary" href={LINKS.linkedin} rel="noopener">
                {t.contact.linkedin}
                <Arrow />
              </a>
              <a className="btn btn-glass" href={LINKS.github} rel="noopener">
                {t.contact.github}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          © {YEAR} {t.footer.line}
        </p>
        <p className="footer-note">{t.footer.disclaimer}</p>
        <div className="footer-tools">
          <a className="link-btn" href={LINKS.github} rel="noopener">
            {t.footer.github}
          </a>
          <button type="button" className="link-btn" onClick={toggleLang}>
            {t.nav.lang}
          </button>
          <button type="button" className="link-btn" onClick={toggleTheme}>
            {themeLabel}
          </button>
        </div>
      </footer>
    </>
  )
}
