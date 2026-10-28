# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- **Primary: developers who work with AI agents.** They arrive from GitHub, a README, or a shared link and want to know what each CouraLabs project does and whether it's worth installing or starring.
- **Users of the hosted versions.** CouraLabs will also run its open-source projects as hosted services, so some visitors want to use a project without installing or self-hosting it. Which projects get hosted versions, when, and on what terms (free or paid, sign-up) is not decided yet.
- **People who might hire Rodrigo Coura.** They want to see the quality of his independent work and then check his career on LinkedIn.

## Product Purpose
couralabs.dev is the CouraLabs company site. It presents CouraLabs as an independent studio that builds open-source software with AI integrations, introduces the featured projects and explains what each one does, and sends visitors on: developers to the project repositories, users to the hosted version where one exists, and people hiring to Rodrigo's LinkedIn. It works when a developer leaves knowing which project fits their need and where to get it, a user knows whether they can use a project hosted or need to run it themselves, and a recruiter leaves with a clear picture of who builds CouraLabs and how to reach him.

## Positioning
CouraLabs is an independent studio that builds open-source software with AI integrations. It is one developer's company: the projects are real, public repositories under github.com/CouraLabs, the same person who builds them also hosts them, and he is named and reachable. Every project can be self-hosted from source or, where offered, used as a CouraLabs-hosted service.

## Operating Context
- Featured projects (only these three for now):
  - **Codeboros**: a self-hosted autonomous coding-agent service. It reviews codebases and pull requests, reproduces reported issues before fixing them, QA-verifies its own fixes on recorded video, and keeps a human reviewing every applied fix. It is pre-v1 and nothing is installable yet. Repo: `CouraLabs/Codeboros` (renamed from Uroboros; the local folder `../Uroboros` still has the old name).
  - **OpenMixing**: an MCP server that lets an agent DJ a folder of tracks. It analyzes the tracks, builds a set with EQ, filter, tempo, fx and loops, renders it offline, and plays the result in a local web player. Repo: `CouraLabs/OpenMixing`.
  - **OpenHouse**: an open-source household finance app. Everyone in a household signs in to one shared ledger of accounts, transactions, limits and goals, and anyone can run it on their own server for free. Repo: `CouraLabs/OpenHouse` (source: `../OpenHouse/README.md`, `../OpenHouse/PRODUCT.md`).
- Each featured project has its own landing page on a subdomain: codeboros.couralabs.dev, openmixing.couralabs.dev, openhouse.couralabs.dev. couralabs.dev is the studio hub and links to each one. The user wrote "coreboros" once; the name is Codeboros, so the subdomain is recorded as codeboros (confirm when the DNS is set up).
- Other CouraLabs projects exist (KraudeKode, Picobu, claude-adhd, claude-ui-mod, pi-extensions). They are left off the site for now; don't add them unless the user asks.
- Founder: Rodrigo Coura, a full-stack engineer working remotely from Brazil for US companies, with more than ten years of experience (.NET, Angular, React, Node.js, Azure, AI tooling). Source: `../REsume.pdf`.

## Capabilities and Constraints
- Existing scaffold: Vite + React 19 + TypeScript, with the React Compiler and Oxlint. The output is a static site.
- Hosting: Cloudflare, at the domain `couralabs.dev`.
- Languages: English and Portuguese, with a way to switch between them. Both versions carry the same content.
- Resume: no resume page or PDF on the site. "Resume" or "Hire" links go to https://www.linkedin.com/in/rodrigo-r-coura/.
- Contact: LinkedIn and the GitHub org (https://github.com/CouraLabs). Don't show an email address.
- Project status must be stated honestly; Codeboros is pre-release.
- Hosted versions: no hosted instance is live yet. Never show a hosted link, pricing, or sign-up flow until it exists and its terms are decided.
- Open: whether the project landing pages live in this repository or in each project's repository, and whether a hosted app shares its project's subdomain.

## Brand Commitments
- The name is "CouraLabs" (one word, capital C and L). Project names: "Codeboros", "OpenMixing" and "OpenHouse".
- There is no final logo. The explorations in `../Logos/couralabs` and `../Logos/coura-labs` are not binding.
- KraudeKode's public disclaimer pattern applies to anything Claude-related: CouraLabs is independent and not affiliated with Anthropic.

## Evidence on Hand
- The project READMEs: `../Uroboros/README.md`, `../OpenMixing/README.md` and `../OpenHouse/README.md`. OpenMixing also has `../OpenMixing/PRODUCT.md`.
- The resume, as source material only: `../REsume.pdf`.
- There are no testimonials, user counts, star counts, benchmarks, press, or customer logos. Don't invent any. Live GitHub data may be shown only if it is fetched for real.

## Product Principles
- Show real work: every project claim must trace back to a repository or README.
- Developers come first: what each project does, and where to get it, should be clear without scrolling through a biography.
- Two ways in: each project shows both how to self-host it and whether a hosted version exists.
- Keep it honest: pre-release means pre-release, and the studio is one person.
- The person behind the work is visible, and reaching him is one click away.
- English and Portuguese are equal versions, not a translation added afterwards.
