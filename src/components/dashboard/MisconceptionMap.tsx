"use client";

import { useState } from "react";
import { Card, Badge } from "@/components/ui";
import type { AnalysisResult, Misconception } from "@/types";

interface MisconceptionMapProps {
  result: AnalysisResult;
}

export default function MisconceptionMap({ result }: MisconceptionMapProps) {
  const [expanded, setExpanded] = useState<string | null>(
    result.misconceptions[0]?.name ?? null
  );

  if (result.misconceptions.length === 0) {
    return (
      <Card className="text-center py-10">
        <div className="text-4xl mb-3">✅</div>
        <p className="font-medium text-ink">No persistent misconceptions identified</p>
        <p className="text-sm text-ink-muted mt-1">The AI didn&apos;t detect clear misconception patterns in this evidence.</p>
        <p className="text-xs text-ink-muted mt-3">This could mean students are on track, or that evidence was insufficient to identify patterns.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <p className="text-sm text-ink-muted">
          {result.misconceptions.length} misconception{result.misconceptions.length > 1 ? "s" : ""} identified
          across {new Set(result.misconceptions.flatMap((m) => m.affectedStudents)).size} students
        </p>
      </div>

      {result.misconceptions.map((m) => (
        <MisconceptionCard
          key={m.name}
          misconception={m}
          isOpen={expanded === m.name}
          onToggle={() => setExpanded(expanded === m.name ? null : m.name)}
        />
      ))}
    </div>
  );
}

function MisconceptionCard({
  misconception,
  isOpen,
  onToggle,
}: {
  misconception: Misconception;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <Card padding={false} className="overflow-hidden">
      <button className="w-full text-left p-5 hover:bg-gray-50 transition-colors" onClick={onToggle}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-coral-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-base">
              🔴
            </div>
            <div>
              <h3 className="font-medium text-sm text-ink">{misconception.name}</h3>
              <p className="text-xs text-ink-muted mt-0.5 leading-relaxed">{misconception.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge variant="coral" size="sm">
              {misconception.affectedStudents.length} student{misconception.affectedStudents.length > 1 ? "s" : ""}
            </Badge>
            <span className="text-ink-muted text-sm">{isOpen ? "▲" : "▼"}</span>
          </div>
        </div>

        {/* Affected students preview */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {misconception.affectedStudents.map((name) => (
            <span key={name} className="px-2 py-0.5 bg-coral-50 border border-coral-200 rounded-full text-xs text-coral-700">
              {name}
            </span>
          ))}
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-gray-100 p-5 space-y-4 bg-gray-50/50 animate-slide-up">
          {/* Evidence */}
          <div>
            <p className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-2">Evidence from Students</p>
            <div className="space-y-2">
              {misconception.evidenceSnippets.map((e, i) => (
                <blockquote
                  key={i}
                  className="border-l-2 border-coral-300 pl-3 text-xs text-ink leading-relaxed italic bg-white rounded-r-lg py-2 pr-3"
                >
                  {e}
                </blockquote>
              ))}
            </div>
          </div>

          {/* Suggested move */}
          <div>
            <p className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-2">
              Suggested Instructional Move
            </p>
            <div className="bg-sage-50 border border-sage-200 rounded-xl p-4">
              <p className="text-sm text-sage-900 leading-relaxed">{misconception.suggestedNextMove}</p>
            </div>
          </div>

          {/* Sample teacher language */}
          <div>
            <p className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-2">
              Sample Teacher Language
            </p>
            <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
              <p className="text-xs text-violet-600 font-medium mb-1.5">You could say something like:</p>
              <p className="text-sm text-violet-900 leading-relaxed">{misconception.sampleTeacherLanguage}</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
