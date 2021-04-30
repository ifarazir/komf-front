import { Button, Table, Form } from "react-bootstrap";
import { courseType } from "../../logic/course";

import Card from "../../components/Card";
import SearchForm from "../../components/Ribbons/SearchForm";

export default function CourseTable({
    courses,
    onCourseSelected,
    handleCourseDelete,
}: {
    courses: courseType[];
    handleCourseDelete: (a: courseType) => void;
    onCourseSelected: (a: courseType) => void;
}) {
    return (
        <div className="mt-4">
            <Card>
                <SearchForm />
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((c: courseType) => (
                            <tr key={c.id}>
                                <td>{c.title}</td>
                                <td>{c.description}</td>
                                <td>{c.price}</td>
                                <td>
                                    <Button variant="outline-warning" onClick={() => onCourseSelected(c)}>
                                        <i className="bi bi-pencil" />
                                    </Button>
                                </td>
                                <td>
                                    <Button variant="outline-danger" onClick={() => handleCourseDelete(c)}>
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
