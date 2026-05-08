import type { AnalysisResult } from "@/types";

export const SAMPLE_STUDENT_DATA = `Student: Marcus T.
"To add 1/2 + 1/3 I just did 1+1=2 and 2+3=5 so the answer is 2/5. That's how fractions work you add the tops and then add the bottoms."

Student: Priya N.
"I found a common denominator of 6. So 1/2 becomes 3/6 and 1/3 becomes 2/6. Then I added the numerators: 3+2=5. So the answer is 5/6. I checked by thinking about it on a number line."

Student: DeShawn W.
"I think the answer is 5/6 because you need to make the denominators the same first. I multiplied 1/2 by 3/3 and got 3/6. Then 1/3 by 2/2 is 2/6. Add them = 5/6."

Student: Aaliyah M.
"I added 1+1 for the top = 2 and 2+3 = 5 so 2/5. Fractions are confusing but I tried."

Student: James K.
"The answer is 5/6. You change both to sixths because 6 is the LCM. 3/6 + 2/6 = 5/6."

Student: Sofia R.
"I got 1/2 + 1/3 = 2/5 because you add numerators and denominators. My brother showed me this way."

Student: Ethan L.
"I drew a picture. I split one rectangle into 2 and shaded 1 part. I split another into 3 and shaded 1 part. When I put them together I counted 5 shaded pieces out of... I'm not sure how many total. Maybe 5/5? Or 5/6?"

Student: Yara H.
"1/2 + 1/3. I know I need same denominators. I used 6. Then 1/2 = 3/6. 1/3 = 2/6. 3+2 = 5. Answer: 5/6. This makes sense because 5/6 is close to 1 whole and both fractions together should be close to one."

Student: Carlos M.
"I put the fractions on a number line. 1/2 is at the middle and 1/3 is before that. I jumped from 0 to 1/3 then jumped 1/2 more. I landed around 5/6 I think."

Student: Nina P.
"The answer is 2/5. You add across. My old teacher taught us that way."

Student: Jaylen B.
"I got confused. I tried to make the bottoms the same but I used 5 as the bottom. So I got 2.5/5 + 1.67/5 which doesn't work. I don't know how to find the LCD."

Student: Amara O.
"5/6. Common denominator is 6. Simple."`;

export const GRADE_LEVELS = ["3rd", "4th", "5th", "6th", "7th", "8th"] as const;

export const MATH_CONCEPTS = [
  "Fractions - Adding & Subtracting",
  "Fractions - Multiplying & Dividing",
  "Ratios & Proportional Reasoning",
  "Expressions & Equations",
  "Geometry - Area & Perimeter",
  "Statistics & Data",
  "Number Sense & Operations",
  "Custom",
] as const;

export const MOCK_ANALYSIS_RESULT: AnalysisResult = {
  analysisTimestamp: new Date().toISOString(),
  gradeLevel: "5th",
  concept: "Fractions - Adding & Subtracting",
  classSummary: {
    totalStudents: 12,
    masteryCount: 5,
    progressingCount: 3,
    needsSupportCount: 4,
    unclearCount: 0,
    overallReadiness: "mixed",
    keyTakeaway:
      "About half the class has a solid grasp of finding common denominators, but a persistent misconception — adding numerators and denominators separately — is affecting at least 4 students and needs direct address before moving forward.",
    urgentNote:
      "The 'add across' misconception (1/2 + 1/3 = 2/5) appeared in 4 responses and may have spread from peer or prior instruction. Address whole-class before next lesson.",
  },
  students: [
    {
      name: "Marcus T.",
      evidenceSnippet: '"I just did 1+1=2 and 2+3=5 so the answer is 2/5. That\'s how fractions work."',
      understoodLevel: "needs_support",
      misconception: "Add-across misconception: treats numerators and denominators as independent whole numbers",
      recommendedFeedback:
        "Marcus, you're thinking about the parts of a fraction — that's great. Let's talk about why the denominator can't just get added like the numerator can.",
      nextStep: "1:1 or small group — use fraction strips to show why 2/5 is actually less than 1/2 alone",
      confidenceScore: 91,
      actionPriority: "act_now",
    },
    {
      name: "Priya N.",
      evidenceSnippet: '"I found a common denominator of 6... I checked by thinking about it on a number line."',
      understoodLevel: "mastery",
      strength: "Procedurally fluent and uses number line to verify — shows conceptual grounding",
      recommendedFeedback:
        "Priya, your explanation is really clear and your instinct to check your answer on the number line shows strong number sense. Well done.",
      nextStep: "Extend: try fractions with unlike denominators where LCD is not obvious (e.g., 1/4 + 2/6)",
      confidenceScore: 96,
      actionPriority: "celebrate",
    },
    {
      name: "DeShawn W.",
      evidenceSnippet: '"I multiplied 1/2 by 3/3 and got 3/6. Then 1/3 by 2/2 is 2/6."',
      understoodLevel: "mastery",
      strength: "Uses equivalent fraction reasoning explicitly — understands why the procedure works",
      recommendedFeedback:
        "DeShawn, showing how you used equivalent fractions to find a common denominator is exactly the kind of thinking we want. You're ready for harder problems.",
      nextStep: "Peer mentor candidate. Try mixed number addition.",
      confidenceScore: 94,
      actionPriority: "celebrate",
    },
    {
      name: "Aaliyah M.",
      evidenceSnippet: '"I added 1+1 for the top = 2 and 2+3 = 5 so 2/5. Fractions are confusing but I tried."',
      understoodLevel: "needs_support",
      misconception: "Add-across misconception. Also expresses low confidence — may need affective support",
      recommendedFeedback:
        "Aaliyah, I can tell you're working hard on this. Let's look at this together — I think there's one key idea that will make this click.",
      nextStep: "1:1 check-in. Use visual models first. Address confidence alongside the concept.",
      confidenceScore: 88,
      actionPriority: "act_now",
    },
    {
      name: "James K.",
      evidenceSnippet: '"The answer is 5/6. You change both to sixths because 6 is the LCM."',
      understoodLevel: "mastery",
      strength: "Uses LCM terminology correctly and efficiently. Answer is correct.",
      recommendedFeedback: "James, great work. Can you explain why we use the LCM instead of any common denominator?",
      nextStep: "Extend to 3-fraction addition or subtraction. Probe conceptual understanding with 'why' question.",
      confidenceScore: 85,
      aiCaution: "Response is brief — confident but limited written evidence. Verify verbally.",
      actionPriority: "celebrate",
    },
    {
      name: "Sofia R.",
      evidenceSnippet: '"I got 2/5 because you add numerators and denominators. My brother showed me this way."',
      understoodLevel: "needs_support",
      misconception: "Add-across misconception. May have received incorrect instruction at home.",
      recommendedFeedback:
        "Sofia, it sounds like you learned a shortcut that actually doesn't work for addition. That happens! Let's learn the correct method together.",
      nextStep: "Small group. Gently address prior instruction without undermining trust. Use fraction tiles.",
      confidenceScore: 90,
      actionPriority: "act_now",
    },
    {
      name: "Ethan L.",
      evidenceSnippet: '"I drew a picture... I\'m not sure how many total. Maybe 5/5? Or 5/6?"',
      understoodLevel: "progressing",
      strength: "Uses area model — correct strategy. Loses track of the whole unit when combining.",
      recommendedFeedback:
        "Ethan, drawing a picture is a smart strategy! You're really close. The trick is making sure both rectangles are the same size when you compare.",
      nextStep: "Small group: reinforce that the 'whole' must stay constant. Use same-size fraction bars.",
      confidenceScore: 82,
      actionPriority: "review_soon",
    },
    {
      name: "Yara H.",
      evidenceSnippet: '"5/6 is close to 1 whole and both fractions together should be close to one."',
      understoodLevel: "mastery",
      strength: "Uses estimation and number sense to verify — strong conceptual anchor",
      recommendedFeedback:
        "Yara, your reasoning about '5/6 being close to 1 whole' shows really deep understanding. That's exactly how strong math thinkers check their work.",
      nextStep: "Extend to subtraction of mixed numbers. Encourage her to model for class.",
      confidenceScore: 97,
      actionPriority: "celebrate",
    },
    {
      name: "Carlos M.",
      evidenceSnippet: '"I put the fractions on a number line... I landed around 5/6 I think."',
      understoodLevel: "progressing",
      strength: "Number line strategy is conceptually strong but execution is uncertain",
      recommendedFeedback:
        "Carlos, using a number line is a great approach. Let's make sure the intervals are even so your jumps land in exactly the right place.",
      nextStep: "Work on precision with number line models. Pair with procedural method to cross-check.",
      confidenceScore: 78,
      aiCaution: "Response is somewhat ambiguous — hard to determine if this is near-mastery or a lucky estimate.",
      actionPriority: "review_soon",
    },
    {
      name: "Nina P.",
      evidenceSnippet: '"The answer is 2/5. You add across. My old teacher taught us that way."',
      understoodLevel: "needs_support",
      misconception: "Add-across misconception. Attributes to prior teacher — may be resistant to correction.",
      recommendedFeedback:
        "Nina, that's a common mistake and I understand it came from somewhere you trusted. Let's look at why this method doesn't work with a quick example.",
      nextStep: "1:1 or small group. Acknowledge prior learning. Build cognitive dissonance with a counterexample (e.g., 1/2 + 1/2 ≠ 2/4).",
      confidenceScore: 89,
      actionPriority: "act_now",
    },
    {
      name: "Jaylen B.",
      evidenceSnippet: '"I tried to make the bottoms the same but I used 5 as the bottom... I don\'t know how to find the LCD."',
      understoodLevel: "progressing",
      strength: "Understands that common denominators are needed — correct conceptual start. Struggles with finding LCD.",
      recommendedFeedback:
        "Jaylen, you had the right idea — you knew you needed to change the denominators. Let's work on how to figure out which number to use.",
      nextStep: "Small group: teach multiples strategy for finding LCD. This is a procedural gap, not conceptual.",
      confidenceScore: 86,
      actionPriority: "review_soon",
    },
    {
      name: "Amara O.",
      evidenceSnippet: '"5/6. Common denominator is 6. Simple."',
      understoodLevel: "mastery",
      strength: "Correct answer and approach.",
      recommendedFeedback: "Amara, correct! Can you walk me through how you knew to use 6?",
      nextStep: "Probe conceptual understanding — brief response gives limited evidence of reasoning depth.",
      confidenceScore: 72,
      aiCaution: "Very brief response — confidence in 'mastery' classification is moderate. Verify with follow-up question.",
      actionPriority: "monitor",
    },
  ],
  misconceptions: [
    {
      name: "Add-Across Misconception",
      description:
        "Students add numerators together and denominators together as if they are independent whole numbers (e.g., 1/2 + 1/3 = 2/5).",
      evidenceSnippets: [
        "Marcus: 'I just did 1+1=2 and 2+3=5 so the answer is 2/5'",
        "Aaliyah: 'I added 1+1 for the top = 2 and 2+3 = 5 so 2/5'",
        "Sofia: 'I got 2/5 because you add numerators and denominators'",
        "Nina: 'The answer is 2/5. You add across.'",
      ],
      affectedStudents: ["Marcus T.", "Aaliyah M.", "Sofia R.", "Nina P."],
      suggestedNextMove:
        "Use a counterexample: Ask 'What is 1/2 + 1/2?' Most students know this equals 1. Then show that 'add-across' would give 2/4 = 1/2, which is clearly wrong. Build cognitive dissonance before teaching the procedure.",
      sampleTeacherLanguage:
        "\"I've seen a few of you add the tops and bottoms separately. Let's test that with a problem you already know: what's 1/2 + 1/2? Right, it's 1 whole. But if we added across, we'd get 2/4 — that's only one half! So the 'add across' shortcut doesn't actually work for fraction addition. Here's why...\"",
    },
    {
      name: "Inconsistent Whole Unit (Area Model)",
      description:
        "When using area/visual models, student shades correct number of parts but loses track of the 'whole' when combining, leading to incorrect denominators.",
      evidenceSnippets: ["Ethan: 'I counted 5 shaded pieces out of... I'm not sure how many total. Maybe 5/5? Or 5/6?'"],
      affectedStudents: ["Ethan L."],
      suggestedNextMove:
        "Provide pre-drawn fraction bars of identical total length. Have students physically place them side by side. Emphasize that the 'whole' is the same-sized bar, not the total number of pieces across both.",
      sampleTeacherLanguage:
        "\"Ethan, great instinct drawing a picture! Here's the tricky part — when we combine fractions, the 'whole' has to stay the same size. Watch what happens if I use bars that are all the same length...\"",
    },
  ],
  recommendations: {
    smallGroups: [
      {
        groupName: "The Add-Across Group",
        focus: "Unlearning the add-across misconception through counterexamples and visual models",
        students: ["Marcus T.", "Aaliyah M.", "Sofia R.", "Nina P."],
        suggestedActivity:
          "Start with 1/2 + 1/2 to create cognitive dissonance, then use fraction strips to build intuition, then teach the equivalent fractions procedure.",
        estimatedTime: "20–25 minutes",
      },
      {
        groupName: "The Almost-There Group",
        focus: "Strengthening procedural accuracy and number line / visual model precision",
        students: ["Ethan L.", "Carlos M.", "Jaylen B."],
        suggestedActivity:
          "Teach the multiples strategy for finding LCD. Use pre-drawn number lines with consistent intervals. Pair visual and procedural methods.",
        estimatedTime: "15–20 minutes",
      },
    ],
    oneOnOneCheckIns: [
      "Aaliyah M. — math anxiety signals in response; address confidence alongside the concept",
      "Amara O. — verify mastery classification with a brief verbal probe",
      "James K. — brief response; ask 'why do we use LCM instead of any common denominator?'",
    ],
    wholeclassMiniLesson: {
      topic: "Why We Can't Add Numerators and Denominators Separately",
      rationale:
        "4 out of 12 students showed the add-across misconception. This is likely to persist and block future fraction work if not addressed explicitly at the class level.",
      suggestedApproach:
        "Open with 1/2 + 1/2 = ? (students know this is 1). Ask: what would 'add across' give us? (2/4). Is 2/4 equal to 1? No — it's 1/2. So 'add across' breaks. Use this to motivate the correct approach.",
      estimatedTime: "8–10 minutes",
      materials: "Fraction strips, whiteboard, sentence frames for math talk",
    },
    celebrationNote:
      "Priya, DeShawn, Yara, and James demonstrated strong mastery with clear reasoning. Consider having Yara share her 'estimation check' strategy with the class — it models what mathematical thinking looks like.",
  },
  studentFeedbackExamples: [
    {
      studentName: "Marcus T.",
      feedbackText:
        "Marcus, you're thinking carefully about the parts of a fraction — that's a real math instinct. The key idea we're working on: the denominator tells us how many equal parts make a whole, so it can't just get added like a regular number. Let's look at this together with fraction strips.",
      tone: "redirecting",
    },
    {
      studentName: "Priya N.",
      feedbackText:
        "Priya, your explanation is one of the clearest in the class. Not only did you find the right answer, but you checked it on a number line — that's exactly what strong math thinkers do. I'm going to push you to try some trickier ones.",
      tone: "encouraging",
    },
    {
      studentName: "Ethan L.",
      feedbackText:
        "Ethan, drawing a picture was a smart strategy! You got the right instinct — you needed to combine the parts. The one thing to nail down: both of the 'wholes' need to be the same size before you start counting pieces. Let's try it again with same-size bars.",
      tone: "clarifying",
    },
  ],
  aiTrust: {
    overallConfidence: 84,
    evidenceUsed: [
      "Direct student written responses (12 students)",
      "Procedural accuracy (correct vs. incorrect final answers)",
      "Explanation quality (presence/absence of reasoning language)",
      "Strategy identification (number line, area model, LCD, add-across)",
      "Affective language signals (e.g., 'fractions are confusing', 'I tried')",
    ],
    possibleLimitations: [
      "Written responses may not fully represent what students understand verbally",
      "Some students wrote very brief responses — confidence classifications may be less accurate",
      "The AI cannot observe student affect, body language, or classroom context",
      "Prior instruction history (Sofia's 'my brother taught me') affects interpretation but cannot be fully accounted for",
      "This analysis is based on a single snapshot of evidence, not a longitudinal view",
    ],
    teacherShouldVerify: [
      "Amara O. — very brief response; mastery classification is moderate confidence only",
      "James K. — correct answer but limited written reasoning; probe verbally",
      "Carlos M. — number line response is ambiguous; unclear if answer reflects understanding or estimation",
      "Aaliyah M. — affective distress signal noted; teacher best positioned to assess support needed",
    ],
    flags: [
      {
        type: "insufficient",
        studentName: "Amara O.",
        description: "Response is 3 words. Insufficient evidence for confident mastery classification.",
      },
      {
        type: "insufficient",
        studentName: "James K.",
        description: "Correct answer and terminology, but reasoning is not elaborated. Moderate confidence only.",
      },
      {
        type: "vague",
        studentName: "Carlos M.",
        description: "Number line description is imprecise — unclear whether final answer reflects understanding.",
      },
    ],
    rubricAlignment:
      "Analysis aligns with CCSS 5.NF.A.1 (Add and subtract fractions with unlike denominators) and targets both procedural fluency and conceptual understanding as described in the Progressions Documents.",
  },
};
