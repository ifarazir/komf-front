import { useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { RouteComponentProps } from "@reach/router";
import useSWR, { mutate } from "swr";

import Card from "../../components/Card";
import Confirm from "../../components/Confirm";

import LessonTable from "../../features/lesson/Table";
import LessonModal from "../../features/lesson/Modals";
import CourseModal from "../../features/course/Modals";

import { deleteLesson, lessonType } from "../../logic/lesson";
import { fetcher } from "../../logic";

export default function AdminCourseDetail(props: RouteComponentProps) {
    const courseId = (props as any).courseId;

    const { data: course, mutate: mutateThisCourse } = useSWR([`/courses/${courseId}`, courseId], fetcher);
    const { data: lessons, mutate: mutateThisLessons } = useSWR([`/courses/${courseId}/lessons`, courseId], fetcher);

    const [selectedLesson, setSelectedLesson] = useState<lessonType>();
    const [lessonModal, setLessonModal] = useState(false);
    const [courseModal, setCourseModal] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const handleOnCourseUpdateDone = () => {
        mutate("/courses");
        mutateThisCourse();
    };

    const handleDeleteLesson = async () => {
        try {
            if (selectedLesson) {
                const resp = await deleteLesson(selectedLesson.id);
                if (resp) {
                    mutateThisLessons();
                    mutate("/lessons");
                    setConfirm(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (!course) {
        return <Spinner animation="border" />;
    }

    return (
        <Container fluid className="mt-2">
            <Confirm show={confirm} onClose={() => setConfirm(false)} onConfirm={handleDeleteLesson} />
            <LessonModal
                show={lessonModal}
                handleClose={() => setLessonModal(false)}
                selectedLesson={selectedLesson}
                onDone={mutateThisLessons}
            />
            <CourseModal
                show={courseModal}
                handleClose={() => setCourseModal(false)}
                onDone={handleOnCourseUpdateDone}
                selectedCourse={course.data}
            />

            <Card>
                <div className="d-flex align-items-start justify-content-between">
                    <div>
                        <h3>{course.data.title}</h3>
                        <p>{course.data.description}</p>
                        <p>Price: {course.data.price}</p>
                    </div>
                    <Button onClick={() => setCourseModal(true)}>
                        <i className="bi bi-pencil"></i>
                    </Button>
                </div>
            </Card>
            {!lessons && <Spinner animation="border" />}
            {lessons && (
                <LessonTable
                    lessons={lessons.data}
                    handleAddNewLesson={() => {
                        setSelectedLesson(undefined);
                        setLessonModal(true);
                    }}
                    handleLessonDelete={(l) => {
                        setSelectedLesson(l);
                        setConfirm(true);
                    }}
                    onLessonSelected={(l) => {
                        setSelectedLesson(l);
                        setLessonModal(true);
                    }}
                />
            )}
        </Container>
    );
}
