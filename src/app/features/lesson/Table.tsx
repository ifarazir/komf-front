import { Button, Form, Table } from "react-bootstrap";
import { lessonType } from "../../logic/lesson";

import SearchForm from "../../components/Ribbons/SearchForm";
import Card from "../../components/Card";
import { Link } from "@reach/router";

export default function LessonTable({
    lessons,
    onLessonSelected,
    handleAddNewLesson,
    handleLessonDelete,
}: {
    lessons: lessonType[];
    handleLessonDelete: (a: lessonType) => void;
    handleAddNewLesson: () => void;
    onLessonSelected: (a: lessonType) => void;
}) {
    return (
        <div>
            <Card>
                <Form inline>
                    <Form.Control className="mb-2 mr-sm-2" name="search" placeholder="Search for..." />
                    <Button className="mb-2">Search</Button>
                    <Button className="mb-2 ml-auto" onClick={handleAddNewLesson}>
                        +
                    </Button>
                </Form>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {lessons.map((l) => (
                            <tr key={l.id}>
                                <td>
                                    <Link to={`/lesson/${l.id}`} state={l}>
                                        {l.title}
                                    </Link>
                                </td>
                                <td>
                                    <Button
                                        title="Vocabs"
                                        variant="outline-warning"
                                        onClick={() => onLessonSelected(l)}
                                    >
                                        <i className="bi bi-pencil" />
                                    </Button>
                                </td>
                                <td>
                                    <Button variant="outline-danger" onClick={() => handleLessonDelete(l)}>
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
