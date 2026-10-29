export type Lang = 'en' | 'pt'

export const LINKS = {
  github: 'https://github.com/CouraLabs',
  linkedin: 'https://www.linkedin.com/in/rodrigo-r-coura/',
}

/** Flip `live` once a project's subdomain serves its landing page. */
export const PROJECTS = [
  { id: 'codeboros', name: 'Codeboros', repo: 'https://github.com/CouraLabs/Codeboros', site: 'codeboros.couralabs.dev', live: false },
  { id: 'openmixing', name: 'OpenMixing', repo: 'https://github.com/CouraLabs/OpenMixing', site: 'openmixing.couralabs.dev', live: false },
  { id: 'openhouse', name: 'OpenHouse', repo: 'https://github.com/CouraLabs/OpenHouse', site: 'openhouse.couralabs.dev', live: false },
] as const

export type ProjectId = (typeof PROJECTS)[number]['id']

/** [label, value, value is a command] */
type Stat = [string, string, boolean?]

type ProjectCopy = {
  kind: string
  badge: string
  status: string
  lines: string[]
  stats: Stat[]
  /** Real commands from the project's README; omitted while nothing is installable. */
  run?: { label: string; code: string }
}

type Copy = {
  meta: { title: string; description: string }
  skip: string
  nav: { label: string; projects: string; about: string; contact: string; lang: string; toDark: string; toLight: string }
  hero: { title: [string, string]; note: string[]; sub: string; index: string; open: string; primary: string; secondary: string }
  projects: { title: string; lead: string; list: string; source: string; site: string; soon: string; siteSoon: string; copy: string; copied: string; hosted: string }
  project: Record<ProjectId, ProjectCopy>
  about: {
    title: string
    role: string
    bio: string[]
    facts: [string, string][]
    skillsTitle: string
    skills: string[]
    career: string
  }
  contact: { title: string; lead: string; linkedin: string; github: string }
  footer: { line: string; github: string }
}

export const COPY: Record<Lang, Copy> = {
  en: {
    meta: {
      title: 'CouraLabs: open-source software with AI integrations',
      description:
        'CouraLabs is an independent studio by Rodrigo Coura. Codeboros, OpenMixing and OpenHouse: open source, self-hostable, with AI where it earns its place.',
    },
    skip: 'Skip to projects',
    nav: {
      label: 'Main',
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
      lang: 'Português',
      toDark: 'Switch to dark theme',
      toLight: 'Switch to light theme',
    },
    hero: {
      title: ['Open-source software', 'with AI integrations.'],
      note: ['Open source', 'Self-hostable', 'AI where it helps'],
      sub: 'I’m one developer in Brazil, and I build all of this. Run the released projects on your own server, or hang on for the hosted versions I’m putting online.',
      index: 'Projects',
      open: 'Open in /projects',
      primary: 'CouraLabs on GitHub',
      secondary: 'Who builds this',
    },
    projects: {
      title: 'Projects',
      lead: 'Three projects, all public. Everything on this page comes straight from each project’s own repo.',
      list: 'Choose a project',
      source: 'View source on GitHub',
      site: 'Project site',
      soon: 'soon',
      siteSoon: 'Project site: coming soon',
      copy: 'Copy',
      copied: 'Copied',
      hosted: 'Hosted version: not available yet',
    },
    project: {
      codeboros: {
        kind: 'A coding agent factory: self-host it, or use it as a paid service',
        badge: 'Pre-release',
        status: 'Pre-release: v1 is still being built',
        lines: [
          'Reviews your codebase and pull requests as often as you tell it to.',
          'Reproduces a reported bug first, before it says anything is fixed.',
          'Then it tests its own fix in a real browser and records the video.',
          'A named person reviews every fix before it can merge.',
        ],
        stats: [
          ['Stack', 'Bun, TypeScript, Docker Compose'],
          ['License', 'Apache 2.0'],
          ['Runs', 'On your infrastructure with your model keys, or as a paid hosted service once it launches'],
        ],
      },
      openmixing: {
        kind: 'Self-hosted MCP tools that mix your tracks like a DJ',
        badge: 'Usable now',
        status: 'Usable now, installed from source',
        lines: [
          'Point your agent at a folder of tracks.',
          'It works out tempo, key, energy and sections for every track.',
          'Then it builds a set: EQ, filters, tempo changes, effects, loops.',
          'The mix renders offline, and a local player shows every move it made.',
        ],
        stats: [
          ['Stack', 'Python, MCP over stdio, ffmpeg'],
          ['License', 'GPL 3.0'],
          ['Runs', 'Locally, on your own files'],
        ],
        run: { label: 'Install from source', code: 'git clone https://github.com/CouraLabs/OpenMixing.git\ncd OpenMixing\npython -m venv .venv && .venv/bin/pip install -e .[dev]' },
      },
      openhouse: {
        kind: 'Household management for the whole family: finances, pantry, food, pets and more',
        badge: 'Self-host today',
        status: 'Free to self-host today',
        lines: [
          'One shared home base that everyone in the family signs in to.',
          'Accounts and cards in USD, BRL and EUR, side by side.',
          'Recurring rules, category limits and savings goals.',
          'Hosted plans are planned, and one of them will have AI features.',
        ],
        stats: [
          ['Stack', 'PostgreSQL, NestJS, React'],
          ['Self-host', 'docker compose up', true],
          ['Runs', 'On your server, or hosted later'],
        ],
        run: { label: 'Self-host (set JWT_SECRET in .env first)', code: 'git clone https://github.com/CouraLabs/OpenHouse.git\ncd OpenHouse\ncp .env.example .env\ndocker compose up --build -d' },
      },
    },
    about: {
      title: 'About',
      role: 'Full-stack engineer',
      bio: [
        'I’m Rodrigo Coura. For over a decade I’ve built web software for healthcare, document platforms and enterprise ERPs, working remotely from Brazil for US companies.',
        'CouraLabs is where my own projects live. They’re open source, you can host them yourself, and AI only shows up where it actually helps.',
      ],
      facts: [
        ['Building software', 'Since 2011'],
        ['Based in', 'Brazil, working remotely'],
        ['Languages', 'Portuguese, English'],
      ],
      skillsTitle: 'Works with',
      skills: ['.NET and ASP.NET Core', 'Angular', 'React', 'Node.js', 'Azure', 'AI agents and tooling'],
      career: 'Full career on LinkedIn',
    },
    contact: {
      title: 'Let’s talk',
      lead: 'Want to use a project, contribute to one, or bring me onto your team? Come say hi.',
      linkedin: 'LinkedIn',
      github: 'GitHub',
    },
    footer: { line: 'CouraLabs, an independent studio in Brazil.', github: 'GitHub' },
  },
  pt: {
    meta: {
      title: 'CouraLabs: software open source com integrações de IA',
      description:
        'CouraLabs é um estúdio independente de Rodrigo Coura. Codeboros, OpenMixing e OpenHouse: open source, para hospedar onde você quiser, com IA onde ela faz diferença.',
    },
    skip: 'Pular para os projetos',
    nav: {
      label: 'Principal',
      projects: 'Projetos',
      about: 'Sobre',
      contact: 'Contato',
      lang: 'English',
      toDark: 'Mudar para o tema escuro',
      toLight: 'Mudar para o tema claro',
    },
    hero: {
      title: ['Software open\u00a0source', 'com integrações de IA.'],
      note: ['Open source', 'Auto-hospedável', 'IA onde ajuda'],
      sub: 'Sou um desenvolvedor no Brasil e construo tudo isso sozinho. Rode os projetos já lançados no seu servidor, ou espere as versões hospedadas que estou colocando no ar.',
      index: 'Projetos',
      open: 'Abrir em /projetos',
      primary: 'CouraLabs no GitHub',
      secondary: 'Quem constrói',
    },
    projects: {
      title: 'Projetos',
      lead: 'Três projetos, todos públicos. Tudo o que está aqui vem direto do repositório de cada um.',
      list: 'Escolha um projeto',
      source: 'Ver código no GitHub',
      site: 'Site do projeto',
      soon: 'em breve',
      siteSoon: 'Site do projeto: em breve',
      copy: 'Copiar',
      copied: 'Copiado',
      hosted: 'Versão hospedada: ainda não está disponível',
    },
    project: {
      codeboros: {
        kind: 'Uma fábrica de agentes de código: auto-hospede ou use como serviço pago',
        badge: 'Pré-lançamento',
        status: 'Pré-lançamento: a v1 ainda está sendo construída',
        lines: [
          'Revisa seu código e seus pull requests na frequência que você quiser.',
          'Reproduz o bug relatado primeiro, antes de dizer que corrigiu.',
          'Depois testa a própria correção num navegador de verdade e grava o vídeo.',
          'Uma pessoa responsável revisa cada correção antes do merge.',
        ],
        stats: [
          ['Stack', 'Bun, TypeScript, Docker Compose'],
          ['Licença', 'Apache 2.0'],
          ['Roda', 'Na sua infraestrutura com suas chaves de modelo, ou como serviço hospedado pago quando lançar'],
        ],
      },
      openmixing: {
        kind: 'Ferramentas MCP auto-hospedadas que mixam suas faixas como um DJ',
        badge: 'Já funciona',
        status: 'Já funciona, instalado pelo código-fonte',
        lines: [
          'Aponte seu agente para uma pasta de músicas.',
          'Ele descobre andamento, tom, energia e seções de cada faixa.',
          'Depois monta um set: EQ, filtros, mudanças de andamento, efeitos e loops.',
          'A mixagem é renderizada offline, e um player local mostra cada movimento dele.',
        ],
        stats: [
          ['Stack', 'Python, MCP via stdio, ffmpeg'],
          ['Licença', 'GPL 3.0'],
          ['Roda', 'Localmente, nos seus arquivos'],
        ],
        run: { label: 'Instalar pelo código-fonte', code: 'git clone https://github.com/CouraLabs/OpenMixing.git\ncd OpenMixing\npython -m venv .venv && .venv/bin/pip install -e .[dev]' },
      },
      openhouse: {
        kind: 'Gestão da casa para toda a família: finanças, despensa, comida, pets e mais',
        badge: 'Auto-hospede hoje',
        status: 'Grátis para auto-hospedar hoje',
        lines: [
          'Um espaço compartilhado em que toda a família entra.',
          'Contas e cartões em USD, BRL e EUR, lado a lado.',
          'Lançamentos recorrentes, limites por categoria e metas de economia.',
          'Planos hospedados estão previstos, e um deles terá recursos de IA.',
        ],
        stats: [
          ['Stack', 'PostgreSQL, NestJS, React'],
          ['Auto-hospedar', 'docker compose up', true],
          ['Roda', 'No seu servidor, ou hospedado depois'],
        ],
        run: { label: 'Auto-hospedar (defina JWT_SECRET no .env antes)', code: 'git clone https://github.com/CouraLabs/OpenHouse.git\ncd OpenHouse\ncp .env.example .env\ndocker compose up --build -d' },
      },
    },
    about: {
      title: 'Sobre',
      role: 'Engenheiro full-stack',
      bio: [
        'Sou Rodrigo Coura. Há mais de dez anos eu construo software web para saúde, plataformas de documentos e ERPs, trabalhando remoto do Brasil para empresas dos EUA.',
        'A CouraLabs é onde moram os meus projetos. São open source, você pode hospedar onde quiser, e a IA só entra onde ela realmente ajuda.',
      ],
      facts: [
        ['Desenvolvendo software', 'Desde 2011'],
        ['Base', 'Brasil, trabalhando remoto'],
        ['Idiomas', 'Português, inglês'],
      ],
      skillsTitle: 'Trabalha com',
      skills: ['.NET e ASP.NET Core', 'Angular', 'React', 'Node.js', 'Azure', 'Agentes e ferramentas de IA'],
      career: 'Carreira completa no LinkedIn',
    },
    contact: {
      title: 'Vamos conversar',
      lead: 'Quer usar um projeto, contribuir ou me chamar para o seu time? Manda um oi.',
      linkedin: 'LinkedIn',
      github: 'GitHub',
    },
    footer: { line: 'CouraLabs, um estúdio independente no Brasil.', github: 'GitHub' },
  },
}
