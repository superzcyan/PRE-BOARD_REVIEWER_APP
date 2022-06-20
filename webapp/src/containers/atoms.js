import { atom } from "recoil";

export const reviewerInfo = atom({
  key: "reviewerInfo",
  default: { name: "", institution: "" },
});

export const addState = atom({
  key: "addState",
  default: false,
});

export const defQuestion = atom({
  key: "defQuestion",
  default: {
    question: "",
    choices: [{ choice: "", image: "", description: "", isCorrect: false }],
    answer: 0,
  },
});

export const examStarted = atom({
  key: "examStarted",
  default: false,
});

export const timerStarted = atom({
  key: "timerStarted",
  default: false,
});

export const examItems = atom({
  key: "examItems",
  default: "50",
});

export const allQuestions = atom({
  key: "allQuestions",
  default: [],
});

export const completedExam = atom({
  key: "completedExam",
  default: [],
});

export const adminKey = atom({
  key: "adminKey",
  default: "",
});
