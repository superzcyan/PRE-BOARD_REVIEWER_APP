import About from "../containers/About";
import ConfigQuestions from "../containers/ConfigQuestions";
import ContactUs from "../containers/ContactUs";
import ExamCompleted from "../containers/ExamCompleted";
import Login from "../containers/Login";
import Questions from "../containers/Questions";
import ReviewerLogin from "../containers/ReviewerLogin";
import StartExamPage from "../containers/StartExamPage";
import SummaryExam from "../containers/SummaryExam";

export const PrivateRoutes = [
  { path: "/about", element: <About /> },
  { path: "/contactus", element: <ContactUs /> },
  { path: "/reviewer-info", element: <ReviewerLogin /> },
  { path: "/start-exam", element: <StartExamPage /> },
  { path: "/questions", element: <Questions /> },
  { path: "/exam-completed", element: <ExamCompleted /> },
  { path: "/exam-summary", element: <SummaryExam /> },
  { path: "/login", element: <Login /> },
  { path: "/config-questions", element: <ConfigQuestions /> },
];
