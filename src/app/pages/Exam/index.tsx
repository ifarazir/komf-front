import { Button } from "react-bootstrap";
import { Link, RouteComponentProps, useLocation, useMatch } from "@reach/router";
import { CSSTransition } from "react-transition-group";

import "./exam.css";

export default function Exam(props: RouteComponentProps) {
    const location = useLocation();
    const match = useMatch(location.pathname);
    console.log(match);

    return (
        <div style={{ position: "relative" }}>
            <CSSTransition in={location.pathname === "/exam"} timeout={300} classNames="exam" unmountOnExit>
                <div className="text-center p-4 exam">
                    <Link to="/panel">Back</Link>
                </div>
            </CSSTransition>
        </div>
    );
}
