import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import './App.css'
import { COPY, LINKS, PROJECTS, type Lang, type ProjectId } from './content'
import Logo from './Logo'
import PlotField from './PlotField'
import PlotSites from './PlotSites'
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
      <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ThemeIcon({ theme }: { theme: Theme }) {
  return (
    <svg className="icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      {theme === 'dark' ? (
        <>
          <circle cx="10" cy="10" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
            <path d="M10 2.5v1.6M10 15.9v1.6M2.5 10h1.6M15.9 10h1.6M4.7 4.7l1.1 1.1M14.2 14.2l1.1 1.1M4.7 15.3l1.1-1.1M14.2 5.8l1.1-1.1" />
          </g>
        </>
      ) : (
        <path d="M15.8 12.4A6.5 6.5 0 0 1 7.6 4.2a6.5 6.5 0 1 0 8.2 8.2Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      )}
    </svg>
  )
}

/** A pill label with its round arrow disc, the site's one action shape. */
function Cta({ href, children, ghost = false }: { href: string; children: ReactNode; ghost?: boolean }) {
  const external = href.startsWith('http')
  return (
    <a className={`cta${ghost ? ' cta-ghost' : ''}`} href={href} rel={external ? 'noopener' : undefined}>
      <span className="cta-label">{children}</span>
      <span className="cta-disc" aria-hidden="true">
        <Arrow />
      </span>
    </a>
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
          onClick={() =>
            navigator.clipboard?.writeText(code).then(
              () => setDone(true),
              () => {},
            )
          }
        >
          {done ? copied : copy}
        </button>
      </figcaption>
      <pre tabIndex={0}>
        <code>
          {code.split('\n').map((line, i) => (
            <span key={i} className="run-line">
              {line}
              {'\n'}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  )
}

/** Fades blocks below the fold in as they arrive; anything already on screen stays put. */
function useReveal() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const els = [...document.querySelectorAll<HTMLElement>('[data-reveal]')].filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.92)
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

/** With nothing hovered, the hero orbit plots each project in turn. */
function useAttract(paused: boolean) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (paused || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setI((n) => (n + 1) % PROJECTS.length), 4200)
    return () => clearInterval(id)
  }, [paused])
  return PROJECTS[i].id
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
  const attract = useAttract(focus !== null)
  const plotted = focus ?? attract

  useReveal()

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
    localStorage.setItem('cl-lang', lang)
  }, [lang, t])

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#f2f2f0')
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

  // Number keys pick a project from anywhere on the page.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.target !== document.body) return
      if (e.key >= '1' && e.key <= String(PROJECTS.length)) choose(Number(e.key) - 1, true)
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

  const toggleTheme = (e: ReactMouseEvent<HTMLElement>) => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    const root = document.documentElement
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTheme(next)
      return
    }
    const r = e.currentTarget.getBoundingClientRect()
    const x = r.left + r.width / 2
    const y = r.top + r.height / 2
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    root.classList.add('theme-switching')
    const vt = document.startViewTransition(() => flushSync(() => setTheme(next)))
    vt.ready.then(() =>
      root.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
        },
        {
          duration: 1000,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)',
        },
      ),
    )
    vt.finished.finally(() => root.classList.remove('theme-switching'))
  }
  const toggleLang = () => setLang((l) => (l === 'en' ? 'pt' : 'en'))
  const themeLabel = theme === 'dark' ? t.nav.toLight : t.nav.toDark
  const slash = (s: string) => `/${s.toLowerCase()}`

  return (
    <>
      <a className="skip" href="#projects">
        {t.skip}
      </a>

      <header className={`topbar${scrolled ? ' is-scrolled' : ''}`}>
        <div className="topbar-inner">
          <a className="brand" href="#top" aria-label="CouraLabs">
            <Logo />
            <span className="wordmark" aria-hidden="true">
              <span className="wm-coura">Coura</span>
              <span className="wm-labs">Labs</span>
            </span>
          </a>
          <nav aria-label={t.nav.label}>
            <ul className="nav-links">
              <li>
                <a href="#projects">{slash(t.nav.projects)}</a>
              </li>
              <li>
                <a href="#about">{slash(t.nav.about)}</a>
              </li>
              <li>
                <a href="#contact">{slash(t.nav.contact)}</a>
              </li>
            </ul>
          </nav>
          <div className="nav-tools">
            <button type="button" className="tool" onClick={toggleLang} aria-label={t.nav.lang} title={t.nav.lang}>
              {lang === 'en' ? 'PT' : 'EN'}
            </button>
            <button type="button" className="tool tool-theme" onClick={toggleTheme} aria-label={themeLabel} title={themeLabel}>
              <ThemeIcon theme={theme} />
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="sheet">
        <section className="hero cell" aria-labelledby="hero-title">
          <div className="hero-art" aria-hidden="true">
            <div className="bloom" />
            <PlotField plotted={plotted} />
            <svg className="orbit" viewBox="0 0 600 600" aria-hidden="true" focusable="false">
              <circle className="orbit-ring" cx="300" cy="300" r="286" pathLength="1" />
              <circle className="orbit-dots" cx="300" cy="300" r="214" pathLength="1" />
              <g className="orbit-ticks">
                <path d="M300 2v18M300 580v18M2 300h18M580 300h18" />
              </g>
              <g className="orbit-node">
                <circle cx="300" cy="14" r="5" />
              </g>
              <Shape key={plotted} id={plotted} className="orbit-shape" x={190} y={190} size={220} />
            </svg>
          </div>

          <p className="hero-note" aria-hidden="true">
            {t.hero.note.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </p>

          <h1 id="hero-title" className="hero-title">
            <span className="hero-line hero-line-a">
              <span>{t.hero.title[0]}</span>
            </span>{' '}
            <span className="hero-line hero-line-b">
              <span>{t.hero.title[1]}</span>
            </span>
          </h1>
          <div className="hero-side">
            <p className="hero-sub">{t.hero.sub}</p>
            <div className="actions">
              <Cta href={LINKS.github}>{t.hero.primary}</Cta>
              <a className="pill" href="#about">
                {t.hero.secondary}
              </a>
            </div>
          </div>

          <PlotSites
            label={t.hero.index}
            plotted={plotted}
            copy={t.project}
            open={t.hero.open}
            arrow={<Arrow className="icon site-arrow" />}
            onFocus={setFocus}
            onPick={(i) => choose(i, true)}
          />
        </section>

        <section id="projects" className="projects cell" aria-labelledby="projects-title">
          <span className="arc arc-projects" aria-hidden="true" />
          <div className="section-head" data-reveal>
            <p className="section-lead">{t.projects.lead}</p>
            <h2 id="projects-title" className="section-title">
              {slash(t.projects.title)}
            </h2>
          </div>

          <div className="projects-body">
            <div className="tabs-col">
              <div className="tabs-stack">
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
                      onClick={() => {
                        choose(i, false)
                        if (matchMedia('(max-width: 900px)').matches)
                          document.getElementById('project-panel')?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                          })
                      }}
                      onKeyDown={(e) => onTabKey(e, i)}
                    >
                      <kbd className="tab-key" aria-hidden="true">
                        {i + 1}
                      </kbd>
                      <span className="tab-text">
                        <span className="tab-name">{pr.name}</span>
                        <span className="tab-kind">{t.project[pr.id].kind}</span>
                      </span>
                      <Shape id={pr.id} className="glyph tab-glyph" />
                    </button>
                  ))}
                </div>
                <Shape key={project.id} id={project.id} className="tabs-shape" />
              </div>
            </div>

            <article id="project-panel" className="panel" role="tabpanel" aria-labelledby={`tab-${project.id}`}>
              <div className="panel-bar">
                <span className="panel-path">{project.repo.replace('https://', '')}</span>
                <p className="status">
                  <span className="status-dot" aria-hidden="true" />
                  {p.status}
                </p>
              </div>
              <div className="panel-body" key={project.id + lang}>
                <Shape id={project.id} className="panel-shape" />
                <header className="panel-head">
                  <h3>{project.name}</h3>
                  <p className="panel-kind">{p.kind}</p>
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
                  <Cta href={project.repo}>{t.projects.source}</Cta>
                  {project.live && (
                    <a className="pill" href={`https://${project.site}`} rel="noopener">
                      {project.site}
                    </a>
                  )}
                </div>
                {!project.live && (
                  <p className="pending-note">
                    {t.projects.siteSoon}. {t.projects.hosted}.
                  </p>
                )}
              </div>
            </article>
          </div>
        </section>

        <section id="about" className="about cell" aria-labelledby="about-title">
          <span className="arc arc-about" aria-hidden="true" />
          <div className="about-id" data-reveal>
            <h2 id="about-title" className="about-name">
              <span className="visually-hidden">{t.about.title}: </span>
              <span>Rodrigo</span> <span>Coura</span>
            </h2>
            <p className="about-role">{t.about.role}</p>
            <Cta href={LINKS.linkedin} ghost>
              {t.about.career}
            </Cta>
          </div>
          <div className="about-text" data-reveal>
            {t.about.bio.map((b) => (
              <p key={b}>{b}</p>
            ))}
            <dl className="ledger">
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

        <section id="contact" className="contact cell" aria-labelledby="contact-title">
          <div className="contact-clip" aria-hidden="true">
            <svg className="contact-art" viewBox="0 0 640 420" aria-hidden="true" focusable="false">
              <circle className="ca-big" cx="400" cy="210" r="196" />
              <circle className="ca-small" cx="176" cy="262" r="124" />
              <circle className="ca-dots" cx="400" cy="210" r="196" pathLength="1" />
              <circle className="ca-node" cx="569.7" cy="112" r="5" />
            </svg>
          </div>
          <div className="contact-body" data-reveal>
            <h2 id="contact-title">{t.contact.title}</h2>
            <p>{t.contact.lead}</p>
            <div className="actions">
              <Cta href={LINKS.linkedin}>{t.contact.linkedin}</Cta>
              <a className="pill" href={LINKS.github} rel="noopener">
                {t.contact.github}
              </a>
            </div>
          </div>
        </section>

        <footer className="footer cell">
          <div className="footer-row">
            <p>
              © {YEAR} {t.footer.line}
            </p>
            <div className="footer-tools">
              <a className="pill pill-sm" href={LINKS.github} rel="noopener">
                {t.footer.github}
              </a>
              <a className="pill pill-sm" href={LINKS.linkedin} rel="noopener">
                LinkedIn
              </a>
              <button type="button" className="pill pill-sm" onClick={toggleLang}>
                {t.nav.lang}
              </button>
              <button type="button" className="pill pill-sm" onClick={toggleTheme}>
                {themeLabel}
              </button>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
