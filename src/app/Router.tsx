import { Router } from "@reach/router";
import { useSelector } from "react-redux";

import Auth from "./pages/Auth";

import Error from "./pages/Error";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Landing from "./pages/Landing";
import Exam from "./pages/Exam";
import MainExam from "./pages/Exam/Main";
import UserDashboard from "./pages/User/Dashboard";
import Course from "./pages/Course";
// import Lesson from "./pages/Lesson";
// import VocabAdmin from "./pages/Admin/Vocabs";
import ExamAdmin from "./pages/Admin/Exams";
import Report from "./pages/Report";

import LoginForm from "./features/session/LoginForm";
import SignupForm from "./features/session/SignupForm";

import { selectSession } from "./features/session/sessionsSlice";
import AdminCourseDetail from "./pages/Admin/CourseDetail";
import AdminLessonDetail from "./pages/Admin/LessonDetail";
import ProfilePage from "./pages/Profile";
import ExamDetails from "./pages/Admin/ExamDetail";

export default function MainRouter() {
    const session = useSelector(selectSession);
    const isAdmin = session && session.role === "admin";

    return (
        <Router>
            <Error default />
            <Landing path="/landing" />
            <MainExam path="exam/start/:examId" />

            <Home path="/">
                <ProfilePage path="/profile" />
                {!isAdmin && <UserDashboard path="/" />}
                {!isAdmin && <Exam path="/exam" />}

                {isAdmin && <Admin path="/" />}
                {isAdmin && <AdminCourseDetail path="course/:courseId" />}
                {isAdmin && <Course path="course" />}
                {/* {isAdmin && <Lesson path="lesson" />} */}
                {/* {isAdmin && <VocabAdmin path="vocab" />} */}
                {isAdmin && <AdminLessonDetail path="lesson/:lessonId" />}
                {isAdmin && <ExamAdmin path="exam" />}
                {isAdmin && <ExamDetails path="exam/:examId" />}
                {isAdmin && <Report path="report" />}
            </Home>

            <Auth path="/auth">
                <LoginForm path="/" />
                <SignupForm path="signup" />
            </Auth>
        </Router>
    );
}
