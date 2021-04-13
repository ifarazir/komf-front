import { Button } from "react-bootstrap";
import { Link, RouteComponentProps, useLocation, useMatch } from "@reach/router";

import "./exam.css";

export default function Exam(props: RouteComponentProps) {
    const location = useLocation();
    const match = useMatch(location.pathname);
    console.log(match);

    return (
        <div className="text-center p-4 exam">
            <Link to="/panel">Back</Link>
        </div>
    );
}
