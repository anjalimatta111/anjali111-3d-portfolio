import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import {
  ArrowRight,
  Sparkles,
  GraduationCap,
  BookOpen,
  Rocket,
  Target,
  Mail,
  Cpu,
} from "lucide-react";

const AIScene = lazy(() => import("@/components/AIScene"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anjali Matta — AI & Data Science Student Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Anjali Matta, a first-year B.Tech Artificial Intelligence & Data Science student at JECRC University.",
      },
      {
        property: "og:title",
        content: "Anjali Matta — AI & Data Science Student Portfolio",
      },
      {
        property: "og:description",
        content:
          "First-year B.Tech AI & Data Science student at JECRC University, building her foundations step by step.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "learning", label: "Learning" },
  { id: "projects", label: "Projects" },
  { id: "goals", label: "Goals" },
  { id: "contact", label: "Contact" },
];

function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">
        <span className="ink-text">{title}</span>
      </h2>
      {intro ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {intro}
        </p>
      ) : null}
    </div>
  );
}

function Card({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass lift rounded-3xl p-7">
      <div className="flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
        {icon}
      </div>
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {children}
      </p>
    </div>
  );
}

function Portfolio() {
  const mounted = useMounted();

  return (
    <div className="relative min-h-screen overflow-x-hidden aurora">
      <header className="fixed inset-x-0 top-4 z-50 px-4">
        <nav className="glass mx-auto flex max-w-4xl items-center justify-between gap-4 rounded-full px-4 py-2.5">
          <a href="#home" className="flex items-center gap-2 pl-2">
            <span className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              AM
            </span>
            <span className="text-sm font-semibold">Anjali Matta</span>
          </a>
          <ul className="hidden items-center gap-1 md:flex">
            {NAV.slice(1).map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Let&apos;s Connect
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-8 px-6 pt-32 pb-16 lg:flex-row lg:pt-24"
      >
        <div className="relative z-10 flex-1 rise-in text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" />
            First-year B.Tech student
          </span>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.05] sm:text-6xl xl:text-7xl">
            <span className="ink-text">Anjali Matta</span>
          </h1>
          <p className="mt-4 text-lg font-medium text-secondary-foreground">
            Artificial Intelligence &amp; Data Science · JECRC University
          </p>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground lg:mx-0">
            I&apos;m at the very beginning of my journey in AI and data science.
            This space is where I&apos;ll share what I learn, what I build, and
            how I grow through my degree — honestly and step by step.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a
              href="#about"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5"
            >
              Explore My Portfolio
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
            >
              Let&apos;s Connect
            </a>
          </div>
        </div>

        <div className="relative h-[340px] w-full flex-1 sm:h-[440px] lg:h-[600px]">
          <div className="absolute inset-0 float-soft">
            {mounted ? (
              <Suspense fallback={null}>
                <AIScene />
              </Suspense>
            ) : null}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          eyebrow="About"
          title="Curious, and just getting started"
          intro="A short, honest introduction — no titles I haven't earned yet."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card icon={<Cpu className="size-5" />} title="Who I am">
            A first-year B.Tech student specialising in Artificial Intelligence
            and Data Science at JECRC University.
          </Card>
          <Card icon={<BookOpen className="size-5" />} title="Where I am now">
            Focused on building strong fundamentals through my coursework rather
            than rushing ahead of what I actually know.
          </Card>
          <Card icon={<Sparkles className="size-5" />} title="How I work">
            I like learning in the open — sharing progress as it happens,
            including the parts that are still in progress.
          </Card>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="mx-auto max-w-4xl px-6 py-24">
        <SectionHeading eyebrow="Education" title="My academic path" />
        <div className="glass mt-12 rounded-3xl p-8 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <GraduationCap className="size-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                B.Tech — Artificial Intelligence &amp; Data Science
              </h3>
              <p className="mt-1 text-sm font-medium text-primary">
                JECRC University
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Currently in my first year of the programme, building the
                foundations of computing, mathematics and data that the rest of
                the degree is built on.
              </p>
              <span className="mt-5 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                First year · In progress
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* LEARNING */}
      <section id="learning" className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          eyebrow="Learning"
          title="What I'm working on understanding"
          intro="These are areas my degree is introducing me to — a map of my journey, not a list of mastered skills."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card icon={<BookOpen className="size-5" />} title="Core foundations">
            The introductory computing and mathematics subjects that form the
            first year of the programme.
          </Card>
          <Card icon={<Cpu className="size-5" />} title="Intro to AI concepts">
            Getting familiar with what artificial intelligence actually is,
            starting from the basics.
          </Card>
          <Card icon={<Sparkles className="size-5" />} title="Data thinking">
            Learning how data is collected, described and reasoned about before
            any conclusions are drawn.
          </Card>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="mx-auto max-w-4xl px-6 py-24">
        <div className="glass relative overflow-hidden rounded-[2rem] p-10 text-center sm:p-16">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
            <Rocket className="size-7" />
          </div>
          <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">
            <span className="ink-text">Projects — Coming Soon</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            I haven&apos;t published any projects yet. As I move through my
            first year and start building, this section will fill up with real
            work — nothing placed here before it exists.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {["First build", "Coming soon", "Watch this space"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-dashed border-border px-4 py-2 text-xs text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* GOALS */}
      <section id="goals" className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          eyebrow="Goals"
          title="Where I want this to go"
          intro="Intentions for the years ahead, written as goals rather than achievements."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card icon={<Target className="size-5" />} title="Build real depth">
            Understand the fundamentals of AI and data science properly instead
            of collecting surface-level buzzwords.
          </Card>
          <Card icon={<Rocket className="size-5" />} title="Ship first projects">
            Turn what I learn into small, honest projects I can explain end to
            end.
          </Card>
          <Card icon={<Sparkles className="size-5" />} title="Keep growing">
            Stay curious throughout the degree and keep this portfolio an
            accurate reflection of my progress.
          </Card>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-4xl px-6 py-24 pb-32">
        <div className="glass rounded-[2rem] p-10 text-center sm:p-16">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Mail className="size-7" />
          </div>
          <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">
            <span className="ink-text">Let&apos;s Connect</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            I&apos;m always open to conversations about learning, AI and data
            science — whether that&apos;s advice, study groups or simply saying
            hello.
          </p>
          <p className="mx-auto mt-6 max-w-md rounded-2xl bg-secondary px-5 py-4 text-sm text-secondary-foreground">
            Contact details haven&apos;t been added yet. Share the email or
            profile links you&apos;d like here and they&apos;ll appear as
            buttons in this section.
          </p>
        </div>
        <footer className="mt-16 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Anjali Matta · B.Tech AI &amp; Data
          Science, JECRC University
        </footer>
      </section>
    </div>
  );
}
