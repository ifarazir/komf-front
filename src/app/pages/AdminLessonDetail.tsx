import { useState } from "react";
import { Button, Container, Tabs, Tab, Spinner } from "react-bootstrap";
import { RouteComponentProps } from "@reach/router";
import { useQuery } from "react-query";

import Card from "../components/Card";
import VocabsTable from "../features/vocab/Table";
import QuizQuestionModal from "../features/quiz/Modals";
import QuizQuestionTable from "../features/quiz/Table";
import { getVocabs } from "../logic/vocab";
import { getQuizQuestions, IQuizQuestion } from "../logic/quiz";
import { getLessonVobacs, lessonType } from "../logic/lesson";

export default function AdminLessonDetail(props: RouteComponentProps) {
    const [quizQuestionModal, setQuizQuestionModal] = useState(false);
    const [selectedQ, setSelectedQ] = useState<IQuizQuestion>();

    const lesson: lessonType | undefined = props?.location?.state as lessonType;
    const vocabs = useQuery(["lesson-vocabs", lesson?.id], getVocabs);
    const quizQestions = useQuery("lesson-quiz-qeustions", getQuizQuestions);

    return (
        <Container fluid className="mt-2">
            <QuizQuestionModal
                show={quizQuestionModal}
                selectedQuestion={selectedQ}
                handleClose={() => setQuizQuestionModal(false)}
                onDone={quizQestions.refetch}
            />

            <Card>
                <div className="d-flex align-items-start justify-content-between">
                    <div>
                        <h3>{lesson?.title}</h3>
                    </div>
                    <Button>
                        <i className="bi bi-pencil"></i>
                    </Button>
                </div>
                <Tabs className="mt-3" variant="pills" defaultActiveKey="vocabulary" id="course-detail-tabs">
                    <Tab eventKey="vocabulary" title="Vocabulary">
                        <div className="text-center m-2">
                            {vocabs.isLoading && <Spinner animation="border" />}
                            {!vocabs.isLoading && (
                                <VocabsTable vocabs={vocabs.data.data} handleVocabDelete={() => {}} onVocabSelected={() => {}} />
                            )}
                        </div>
                    </Tab>
                    <Tab eventKey="quiz" title="Quiz questions">
                        <div className="text-center m-2">
                            <div className="text-right">
                                <Button onClick={() => setQuizQuestionModal(true)}>+</Button>
                            </div>
                            {quizQestions.isLoading && <Spinner animation="border" />}
                            {!quizQestions.isLoading && (
                                <QuizQuestionTable
                                    questions={quizQestions.data.data}
                                    handleQuestionDelete={() => {}}
                                    onQuestionSelected={(d) => {
                                        setSelectedQ(d);
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
