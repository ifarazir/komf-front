import { useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { Alert, Button, Container, Spinner, Tab, Tabs } from "react-bootstrap";
import useSWR from "swr";

import Card from "../../components/Card";
import { nodeFetcher } from "../../logic";
import QuestionsList from "../../features/question/List";
import { QuestionBodyModal, SubQuestionModal } from "../../features/question";

export default function ExamDetails(props: RouteComponentProps) {
    const [activeTab, setActiveTab] = useState<"reading" | "listening" | "speaking" | "writing">("reading");
    const [questionBodyModal, setQuestionBodyModal] = useState(false);
    const [subQModal, setSubQModal] = useState(false);
    const [qParentId, setQParentId] = useState<string>();

    const examId = (props as any).examId;

    const { data: examResp, error } = useSWR(examId ? [`/admin/exams/${examId}`, examId] : null, nodeFetcher);
    const { exam } = examResp !== undefined && examResp?.data;

    if (error) {
        return <Alert variant="danger">{String(error)}</Alert>;
    }

    if (!examResp) {
        return <Spinner animation="border" />;
    }

    return (
        <Container fluid className="mt-2">
            <QuestionBodyModal
                show={questionBodyModal}
                onClose={() => setQuestionBodyModal(false)}
                examId={examId}
                section={activeTab}
            />
            {qParentId && (
                <SubQuestionModal
                    show={subQModal}
                    onClose={() => setSubQModal(false)}
                    examId={examId}
                    section={activeTab}
                    questionParentId={qParentId}
                />
            )}

            <Card>
                <div className="d-flex align-items-start justify-content-between">
                    <div>
                        <h3>{exam.description}</h3>
                        <div className="d-flex justify-content-between">
                            <span className="text-muted mr-2">Reading: {exam.duration.reading}</span>
                            <span className="text-muted mr-2">Speaking: {exam.duration.speaking}</span>
                            <span className="text-muted mr-2">Writing: {exam.duration.writing}</span>
                            <span className="text-muted mr-2">Listening: {exam.duration.listening}</span>
                        </div>
                    </div>
                    <Button>
                        <i className="bi bi-pencil"></i>
                    </Button>
                </div>
            </Card>
            <Tabs
                className="mt-3 pb-2"
                variant="pills"
                activeKey={activeTab}
                onSelect={(k) => k && setActiveTab(k as any)}
                id="sections-tabs"
            >
                <Tab eventKey="reading" title="Reading">
                    <Button className="my-2" onClick={() => setQuestionBodyModal(true)}>
                        + Question body
                    </Button>
                    <QuestionsList
                        examId={examId}
                        section={activeTab}
                        handleAddSubQuestion={(id) => {
                            setQParentId(id);
                            setSubQModal(true);
                        }}
                    />
                </Tab>
                <Tab eventKey="listening" title="Listening">
                    <Button className="my-2" onClick={() => setQuestionBodyModal(true)}>
                        + Question body
                    </Button>
                    <QuestionsList
                        examId={examId}
                        section={activeTab}
                        handleAddSubQuestion={() => setSubQModal(true)}
                    />
                </Tab>
                <Tab eventKey="writing" title="Writing">
                    <Button className="my-2" onClick={() => setQuestionBodyModal(true)}>
                        + Question body
                    </Button>
                    <QuestionsList
                        examId={examId}
                        section={activeTab}
                        handleAddSubQuestion={() => setSubQModal(true)}
                    />
                </Tab>
                <Tab eventKey="speaking" title="Speaking">
                    <Button className="my-2" onClick={() => setQuestionBodyModal(true)}>
                        + Question body
                    </Button>
                    <QuestionsList
                        examId={examId}
                        section={activeTab}
                        handleAddSubQuestion={() => setSubQModal(true)}
                    />
                </Tab>
            </Tabs>
        </Container>
    );
}
