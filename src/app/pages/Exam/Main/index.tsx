import { useEffect, useState } from "react";
import { Button, Container, Spinner, ProgressBar } from "react-bootstrap";
import { RouteComponentProps } from "@reach/router";
import useSWR from "swr";

import { nodeFetcher } from "../../../logic";

import styles from "./main.module.css";
import { SubQuestion } from "../../../features/userExam/Questions";

export default function Exam(props: RouteComponentProps) {
    const [part, setPart] = useState<number>(0);
    const examId: string = (props as any).examId;
    const { data: questions } = useSWR("/student/question_instances/", nodeFetcher, { refreshInterval: 5000 });

    console.log(questions?.data);

    const deadlineTimer = () => {
        const now = new Date();
        const deadline = new Date(questions?.data.submitDeadline);
        const diffTime = Math.abs(deadline.getTime() - now.getTime());

        return Math.floor(diffTime / 1000);
    };

    if (!questions)
        return (
            <div className="text-center">
                <Spinner animation="border" />
            </div>
        );

    return (
        <Container className="py-2" style={{ height: "100vh" }}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <a href="#" onClick={() => (props.navigate ? props.navigate("/exam") : null)}>
                        X
                    </a>
                    <span className="text-muted">{questions.data.section}</span>

                    <ProgressBar now={30} label={deadlineTimer()} />
                </div>
                <div className="main">
                    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 10 }}>
                        <div
                            style={{ height: 500, overflowY: "auto" }}
                            dangerouslySetInnerHTML={{ __html: questions.data?.questions[part]?.content || "" }}
                        />
                        <div style={{ height: 500, overflowY: "auto" }}>
                            {questions.data.section === "reading" ||
                                (questions.data.section === "listening" &&
                                    questions.data?.questions[part].subQuestions.map((sq: any) => (
                                        <SubQuestion question={sq} />
                                    )))}
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <Button onClick={() => setPart(part + 1)}>Skip</Button>

                    <Button onClick={() => setPart(part + 1)}>Next</Button>
                </div>
            </div>
        </Container>
    );
}
