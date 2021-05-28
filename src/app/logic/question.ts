export type questionType = {
    id: string;
    examId: string;
    questionParentId: string;
    content: string;
    questionNumber: string;
    file: string;
    section: "reading" | "listening" | "speaking" | "writing";
    type: "body" | "singleChoice" | "multiChoice" | "ordering";
    part: null | 1 | 2 | 3 | 4;
    options: { A: string; B: string; C: string; D: string } | { A: string; B: string; C: string; D: string; E: string } | null;
    answer: [string] | [any] | null;
};
