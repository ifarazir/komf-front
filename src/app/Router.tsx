import { Router } from "@reach/router";
import { useSelector } from "react-redux";

import Auth from "./pages/Auth";

import Error from "./pages/Error";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Landing from "./pages/Landing";
import Exam from "./pages/Exam";

import LoginForm from "./features/session/LoginForm";
import SignupForm from "./features/session/SignupForm";

import { selectSession } from "./features/session/sessionsSlice";
import UserDashboard from "./pages/UserDashboard";

export default function MainRouter() {
    const session = useSelector(selectSession);

    return (
        <Router>
            <Error default />
            <Landing path="/" />
            <Exam path="exam" />

            <Home path="panel">
                {session && session.role === "admin" && <Admin path="/" />}
                {session && session.role === "guest" && <UserDashboard path="/" />}
            </Home>

            <Auth path="/auth">
                <LoginForm path="/" />
                <SignupForm path="signup" />
            </Auth>
        </Router>
    );
}
