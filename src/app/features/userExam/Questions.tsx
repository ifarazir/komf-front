import { useEffect, useState } from "react";
import { Button, FormCheck, Badge } from "react-bootstrap";
import { questionType } from "../../logic/question";
import OrderItem from "./OrderItem";

const SingleChoice = ({
    question,
    onAnswer,
    selected,
    setSelected,
}: {
    question: questionType;
    onAnswer: (o: string) => void;
    selected?: string;
    setSelected: any;
}) => {
    const handleClick = (option: string) => {
        onAnswer(option);
        setSelected(option);
    };

    const getColor = (option: string) => (selected === option ? "success" : "primary");

    return (
        <div style={{ padding: "0.5em 0", margin: "0.5em 0" }}>
            <p dangerouslySetInnerHTML={{ __html: question.content }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1em" }}>
                <Button onClick={() => handleClick("A")} variant={getColor("A")}>
                    {question?.options?.A}
                </Button>
                <Button onClick={() => handleClick("B")} variant={getColor("B")}>
                    {question?.options?.B}
                </Button>
                <Button onClick={() => handleClick("C")} variant={getColor("C")}>
                    {question?.options?.C}
                </Button>
                <Button onClick={() => handleClick("D")} variant={getColor("D")}>
                    {question?.options?.D}
                </Button>
            </div>
        </div>
    );
};

const MultiChoice = ({ question, onAnswer }: { question: questionType; onAnswer: (o: string[]) => void }) => {
    const [checks, setChecks] = useState<string[]>([]);

    useEffect(() => {
        if (checks.length > 0) onAnswer(checks);
    }, [checks]);

    return (
        <div style={{ padding: "0.5em 0", margin: "0.5em 0" }}>
            <p dangerouslySetInnerHTML={{ __html: question.content }} />

            <FormCheck
                label={question?.options?.A}
                onChange={(c) =>
                    c.target.checked
                        ? setChecks((prev) => [...prev, "A"])
                        : setChecks((prev) => prev.filter((o) => o !== "A"))
                }
            />
            <FormCheck
                label={question?.options?.B}
                onChange={(c) =>
                    c.target.checked
                        ? setChecks((prev) => [...prev, "B"])
                        : setChecks((prev) => prev.filter((o) => o !== "B"))
                }
            />
            <FormCheck
                label={question?.options?.C}
                onChange={(c) =>
                    c.target.checked
                        ? setChecks((prev) => [...prev, "C"])
                        : setChecks((prev) => prev.filter((o) => o !== "C"))
                }
            />
            <FormCheck
                label={question?.options?.D}
                onChange={(c) =>
                    c.target.checked
                        ? setChecks((prev) => [...prev, "D"])
                        : setChecks((prev) => prev.filter((o) => o !== "D"))
                }
            />
            <FormCheck
                label={question?.options?.E}
                onChange={(c) =>
                    c.target.checked
                        ? setChecks((prev) => [...prev, "E"])
                        : setChecks((prev) => prev.filter((o) => o !== "E"))
                }
            />
        </div>
    );
};

const Ordering = ({ question, onAnswer }: { question: questionType; onAnswer: (o: string[]) => void }) => {
    const [checks, setChecks] = useState<string[]>([]);

    useEffect(() => {
        if (checks.length > 0) onAnswer(checks);
    }, [checks]);

    return (
        <div style={{ padding: "0.5em 0", margin: "0.5em 0" }}>
            <div dangerouslySetInnerHTML={{ __html: question.content }} />

            <span className="my-4">
                {checks.map((c, i) => (
                    <Badge className="mx-1" variant="primary">
                        {i + 1} - {c}
                    </Badge>
                ))}
            </span>

            <FormCheck
                label={question?.options?.A}
                onChange={(c) =>
                    c.target.checked
                        ? setChecks((prev) => [...prev, "A"])
                        : setChecks((prev) => prev.filter((o) => o !== "A"))
                }
            />
            <FormCheck
                label={question?.options?.B}
                onChange={(c) =>
                    c.target.checked
                        ? setChecks((prev) => [...prev, "B"])
                        : setChecks((prev) => prev.filter((o) => o !== "B"))
                }
            />
            <FormCheck
                label={question?.options?.C}
                onChange={(c) =>
                    c.target.checked
                        ? setChecks((prev) => [...prev, "C"])
                        : setChecks((prev) => prev.filter((o) => o !== "C"))
                }
            />
            <FormCheck
                label={question?.options?.D}
                onChange={(c) =>
                    c.target.checked
                        ? setChecks((prev) => [...prev, "D"])
                        : setChecks((prev) => prev.filter((o) => o !== "D"))
                }
            />
            <FormCheck
                label={question?.options?.E}
                onChange={(c) =>
                    c.target.checked
                        ? setChecks((prev) => [...prev, "E"])
                        : setChecks((prev) => prev.filter((o) => o !== "E"))
                }
            />
        </div>
    );
};

export const SubQuestion = ({ question, setAnswer }: { question: questionType; setAnswer: any }) => {
    const [selected, setSelected] = useState<string>();

    const findAndSetAnswer = (prev: any, answer: any) => {
        const res = [...prev];
        const index = res
            .map(function (e: any) {
                return e.questionInstanceId;
            })
            .indexOf(answer.questionInstanceId);

        if (index !== -1) {
            res[index] = answer;
        } else {
            res.push(answer);
        }

        return res;
    };

    if (!question) return <></>;

    switch (question.type) {
        case "singleChoice":
            return (
                <SingleChoice
                    question={question}
                    selected={selected}
                    setSelected={setSelected}
                    onAnswer={(o) => {
                        setSelected(undefined);
                        setAnswer((prev: any) =>
                            findAndSetAnswer(prev, { questionInstanceId: question._id, choices: [o] })
                        );
                    }}
                />
            );
        case "multiChoice":
            return (
                <MultiChoice
                    question={question}
                    onAnswer={(o) => {
                        setSelected(undefined);
                        setAnswer((prev: any) =>
                            findAndSetAnswer(prev, { questionInstanceId: question._id, choices: o })
                        );
                    }}
                />
            );
        case "ordering":
            return (
                <Ordering
                    question={question}
                    onAnswer={(o) => {
                        setSelected(undefined);
                        setAnswer((prev: any) =>
                            findAndSetAnswer(prev, { questionInstanceId: question._id, choices: o })
                        );
                    }}
                />
            );
        default:
            return null;
    }
};
