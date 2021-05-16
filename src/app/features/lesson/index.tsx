import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";

import { useQuery } from "react-query";

import { deleteLessons, getLessons, lessonType } from "../../logic/lesson";

import Confirm from "../../components/Confirm";
import Table from "./Table";
import LessonModal from "./Modals";

export default function LessonIndex() {
    const [lessonModal, setLessonModal] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [selLesson, setSelLesson] = useState<lessonType>();
    const { data, isLoading, refetch } = useQuery("lessons", getLessons);

    const handleDelete = async () => {
        try {
            if (selLesson) {
                const resp = await deleteLessons(selLesson.id);
                if (resp.status === "success") {
                    refetch();
                    setConfirm(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) {
        return <Spinner animation="border" />;
    }

    return (
        <div>
            <Confirm
                show={confirm}
                onClose={() => setConfirm(false)}
                onConfirm={handleDelete}
                text={`You are going to delete lesson ${selLesson?.title} forever`}
            />

            <LessonModal show={lessonModal} handleClose={() => setLessonModal(false)} onDone={refetch} selectedLesson={selLesson} />

            <div className="my-2 d-flex justify-content-between align-items-center">
                <div>
                    <h6>Lessons</h6>
                    <span className="text-muted">Lesson managment panel</span>
                </div>
                <Button
                    onClick={() => {
                        setSelLesson(undefined);
                        setLessonModal(true);
                    }}
                >
                    Create
                </Button>
            </div>
            <Table
                lessons={data.data}
                onLessonSelected={(d) => {
                    setSelLesson(d);
                    setLessonModal(true);
                }}
                handleLessonDelete={(d) => {
                    setSelLesson(d);
                    setConfirm(true);
                }}
            />
        </div>
    );
}
