import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import Confirm from "../../components/Confirm";
import { courseType, deleteCourses } from "../../logic/course";

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
        <Table striped bordered hover>
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
    );
}
