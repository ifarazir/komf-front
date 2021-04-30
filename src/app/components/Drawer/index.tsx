import { Card } from "react-bootstrap";
import { Link, useLocation } from "@reach/router";

import { useDispatch, useSelector } from "react-redux";

import { logoutUser, selectSession } from "../../features/session/sessionsSlice";
import styles from "./drawer.module.css";

export default function Drawer() {
    const session = useSelector(selectSession);
    const dispatch = useDispatch();
    const location = useLocation();

    const isAdmin = session && session.role && session.role === "admin";

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <div className={styles.drawerCont}>
            <Card className={styles.drawer}>
                <div className="my-4 px-3">
                    <h5>KOMF</h5>
                </div>
                <ul>
                    <li>
                        <Link to="/panel" className={location.pathname === "/panel" ? styles.active : ""}>
                            <i className={"bi bi-house-door"} />
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="report" className={location.pathname === "/panel/report" ? styles.active : ""}>
                            <i className="bi bi-bar-chart" />
                            Report
                        </Link>
                    </li>
                    <li>
                        <Link to="exam" className={location.pathname === "/panel/exam" ? styles.active : ""}>
                            <i className="bi bi-pencil" />
                            Exam
                        </Link>
                    </li>
                    {isAdmin && (
                        <li>
                            <Link to="course" className={location.pathname === "/panel/course" ? styles.active : ""}>
                                <i className="bi bi-pencil" />
                                Course
                            </Link>
                        </li>
                    )}
                    {isAdmin && (
                        <li>
                            <Link to="lesson" className={location.pathname === "/panel/lesson" ? styles.active : ""}>
                                <i className="bi bi-pencil" />
                                Lesson
                            </Link>
                        </li>
                    )}
                    {isAdmin && (
                        <li>
                            <Link to="vocab" className={location.pathname === "/panel/vocab" ? styles.active : ""}>
                                <i className="bi bi-pencil" />
                                Vocabs
                            </Link>
                        </li>
                    )}
                    <div style={{ flexGrow: 1 }} />
                    <li className="my-3">
                        <a href="#" className={styles.navLink} onClick={handleLogout}>
                            Logout
                        </a>
                    </li>
                </ul>
            </Card>
        </div>
    );
}
