import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { courseType, deleteCourses, getCourses } from "../../logic/course";

import Confirm from "../../components/Confirm";
import CourseTable from "./Table";
import CourseModal from "./Modals";

export default function CourseIndex() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState<courseType>();

    const [confirm, setConfirm] = useState(false);
    const [courseModal, setCourseModal] = useState(false);

    const refreshCourses = async () => {
        try {
            const resp = await getCourses();
            if (resp.status === "success") {
                setCourses(resp.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleDelete = async () => {
        try {
            if (selectedCourse) {
                const resp = await deleteCourses(selectedCourse.id);
                if (resp.status === "success") {
                    refreshCourses();
                    setConfirm(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        refreshCourses();
    }, []);

    return (
        <div>
            <Confirm
                show={confirm}
                onClose={() => setConfirm(false)}
                onConfirm={handleDelete}
                text={`You are going to delete course ${selectedCourse?.title} forever`}
            />

            <CourseModal
                show={courseModal}
                handleClose={() => setCourseModal(false)}
                selectedCourse={selectedCourse}
                onDone={refreshCourses}
            />

            <div className="my-2">
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
                courses={courses}
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
