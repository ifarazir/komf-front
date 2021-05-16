import { Button, Table } from "react-bootstrap";
import { lessonType } from "../../logic/lesson";

import SearchForm from "../../components/Ribbons/SearchForm";
import Card from "../../components/Card";
import { Link } from "@reach/router";

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
        <div>
            <Card>
                <SearchForm />
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {lessons.map((l) => (
                            <tr key={l.id}>
                                <td>
                                    <Link to={`/panel/lesson/${l.id}`} state={l}>
                                        {l.title}
                                    </Link>
                                </td>
                                <td>
                                    <Button title="Vocabs" variant="outline-success" onClick={() => onLessonSelected(l)}>
                                        <i className="bi bi-book" />
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
