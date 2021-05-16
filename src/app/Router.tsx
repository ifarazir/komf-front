import { Router } from "@reach/router";
import { useSelector } from "react-redux";

import Auth from "./pages/Auth";

import Error from "./pages/Error";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Landing from "./pages/Landing";
import Exam from "./pages/Exam";
import UserDashboard from "./pages/UserDashboard";
import Course from "./pages/Course";
import Lesson from "./pages/Lesson";
import ExamAdmin from "./pages/ExamAdmin";
import VocabAdmin from "./pages/VocabAdmin";
import Report from "./pages/Report";

import LoginForm from "./features/session/LoginForm";
import SignupForm from "./features/session/SignupForm";

import { selectSession } from "./features/session/sessionsSlice";
import AdminCourseDetail from "./pages/AdminCourseDetail";
import AdminLessonDetail from "./pages/AdminLessonDetail";
import ProfilePage from "./pages/Profile";

export default function MainRouter() {
    const session = useSelector(selectSession);
    const isAdmin = session && session.role === "admin";

    return (
        <Router>
            <Error default />
            <Landing path="/" />
            <Exam path="exam/start" />

            <Home path="panel">
                <ProfilePage path="/profile" />
                {!isAdmin && <UserDashboard path="/" />}

                {isAdmin && <Admin path="/" />}
                {isAdmin && <Course path="course" />}
                {isAdmin && <AdminCourseDetail path="course/:courseId" />}
                {isAdmin && <Lesson path="lesson" />}
                {isAdmin && <AdminLessonDetail path="lesson/:lessonId" />}
                {isAdmin && <ExamAdmin path="exam" />}
                {isAdmin && <VocabAdmin path="vocab" />}
                {isAdmin && <Report path="report" />}
            </Home>

            <Auth path="/auth">
                <LoginForm path="/" />
                <SignupForm path="signup" />
            </Auth>
        </Router>
    );
}
