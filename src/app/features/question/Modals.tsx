import React, { useState } from "react";
import { Button, Modal, Tabs, Tab } from "react-bootstrap";

import { QuestionBodyForm, SubQuestionForm } from "./Forms";

export default function QuestionModal({ show, onClose }: { show: boolean; onClose: () => void }) {
    const [addQBody, setAddQBody] = useState(false);
    const [addSubQuestions, setAddSubQuestions] = useState(false);

    return (
        <Modal size="lg" show={show}>
            <Modal.Header closeButton onHide={onClose}>
                <Modal.Title>Exam question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs defaultActiveKey="reading">
                    <Tab eventKey="reading" title="Reading">
                        <h3 className="my-2">Questions</h3>
                        {addQBody && (
                            <QuestionBodyForm
                                handleCancel={() => setAddQBody(false)}
                                handleNext={() => {
                                    setAddSubQuestions(true);
                                    setAddQBody(false);
                                }}
                            />
                        )}
                        {addSubQuestions && <SubQuestionForm />}
                        <Button
                            className="mt-3"
                            block
                            onClick={() => {
                                setAddQBody(true);
                                setAddSubQuestions(false);
                            }}
                        >
                            + New question body
                        </Button>
                    </Tab>
                    <Tab eventKey="listening" title="Listening">
                        <h1>Listening</h1>
                    </Tab>
                    <Tab eventKey="speaking" title="Speaking">
                        <h1>Speaking</h1>
                    </Tab>
                    <Tab eventKey="writing" title="Writing">
                        <h1>Writing</h1>
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    );
}
