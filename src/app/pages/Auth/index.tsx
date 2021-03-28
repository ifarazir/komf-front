import { RouteComponentProps } from "@reach/router";
import { ReactNode } from "react";

import styles from "./login.module.css";

interface IAuth extends RouteComponentProps {
    children?: ReactNode;
}

export default function AuthPage(props: IAuth) {
    return (
        <div className={styles.container}>
            <div className={"d-flex justify-content-center align-items-center h-100 " + styles.gradientBg}>{props.children}</div>
        </div>
    );
}
