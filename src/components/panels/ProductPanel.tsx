"use client";

import { Card, Badge } from "@/components/ui";
import type { AnalysisResult } from "@/types";

interface ProductPanelProps {
  result: AnalysisResult;
}

export default function ProductPanel({ result }: ProductPanelProps) {
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Why this prototype exists */}
      <div className="bg-gradient-to-br from-ink to-ink-light rounded-2xl p-6 text-white">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🧪</span>
          <h3 className="font-display font-semibold">Why This Prototype Exists</h3>
        </div>
        <p className="text-sm text-white/80 leading-relaxed">
          This prototype explores whether AI can help teachers move faster from student evidence to instructional
          action. It is designed as a rapid, testable prototype before investing full engineering resources.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="sage">Teacher Workflow</Badge>
          <Badge variant="sky">Formative Assessment</Badge>
          <Badge variant="amber">Rapid Prototype</Badge>
          <Badge variant="violet">EdTech AI</Badge>
        </div>
      </div>

      {/* Success Metrics */}
      <MetricCard
        icon="📊"
        title="Success Metrics"
        subtitle="How we'd know this is working"
        items={[
          { label: "Time savings", detail: "Teachers reach instructional decision in <5 min vs. 30+ min manually", type: "metric" },
          { label: "Decision quality", detail: "AI-suggested next steps match expert teacher judgment >80% of the time", type: "metric" },
          { label: "Return rate", detail: "Teacher re-uses the tool within 2 weeks of first session", type: "metric" },
          { label: "Trust calibration", detail: "Teachers can identify when to override AI and do so appropriately", type: "metric" },
          { label: "Student outcome proxy", detail: "Instructional adjustments made by teacher correlate with improved evidence in next session", type: "metric" },
        ]}
      />

      {/* Adoption Signals */}
      <MetricCard
        icon="📈"
        title="Adoption Signals"
        subtitle="Early signs that teachers find value"
        items={[
          { label: "Qualitative", detail: "Teacher says 'I showed this to a colleague'", type: "positive" },
          { label: "Qualitative", detail: "Teacher uses the export feature without being prompted", type: "positive" },
          { label: "Behavioral", detail: "Teacher loads sample data and runs the tool in a demo", type: "positive" },
          { label: "Behavioral", detail: "Teacher pastes real student data (not sample) in first session", type: "positive" },
          { label: "Quantitative", detail: "Net Promoter Score >40 after 3 uses", type: "positive" },
        ]}
      />

      {/* Quality Signals */}
      <MetricCard
        icon="🎯"
        title="Quality Signals"
        subtitle="How we'd evaluate AI output quality"
        items={[
          { label: "Expert review", detail: "Math instructional coaches review AI recommendations and rate relevance", type: "quality" },
          { label: "Misconception accuracy", detail: "Identified misconceptions match known research on common math errors", type: "quality" },
          { label: "Confidence calibration", detail: "High-confidence classifications are more often correct than low-confidence", type: "quality" },
          { label: "Feedback tone", detail: "Student feedback examples pass review by curriculum/equity leads", type: "quality" },
          { label: "Hallucination rate", detail: "AI does not fabricate student names or evidence not in the input", type: "quality" },
        ]}
      />

      {/* Safety Risks */}
      <MetricCard
        icon="⚠️"
        title="Safety Risks"
        subtitle="What could go wrong — and how we'd catch it"
        items={[
          { label: "Misclassification", detail: "AI could label a student 'needs support' based on limited evidence — addressed by confidence flags and teacher verify notes", type: "risk" },
          { label: "Equity bias", detail: "AI may interpret AAVE or non-standard written English as lower understanding — requires ongoing bias audit", type: "risk" },
          { label: "Over-trust", detail: "Teachers may act on AI output without verifying — addressed with explicit trust UI and uncertainty framing", type: "risk" },
          { label: "Data sensitivity", detail: "Student work is PII-adjacent — no storage, no logging, clear user notice required", type: "risk" },
          { label: "Family communication", detail: "AI feedback language should not be shared directly with parents without teacher review", type: "risk" },
        ]}
      />

      {/* What to test */}
      <MetricCard
        icon="🔬"
        title="What to Test With Teachers"
        subtitle="Intercept studies and usability questions for pilot"
        items={[
          { label: "Intercept study", detail: "Show mock AI output — ask 'What would you do next?' Does it match what AI suggested?", type: "test" },
          { label: "Task comparison", detail: "Time teachers reviewing same evidence with/without tool. Measure decision confidence.", type: "test" },
          { label: "Trust threshold", detail: "Where do teachers override AI? What would make them trust it more or less?", type: "test" },
          { label: "Workflow fit", detail: "When in the teacher's week does this fit? Before class? During planning? After school?", type: "test" },
          { label: "Language review", detail: "Read feedback examples aloud — do they sound like something a real teacher would say?", type: "test" },
        ]}
      />

      {/* Engineering investment */}
      <Card className="border-sage-200 bg-sage-50">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🚀</span>
          <h3 className="font-display font-semibold text-sage-800 text-sm">What Would Justify Engineering Investment</h3>
        </div>
        <ul className="space-y-2">
          {[
            "3+ teachers report saving >20 minutes per use in structured interviews",
            "Instructional decisions align with expert math coach review >80% of time",
            "Teacher re-use rate >60% after first session (without prompting)",
            "No systematic equity concerns found in bias audit across student subgroups",
            "Teachers describe output as 'useful' rather than 'just summarizing'",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-sage-900">
              <span className="text-sage-500 flex-shrink-0">✓</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Shut down criteria */}
      <Card className="border-coral-200 bg-coral-50">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🛑</span>
          <h3 className="font-display font-semibold text-coral-800 text-sm">What Would Cause Us to Shut Down or Pivot</h3>
        </div>
        <ul className="space-y-2">
          {[
            "AI confidence calibration is unreliable — high-confidence flags are frequently wrong",
            "Equity audit reveals systematic misclassification of specific student populations",
            "Teachers report friction overriding outputs — tool creates more work than it saves",
            "Feedback language fails review by equity or curriculum teams",
            "Legal review raises concerns about FERPA / COPPA compliance at scale",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-coral-900">
              <span className="text-coral-500 flex-shrink-0">✗</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Demo script */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🎬</span>
          <div>
            <h3 className="font-display font-semibold text-ink text-sm">Interview Demo Script</h3>
            <p className="text-xs text-ink-muted">Suggested walkthrough for teacher interviews and product reviews</p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { step: "1", action: "Frame the problem", script: "\"Tell me about the last time you looked at student work and had to figure out what to do next. How long did it take?\"" },
            { step: "2", action: "Show the input", script: "Load the sample data. Walk through what it represents — real, messy, student thinking." },
            { step: "3", action: "Run the analysis", script: "Submit and wait. Talk through what the AI is doing while it loads." },
            { step: "4", action: "Walk the dashboard", script: "Start with the class summary. Then go to 'Act Now.' Ask: 'Does this match your read of the room?'" },
            { step: "5", action: "Probe the misconception map", script: "\"Have you seen this misconception before? Does the suggested move make sense for your class?\"" },
            { step: "6", action: "Show the trust panel", script: "\"Notice we flag where the AI is uncertain. What do you think about that?\"" },
            { step: "7", action: "Close with the key question", script: "\"Would you use this tool in your actual planning time? What would need to change?\"" },
          ].map((item) => (
            <div key={item.step} className="flex gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
              <div className="w-6 h-6 rounded-full bg-ink text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {item.step}
              </div>
              <div>
                <p className="text-xs font-semibold text-ink mb-0.5">{item.action}</p>
                <p className="text-xs text-ink-muted leading-relaxed italic">{item.script}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* AI analysis snapshot for context */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">📋</span>
          <h3 className="font-display font-semibold text-ink text-sm">This Analysis Snapshot</h3>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-ink-muted text-xs mb-0.5">Grade Level</div>
            <div className="font-medium text-ink">{result.gradeLevel} Grade</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-ink-muted text-xs mb-0.5">Concept</div>
            <div className="font-medium text-ink">{result.concept}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-ink-muted text-xs mb-0.5">Students Analyzed</div>
            <div className="font-medium text-ink">{result.classSummary.totalStudents}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-ink-muted text-xs mb-0.5">AI Confidence</div>
            <div className="font-medium text-ink">{result.aiTrust.overallConfidence}%</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

type ItemType = "metric" | "positive" | "risk" | "test" | "quality";

function MetricCard({
  icon,
  title,
  subtitle,
  items,
}: {
  icon: string;
  title: string;
  subtitle: string;
  items: { label: string; detail: string; type: ItemType }[];
}) {
  const typeColors: Record<ItemType, string> = {
    metric: "bg-violet-100 text-violet-700",
    positive: "bg-sage-100 text-sage-700",
    risk: "bg-coral-100 text-coral-700",
    test: "bg-sky-100 text-sky-700",
    quality: "bg-amber-100 text-amber-700",
  };

  return (
    <Card>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{icon}</span>
        <div>
          <h3 className="font-display font-semibold text-ink text-sm">{title}</h3>
          <p className="text-xs text-ink-muted">{subtitle}</p>
        </div>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-3">
            <span className={`px-1.5 py-0.5 rounded text-xs font-medium flex-shrink-0 h-fit ${typeColors[item.type]}`}>
              {item.label}
            </span>
            <p className="text-xs text-ink-muted leading-relaxed">{item.detail}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
