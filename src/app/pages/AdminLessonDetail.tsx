import { useState } from "react";
import { Button, Container, Tabs, Tab, Spinner } from "react-bootstrap";
import { RouteComponentProps } from "@reach/router";
import useSWR, { mutate } from "swr";

import Card from "../components/Card";

import VocabsTable from "../features/vocab/Table";
import QuizQuestionModal from "../features/quiz/Modals";
import QuizQuestionTable from "../features/quiz/Table";
import LessonModal from "../features/lesson/Modals";

import { deleteQuizQuestion, IQuizQuestion } from "../logic/quiz";
import { lessonType } from "../logic/lesson";
import { fetcher } from "../logic";
import VocabModal from "../features/vocab/Modals";
import { deleteVocab, IVocab } from "../logic/vocab";
import Confirm from "../components/Confirm";

export default function AdminLessonDetail(props: RouteComponentProps) {
    const [quizQuestionModal, setQuizQuestionModal] = useState(false);
    const [lessonModal, setLessonModal] = useState(false);
    const [vocabModal, setVocabModal] = useState(false);
    const [confirmDeleteVocab, setConfirmDeleteVocab] = useState(false);
    const [confirmDeleteQuestion, setConfirmDeleteQuestion] = useState(false);

    const [selectedQuestion, setSelectedQuestion] = useState<IQuizQuestion>();
    const [selectedVocab, setSelectedVocab] = useState<IVocab>();

    const lesson: lessonType | undefined = props?.location?.state as lessonType;

    const { data: vocabs, mutate: mutateVocabs } = useSWR("/admin/vocabs", fetcher);
    const { data: quizQestions, mutate: mutateQuizQeustions } = useSWR("/admin/quiz/questions", fetcher);

    const handleDeleteVocab = async () => {
        try {
            if (selectedVocab) {
                const resp = await deleteVocab(selectedVocab.id);
                if (resp) {
                    mutateVocabs();
                    setConfirmDeleteVocab(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteQuizQuestion = async () => {
        try {
            if (selectedQuestion && selectedQuestion.id) {
                const resp = await deleteQuizQuestion(selectedQuestion.id);
                if (resp) {
                    mutateQuizQeustions();
                    setConfirmDeleteQuestion(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container fluid className="mt-2">
            <QuizQuestionModal
                show={quizQuestionModal}
                selectedQuestion={selectedQuestion}
                handleClose={() => setQuizQuestionModal(false)}
                onDone={mutateQuizQeustions}
            />
            <VocabModal show={vocabModal} handleClose={() => setVocabModal(false)} selectedVocab={selectedVocab} onDone={mutateVocabs} />
            <LessonModal show={lessonModal} handleClose={() => setLessonModal(false)} selectedLesson={lesson} />

            <Confirm show={confirmDeleteVocab} onClose={() => setConfirmDeleteVocab(false)} onConfirm={handleDeleteVocab} />
            <Confirm show={confirmDeleteQuestion} onClose={() => setConfirmDeleteQuestion(false)} onConfirm={handleDeleteQuizQuestion} />

            <Card>
                <div className="d-flex align-items-start justify-content-between">
                    <div>
                        <h3>{lesson?.title}</h3>
                    </div>
                    <Button onClick={() => setLessonModal(true)}>
                        <i className="bi bi-pencil"></i>
                    </Button>
                </div>
                <Tabs className="mt-3" variant="pills" defaultActiveKey="vocabulary" id="course-detail-tabs">
                    <Tab eventKey="vocabulary" title="Vocabulary">
                        <div className="text-center m-2">
                            {!vocabs && <Spinner animation="border" />}
                            {vocabs && (
                                <VocabsTable
                                    vocabs={vocabs.data}
                                    handleAddNewVocab={() => {
                                        setSelectedVocab(undefined);
                                        setVocabModal(true);
                                    }}
                                    handleVocabDelete={(v) => {
                                        setSelectedVocab(v);
                                        setConfirmDeleteVocab(true);
                                    }}
                                    onVocabSelected={(v) => {
                                        setSelectedVocab(v);
                                        setVocabModal(true);
                                    }}
                                />
                            )}
                        </div>
                    </Tab>
                    <Tab eventKey="quiz" title="Quiz questions">
                        <div className="text-center m-2">
                            {!quizQestions && <Spinner animation="border" />}
                            {quizQestions && (
                                <QuizQuestionTable
                                    questions={quizQestions.data}
                                    handleAddNewQuestion={() => {
                                        setSelectedQuestion(undefined);
                                        setQuizQuestionModal(true);
                                    }}
                                    handleQuestionDelete={(q) => {
                                        setSelectedQuestion(q);
                                        setConfirmDeleteQuestion(true);
                                    }}
                                    onQuestionSelected={(q) => {
                                        setSelectedQuestion(q);
                                        setQuizQuestionModal(true);
                                    }}
                                />
                            )}
                        </div>
                    </Tab>
                </Tabs>
            </Card>
        </Container>
    );
}
