import { Accordion, Badge, Button, Card, ListGroup, ListGroupItem, Spinner, Table } from "react-bootstrap";
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
        section && examId ? `/admin/questions?examId=${examId}&section=${section}` : null,
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
                                <span className="text-muted d-flex">
                                    {q.part} - <div dangerouslySetInnerHTML={{ __html: q.content }} />
                                </span>
                            </Accordion.Toggle>
                            <div className="mr-auto" />
                            <Button variant="danger">
                                <i className="bi bi-trash" />
                            </Button>
                            <Button variant="warning" className="mx-3">
                                <i className="bi bi-pencil" />
                            </Button>
                            <Button onClick={() => handleAddSubQuestion(q._id as any)}>+</Button>
                        </div>
                    </Card.Header>
                    <Accordion.Collapse eventKey={String(i)}>
                        <Card.Body>
                            <Table responsive size="small">
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Content</th>
                                        <th>Options</th>
                                        <th>Answer</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {q?.subQuestions &&
                                        q?.subQuestions.map((sq) => (
                                            <tr>
                                                <td>{sq.type}</td>
                                                <td dangerouslySetInnerHTML={{ __html: sq.content }} />
                                                <td>
                                                    <Badge variant="primary">{sq.options?.A}</Badge>{" "}
                                                    <Badge variant="primary">{sq.options?.B}</Badge>{" "}
                                                    <Badge variant="primary">{sq.options?.C}</Badge>{" "}
                                                    <Badge variant="primary">{sq.options?.D}</Badge>{" "}
                                                    <Badge variant="primary">{sq.options?.E}</Badge>{" "}
                                                </td>
                                                <td>
                                                    {sq?.answer?.map((a: string) => (
                                                        <Badge variant="success">{a}</Badge>
                                                    ))}
                                                </td>
                                                <td>
                                                    <Button variant="warning" className="mx-3">
                                                        <i className="bi bi-pencil" />
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button variant="danger">
                                                        <i className="bi bi-trash" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            ))}
        </Accordion>
    );
}
