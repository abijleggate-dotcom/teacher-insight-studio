"use client";

import { Card, SectionHeader, Badge } from "@/components/ui";
import type { AnalysisResult } from "@/types";

interface ActionDashboardProps {
  result: AnalysisResult;
}

export default function ActionDashboard({ result }: ActionDashboardProps) {
  const { recommendations } = result;
  const actNow = result.students.filter((s) => s.actionPriority === "act_now");
  const reviewSoon = result.students.filter((s) => s.actionPriority === "review_soon");
  const monitor = result.students.filter((s) => s.actionPriority === "monitor");
  const celebrate = result.students.filter((s) => s.actionPriority === "celebrate");

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Act Now */}
      {actNow.length > 0 && (
        <ActionSection
          icon="🔴"
          title="Act Now"
          subtitle="These students need attention before the next lesson"
          borderColor="border-l-coral-400"
          bgColor="bg-coral-50"
          borderCard="border-coral-200"
        >
          <div className="space-y-3">
            {actNow.map((s) => (
              <div key={s.name} className="bg-white border border-coral-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm text-ink">{s.name}</span>
                  {s.misconception && (
                    <Badge variant="coral" size="sm">Misconception</Badge>
                  )}
                </div>
                <p className="text-xs text-ink-muted leading-relaxed mb-2">{s.evidenceSnippet}</p>
                <p className="text-xs text-coral-700 font-medium">Next step: {s.nextStep}</p>
              </div>
            ))}
          </div>
        </ActionSection>
      )}

      {/* Whole-class mini lesson */}
      <Card className="border-l-4 border-l-amber-400">
        <SectionHeader icon="📢" title="Whole-Class Mini-Lesson" subtitle="Recommended based on class patterns" />
        <div className="space-y-3">
          <div>
            <p className="text-xs text-ink-muted font-medium uppercase tracking-wide mb-1">Topic</p>
            <p className="text-sm font-medium text-ink">{recommendations.wholeclassMiniLesson.topic}</p>
          </div>
          <div>
            <p className="text-xs text-ink-muted font-medium uppercase tracking-wide mb-1">Why This Now</p>
            <p className="text-sm text-ink leading-relaxed">{recommendations.wholeclassMiniLesson.rationale}</p>
          </div>
          <div>
            <p className="text-xs text-ink-muted font-medium uppercase tracking-wide mb-1">How to Approach It</p>
            <p className="text-sm text-ink leading-relaxed">{recommendations.wholeclassMiniLesson.suggestedApproach}</p>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <Badge variant="amber">⏱️ {recommendations.wholeclassMiniLesson.estimatedTime}</Badge>
            {recommendations.wholeclassMiniLesson.materials && (
              <span className="text-xs text-ink-muted">📦 {recommendations.wholeclassMiniLesson.materials}</span>
            )}
          </div>
        </div>
      </Card>

      {/* Small Groups */}
      {recommendations.smallGroups.length > 0 && (
        <Card className="border-l-4 border-l-sky-400">
          <SectionHeader icon="👥" title="Small Group Plan" subtitle={`${recommendations.smallGroups.length} group${recommendations.smallGroups.length > 1 ? "s" : ""} recommended`} />
          <div className="space-y-4">
            {recommendations.smallGroups.map((group, i) => (
              <div key={i} className="bg-sky-50 border border-sky-200 rounded-xl p-4">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h4 className="font-medium text-sm text-ink">{group.groupName}</h4>
                    <p className="text-xs text-sky-700 mt-0.5">{group.focus}</p>
                  </div>
                  <Badge variant="sky">⏱️ {group.estimatedTime}</Badge>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {group.students.map((name) => (
                    <span key={name} className="px-2 py-0.5 bg-white border border-sky-200 rounded-full text-xs text-sky-800">
                      {name}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-ink leading-relaxed">{group.suggestedActivity}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 1:1 Check-ins */}
      {recommendations.oneOnOneCheckIns.length > 0 && (
        <Card className="border-l-4 border-l-violet-400">
          <SectionHeader icon="🗣️" title="1:1 Check-ins" subtitle="Quick individual conversations to have" />
          <div className="space-y-2">
            {recommendations.oneOnOneCheckIns.map((item, i) => (
              <div key={i} className="flex gap-3 bg-violet-50 border border-violet-200 rounded-xl p-3">
                <span className="text-violet-400 font-bold text-sm flex-shrink-0">→</span>
                <p className="text-sm text-violet-900 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Review Soon */}
      {reviewSoon.length > 0 && (
        <ActionSection
          icon="🟡"
          title="Review Soon"
          subtitle="Check in before the next major assessment"
          borderColor="border-l-amber-400"
          bgColor="bg-amber-50"
          borderCard="border-amber-200"
        >
          <div className="flex flex-wrap gap-2">
            {reviewSoon.map((s) => (
              <span key={s.name} className="px-3 py-1.5 bg-white border border-amber-200 rounded-lg text-sm text-amber-800">
                {s.name}
              </span>
            ))}
          </div>
        </ActionSection>
      )}

      {/* Monitor */}
      {monitor.length > 0 && (
        <ActionSection
          icon="🔵"
          title="Monitor"
          subtitle="Watch for patterns in upcoming work"
          borderColor="border-l-sky-400"
          bgColor="bg-sky-50"
          borderCard="border-sky-200"
        >
          <div className="flex flex-wrap gap-2">
            {monitor.map((s) => (
              <span key={s.name} className="px-3 py-1.5 bg-white border border-sky-200 rounded-lg text-sm text-sky-800">
                {s.name}
              </span>
            ))}
          </div>
          {monitor.some((s) => s.aiCaution) && (
            <p className="text-xs text-ink-muted mt-2">
              ⚠️ Some students in this group have low-confidence AI classifications. Verify with a quick verbal check.
            </p>
          )}
        </ActionSection>
      )}

      {/* Celebrate */}
      {celebrate.length > 0 && (
        <ActionSection
          icon="🟢"
          title="Celebrate"
          subtitle={recommendations.celebrationNote}
          borderColor="border-l-sage-400"
          bgColor="bg-sage-50"
          borderCard="border-sage-200"
        >
          <div className="flex flex-wrap gap-2">
            {celebrate.map((s) => (
              <span key={s.name} className="px-3 py-1.5 bg-white border border-sage-200 rounded-lg text-sm text-sage-800">
                ⭐ {s.name}
              </span>
            ))}
          </div>
        </ActionSection>
      )}

      {/* Student feedback examples */}
      {result.studentFeedbackExamples.length > 0 && (
        <Card>
          <SectionHeader icon="💬" title="Student-Friendly Feedback Examples" subtitle="Try these to start the conversation" />
          <div className="space-y-4">
            {result.studentFeedbackExamples.map((ex, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-ink">{ex.studentName}</span>
                  <Badge
                    variant={ex.tone === "encouraging" ? "sage" : ex.tone === "redirecting" ? "coral" : "sky"}
                    size="sm"
                  >
                    {ex.tone}
                  </Badge>
                </div>
                <p className="text-sm text-ink leading-relaxed italic">&ldquo;{ex.feedbackText}&rdquo;</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

function ActionSection({
  icon,
  title,
  subtitle,
  borderColor,
  bgColor,
  borderCard,
  children,
}: {
  icon: string;
  title: string;
  subtitle: string;
  borderColor: string;
  bgColor: string;
  borderCard: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-xl border-l-4 ${borderColor} ${bgColor} border ${borderCard} p-5`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{icon}</span>
        <div>
          <h3 className="font-display font-semibold text-sm text-ink">{title}</h3>
          <p className="text-xs text-ink-muted">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
