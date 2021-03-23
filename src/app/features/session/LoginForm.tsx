import { useDispatch, useSelector } from "react-redux";
import { Card, Button, FormControl } from "react-bootstrap";
import { Link, Redirect } from "@reach/router";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { selectSession, setUser } from "./sessionsSlice";
import { useState } from "react";

export default function LoginForm() {
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const sessions = useSelector(selectSession);

    const schema = Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required().min(4),
    });

    const handleSubmit = (data: any) => {
        // This is a MOCK, Please change this behavior
        if (data.username === "admin" && data.password === "admin") {
            dispatch(setUser({ username: "admin", password: "admin", role: "admin" }));
            setError("");
        } else if (data.username === "guest" && data.password === "guest") {
            dispatch(setUser({ username: "guest", password: "guest", role: "guest" }));
            setError("");
        } else {
            setError("Invalid username or password");
        }
    };

    return sessions.username ? (
        <Redirect noThrow to="/" />
    ) : (
        <Card className="shadow-lg">
            <Card.Body>
                <Formik initialValues={{ username: "", password: "" }} onSubmit={handleSubmit} validationSchema={schema}>
                    {({ values, handleChange, handleBlur, errors }) => (
                        <Form className="d-flex flex-column justify-content-between">
                            <div className="text-center mb-4">
                                <h3>Login Account</h3>
                                <span className="text-muted">Enter your username and password</span>
                            </div>
                            <div className="d-flex flex-column">
                                <FormControl
                                    name="username"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.username}
                                    placeholder="Username"
                                    className="my-2"
                                />
                                {errors.username && <span className="text-muted">{errors.username}</span>}
                                <FormControl
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    type="password"
                                    placeholder="Password"
                                    className="mb-2"
                                />
                                {errors.password && <span className="text-muted">{errors.password}</span>}
                                {error && <span className="text-muted">{error}</span>}
                            </div>
                            <div className="mt-3 d-flex justify-content-between align-items-center">
                                <Link to="/forgot" className="ml-1 text-muted">
                                    Forgot password
                                </Link>
                                <Button type="submit">Submit</Button>
                            </div>
                            <div className="mt-4 text-center">
                                <p>
                                    Don't have an acount yet?{" "}
                                    <span>
                                        <Link to="/signup">Sign Up</Link>
                                    </span>
                                </p>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>
    );
}
