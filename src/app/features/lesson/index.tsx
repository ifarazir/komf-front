import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import useSWR from "swr";

import { deleteLesson, lessonType } from "../../logic/lesson";

import Confirm from "../../components/Confirm";
import Table from "./Table";
import LessonModal from "./Modals";
import { fetcher } from "../../logic";

export default function LessonIndex() {
    const [lessonModal, setLessonModal] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [selLesson, setSelLesson] = useState<lessonType>();
    const { data, revalidate } = useSWR("/api/lessons", fetcher);

    const handleDelete = async () => {
        try {
            if (selLesson) {
                const resp = await deleteLesson(selLesson.id);
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
                text={`You are going to delete lesson ${selLesson?.title} forever`}
            />

            <LessonModal show={lessonModal} handleClose={() => setLessonModal(false)} selectedLesson={selLesson} />

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
                handleAddNewLesson={() => {}}
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
