import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { courseType, deleteCourses, getCourses } from "../../logic/course";

import Confirm from "../../components/Confirm";
import CourseTable from "./Table";
import CourseModal from "./Modals";
import { useQuery } from "../../common/hooks";

export default function CourseIndex() {
    const { data, error, loading, refreshData } = useQuery<courseType>(getCourses);
    const [selectedCourse, setSelectedCourse] = useState<courseType>();

    const [confirm, setConfirm] = useState(false);
    const [courseModal, setCourseModal] = useState(false);

    const handleDelete = async () => {
        try {
            if (selectedCourse) {
                const resp = await deleteCourses(selectedCourse.id);
                if (resp.status === "success") {
                    refreshData();
                    setConfirm(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
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

            <CourseModal
                show={courseModal}
                handleClose={() => setCourseModal(false)}
                selectedCourse={selectedCourse}
                onDone={refreshData}
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
                courses={data}
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
