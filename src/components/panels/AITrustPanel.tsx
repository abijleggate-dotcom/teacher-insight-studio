"use client";

import { Card, Badge, ProgressBar, Alert } from "@/components/ui";
import { getConfidenceColor, getConfidenceLabel } from "@/lib/analysisUtils";
import type { AnalysisResult } from "@/types";

interface AITrustPanelProps {
  result: AnalysisResult;
}

export default function AITrustPanel({ result }: AITrustPanelProps) {
  const { aiTrust } = result;

  const flagTypeConfig = {
    vague: { color: "amber" as const, icon: "⚠️", label: "Vague Evidence" },
    missing: { color: "coral" as const, icon: "❓", label: "Missing Evidence" },
    contradictory: { color: "coral" as const, icon: "↔️", label: "Contradictory" },
    insufficient: { color: "amber" as const, icon: "📉", label: "Insufficient" },
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Overall confidence */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎯</span>
            <div>
              <h3 className="font-display font-semibold text-ink">Overall AI Confidence</h3>
              <p className="text-xs text-ink-muted">How reliable this analysis is likely to be</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold font-display ${getConfidenceColor(aiTrust.overallConfidence)}`}>
              {aiTrust.overallConfidence}%
            </div>
            <div className="text-xs text-ink-muted">{getConfidenceLabel(aiTrust.overallConfidence)}</div>
          </div>
        </div>
        <ProgressBar
          value={aiTrust.overallConfidence}
          color={
            aiTrust.overallConfidence >= 90
              ? "bg-sage-500"
              : aiTrust.overallConfidence >= 75
              ? "bg-amber-400"
              : "bg-coral-400"
          }
        />
        <p className="text-xs text-ink-muted mt-3 leading-relaxed">
          This score reflects the quality and completeness of the evidence provided. A lower score means
          more verification by you is needed before acting on these insights.
        </p>
      </Card>

      {/* Evidence used */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🔍</span>
          <h3 className="font-display font-semibold text-ink text-sm">Evidence Used</h3>
        </div>
        <ul className="space-y-1.5">
          {aiTrust.evidenceUsed.map((e, i) => (
            <li key={i} className="flex gap-2 text-sm text-ink">
              <span className="text-sage-500 flex-shrink-0 mt-0.5">✓</span>
              <span className="leading-relaxed">{e}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Flags */}
      {aiTrust.flags.length > 0 && (
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🚩</span>
            <div>
              <h3 className="font-display font-semibold text-ink text-sm">Evidence Flags</h3>
              <p className="text-xs text-ink-muted">Places where the AI had limited or uncertain evidence</p>
            </div>
          </div>
          <div className="space-y-2">
            {aiTrust.flags.map((flag, i) => {
              const cfg = flagTypeConfig[flag.type];
              return (
                <div key={i} className="flex gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-base flex-shrink-0">{cfg.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <Badge variant={cfg.color} size="sm">{cfg.label}</Badge>
                      {flag.studentName && (
                        <span className="text-xs text-ink font-medium">{flag.studentName}</span>
                      )}
                    </div>
                    <p className="text-xs text-ink-muted leading-relaxed">{flag.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Teacher should verify */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">👩‍🏫</span>
          <div>
            <h3 className="font-display font-semibold text-ink text-sm">Teacher Should Verify</h3>
            <p className="text-xs text-ink-muted">These classifications need your professional judgment</p>
          </div>
        </div>
        <ul className="space-y-2">
          {aiTrust.teacherShouldVerify.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-amber-500 flex-shrink-0 mt-0.5 text-sm">→</span>
              <span className="text-sm text-ink leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Limitations */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">⚖️</span>
          <div>
            <h3 className="font-display font-semibold text-ink text-sm">Possible Limitations</h3>
            <p className="text-xs text-ink-muted">Reasons this analysis might be incomplete or wrong</p>
          </div>
        </div>
        <ul className="space-y-1.5">
          {aiTrust.possibleLimitations.map((lim, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-coral-400 flex-shrink-0 mt-0.5 text-sm">·</span>
              <span className="text-sm text-ink-muted leading-relaxed">{lim}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Standards alignment */}
      <Card>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">📐</span>
          <h3 className="font-display font-semibold text-ink text-sm">Standards Alignment</h3>
        </div>
        <p className="text-sm text-ink leading-relaxed">{aiTrust.rubricAlignment}</p>
      </Card>

      {/* Responsible AI note */}
      <Alert type="info" title="About AI in Education">
        This analysis is generated by a large language model and may contain errors. It should be treated as
        a first draft for teacher review — not a final assessment. Student data is sent to OpenAI and not
        stored by this application. See the README for more on responsible AI use.
      </Alert>
    </div>
  );
}
