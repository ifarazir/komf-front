import { RouteComponentProps } from "@reach/router";

import LoginForm from "../../features/session/LoginForm";

import styles from "./login.module.css";

export default function LoginPage(props: RouteComponentProps) {
    return (
        <div className={styles.container}>
            <div className={"d-flex justify-content-center align-items-center h-100 " + styles.gradientBg}>
                <LoginForm />
            </div>
        </div>
    );
}
