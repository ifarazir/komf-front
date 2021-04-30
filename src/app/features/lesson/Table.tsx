import { Button, Table } from "react-bootstrap";
import { lessonType } from "../../logic/lesson";

import SearchForm from "../../components/Ribbons/SearchForm";
import Card from "../../components/Card";

export default function LessonTable({
    lessons,
    onLessonSelected,
    handleLessonDelete,
}: {
    lessons: lessonType[];
    handleLessonDelete: (a: lessonType) => void;
    onLessonSelected: (a: lessonType) => void;
}) {
    return (
        <div className="mt-4">
            <Card>
                <SearchForm />
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Course</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {lessons.map((l) => (
                            <tr key={l.id}>
                                <td>{l.title}</td>
                                <td>{l.course_id}</td>
                                <td>
                                    <Button variant="outline-warning" onClick={() => onLessonSelected(l)}>
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
