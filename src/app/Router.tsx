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

import LoginForm from "./features/session/LoginForm";
import SignupForm from "./features/session/SignupForm";

import { selectSession } from "./features/session/sessionsSlice";

export default function MainRouter() {
    const session = useSelector(selectSession);
    const isAdmin = session && session.role === "admin";

    return (
        <Router>
            <Error default />
            <Landing path="/" />
            <Exam path="exam" />

            <Home path="panel">
                {isAdmin && <Admin path="/" />}
                {isAdmin && <UserDashboard path="/" />}
                {isAdmin && <Course path="course" />}
            </Home>

            <Auth path="/auth">
                <LoginForm path="/" />
                <SignupForm path="signup" />
            </Auth>
        </Router>
    );
}
