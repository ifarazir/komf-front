import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import useSWR from "swr";

import { courseType, deleteCourses } from "../../logic/course";
import Confirm from "../../components/Confirm";
import CourseTable from "./Table";
import CourseModal from "./Modals";
import { fetcher } from "../../logic";

export default function CourseIndex() {
    const { data, revalidate } = useSWR("/courses", fetcher);
    const [selectedCourse, setSelectedCourse] = useState<courseType>();

    const [confirm, setConfirm] = useState(false);
    const [courseModal, setCourseModal] = useState(false);

    const handleDelete = async () => {
        try {
            if (selectedCourse) {
                const resp = await deleteCourses(selectedCourse.id);
                if (resp.status === "success") {
                    revalidate();
                    setConfirm(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (!data) {
        return <Spinner animation="border" />;
    }

    return (
        <div>
            <Confirm
                show={confirm}
                onClose={() => setConfirm(false)}
                onConfirm={handleDelete}
                text={`You are going to delete course ${selectedCourse?.title} forever`}
            />

            <CourseModal show={courseModal} handleClose={() => setCourseModal(false)} selectedCourse={selectedCourse} onDone={revalidate} />

            <div className="my-2 d-flex justify-content-between align-items-center">
                <div>
                    <h6>Course</h6>
                    <span className="text-muted">Course managment panel</span>
                </div>
                <Button
                    onClick={() => {
                        setCourseModal(true);
                        setSelectedCourse(undefined);
                    }}
                >
                    Create
                </Button>
            </div>
            <CourseTable
                courses={data.data}
                handleCourseDelete={(d) => {
                    setSelectedCourse(d);
                    setConfirm(true);
                }}
                onCourseSelected={(d) => {
                    setSelectedCourse(d);
                    setCourseModal(true);
                }}
            />
        </div>
    );
}
