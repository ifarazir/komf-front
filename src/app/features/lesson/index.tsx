import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";

import { useQuery } from "../../common/hooks";

import { deleteLessons, getLessons, lessonType } from "../../logic/lesson";

import Confirm from "../../components/Confirm";
import Table from "./Table";
import LessonModal from "./Modals";

export default function LessonIndex() {
    const [lessonModal, setLessonModal] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [selLesson, setSelLesson] = useState<lessonType>();
    const { data, error, loading, refreshData } = useQuery<lessonType>(getLessons);

    const handleDelete = async () => {
        try {
            if (selLesson) {
                const resp = await deleteLessons(selLesson.id);
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
                text={`You are going to delete lesson ${selLesson?.title} forever`}
            />

            <LessonModal show={lessonModal} handleClose={() => setLessonModal(false)} onDone={refreshData} selectedLesson={selLesson} />

            <div className="my-2">
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
                lessons={data}
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
