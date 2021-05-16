import { Button, Table } from "react-bootstrap";
import { IQuizQuestion } from "../../logic/quiz";

import SearchForm from "../../components/Ribbons/SearchForm";
import Card from "../../components/Card";

export default function LessonTable({
    questions,
    onQuestionSelected,
    handleQuestionDelete,
}: {
    questions: IQuizQuestion[];
    onQuestionSelected: (a: IQuizQuestion) => void;
    handleQuestionDelete: (a: IQuizQuestion) => void;
}) {
    return (
        <div>
            <Card>
                <SearchForm />
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Answer</th>
                            <th>Option 1</th>
                            <th>Option 2</th>
                            <th>Option 3</th>
                            <th>Option 4</th>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((l) => (
                            <tr key={l.id}>
                                <td>
                                    <div dangerouslySetInnerHTML={{ __html: l.title }} />
                                </td>
                                <td>
                                    <b className="text-success text-left">{[l.q1, l.q2, l.q3, l.q4][parseInt(l.answer) - 1]}</b>
                                </td>
                                <td>{l.q1}</td>
                                <td>{l.q2}</td>
                                <td>{l.q3}</td>
                                <td>{l.q4}</td>
                                <td>
                                    <Button title="Edit" variant="outline-warning" onClick={() => onQuestionSelected(l)}>
                                        <i className="bi bi-pencil" />
                                    </Button>
                                </td>
                                <td>
                                    <Button variant="outline-danger" onClick={() => handleQuestionDelete(l)}>
                                        <i className="bi bi-trash" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </div>
    );
}
