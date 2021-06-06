import { Accordion, Badge, Button, Card, ListGroup, ListGroupItem, Spinner } from "react-bootstrap";
import useSWR from "swr";

import { nodeFetcher } from "../../logic";
import { questionType, sections } from "../../logic/question";

export default function QuestionsList({
    examId,
    section,
    handleAddSubQuestion,
}: {
    examId: string;
    section: sections;
    handleAddSubQuestion: (rowId: string) => void;
}) {
    const { data: questionsResp } = useSWR(
        section && examId ? [`/admin/questions?examId=${examId}&section=${section}`, examId, section] : null,
        nodeFetcher
    );

    if (!questionsResp) {
        return <Spinner animation="border" />;
    }

    const { examQuestions }: { examQuestions: questionType[] } = questionsResp && questionsResp.data;

    return (
        <Accordion defaultActiveKey="1">
            {examQuestions.map((q, i) => (
                <Card key={q._id}>
                    <Card.Header>
                        <div className="d-flex justify-content-between align-items-center">
                            <Accordion.Toggle as={Button} variant="link" eventKey={String(i)}>
                                <span className="text-muted">
                                    {q.part} - {q.content}
                                </span>
                            </Accordion.Toggle>
                            <Button onClick={() => handleAddSubQuestion(q._id as any)}>+</Button>
                        </div>
                    </Card.Header>
                    <Accordion.Collapse eventKey={String(i)}>
                        <Card.Body>
                            {q?.subQuestions &&
                                q?.subQuestions.map((sq) => (
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr 1fr", gap: 10 }}>
                                        <span>{sq.type}</span>
                                        <span dangerouslySetInnerHTML={{ __html: sq.content }} />
                                        <span>
                                            <Badge variant="primary">{sq.options?.A}</Badge>{" "}
                                            <Badge variant="primary">{sq.options?.B}</Badge>{" "}
                                            <Badge variant="primary">{sq.options?.C}</Badge>{" "}
                                            <Badge variant="primary">{sq.options?.D}</Badge>{" "}
                                            <Badge variant="primary">{sq.options?.E}</Badge>{" "}
                                        </span>
                                        <span>
                                            answer:<Badge variant="success">{sq?.answer?.join(" - ")}</Badge>
                                        </span>
                                    </div>
                                ))}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            ))}
        </Accordion>
    );
}
