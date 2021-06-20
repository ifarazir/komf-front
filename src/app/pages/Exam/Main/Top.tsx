import { ProgressBar } from "react-bootstrap";
import { useNavigate } from "@reach/router";

import styles from "./main.module.css";

export default function Top({ questions, part }: { questions: any; part: number }) {
    const navigate = useNavigate();

    const getProgress = () => {
        switch (questions.section) {
            case "reading":
                return 25;
            case "listening":
                return 50;
            case "speaking":
                return 75;
            case "writing":
                return 100;
            default:
                return 0;
        }
    };

    return (
        <div className={styles.top}>
            <a href="#" onClick={() => navigate("/exam")}>
                X
            </a>
            <span className="text-muted">
                {questions.section} - {part}
            </span>

            <ProgressBar now={getProgress()} />
        </div>
    );
}
