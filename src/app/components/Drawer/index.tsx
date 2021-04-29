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
                        <Link to="/panel" className={styles.navLink}>
                            <i className={"bi " + location.pathname !== "/panel" ? "bi-house-door-fill" : "bi-house-door"} />
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="report" className={styles.navLink}>
                            <i className="bi bi-bar-chart" />
                            Report
                        </Link>
                    </li>
                    <li>
                        <Link to="exam" className={styles.navLink}>
                            <i className="bi bi-pencil" />
                            Exam
                        </Link>
                    </li>
                    {isAdmin && (
                        <li>
                            <Link to="course">
                                <i className="bi bi-pencil" />
                                Course
                            </Link>
                        </li>
                    )}
                    {isAdmin && (
                        <li>
                            <Link to="lesson">
                                <i className="bi bi-pencil" />
                                Lesson
                            </Link>
                        </li>
                    )}
                    {isAdmin && (
                        <li>
                            <Link to="vocab">
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
