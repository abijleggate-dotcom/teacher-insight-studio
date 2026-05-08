# 🎓 Teacher Insight Studio

**AI-powered classroom evidence analysis for math teachers**

> A product prototype that turns messy student thinking into clear instructional next steps.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/teacher-insight-studio)

---

## Why This Prototype Exists

This prototype explores whether AI can help teachers move faster from student evidence to instructional action. It is designed as a rapid, testable prototype before investing full engineering resources.

The problem it targets is real: after collecting exit tickets, written responses, or observation notes, teachers face a labor-intensive synthesis task — reading every response, identifying patterns, planning next steps — before they can make a single instructional decision. For a class of 30, this can take 30–45 minutes. This prototype asks: can AI compress that to under 5?

---

## What It Does

Teachers paste or upload messy classroom evidence — student written responses, exit ticket answers, mastery check notes, small-group observations — and get back:

- **Class summary** with overall readiness signal
- **Per-student analysis** with understanding level, evidence, and recommended next step
- **Misconception map** with evidence, affected students, instructional moves, and sample teacher language
- **Action dashboard** organized by priority: Act Now / Review Soon / Monitor / Celebrate
- **Small group and 1:1 recommendations**
- **Suggested whole-class mini-lesson** based on class patterns
- **Student-friendly feedback examples**
- **AI Trust panel** with confidence scores, flags, and verification guidance
- **Product Experiment Panel** for evaluating the prototype as a PM
- **Export options** for action plans, small group plans, product briefs, and engineering tickets

---

## Who This Is For

**Primary user:** Upper elementary or middle school math teachers.

**Core job to be done:** "When my students submit messy evidence of thinking, help me quickly understand who understands the concept, who is stuck, what misconception is showing up, and what I should do next instructionally."

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| AI | OpenAI GPT-4o via REST API |
| Deployment | Vercel |
| Fonts | Fraunces (display) + DM Sans (body) |

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/yourusername/teacher-insight-studio.git
cd teacher-insight-studio
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and add your OpenAI API key:

```
OPENAI_API_KEY=sk-...
```

Get your key at [platform.openai.com/api-keys](https://platform.openai.com/api-keys).

> **No API key?** The app gracefully falls back to sample/mock data so you can demo the full UI without one.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploying to Vercel

### One-click deploy

1. Push your code to a GitHub repository
2. Go to [vercel.com/new](https://vercel.com/new) and import your repo
3. Add `OPENAI_API_KEY` as an environment variable in the Vercel dashboard
4. Deploy

### Manual deploy with Vercel CLI

```bash
npm install -g vercel
vercel
# Follow the prompts
# Add OPENAI_API_KEY when asked about environment variables
```

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # OpenAI API integration + analysis endpoint
│   ├── globals.css               # Global styles + font imports
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main application page
├── components/
│   ├── input/
│   │   └── InputPanel.tsx        # Evidence input: paste, upload, sample data
│   ├── dashboard/
│   │   ├── ClassOverview.tsx     # Class summary + distribution chart
│   │   ├── StudentList.tsx       # Student cards + detail modal
│   │   ├── MisconceptionMap.tsx  # Misconception cards with evidence + moves
│   │   └── ActionDashboard.tsx   # Priority-organized instructional actions
│   ├── panels/
│   │   ├── AITrustPanel.tsx      # Confidence, flags, limitations, verify
│   │   ├── ProductPanel.tsx      # PM experiment framework + demo script
│   │   └── ExportPanel.tsx       # Download action plans, tickets, briefs
│   └── ui/
│       └── index.tsx             # Shared UI components (Card, Badge, Button, etc.)
├── lib/
│   ├── analysisUtils.ts          # Prompt builder, parser, export generators
│   └── sampleData.ts             # Mock classroom data + mock analysis result
└── types/
    └── index.ts                  # TypeScript interfaces for all data models
```

---

## AI Analysis Pipeline

### How it works

1. **Teacher submits evidence** — raw text pasted or uploaded as .txt/.csv
2. **Structured prompt construction** — grade level, concept, and student data assembled into a carefully engineered system prompt (see `src/lib/analysisUtils.ts`)
3. **OpenAI GPT-4o completion** — model instructed to respond with strict JSON matching TypeScript interfaces; temperature set to 0.3 for consistency
4. **Response parsing + validation** — JSON parsed and typed; malformed responses handled with error states
5. **Client rendering** — results rendered across 7 dashboard tabs with teacher-friendly language

### The prompt approach

The system prompt instructs the model to:
- Identify specific misconceptions by name (not generic "needs help")
- Quote or paraphrase evidence from actual student responses
- Provide actionable next steps (not summaries)
- Flag low-evidence or ambiguous classifications
- Write feedback in plain teacher-friendly language
- Distinguish between procedural gaps and conceptual misunderstandings

See `src/lib/analysisUtils.ts` → `buildAnalysisPrompt()` for the full prompt.

### Example AI prompt structure

```
You are an expert educational data analyst helping a 5th grade math teacher 
understand their students' thinking.

The teacher has provided classroom evidence related to: 
**Fractions - Adding & Subtracting**

Here is the student evidence:
---
[student responses here]
---

Analyze this evidence and respond with a JSON object matching this exact 
TypeScript interface...
```

The key design choice: the prompt asks for **structured JSON from the start**, not prose that gets parsed. This makes the output reliable enough to render in a dashboard.

---

## Sample Classroom Data

The app ships with a 12-student 5th-grade classroom dataset demonstrating:
- Students with clear mastery (correct procedure + verbal reasoning)
- Students with a specific misconception (add-across: treating numerators and denominators as independent whole numbers)
- Students with a correct conceptual approach but shaky procedural execution
- Students with ambiguous or minimal evidence
- Students showing affective distress signals

Load it with the **"✨ Use Sample Data"** button in the input panel.

The dataset is in `src/lib/sampleData.ts` → `SAMPLE_STUDENT_DATA`.

---

## Responsible AI Use in Education

This prototype is built with the following principles:

### Transparency
- All confidence scores are surfaced to the teacher
- Low-confidence classifications are explicitly flagged
- The AI explains what evidence it used and what its limitations are
- The UI never presents AI output as ground truth

### Teacher agency
- AI output is framed as "first draft" not "final assessment"
- Every recommendation includes an explicit "Teacher Should Verify" section
- The dashboard is organized around teacher decisions, not AI scores

### Data minimalism
- Student evidence is sent to OpenAI for analysis and **not stored**
- The app does not log, persist, or transmit any student data beyond the single API call
- No student names or identifying information leave the local session

### Known limitations and risks
- AI may misclassify students based on limited written evidence
- AI cannot observe body language, classroom context, or prior relationship
- AAVE and non-standard written English may be interpreted as lower understanding (requires bias audit before production use)
- Feedback language should not be shared with families without teacher review
- This is a single-snapshot analysis — not a longitudinal view

### Before using with real students
1. Review output with a math instructional coach before acting
2. Treat AI classifications as hypotheses, not diagnoses
3. Never share AI output directly with students or families without teacher review
4. Ensure compliance with your district's AI use policy and any applicable privacy law (FERPA, COPPA, state laws)

---

## Product Manager Evaluation Framework

### What this prototype tests

**Core hypothesis:** AI can help teachers compress the time between collecting student evidence and deciding what to do next — from 30+ minutes to under 5 — without sacrificing decision quality.

### Success metrics

| Metric | Target |
|--------|--------|
| Time to decision | < 5 min (vs 30+ manually) |
| Decision quality | > 80% alignment with expert teacher judgment |
| Teacher re-use rate | > 60% within 2 weeks |
| Trust calibration | Teachers can identify when to override AI |

### Adoption signals (qualitative)
- Teacher says "I showed this to a colleague"
- Teacher uses the export feature without being prompted
- Teacher pastes real student data (not sample) in first session
- Teacher returns within 2 weeks without outreach

### What to test with teachers

1. **Intercept study:** Show mock AI output — ask "What would you do next?" Compare to AI recommendation.
2. **Task comparison:** Time teachers reviewing the same evidence with and without the tool.
3. **Trust threshold study:** Where do teachers override AI? What would make them trust it more or less?
4. **Workflow fit:** When in the teacher's week does this fit? Before class? During planning? After school?
5. **Language review:** Read feedback examples aloud — do they sound like something a real teacher would say?

### What would justify engineering investment
- 3+ teachers report saving >20 minutes per use in structured interviews
- Instructional decisions align with expert math coach review >80% of the time
- Teacher re-use rate >60% after first session (without prompting)
- No systematic equity concerns found in bias audit across student subgroups

### What would cause us to shut down or pivot
- AI confidence calibration proves unreliable (high-confidence flags frequently wrong)
- Equity audit reveals systematic misclassification of specific student populations
- Teachers report that overriding outputs creates more work than it saves
- Feedback language fails review by equity or curriculum teams
- Legal review raises FERPA/COPPA concerns at scale

---

## Interview Demo Script

Suggested walkthrough for teacher interviews and product reviews:

1. **Frame the problem** — "Tell me about the last time you looked at student work and had to figure out what to do next. How long did it take?"
2. **Show the input** — Load the sample data. Walk through what it represents.
3. **Run the analysis** — Submit and wait. Talk through what the AI is doing.
4. **Walk the dashboard** — Start with class summary. Then go to "Act Now." Ask: "Does this match your read of the room?"
5. **Probe the misconception map** — "Have you seen this misconception before? Does the suggested move make sense for your class?"
6. **Show the AI Trust panel** — "Notice we flag where the AI is uncertain. What do you think about that?"
7. **Close with the key question** — "Would you use this tool in your actual planning time? What would need to change?"

---

## Design Decisions

- **Two-font system:** Fraunces (serif display) + DM Sans (sans body) — warm, credible, educational feel without being corporate
- **Color system:** Sage green as the primary action color (trust, growth); coral for urgent/misconception; amber for caution; sky for informational
- **No dark mode:** Teacher tools used in bright classrooms — light mode prioritized
- **Confidence scores visible everywhere:** Trust is built by being transparent, not by hiding uncertainty
- **Plain language throughout:** No "precision learning outcomes" — just "what Marcus understands" and "what to do next"

---

## Contributing

This is a portfolio prototype. Issues and suggestions welcome via GitHub Issues.

---

## License

MIT — Use freely, attribute kindly.

---

*Built as a product portfolio prototype demonstrating AI product thinking, educator-centered design, and responsible AI development in an edtech context.*
