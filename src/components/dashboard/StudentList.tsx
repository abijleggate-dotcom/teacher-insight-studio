"use client";

import { useState } from "react";
import { Card, Badge, ProgressBar, Alert, Button } from "@/components/ui";
import { getActionPriorityConfig, getLevelConfig, getConfidenceLabel, getConfidenceColor } from "@/lib/analysisUtils";
import type { AnalysisResult, StudentAnalysis, ActionPriority } from "@/types";

interface StudentListProps {
  result: AnalysisResult;
}

const PRIORITY_ORDER: ActionPriority[] = ["act_now", "review_soon", "monitor", "celebrate"];

export default function StudentList({ result }: StudentListProps) {
  const [selectedStudent, setSelectedStudent] = useState<StudentAnalysis | null>(null);
  const [filterPriority, setFilterPriority] = useState<ActionPriority | "all">("all");

  const filtered =
    filterPriority === "all"
      ? [...result.students].sort(
          (a, b) => PRIORITY_ORDER.indexOf(a.actionPriority) - PRIORITY_ORDER.indexOf(b.actionPriority)
        )
      : result.students.filter((s) => s.actionPriority === filterPriority);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2">
        {(["all", ...PRIORITY_ORDER] as const).map((p) => {
          const cfg = p === "all" ? null : getActionPriorityConfig(p);
          const count =
            p === "all" ? result.students.length : result.students.filter((s) => s.actionPriority === p).length;
          return (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                filterPriority === p
                  ? p === "all"
                    ? "bg-ink text-white border-ink"
                    : `${cfg!.bg} ${cfg!.color} ${cfg!.border} ring-1 ring-offset-1 ${cfg!.border}`
                  : "bg-white text-ink-muted border-gray-200 hover:bg-gray-50"
              }`}
            >
              {p === "all" ? "All Students" : cfg!.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Student grid */}
      <div className="grid gap-3">
        {filtered.map((student) => {
          const priorityCfg = getActionPriorityConfig(student.actionPriority);
          const levelCfg = getLevelConfig(student.understoodLevel);
          return (
            <button
              key={student.name}
              onClick={() => setSelectedStudent(student)}
              className="text-left w-full"
            >
              <Card
                className={`border transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer ${
                  selectedStudent?.name === student.name ? "ring-2 ring-sage-400 border-sage-300" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={`w-8 h-8 rounded-full ${levelCfg.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <div className={`w-3 h-3 rounded-full ${levelCfg.dot}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm text-ink">{student.name}</span>
                        <Badge variant={student.understoodLevel === "mastery" ? "sage" : student.understoodLevel === "progressing" ? "amber" : student.understoodLevel === "needs_support" ? "coral" : "gray"}>
                          {levelCfg.label}
                        </Badge>
                        {student.aiCaution && (
                          <span className="text-xs text-amber-600" title={student.aiCaution}>⚠️ AI uncertain</span>
                        )}
                      </div>
                      <p className="text-xs text-ink-muted mt-1 leading-relaxed line-clamp-2">
                        {student.evidenceSnippet}
                      </p>
                      {(student.misconception || student.strength) && (
                        <p className="text-xs mt-1.5 text-ink">
                          {student.misconception ? `🔴 ${student.misconception}` : `✅ ${student.strength}`}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${priorityCfg.bg} ${priorityCfg.color} ${priorityCfg.border} font-medium`}>
                      {priorityCfg.label}
                    </span>
                    <div className="text-right">
                      <div className={`text-xs font-semibold ${getConfidenceColor(student.confidenceScore)}`}>
                        {student.confidenceScore}%
                      </div>
                      <div className="text-xs text-ink-muted">confidence</div>
                    </div>
                  </div>
                </div>
              </Card>
            </button>
          );
        })}
      </div>

      {/* Student detail modal */}
      {selectedStudent && (
        <StudentDetail student={selectedStudent} onClose={() => setSelectedStudent(null)} />
      )}
    </div>
  );
}

function StudentDetail({ student, onClose }: { student: StudentAnalysis; onClose: () => void }) {
  const levelCfg = getLevelConfig(student.understoodLevel);
  const priorityCfg = getActionPriorityConfig(student.actionPriority);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full ${levelCfg.bg} flex items-center justify-center`}>
              <div className={`w-3.5 h-3.5 rounded-full ${levelCfg.dot}`} />
            </div>
            <div>
              <h3 className="font-display font-semibold text-ink">{student.name}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-xs px-2 py-0.5 rounded-full ${levelCfg.bg} ${levelCfg.color} font-medium`}>
                  {levelCfg.label}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${priorityCfg.bg} ${priorityCfg.color} ${priorityCfg.border} font-medium`}>
                  {priorityCfg.label}
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-ink-muted hover:text-ink text-xl w-8 h-8 flex items-center justify-center">
            ×
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Evidence */}
          <div>
            <p className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-2">Student Evidence</p>
            <blockquote className="border-l-3 border-sage-400 pl-3 text-sm text-ink italic leading-relaxed bg-gray-50 py-2 pr-3 rounded-r-lg">
              {student.evidenceSnippet}
            </blockquote>
          </div>

          {/* Misconception or Strength */}
          {student.misconception && (
            <div className="bg-coral-50 border border-coral-200 rounded-xl p-4">
              <p className="text-xs font-medium text-coral-600 uppercase tracking-wide mb-1.5">Misconception Identified</p>
              <p className="text-sm text-coral-800">{student.misconception}</p>
            </div>
          )}
          {student.strength && (
            <div className="bg-sage-50 border border-sage-200 rounded-xl p-4">
              <p className="text-xs font-medium text-sage-600 uppercase tracking-wide mb-1.5">Strength Identified</p>
              <p className="text-sm text-sage-800">{student.strength}</p>
            </div>
          )}

          {/* Recommended Feedback */}
          <div>
            <p className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-2">Recommended Feedback to Student</p>
            <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
              <p className="text-sm text-violet-900 leading-relaxed">{student.recommendedFeedback}</p>
            </div>
          </div>

          {/* Next Step */}
          <div>
            <p className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-2">Your Next Step</p>
            <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
              <p className="text-sm text-sky-900 leading-relaxed">{student.nextStep}</p>
            </div>
          </div>

          {/* Confidence */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs font-medium text-ink-muted uppercase tracking-wide">AI Confidence</p>
              <span className={`text-sm font-semibold ${getConfidenceColor(student.confidenceScore)}`}>
                {student.confidenceScore}% — {getConfidenceLabel(student.confidenceScore)}
              </span>
            </div>
            <ProgressBar
              value={student.confidenceScore}
              color={student.confidenceScore >= 90 ? "bg-sage-500" : student.confidenceScore >= 75 ? "bg-amber-400" : "bg-coral-400"}
            />
          </div>

          {/* Caution */}
          {student.aiCaution && (
            <Alert type="warning" title="AI Caution">
              {student.aiCaution}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
