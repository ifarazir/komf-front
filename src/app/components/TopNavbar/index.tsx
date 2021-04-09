import { Link, useLocation } from "@reach/router";
import { NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { logout, selectSession } from "../../features/session/sessionsSlice";

import styles from "./TopNavBar.module.css";

const AdminDropDown = () => {
    return (
        <NavDropdown className={styles.dropdown} title="Admin" id="admin-dropdown">
            <NavDropdown.Item as={Link} to="users">
                Users
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="course">
                Courses
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="lesson">
                Lessons
            </NavDropdown.Item>
        </NavDropdown>
    );
};

export default function TopNavBar() {
    const session = useSelector(selectSession);
    const dispatch = useDispatch();
    const location = useLocation();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className={styles.nav}>
            <Link to="/panel" className={styles.navLink}>
                <i className={"bi " + location.pathname !== "/panel" ? "bi-house-door-fill" : "bi-house-door"} />
                Home
            </Link>
            <Link to="report" className={styles.navLink}>
                <i className="bi bi-bar-chart" />
                Report
            </Link>
            <Link to="/exam" className={styles.navLink}>
                <i className="bi bi-book" />
                Exam
            </Link>
            {session && session.role && session.role === "admin" && <AdminDropDown />}
            <a href="#" className={styles.navLink} onClick={handleLogout}>
                Logout
            </a>
        </div>
    );
}
