import { RouteComponentProps } from "@reach/router";
import styles from "./landing.module.css";

export default function (props: RouteComponentProps) {
    return (
        <div className={styles.bg}>
            <h1>Comming soon...</h1>
        </div>
    );
}
