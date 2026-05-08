"use client";

import { useState } from "react";
import { Card, Button, Alert } from "@/components/ui";
import { generateExportContent } from "@/lib/analysisUtils";
import type { AnalysisResult } from "@/types";

interface ExportPanelProps {
  result: AnalysisResult;
}

const EXPORT_OPTIONS = [
  {
    id: "action_plan",
    label: "Teacher Action Plan",
    description: "Summary of class, priority students, mini-lesson, and celebrate moments",
    icon: "📋",
  },
  {
    id: "small_group_plan",
    label: "Small Group Plan",
    description: "Grouped students with focus areas, activities, and time estimates",
    icon: "👥",
  },
  {
    id: "product_brief",
    label: "Product Brief",
    description: "PM-facing experiment summary with metrics, signals, and safety risks",
    icon: "📊",
  },
  {
    id: "engineering_ticket",
    label: "Engineering Ticket",
    description: "User story, acceptance criteria, and technical notes",
    icon: "🎫",
  },
] as const;

export default function ExportPanel({ result }: ExportPanelProps) {
  const [exported, setExported] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<string | null>(null);

  function handleExport(type: string) {
    const content = generateExportContent(type, result);
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `teacher-insight-${type}-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setExported(type);
    setTimeout(() => setExported(null), 3000);
  }

  function handlePreview(type: string) {
    if (previewType === type) {
      setPreview(null);
      setPreviewType(null);
      return;
    }
    const content = generateExportContent(type, result);
    setPreview(content);
    setPreviewType(type);
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <Alert type="info">
        Exported files are plain text (.txt) — easy to paste into Google Docs, email, Notion, or a Jira ticket.
      </Alert>

      <div className="grid gap-3">
        {EXPORT_OPTIONS.map((opt) => (
          <Card key={opt.id}>
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{opt.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm text-ink">{opt.label}</h3>
                <p className="text-xs text-ink-muted mt-0.5 leading-relaxed">{opt.description}</p>
                <div className="flex gap-2 mt-3">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleExport(opt.id)}
                  >
                    {exported === opt.id ? "✓ Downloaded" : "⬇️ Download"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePreview(opt.id)}
                  >
                    {previewType === opt.id ? "Hide Preview" : "Preview"}
                  </Button>
                </div>
              </div>
            </div>
            {previewType === opt.id && preview && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <pre className="text-xs text-ink-muted font-mono leading-relaxed whitespace-pre-wrap bg-gray-50 p-4 rounded-xl max-h-64 overflow-y-auto">
                  {preview}
                </pre>
              </div>
            )}
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">📎</span>
          <h3 className="font-display font-semibold text-ink text-sm">Copy Analysis JSON</h3>
        </div>
        <p className="text-xs text-ink-muted mb-3 leading-relaxed">
          For developers: copy the raw JSON output to use in integrations or to inspect the data model.
        </p>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(result, null, 2));
          }}
        >
          📋 Copy JSON
        </Button>
      </Card>
    </div>
  );
}
