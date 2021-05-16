import { useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { RouteComponentProps } from "@reach/router";
import { useQuery } from "react-query";

import Card from "../components/Card";
import LessonTable from "../features/lesson/Table";
import { courseType, getCourseLessons } from "../logic/course";
import { lessonType } from "../logic/lesson";

export default function AdminCourseDetail(props: RouteComponentProps) {
    const [selectedLesson, setSelectedLesson] = useState<lessonType>();
    const course: courseType | undefined = props?.location?.state as courseType;

    const lessonQuery = useQuery([`course-lessons`, course.id], () => getCourseLessons(course.id));

    return (
        <Container fluid className="mt-2">
            <Card>
                <div className="d-flex align-items-start justify-content-between">
                    <div>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <p>Price: {course.price}</p>
                    </div>
                    <Button>
                        <i className="bi bi-pencil"></i>
                    </Button>
                </div>
            </Card>
            {lessonQuery.isLoading && <Spinner animation="border" />}
            {!lessonQuery.isLoading && (
                <LessonTable
                    lessons={lessonQuery.data.data}
                    handleLessonDelete={() => {}}
                    onLessonSelected={(l) => {
                        setSelectedLesson(l);
                    }}
                />
            )}
        </Container>
    );
}
