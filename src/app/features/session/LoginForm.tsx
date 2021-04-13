import { useDispatch, useSelector } from "react-redux";
import { Card, Button, FormControl } from "react-bootstrap";
import { Link, Redirect, RouteComponentProps } from "@reach/router";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { selectSession, loginUser } from "./sessionsSlice";
import { useState } from "react";

import styles from "./card.module.css";

import Axios from "axios";

export default function LoginForm(props: RouteComponentProps) {
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const sessions = useSelector(selectSession);

    const schema = Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required().min(4),
    });

    const config = {
        headers: { Authorization: `Bearer 2|uJsb9rMHQLYs82V8yfwg5e2b1hJUw6Si57hrHv0f` }
    };

    const handleSubmit = (data: any) => {
        Axios.post('https://api.komf.ir/api/login', {
            email: data.username,
            password: data.password
        }).then(response => {
            Axios.get('https://api.komf.ir/api/courses', config).then(responsee => {
                console.log(responsee);
            });
        });
    };

    return sessions ? (
        <Redirect noThrow to="/panel" />
    ) : (
        <Card className={"shadow-lg " + styles.card}>
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
                                        <Link to="signup">Sign Up</Link>
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
