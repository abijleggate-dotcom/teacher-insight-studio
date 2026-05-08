export type GradeLevel = "3rd" | "4th" | "5th" | "6th" | "7th" | "8th";

export type MathConcept =
  | "Fractions - Adding & Subtracting"
  | "Fractions - Multiplying & Dividing"
  | "Ratios & Proportional Reasoning"
  | "Expressions & Equations"
  | "Geometry - Area & Perimeter"
  | "Statistics & Data"
  | "Number Sense & Operations"
  | "Custom";

export type UnderstoodLevel = "mastery" | "progressing" | "needs_support" | "unclear";

export type ActionPriority = "act_now" | "review_soon" | "monitor" | "celebrate";

export interface StudentAnalysis {
  name: string;
  evidenceSnippet: string;
  understoodLevel: UnderstoodLevel;
  misconception?: string;
  strength?: string;
  recommendedFeedback: string;
  nextStep: string;
  confidenceScore: number; // 0-100
  aiCaution?: string;
  actionPriority: ActionPriority;
}

export interface Misconception {
  name: string;
  description: string;
  evidenceSnippets: string[];
  affectedStudents: string[];
  suggestedNextMove: string;
  sampleTeacherLanguage: string;
}

export interface ClassSummary {
  totalStudents: number;
  masteryCount: number;
  progressingCount: number;
  needsSupportCount: number;
  unclearCount: number;
  overallReadiness: "strong" | "mixed" | "emerging";
  keyTakeaway: string;
  urgentNote?: string;
}

export interface InstructionalRecommendation {
  smallGroups: SmallGroup[];
  oneOnOneCheckIns: string[];
  wholeclassMiniLesson: MiniLesson;
  celebrationNote: string;
}

export interface SmallGroup {
  groupName: string;
  focus: string;
  students: string[];
  suggestedActivity: string;
  estimatedTime: string;
}

export interface MiniLesson {
  topic: string;
  rationale: string;
  suggestedApproach: string;
  estimatedTime: string;
  materials?: string;
}

export interface AITrustMetadata {
  overallConfidence: number; // 0-100
  evidenceUsed: string[];
  possibleLimitations: string[];
  teacherShouldVerify: string[];
  flags: AIFlag[];
  rubricAlignment: string;
}

export interface AIFlag {
  type: "vague" | "missing" | "contradictory" | "insufficient";
  studentName?: string;
  description: string;
}

export interface StudentFeedbackExample {
  studentName: string;
  feedbackText: string;
  tone: "encouraging" | "redirecting" | "clarifying";
}

export interface AnalysisResult {
  classSummary: ClassSummary;
  students: StudentAnalysis[];
  misconceptions: Misconception[];
  recommendations: InstructionalRecommendation;
  studentFeedbackExamples: StudentFeedbackExample[];
  aiTrust: AITrustMetadata;
  analysisTimestamp: string;
  gradeLevel: GradeLevel;
  concept: string;
}

export interface AnalysisRequest {
  studentData: string;
  gradeLevel: GradeLevel;
  concept: string;
  additionalContext?: string;
}

export interface ExportPayload {
  type: "action_plan" | "small_group_plan" | "product_brief" | "engineering_ticket";
  data: AnalysisResult;
}
