import { Link } from "@reach/router";
import {Navbar, Nav, Dropdown, NavDropdown} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { logout, selectSession } from "../../features/session/sessionsSlice";

const AdminDropDown = () => {
    return (
        <NavDropdown title='Admin' id='admin-dropdown'>
            <NavDropdown.Item as={Link} to='users'>Users</NavDropdown.Item>
            <NavDropdown.Item as={Link} to='course'>Courses</NavDropdown.Item>
            <NavDropdown.Item as={Link} to='lesson'>Lessons</NavDropdown.Item>
        </NavDropdown>
    );
}

export default function TopNavBar() {
    const session = useSelector(selectSession);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Navbar>
            <Nav>
                <Nav.Link as={Link} to="/panel">
                    Home
                </Nav.Link>
                {session && session.role && session.role === "admin" && (
                    <AdminDropDown />
                )}
                <Nav.Link as={Link} to="/report">
                    Report
                </Nav.Link>
                <Nav.Link as={Link} to="/exam">
                    Exam
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
        </Navbar>
    );
}
