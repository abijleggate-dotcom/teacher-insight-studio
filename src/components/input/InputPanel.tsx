"use client";

import { useState, useRef } from "react";
import { SAMPLE_STUDENT_DATA, GRADE_LEVELS, MATH_CONCEPTS } from "@/lib/sampleData";
import { Button, Alert } from "@/components/ui";
import type { GradeLevel, MathConcept, AnalysisRequest } from "@/types";

interface InputPanelProps {
  onSubmit: (req: AnalysisRequest) => void;
  loading: boolean;
}

export default function InputPanel({ onSubmit, loading }: InputPanelProps) {
  const [studentData, setStudentData] = useState("");
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>("5th");
  const [concept, setConcept] = useState<string>("Fractions - Adding & Subtracting");
  const [additionalContext, setAdditionalContext] = useState("");
  const [inputMode, setInputMode] = useState<"paste" | "file">("paste");
  const [fileError, setFileError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const wordCount = studentData.trim().split(/\s+/).filter(Boolean).length;
  const studentCount = (studentData.match(/^student:/gim) ?? []).length;

  function loadSampleData() {
    setStudentData(SAMPLE_STUDENT_DATA);
    setGradeLevel("5th");
    setConcept("Fractions - Adding & Subtracting");
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    setFileError("");
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 500000) {
      setFileError("File too large. Please upload a file smaller than 500KB.");
      return;
    }

    if (!file.name.endsWith(".txt") && !file.name.endsWith(".csv")) {
      setFileError("Only .txt and .csv files are supported.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      setStudentData(ev.target?.result as string);
      setInputMode("paste");
    };
    reader.onerror = () => setFileError("Could not read file. Please try pasting instead.");
    reader.readAsText(file);
  }

  function handleSubmit() {
    if (!studentData.trim()) return;
    onSubmit({ studentData, gradeLevel, concept, additionalContext });
  }

  const canSubmit = studentData.trim().length > 20 && !loading;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center text-lg flex-shrink-0">
          📋
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">Add Your Classroom Evidence</h2>
          <p className="text-sm text-ink-muted mt-1">
            Paste or upload student responses, exit tickets, observation notes, or mastery check data.
          </p>
        </div>
      </div>

      {/* Context selectors */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Grade Level</label>
          <select
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value as GradeLevel)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent"
          >
            {GRADE_LEVELS.map((g) => (
              <option key={g} value={g}>
                {g} Grade
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Math Concept / Learning Goal</label>
          <select
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent"
          >
            {MATH_CONCEPTS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Input mode tabs */}
      <div>
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setInputMode("paste")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              inputMode === "paste"
                ? "bg-sage-600 text-white"
                : "bg-gray-100 text-ink-muted hover:bg-gray-200"
            }`}
          >
            ✏️ Paste Text
          </button>
          <button
            onClick={() => setInputMode("file")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              inputMode === "file"
                ? "bg-sage-600 text-white"
                : "bg-gray-100 text-ink-muted hover:bg-gray-200"
            }`}
          >
            📂 Upload File
          </button>
          <button
            onClick={loadSampleData}
            className="ml-auto px-3 py-1.5 rounded-lg text-sm font-medium bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 transition-colors"
          >
            ✨ Use Sample Data
          </button>
        </div>

        {inputMode === "paste" ? (
          <div>
            <textarea
              value={studentData}
              onChange={(e) => setStudentData(e.target.value)}
              placeholder={`Paste student responses here. Format each student with their name, like:\n\nStudent: [Name]\n[Their response or observation]\n\nStudent: [Name]\n[Their response]\n\n...`}
              rows={10}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-ink resize-y focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent font-mono leading-relaxed placeholder-gray-400"
            />
            <div className="flex items-center justify-between mt-1.5 text-xs text-ink-muted">
              <span>
                {wordCount > 0 && (
                  <>
                    {wordCount} words
                    {studentCount > 0 && ` · ~${studentCount} students detected`}
                  </>
                )}
              </span>
              {studentData.length > 0 && (
                <button
                  onClick={() => setStudentData("")}
                  className="text-coral-500 hover:text-coral-700"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-sage-400 hover:bg-sage-50 transition-colors"
          >
            <div className="text-3xl mb-2">📁</div>
            <p className="text-sm font-medium text-ink">Click to upload .txt or .csv</p>
            <p className="text-xs text-ink-muted mt-1">Max 500KB · One file at a time</p>
            <input ref={fileRef} type="file" accept=".txt,.csv" className="hidden" onChange={handleFile} />
          </div>
        )}

        {fileError && <Alert type="error" className="mt-3">{fileError}</Alert>}
      </div>

      {/* Additional context */}
      <div>
        <label className="block text-sm font-medium text-ink mb-1.5">
          Context for the AI <span className="text-ink-muted font-normal">(optional)</span>
        </label>
        <textarea
          value={additionalContext}
          onChange={(e) => setAdditionalContext(e.target.value)}
          placeholder="Any helpful context? E.g.: 'This was a quick exit ticket at the end of class' or 'Some students have IEPs' or 'We just finished our first lesson on this topic'"
          rows={2}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-ink resize-none focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent placeholder-gray-400"
        />
      </div>

      {/* Responsible AI notice */}
      <Alert type="info">
        <strong>How the AI uses your data:</strong> Student evidence is sent to OpenAI for analysis and is not stored.
        The AI may miss context you have as the teacher. Always apply your own professional judgment — treat this as a
        first draft, not a final decision.
      </Alert>

      {/* Submit */}
      <Button
        variant="primary"
        size="lg"
        className="w-full justify-center"
        onClick={handleSubmit}
        disabled={!canSubmit}
        loading={loading}
      >
        {loading ? "Analyzing your class..." : "Analyze Classroom Evidence"}
      </Button>

      {loading && (
        <div className="text-center text-sm text-ink-muted animate-pulse">
          Reading student responses · Identifying patterns · Generating insights...
        </div>
      )}
    </div>
  );
}
