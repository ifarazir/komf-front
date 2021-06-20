import { Button } from "react-bootstrap";

import styles from "./main.module.css";
import Timer from "./Timer";

export default function Top({ onNext, onSkip, deadline }: { onSkip: () => void; onNext: () => void; deadline: any }) {
    return (
        <div className={styles.footer}>
            <Button onClick={onSkip}>Skip</Button>
            <Timer deadline={deadline} />
            <Button onClick={onNext}>Next</Button>
        </div>
    );
}
