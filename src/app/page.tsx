"use client";

import { useState } from "react";
import InputPanel from "@/components/input/InputPanel";
import ClassOverview from "@/components/dashboard/ClassOverview";
import StudentList from "@/components/dashboard/StudentList";
import MisconceptionMap from "@/components/dashboard/MisconceptionMap";
import ActionDashboard from "@/components/dashboard/ActionDashboard";
import AITrustPanel from "@/components/panels/AITrustPanel";
import ProductPanel from "@/components/panels/ProductPanel";
import ExportPanel from "@/components/panels/ExportPanel";
import { TabBar, Alert, Spinner } from "@/components/ui";
import { MOCK_ANALYSIS_RESULT } from "@/lib/sampleData";
import type { AnalysisResult, AnalysisRequest } from "@/types";

const RESULT_TABS = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "students", label: "Students", icon: "👤" },
  { id: "misconceptions", label: "Misconceptions", icon: "🔴" },
  { id: "actions", label: "Actions", icon: "⚡" },
  { id: "trust", label: "AI Trust", icon: "🎯" },
  { id: "product", label: "Product", icon: "🧪" },
  { id: "export", label: "Export", icon: "📤" },
];

export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [usedMockData, setUsedMockData] = useState(false);

  async function handleAnalysis(req: AnalysisRequest) {
    setLoading(true);
    setError(null);
    setResult(null);
    setUsedMockData(false);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({ error: "Request failed" }));

        // Fall back to mock data if OpenAI key not configured
        if (res.status === 500 && errData.error?.includes("API key")) {
          setResult(MOCK_ANALYSIS_RESULT);
          setUsedMockData(true);
          setActiveTab("overview");
          return;
        }

        throw new Error(errData.error ?? `Request failed (${res.status})`);
      }

      const data: AnalysisResult = await res.json();
      setResult(data);
      setActiveTab("overview");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";

      // Fall back to mock data on network errors (for demo purposes)
      if (message.includes("fetch") || message.includes("network") || message.includes("Failed to fetch")) {
        setResult(MOCK_ANALYSIS_RESULT);
        setUsedMockData(true);
        setActiveTab("overview");
        return;
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  const tabsWithCounts = RESULT_TABS.map((tab) => {
    if (!result) return tab;
    if (tab.id === "students") return { ...tab, count: result.students.length };
    if (tab.id === "misconceptions") return { ...tab, count: result.misconceptions.length };
    if (tab.id === "actions") return { ...tab, count: result.students.filter((s) => s.actionPriority === "act_now").length };
    return tab;
  });

  return (
    <div className="min-h-screen bg-[#f7f6f3]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sage-600 flex items-center justify-center text-white text-sm font-bold">
              TI
            </div>
            <div>
              <h1 className="font-display font-semibold text-ink text-sm leading-none">Teacher Insight Studio</h1>
              <p className="text-xs text-ink-muted mt-0.5">AI-powered classroom evidence analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium border border-amber-200">
              Prototype v1.0
            </span>
            <a
              href="https://github.com"
              className="text-xs text-ink-muted hover:text-ink px-2 py-1 rounded hover:bg-gray-100 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {!result ? (
          /* Input state */
          <div className="max-w-2xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sage-100 text-sage-700 rounded-full text-xs font-medium mb-4 border border-sage-200">
                🎓 For upper elementary & middle school math teachers
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-3 leading-tight">
                From messy evidence<br />to instructional action.
              </h1>
              <p className="text-ink-muted text-base leading-relaxed max-w-md mx-auto">
                Paste student responses, exit tickets, or observation notes. Get a clear picture of who
                understands, who is stuck, and what to do next.
              </p>
            </div>

            {/* Input card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <InputPanel onSubmit={handleAnalysis} loading={loading} />
            </div>

            {error && (
              <Alert type="error" className="mt-4" title="Analysis failed">
                {error}
              </Alert>
            )}

            {loading && (
              <div className="flex flex-col items-center gap-3 mt-8 animate-fade-in">
                <Spinner size="lg" />
                <p className="text-sm text-ink-muted">Analyzing student thinking...</p>
              </div>
            )}
          </div>
        ) : (
          /* Results state */
          <div className="animate-fade-in">
            {usedMockData && (
              <Alert type="warning" className="mb-4" title="Using sample analysis">
                No OpenAI API key was detected, so sample data is shown. Add{" "}
                <code className="font-mono text-xs bg-amber-100 px-1 py-0.5 rounded">OPENAI_API_KEY</code>{" "}
                to your <code className="font-mono text-xs bg-amber-100 px-1 py-0.5 rounded">.env.local</code>{" "}
                file to run live analysis.
              </Alert>
            )}

            {/* Back button + context */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => { setResult(null); setError(null); }}
                className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors"
              >
                ← New Analysis
              </button>
              <div className="text-xs text-ink-muted">
                {result.gradeLevel} · {result.concept} · {result.classSummary.totalStudents} students
              </div>
            </div>

            {/* Two-column layout */}
            <div className="grid lg:grid-cols-[320px_1fr] gap-5">
              {/* Left: always-visible summary + tabs */}
              <aside className="space-y-4">
                <ClassOverview result={result} />
              </aside>

              {/* Right: tabbed content */}
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <TabBar
                    tabs={tabsWithCounts}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                  />
                </div>

                <div>
                  {activeTab === "overview" && (
                    <div className="space-y-4 animate-slide-up">
                      <StudentList result={result} />
                    </div>
                  )}
                  {activeTab === "students" && <StudentList result={result} />}
                  {activeTab === "misconceptions" && <MisconceptionMap result={result} />}
                  {activeTab === "actions" && <ActionDashboard result={result} />}
                  {activeTab === "trust" && <AITrustPanel result={result} />}
                  {activeTab === "product" && <ProductPanel result={result} />}
                  {activeTab === "export" && <ExportPanel result={result} />}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between text-xs text-ink-muted">
          <span>Teacher Insight Studio — AI Prototype v1.0</span>
          <span>Built for product portfolio demonstration · Not for production use with real student data</span>
        </div>
      </footer>
    </div>
  );
}
