"use client";

import { Card, Badge, Alert } from "@/components/ui";
import type { AnalysisResult } from "@/types";

interface ClassOverviewProps {
  result: AnalysisResult;
}

export default function ClassOverview({ result }: ClassOverviewProps) {
  const { classSummary } = result;
  const total = classSummary.totalStudents;

  const segments = [
    { label: "Mastery", count: classSummary.masteryCount, color: "bg-sage-500", light: "bg-sage-100", text: "text-sage-700" },
    { label: "Progressing", count: classSummary.progressingCount, color: "bg-amber-400", light: "bg-amber-100", text: "text-amber-700" },
    { label: "Needs Support", count: classSummary.needsSupportCount, color: "bg-coral-400", light: "bg-coral-100", text: "text-coral-700" },
    { label: "Unclear", count: classSummary.unclearCount, color: "bg-gray-300", light: "bg-gray-100", text: "text-gray-600" },
  ].filter((s) => s.count > 0);

  const readinessConfig = {
    strong: { label: "Strong Readiness", color: "sage" as const, icon: "✅" },
    mixed: { label: "Mixed Readiness", color: "amber" as const, icon: "📊" },
    emerging: { label: "Emerging Understanding", color: "coral" as const, icon: "🌱" },
  };
  const readiness = readinessConfig[classSummary.overallReadiness];

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Top stat bar */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-display font-bold text-ink">{total}</span>
              <span className="text-sm text-ink-muted">students analyzed</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={readiness.color} size="md">
                {readiness.icon} {readiness.label}
              </Badge>
              <span className="text-xs text-ink-muted">
                {result.gradeLevel} Grade · {result.concept}
              </span>
            </div>
          </div>
          <div className="text-right text-xs text-ink-muted">
            {new Date(result.analysisTimestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>

        {/* Distribution bar */}
        <div className="flex rounded-full overflow-hidden h-3 gap-0.5 mb-3">
          {segments.map((seg) => (
            <div
              key={seg.label}
              className={`${seg.color} transition-all duration-700`}
              style={{ width: `${(seg.count / total) * 100}%` }}
              title={`${seg.label}: ${seg.count}`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-full ${seg.color}`} />
              <span className="text-xs text-ink-muted">
                <span className={`font-semibold ${seg.text}`}>{seg.count}</span> {seg.label}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Key takeaway */}
      <Card>
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-lg bg-sage-100 flex items-center justify-center flex-shrink-0 text-base">
            💡
          </div>
          <div>
            <p className="text-sm font-medium text-ink mb-1">Key Takeaway</p>
            <p className="text-sm text-ink leading-relaxed">{classSummary.keyTakeaway}</p>
          </div>
        </div>
      </Card>

      {/* Urgent note */}
      {classSummary.urgentNote && (
        <Alert type="warning" title="Needs Immediate Attention">
          {classSummary.urgentNote}
        </Alert>
      )}

      {/* Action priority summary */}
      <div className="grid grid-cols-2 gap-3">
        {[
          {
            label: "Act Now",
            count: result.students.filter((s) => s.actionPriority === "act_now").length,
            bg: "bg-coral-50",
            border: "border-coral-200",
            text: "text-coral-700",
            icon: "🔴",
          },
          {
            label: "Review Soon",
            count: result.students.filter((s) => s.actionPriority === "review_soon").length,
            bg: "bg-amber-50",
            border: "border-amber-200",
            text: "text-amber-700",
            icon: "🟡",
          },
          {
            label: "Monitor",
            count: result.students.filter((s) => s.actionPriority === "monitor").length,
            bg: "bg-sky-50",
            border: "border-sky-200",
            text: "text-sky-700",
            icon: "🔵",
          },
          {
            label: "Celebrate",
            count: result.students.filter((s) => s.actionPriority === "celebrate").length,
            bg: "bg-sage-50",
            border: "border-sage-200",
            text: "text-sage-700",
            icon: "🟢",
          },
        ].map((item) => (
          <div
            key={item.label}
            className={`rounded-xl border ${item.bg} ${item.border} p-3 flex items-center gap-2`}
          >
            <span className="text-lg">{item.icon}</span>
            <div>
              <div className={`text-xl font-bold font-display ${item.text}`}>{item.count}</div>
              <div className="text-xs text-ink-muted">{item.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
