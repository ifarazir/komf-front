import { useSelector } from "react-redux";
import { Card, Button, FormControl } from "react-bootstrap";
import { Link, Redirect, RouteComponentProps } from "@reach/router";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { getSavedToken, registerType } from "../../logic/auth";
import { selectSession, registerUser } from "./sessionsSlice";

import styles from "./card.module.css";
import { useAppDispatch } from "../../store";

export default function SignupForm(props: RouteComponentProps) {
    const session = useSelector(selectSession);
    const dispatch = useAppDispatch();

    const schema = Yup.object().shape({
        fname: Yup.string().required(),
        lname: Yup.string().required(),
        email: Yup.string().email().required(),
        phone: Yup.string().required(),
        password: Yup.string().required().min(4),
    });

    const handleSubmit = async (data: any) => {
        try {
            await dispatch(registerUser(data));
            props.navigate && props.navigate("/auth");
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return getSavedToken() || session?.status === "authorized" ? (
        <Redirect noThrow to="/" />
    ) : (
        <Card className={"shadow-lg " + styles.card}>
            <Card.Body>
                <Formik initialValues={{} as registerType} onSubmit={handleSubmit} validationSchema={schema}>
                    {({ values, handleChange, handleBlur, errors }) => (
                        <Form className="d-flex flex-column justify-content-between">
                            <div className="text-center mb-4">
                                <h3>Signup Account</h3>
                                <span className="text-muted">Enter your information</span>
                            </div>
                            <div className="d-flex flex-column">
                                <FormControl
                                    name="fname"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.fname}
                                    placeholder="First name"
                                    className="my-2"
                                />
                                {errors.fname && <span className="text-muted">{errors.fname}</span>}
                                <FormControl
                                    name="lname"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lname}
                                    placeholder="Last name"
                                    className="mb-2"
                                />
                                {errors.lname && <span className="text-muted">{errors.lname}</span>}
                                <FormControl
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    type="email"
                                    placeholder="Email"
                                    className="mb-2"
                                />
                                {errors.email && <span className="text-muted">{errors.email}</span>}
                                <FormControl
                                    name="phone"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.phone}
                                    placeholder="Phone number"
                                    className="mb-2"
                                />
                                {errors.phone && <span className="text-muted">{errors.phone}</span>}
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
                            </div>
                            <div className="mt-3 d-flex justify-content-center">
                                <Button type="submit">Submit</Button>
                            </div>
                            <div className="mt-4 text-center">
                                <p>
                                    have an acount?{" "}
                                    <span>
                                        <Link to="/auth">Login</Link>
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
