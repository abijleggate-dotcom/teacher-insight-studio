import type { AnalysisRequest, AnalysisResult } from "@/types";

export function buildAnalysisPrompt(request: AnalysisRequest): string {
  return `You are an expert educational data analyst helping a ${request.gradeLevel} grade math teacher understand their students' thinking.

The teacher has provided classroom evidence related to: **${request.concept}**

${request.additionalContext ? `Additional context from teacher: ${request.additionalContext}\n\n` : ""}

Here is the student evidence:
---
${request.studentData}
---

Analyze this evidence and respond with a JSON object matching this exact TypeScript interface. Do not include any text outside the JSON.

The JSON must include:
{
  "classSummary": {
    "totalStudents": number,
    "masteryCount": number,
    "progressingCount": number,
    "needsSupportCount": number,
    "unclearCount": number,
    "overallReadiness": "strong" | "mixed" | "emerging",
    "keyTakeaway": "2-3 sentence plain-language summary for the teacher",
    "urgentNote": "optional urgent note if something needs immediate attention"
  },
  "students": [
    {
      "name": "student name",
      "evidenceSnippet": "direct quote or paraphrase of key evidence",
      "understoodLevel": "mastery" | "progressing" | "needs_support" | "unclear",
      "misconception": "optional - specific misconception if present",
      "strength": "optional - specific strength if mastery/progressing",
      "recommendedFeedback": "teacher-friendly feedback sentence for this student",
      "nextStep": "specific actionable next step for the teacher",
      "confidenceScore": 0-100,
      "aiCaution": "optional - if evidence is vague or ambiguous, note it here",
      "actionPriority": "act_now" | "review_soon" | "monitor" | "celebrate"
    }
  ],
  "misconceptions": [
    {
      "name": "misconception name",
      "description": "plain-language explanation of the misconception",
      "evidenceSnippets": ["direct evidence from student responses"],
      "affectedStudents": ["student names"],
      "suggestedNextMove": "specific instructional move to address this",
      "sampleTeacherLanguage": "example script the teacher could use"
    }
  ],
  "recommendations": {
    "smallGroups": [
      {
        "groupName": "descriptive name",
        "focus": "what this group needs to work on",
        "students": ["student names"],
        "suggestedActivity": "specific activity description",
        "estimatedTime": "X minutes"
      }
    ],
    "oneOnOneCheckIns": ["student name — reason for 1:1"],
    "wholeclassMiniLesson": {
      "topic": "topic",
      "rationale": "why this is needed based on the evidence",
      "suggestedApproach": "how to teach it",
      "estimatedTime": "X minutes",
      "materials": "optional materials list"
    },
    "celebrationNote": "what to celebrate with the class"
  },
  "studentFeedbackExamples": [
    {
      "studentName": "name",
      "feedbackText": "student-friendly feedback (2-4 sentences, plain language, specific)",
      "tone": "encouraging" | "redirecting" | "clarifying"
    }
  ],
  "aiTrust": {
    "overallConfidence": 0-100,
    "evidenceUsed": ["list of evidence types and sources used"],
    "possibleLimitations": ["limitations of this analysis"],
    "teacherShouldVerify": ["specific students or claims to verify"],
    "flags": [
      {
        "type": "vague" | "missing" | "contradictory" | "insufficient",
        "studentName": "optional",
        "description": "what the flag is about"
      }
    ],
    "rubricAlignment": "how this aligns with grade-level standards"
  }
}

IMPORTANT GUIDELINES:
- Be specific and actionable — not generic
- Quote directly from student evidence where possible
- Do not overclaim certainty — flag vague or ambiguous evidence
- Use plain teacher-friendly language throughout
- Prioritize students who need immediate support in your urgency flagging
- Identify patterns across students, not just individual analysis
- For misconceptions, provide specific counterexamples and teacher language
- Be honest about limitations of text-based evidence
- All feedback examples should be warm, specific, and non-condescending
`;
}

export function parseAnalysisResponse(raw: string, request: AnalysisRequest): AnalysisResult {
  const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  const parsed = JSON.parse(cleaned);
  return {
    ...parsed,
    analysisTimestamp: new Date().toISOString(),
    gradeLevel: request.gradeLevel,
    concept: request.concept,
  };
}

export function getConfidenceLabel(score: number): string {
  if (score >= 90) return "High";
  if (score >= 75) return "Moderate";
  if (score >= 60) return "Low";
  return "Very Low";
}

export function getConfidenceColor(score: number): string {
  if (score >= 90) return "text-sage-600";
  if (score >= 75) return "text-amber-600";
  if (score >= 60) return "text-coral-500";
  return "text-coral-600";
}

export function getActionPriorityConfig(priority: string) {
  const configs: Record<string, { label: string; color: string; bg: string; border: string }> = {
    act_now: { label: "Act Now", color: "text-coral-700", bg: "bg-coral-50", border: "border-coral-200" },
    review_soon: { label: "Review Soon", color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
    monitor: { label: "Monitor", color: "text-sky-700", bg: "bg-sky-50", border: "border-sky-200" },
    celebrate: { label: "Celebrate", color: "text-sage-700", bg: "bg-sage-50", border: "border-sage-200" },
  };
  return configs[priority] ?? configs.monitor;
}

export function getLevelConfig(level: string) {
  const configs: Record<string, { label: string; color: string; bg: string; dot: string }> = {
    mastery: { label: "Mastery", color: "text-sage-700", bg: "bg-sage-100", dot: "bg-sage-500" },
    progressing: { label: "Progressing", color: "text-amber-700", bg: "bg-amber-100", dot: "bg-amber-500" },
    needs_support: { label: "Needs Support", color: "text-coral-700", bg: "bg-coral-100", dot: "bg-coral-500" },
    unclear: { label: "Unclear", color: "text-ink-muted", bg: "bg-gray-100", dot: "bg-gray-400" },
  };
  return configs[level] ?? configs.unclear;
}

export function generateExportContent(type: string, data: AnalysisResult): string {
  const timestamp = new Date(data.analysisTimestamp).toLocaleDateString();

  if (type === "action_plan") {
    return `TEACHER ACTION PLAN
Generated: ${timestamp} | Class: ${data.gradeLevel} Grade | Concept: ${data.concept}

═══════════════════════════════════════════
CLASS OVERVIEW
═══════════════════════════════════════════
${data.classSummary.keyTakeaway}
${data.classSummary.urgentNote ? `\n⚠️ URGENT: ${data.classSummary.urgentNote}` : ""}

Mastery: ${data.classSummary.masteryCount} students
Progressing: ${data.classSummary.progressingCount} students
Needs Support: ${data.classSummary.needsSupportCount} students

═══════════════════════════════════════════
ACT NOW (Priority Students)
═══════════════════════════════════════════
${data.students
  .filter((s) => s.actionPriority === "act_now")
  .map((s) => `• ${s.name}: ${s.nextStep}`)
  .join("\n")}

═══════════════════════════════════════════
WHOLE-CLASS MINI-LESSON
═══════════════════════════════════════════
Topic: ${data.recommendations.wholeclassMiniLesson.topic}
Rationale: ${data.recommendations.wholeclassMiniLesson.rationale}
Approach: ${data.recommendations.wholeclassMiniLesson.suggestedApproach}
Time: ${data.recommendations.wholeclassMiniLesson.estimatedTime}

═══════════════════════════════════════════
1:1 CHECK-INS NEEDED
═══════════════════════════════════════════
${data.recommendations.oneOnOneCheckIns.map((s) => `• ${s}`).join("\n")}

═══════════════════════════════════════════
CELEBRATE
═══════════════════════════════════════════
${data.recommendations.celebrationNote}

---
Generated by Teacher Insight Studio | AI-assisted, teacher-verified`;
  }

  if (type === "small_group_plan") {
    return `SMALL GROUP PLAN
Generated: ${timestamp} | ${data.gradeLevel} Grade | ${data.concept}

${data.recommendations.smallGroups
  .map(
    (g, i) => `GROUP ${i + 1}: ${g.groupName}
Students: ${g.students.join(", ")}
Focus: ${g.focus}
Activity: ${g.suggestedActivity}
Time: ${g.estimatedTime}
`
  )
  .join("\n═══════════════════════════════════════════\n")}

---
Generated by Teacher Insight Studio`;
  }

  if (type === "product_brief") {
    return `PRODUCT EXPERIMENT BRIEF
Teacher Insight Studio — AI Classroom Analysis Prototype

Date: ${timestamp}
Grade: ${data.gradeLevel} | Concept: ${data.concept}
Students Analyzed: ${data.classSummary.totalStudents}
AI Confidence: ${data.aiTrust.overallConfidence}%

WHAT THIS PROTOTYPE TESTS:
Can AI help teachers move faster from messy student evidence to instructional decisions?

SUCCESS METRICS:
• Time-to-insight: Does the teacher reach an instructional decision faster?
• Decision quality: Do AI-suggested next steps match expert teacher judgment?
• Teacher trust: Does the teacher feel the AI is transparent and honest?
• Adoption signal: Does the teacher use it a second time?

SAFETY RISKS IDENTIFIED:
• AI may misclassify students based on limited written evidence
• Confidence scores may create false certainty
• Misconception labels may not match teacher's own framing
• Feedback language may not fit classroom culture

WHAT TO TEST WITH TEACHERS:
• Intercept study: Show mock output and ask 'What would you do next?'
• Task-time comparison: Paper review vs. AI-assisted review
• Trust calibration: Where do teachers override AI? Why?

FLAGS FROM THIS ANALYSIS:
${data.aiTrust.flags.map((f) => `• ${f.type.toUpperCase()} — ${f.studentName ? f.studentName + ": " : ""}${f.description}`).join("\n")}

---
Generated by Teacher Insight Studio | For internal use only`;
  }

  if (type === "engineering_ticket") {
    return `ENGINEERING TICKET
Feature: AI Classroom Evidence Analysis
Prototype: Teacher Insight Studio

USER STORY:
As a ${data.gradeLevel} grade math teacher, I want to paste in messy student responses and get a clear picture of who understands, who is stuck, and what I should do next — so I can plan smarter without spending 45 minutes reading every response.

ACCEPTANCE CRITERIA:
☐ Teacher can paste text or upload CSV of student responses
☐ Teacher can select grade level and math concept
☐ App returns: class summary, per-student analysis, misconception map, recommended actions
☐ Each student card shows: understanding level, evidence quote, next step, confidence score
☐ AI flags low-confidence classifications explicitly
☐ Export to action plan (text format) works
☐ Loading state shown during AI call
☐ Error state handles API failure gracefully
☐ Accessible: keyboard navigable, screen-reader compatible

TECHNICAL NOTES:
• Uses OpenAI GPT-4 via structured prompt
• Response parsed to strict TypeScript interface
• No student PII stored — analysis is ephemeral
• Target response time: < 15 seconds

WHAT WOULD JUSTIFY INVESTMENT:
• 3+ teachers report saving >20 minutes per use
• Instructional decisions align with expert review >80% of the time
• Teacher re-use rate >60% after first session

WHAT WOULD CAUSE US TO PIVOT:
• AI confidence calibration proves unreliable
• Teachers report friction in trusting/overriding outputs
• Equity concerns: AI systematically misclassifies specific student populations

---
Generated by Teacher Insight Studio Product Team`;
  }

  return "";
}
