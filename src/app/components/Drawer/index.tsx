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
                <div className="d-flex aling-items-center my-4 px-3">
                    <h5>{`KOMF | ${session?.fname} - ${session?.role}`}</h5>
                </div>
                <ul>
                    <li>
                        <Link to="/" className={location.pathname === "/" ? styles.active : ""}>
                            <i className={"bi bi-house-door"} />
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="profile" className={location.pathname === "/profile" ? styles.active : ""}>
                            <i className={"bi bi-person"} />
                            Profile
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="report" className={location.pathname === "/report" ? styles.active : ""}>
                            <i className="bi bi-bar-chart" />
                            Report
                        </Link>
                    </li> */}
                    {isAdmin ? (
                        <li>
                            <Link to="exam" className={location.pathname === "/exam" ? styles.active : ""}>
                                <i className="bi bi-journal" />
                                Exam
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <Link to="exam" className={location.pathname === "/exam" ? styles.active : ""}>
                                <i className="bi bi-journal" />
                                Exam
                            </Link>
                        </li>
                    )}
                    {isAdmin && (
                        <li>
                            <Link to="course" className={location.pathname === "/course" ? styles.active : ""}>
                                <i className="bi bi-pencil" />
                                Course
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
