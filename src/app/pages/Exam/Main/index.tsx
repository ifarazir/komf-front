import { useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { RouteComponentProps } from "@reach/router";
import useSWR from "swr";

import { nodeFetcher } from "../../../logic";
import { answersType, postAnswers } from "../../../logic/takeExam";

import styles from "./main.module.css";
import Top from "./Top";
import Bottom from "./Bottom";
import { SubQuestion } from "../../../features/userExam/Questions";
import Speaking from "../../../features/userExam/Speaking";
import Writing from "../../../features/userExam/Writing";

export default function Exam(props: RouteComponentProps) {
    const [state, setState] = useState<{ part: number; qnumber: number }>({ part: 0, qnumber: 0 });
    const [answers, setAnswers] = useState<answersType[]>([]);

    const {
        data: questions,
        error,
        mutate,
    } = useSWR("/student/question_instances/", nodeFetcher, { refreshInterval: 3000 });
    const hasSubQuestions =
        questions && (questions.data.section === "reading" || questions.data.section === "listening");

    const getSubQuestions = (part: number) => {
        if (questions?.data?.questions.length > part) {
            if (questions.data.section === "reading" || questions.section === "listening") {
                return questions.data?.questions[part].subQuestions;
            } else {
                return [];
            }
        }

        return [];
    };

    const getContent = (part: number) => {
        return questions.data?.questions[part]?.content;
    };

    const handleSendAnswers = async () => {
        try {
            const resp = await postAnswers(answers);
            console.log(resp);

            mutate();

            setAnswers([]);
            setState({ part: 0, qnumber: 0 });
        } catch (error) {
            console.log(error);
        }
    };

    const handleNext = () => {
        console.log(getSubQuestions(1));

        if (getSubQuestions(state.part).length - 1 > state.qnumber) {
            setState((prev) => ({ ...prev, qnumber: prev.qnumber + 1 }));
        } else {
            setState((prev) => ({ qnumber: 0, part: prev.part + 1 }));

            if (state.part === questions?.data?.questions.length - 1) {
                // console.log("send answers", answers);
                handleSendAnswers();
            }
        }
    };

    if (error) {
        props.navigate && props.navigate("/exam");
    }

    if (!questions) {
        return (
            <div className="text-center">
                <Spinner animation="border" />
            </div>
        );
    }

    return (
        <Container className="py-2" style={{ height: "100vh" }}>
            <div className={styles.wrapper}>
                <Top questions={questions.data} part={state.part + 1} />

                <div className="main">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        <div
                            style={{ height: 500, overflowY: "auto" }}
                            dangerouslySetInnerHTML={{ __html: getContent(state.part) || "" }}
                        />

                        <div style={{ height: 500, overflowY: "auto" }}>
                            {hasSubQuestions && (
                                <SubQuestion
                                    question={getSubQuestions(state.part)[state.qnumber]}
                                    setAnswer={setAnswers}
                                />
                            )}
                            {!hasSubQuestions && questions.data.section === "speaking" && <Speaking />}
                            {!hasSubQuestions && questions.data.section === "writing" && (
                                <Writing onChange={() => {}} />
                            )}
                        </div>
                    </div>
                </div>

                <Bottom
                    deadline={new Date(questions.data.submitDeadline)}
                    onNext={handleNext}
                    onSkip={() => {
                        setState((prev) => ({ ...prev, part: prev.part + 1 }));
                    }}
                />
            </div>
        </Container>
    );
}
