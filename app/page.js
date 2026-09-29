"use client";
import { useState } from "react";

const me = {
  name: "Lorence Talay",
  location: "Airdrie / Calgary, AB",
  email: "Talay.lorence123@gmail.com",
  phone: "587-578-3720",
  github: "https://github.com/Lorencet1",
  resume: "/resume.pdf",
};

const hero = {
  then: {
    line1: "Years of fixing",
    line2: "problems on the floor.",
    sub: "Most of my time was in produce at Save-On-Foods, plus a stint as team lead at Tim Hortons. Fresh stock, busy shifts, and customers who needed answers fast.",
  },
  now: {
    line1: "Now I fix them",
    line2: "in code.",
    sub: "SAIT Software Development grad building web apps with React and Next.js and backends in Python.",
  },
};

const coreSkills = [
  { name: "HTML", text: "Structure" },
  { name: "CSS", text: "Styling & layout" },
  { name: "JavaScript", text: "Interactivity" },
  { name: "Python", text: "Backends & scripts" },
  { name: "Git & GitHub", text: "Version control" },
];

const skills = [
  {
    then: { title: "Rotating produce", text: "Oldest stock to the front, newest to the back, so nothing went to waste." },
    now: { title: "Queues and data flow", text: "First in, first out is how ticket queues and job pipelines work too." },
  },
  {
    then: { title: "Keeping the department stocked", text: "Tracked what was running low and planned orders before shelves went empty." },
    now: { title: "Managing state", text: "Keep app data accurate and up to date so the screen always shows the truth." },
  },
  {
    then: { title: "A customer with a question", text: "Listened, found what they actually needed, and made it right on the spot." },
    now: { title: "A bug report", text: "Reproduce the issue, trace the root cause, and ship a fix." },
  },
  {
    then: { title: "Leading a busy shift", text: "As team lead at Tim Hortons, kept orders moving and trained new staff." },
    now: { title: "Working on a team", text: "Clear communication, shared Git workflows, and docs that help others get started." },
  },
];

const projects = [
  {
    title: "Help desk ticketing system",
    type: "Backend / IT",
    summary: "A REST API for IT support teams to create, prioritize, assign, and resolve tickets.",
    details: [
      "Built with FastAPI, with SQLAlchemy models on a SQLite database.",
      "Tracks every status change so each ticket has a full history.",
      "Designed with object-oriented Python to keep the code organized as it grows.",
      "A simplified version runs in the demo section above, so you can try the workflow right here.",
    ],
    tools: ["Python", "FastAPI", "SQLAlchemy", "SQLite"],
    note: "Self-directed project",
    repo: "https://github.com/Lorencet1",
    demo: "#demo",
    video: "",
  },
  {
    title: "Workout tracker",
    type: "Front end / React",
    summary: "A lightweight tracker for logging exercises by sets, reps, and weight, with live totals for each session.",
    details: [
      "Log any exercise with its sets, reps, and weight, and see it added to your session instantly.",
      "Calculates total sets and total volume (sets × reps × weight) as you log, so progress is easy to see.",
      "Validates input with clear messages, like asking for an exercise name before logging.",
      "Built with React state and Tailwind CSS, and it runs live in the demo section above.",
    ],
    tools: ["React", "JavaScript", "Tailwind CSS"],
    note: "Built for this portfolio",
    repo: "https://github.com/Lorencet1",
    demo: "#demo",
    video: "",
  },
];

const stack = {
  "Languages": ["HTML", "CSS", "JavaScript", "Python"],
  "Frameworks & libraries": ["React", "Next.js", "React Native", "Node.js", "Express.js", "FastAPI", "Tailwind CSS"],
  "Version control": ["Git", "GitHub"],
};

const STATUSES = ["Open", "In progress", "Resolved"];
const PRIORITIES = ["Low", "Medium", "High"];

function ModeSwitch({ mode, setMode }) {
  return (
    <div className="inline-flex rounded-full border border-line bg-card p-1" role="group" aria-label="Switch between then and now">
      {["then", "now"].map((m) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          aria-pressed={mode === m}
          className={`rounded-full px-5 py-2 text-sm font-medium capitalize transition-colors ${
            mode === m ? "bg-forest text-bg" : "text-muted hover:text-ink"
          }`}
        >
          {m}
        </button>
      ))}
    </div>
  );
}

function LinkBtn({ href, children, primary }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className={`inline-block rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
        primary ? "bg-forest text-bg hover:bg-ink" : "border border-ink/20 hover:border-ink"
      }`}
    >
      {children}
    </a>
  );
}

function HelpDesk() {
  const [tickets, setTickets] = useState([
    { id: 1041, title: "Printer on floor 2 won't connect", priority: "Medium", status: "In progress" },
    { id: 1040, title: "Password reset for new hire", priority: "High", status: "Resolved" },
  ]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");

  const nextId = Math.max(...tickets.map((t) => t.id)) + 1;

  function create() {
    if (!title.trim()) {
      setError("Describe the issue to create a ticket.");
      return;
    }
    setTickets([{ id: nextId, title: title.trim(), priority, status: "Open" }, ...tickets]);
    setTitle("");
    setError("");
  }

  function advance(id) {
    setTickets(tickets.map((t) =>
      t.id === id ? { ...t, status: STATUSES[Math.min(STATUSES.indexOf(t.status) + 1, 2)] } : t
    ));
  }

  const open = tickets.filter((t) => t.status !== "Resolved").length;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
      <div className="rounded-2xl bg-bg p-6 text-ink sm:p-8">
        <h3 className="text-xl font-semibold">Report an issue</h3>
        <label htmlFor="issue" className="mt-5 block text-sm text-muted">What&apos;s wrong?</label>
        <input
          id="issue"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && create()}
          placeholder="e.g. Can't log in to email"
          className="mt-2 w-full rounded-lg border border-line bg-card px-4 py-3 outline-none focus:border-forest"
        />
        {error && <p className="mt-2 text-sm text-[#A33A2B]">{error}</p>}
        <p className="mt-5 text-sm text-muted">Priority</p>
        <div className="mt-2 flex gap-2">
          {PRIORITIES.map((p) => (
            <button
              key={p}
              onClick={() => setPriority(p)}
              aria-pressed={priority === p}
              className={`flex-1 rounded-lg border px-3 py-2 text-sm transition-colors ${
                priority === p ? "border-forest bg-mint font-medium" : "border-line hover:border-muted"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <button onClick={create} className="mt-6 w-full rounded-full bg-forest py-3 font-medium text-bg hover:bg-ink">
          Create ticket
        </button>
      </div>

      <div>
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="text-xl font-semibold">Queue</h3>
          <span className="text-sm text-bg/70">{open} open</span>
        </div>
        <ul className="flex flex-col gap-2">
          {tickets.map((t) => (
            <li key={t.id} className="pop flex items-center gap-4 rounded-xl bg-bg/10 px-4 py-3">
              <span className="font-mono text-sm text-bg/60">#{t.id}</span>
              <div className="min-w-0 flex-1">
                <p className={`truncate ${t.status === "Resolved" ? "text-bg/50 line-through" : ""}`}>{t.title}</p>
                <p className="text-xs text-bg/60">{t.priority} priority</p>
              </div>
              <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                t.status === "Open" ? "bg-tag text-ink" : t.status === "In progress" ? "bg-mint text-forest" : "bg-bg/15 text-bg/70"
              }`}>
                {t.status}
              </span>
              {t.status !== "Resolved" && (
                <button onClick={() => advance(t.id)} className="shrink-0 rounded-full border border-bg/30 px-3 py-1 text-xs hover:bg-bg hover:text-forest">
                  {t.status === "Open" ? "Start" : "Resolve"}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function WorkoutTracker() {
  const [log, setLog] = useState([
    { id: 2, name: "Bench press", sets: 3, reps: 8, weight: 135 },
    { id: 1, name: "Squat", sets: 3, reps: 5, weight: 185 },
  ]);
  const [form, setForm] = useState({ name: "", sets: "3", reps: "10", weight: "" });
  const [error, setError] = useState("");

  function update(field, value) {
    setForm({ ...form, [field]: value });
  }

  function add() {
    const sets = parseInt(form.sets, 10);
    const reps = parseInt(form.reps, 10);
    const weight = form.weight === "" ? 0 : parseFloat(form.weight);

    if (!form.name.trim()) {
      setError("Enter an exercise name to log it.");
      return;
    }
    if (!(sets > 0) || !(reps > 0)) {
      setError("Sets and reps need to be at least 1.");
      return;
    }
    if (isNaN(weight) || weight < 0) {
      setError("Weight can't be negative. Leave it blank for bodyweight.");
      return;
    }

    const id = Math.max(0, ...log.map((e) => e.id)) + 1;
    setLog([{ id, name: form.name.trim(), sets, reps, weight }, ...log]);
    setForm({ ...form, name: "", weight: "" });
    setError("");
  }

  function remove(id) {
    setLog(log.filter((e) => e.id !== id));
  }

  const totalSets = log.reduce((sum, e) => sum + e.sets, 0);
  const totalVolume = log.reduce((sum, e) => sum + e.sets * e.reps * e.weight, 0);

  const inputClass = "mt-2 w-full rounded-lg border border-line bg-card px-4 py-3 outline-none focus:border-forest";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
      <div className="rounded-2xl bg-bg p-6 text-ink sm:p-8">
        <h3 className="text-xl font-semibold">Log an exercise</h3>
        <label htmlFor="exercise" className="mt-5 block text-sm text-muted">Exercise</label>
        <input
          id="exercise"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="e.g. Deadlift"
          className={inputClass}
        />
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div>
            <label htmlFor="sets" className="block text-sm text-muted">Sets</label>
            <input id="sets" type="number" min="1" value={form.sets} onChange={(e) => update("sets", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="reps" className="block text-sm text-muted">Reps</label>
            <input id="reps" type="number" min="1" value={form.reps} onChange={(e) => update("reps", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="weight" className="block text-sm text-muted">Weight (lb)</label>
            <input id="weight" type="number" min="0" value={form.weight} onChange={(e) => update("weight", e.target.value)} placeholder="0" className={inputClass} />
          </div>
        </div>
        {error && <p className="mt-3 text-sm text-[#A33A2B]">{error}</p>}
        <button onClick={add} className="mt-6 w-full rounded-full bg-forest py-3 font-medium text-bg hover:bg-ink">
          Log exercise
        </button>
      </div>

      <div>
        <div className="mb-4 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-bg/10 px-4 py-3">
            <p className="text-2xl font-semibold">{log.length}</p>
            <p className="text-xs text-bg/60">Exercises</p>
          </div>
          <div className="rounded-xl bg-bg/10 px-4 py-3">
            <p className="text-2xl font-semibold">{totalSets}</p>
            <p className="text-xs text-bg/60">Total sets</p>
          </div>
          <div className="rounded-xl bg-bg/10 px-4 py-3">
            <p className="text-2xl font-semibold">{totalVolume.toLocaleString()}</p>
            <p className="text-xs text-bg/60">Volume (lb)</p>
          </div>
        </div>
        <h3 className="mb-3 text-xl font-semibold">Today&apos;s session</h3>
        {log.length === 0 ? (
          <p className="rounded-xl bg-bg/10 px-4 py-6 text-center text-bg/70">No exercises yet. Log one to start your session.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {log.map((e) => (
              <li key={e.id} className="pop flex items-center gap-4 rounded-xl bg-bg/10 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{e.name}</p>
                  <p className="text-xs text-bg/60">
                    {e.sets} × {e.reps} {e.weight > 0 ? `@ ${e.weight} lb` : "bodyweight"}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-mint px-3 py-1 text-xs font-medium text-forest">
                  {(e.sets * e.reps * e.weight).toLocaleString()} lb
                </span>
                <button onClick={() => remove(e.id)} className="shrink-0 rounded-full border border-bg/30 px-3 py-1 text-xs hover:bg-bg hover:text-forest">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const demos = {
  helpdesk: {
    label: "Help desk",
    text: "A small version of my ticketing system, running right in your browser. Create a ticket and work it through the queue.",
    Component: HelpDesk,
  },
  workout: {
    label: "Workout tracker",
    text: "Log an exercise with sets, reps, and weight, and watch your session totals update as you go.",
    Component: WorkoutTracker,
  },
};

function ProjectCard({ p, open, onToggle }) {
  return (
    <article className="rounded-2xl border border-line bg-card">
      <button onClick={onToggle} aria-expanded={open} className="flex w-full items-center gap-4 p-6 text-left sm:p-8">
        <div className="flex-1">
          <p className="text-sm text-forest">{p.type}</p>
          <h3 className="mt-1 text-2xl font-semibold">{p.title}</h3>
          <p className="mt-2 text-muted">{p.summary}</p>
        </div>
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-xl transition-transform ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && (
        <div className="pop border-t border-line px-6 pb-8 pt-6 sm:px-8">
          {p.note && <p className="mb-4 inline-block rounded-full bg-tag px-3 py-1 text-xs font-medium">{p.note}</p>}
          <ul className="flex flex-col gap-3 text-muted">
            {p.details.map((d) => <li key={d}>{d}</li>)}
          </ul>
          <ul className="mt-5 flex flex-wrap gap-2">
            {p.tools.map((t) => <li key={t} className="rounded-full bg-mint px-3 py-1 text-xs text-forest">{t}</li>)}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <LinkBtn href={p.demo} primary>Try the demo</LinkBtn>
            <LinkBtn href={p.video} primary={!p.demo}>Watch walkthrough</LinkBtn>
            <LinkBtn href={p.repo}>View code</LinkBtn>
          </div>
        </div>
      )}
    </article>
  );
}

export default function Home() {
  const [mode, setMode] = useState("now");
  const [openProject, setOpenProject] = useState(0);
  const [demo, setDemo] = useState("helpdesk");
  const h = hero[mode];
  const ActiveDemo = demos[demo].Component;

  return (
    <>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
        <a href="#" className="text-lg font-semibold">{me.name}</a>
        <nav className="flex gap-6 text-sm text-muted">
          <a href="#skills" className="hover:text-ink">Skills</a>
          <a href="#demo" className="hover:text-ink">Demo</a>
          <a href="#work" className="hover:text-ink">Work</a>
          <a href="#contact" className="hover:text-ink">Contact</a>
        </nav>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-5 pb-16 pt-12 sm:px-8 sm:pt-20">
          <ModeSwitch mode={mode} setMode={setMode} />
          <h1 key={mode} className="swap mt-8 text-[clamp(2.75rem,8vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.03em]">
            {h.line1}
            <br />
            <span className={mode === "now" ? "text-forest" : "text-muted"}>{h.line2}</span>
          </h1>
          <p key={mode + "sub"} className="swap mt-8 max-w-[52ch] text-lg text-muted" style={{ animationDelay: "0.08s" }}>
            {h.sub}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <LinkBtn href="#work" primary>See my work</LinkBtn>
            <LinkBtn href={me.resume}>Resume</LinkBtn>
            <span className="ml-2 flex items-center gap-2 text-sm text-muted">
              <span className="h-2 w-2 rounded-full bg-forest" /> Open to entry-level dev and IT roles
            </span>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
          <h2 className="mb-5 text-sm font-medium text-muted">Core skills</h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {coreSkills.map((s) => (
              <li key={s.name} className="rounded-2xl border border-line bg-card px-5 py-4">
                <p className="text-lg font-semibold">{s.name}</p>
                <p className="text-sm text-muted">{s.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="skills" className="scroll-mt-8 border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <h2 className="text-4xl font-bold tracking-tight">Same skills, new tools</h2>
                <p className="mt-3 max-w-[55ch] text-muted">
                  Flip the switch to see how the floor prepared me for code.
                </p>
              </div>
              <ModeSwitch mode={mode} setMode={setMode} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {skills.map((s, i) => {
                const side = s[mode];
                return (
                  <div
                    key={i}
                    className={`rounded-2xl border p-6 transition-colors duration-300 sm:p-8 ${
                      mode === "now" ? "border-forest/20 bg-mint" : "border-line bg-card"
                    }`}
                  >
                    <div key={mode} className="swap">
                      <p className="text-sm text-muted">{mode === "now" ? "In code" : "On the floor"}</p>
                      <h3 className="mt-2 text-2xl font-semibold">{side.title}</h3>
                      <p className="mt-2 text-muted">{side.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="demo" className="scroll-mt-8 bg-forest text-bg">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <h2 className="text-4xl font-bold tracking-tight">Try my projects</h2>
                <p key={demo} className="swap mt-3 max-w-[58ch] text-bg/75">{demos[demo].text}</p>
              </div>
              <div className="inline-flex rounded-full border border-bg/30 p-1" role="group" aria-label="Choose a demo">
                {Object.entries(demos).map(([key, d]) => (
                  <button
                    key={key}
                    onClick={() => setDemo(key)}
                    aria-pressed={demo === key}
                    className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                      demo === key ? "bg-bg text-forest" : "text-bg/75 hover:text-bg"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
            <ActiveDemo key={demo} />
          </div>
        </section>

        <section id="work" className="scroll-mt-8 mx-auto max-w-6xl px-5 py-24 sm:px-8">
          <h2 className="mb-10 text-4xl font-bold tracking-tight">Projects</h2>
          <div className="flex flex-col gap-4">
            {projects.map((p, i) => (
              <ProjectCard
                key={p.title}
                p={p}
                open={openProject === i}
                onToggle={() => setOpenProject(openProject === i ? -1 : i)}
              />
            ))}
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
            <h2 className="mb-10 text-4xl font-bold tracking-tight">What I build with</h2>
            <div className="grid gap-10 sm:grid-cols-2">
              {Object.entries(stack).map(([group, items]) => (
                <div key={group}>
                  <h3 className="mb-4 text-lg font-semibold text-forest">{group}</h3>
                  <ul className="flex flex-wrap gap-3">
                    {items.map((s) => (
                      <li key={s} className="rounded-full border border-line bg-card px-4 py-2 text-lg">{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-8 mx-auto max-w-6xl px-5 pb-24 sm:px-8">
          <div className="rounded-3xl bg-ink px-6 py-14 text-bg sm:px-12 sm:py-20">
            <h2 className="max-w-[16ch] text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-none tracking-tight">
              Got a problem that needs fixing?
            </h2>
            <p className="mt-5 max-w-[50ch] text-bg/70">
              I&apos;m looking for entry-level developer and IT roles in Calgary or remote.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${me.email}`} className="rounded-full bg-tag px-6 py-3 font-medium text-ink hover:bg-bg">Email me</a>
              <a href={`tel:+1${me.phone.replace(/\D/g, "")}`} className="rounded-full border border-bg/30 px-6 py-3 hover:border-bg">Call {me.phone}</a>
              <a href={me.github} target="_blank" rel="noreferrer" className="rounded-full border border-bg/30 px-6 py-3 hover:border-bg">GitHub</a>
            </div>
            <p className="mt-6 text-bg/70">{me.email}</p>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-5 pb-10 text-sm text-muted sm:px-8">
        <span>Built by {me.name} with Next.js</span>
        <span>{me.location}</span>
      </footer>
    </>
  );
}