import { FormControl, Modal } from "react-bootstrap";

import { MultiChoiceForm, OrderingForm, QuestionBodyForm, SingleChoiceForm } from "./Forms";

import { sections } from "../../logic/question";
import { useState } from "react";

export const QuestionBodyModal = ({
    show,
    onClose,
    examId,
    section,
}: {
    show: boolean;
    onClose: () => void;
    examId: string;
    section: sections;
}) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <p className="text-muted">{section}</p>
            </Modal.Header>
            <Modal.Body>
                <QuestionBodyForm handleSubmit={onClose} examId={examId} section={section} />
            </Modal.Body>
        </Modal>
    );
};

export const SubQuestionModal = ({
    show,
    onClose,
    examId,
    questionParentId,
    section,
}: {
    show: boolean;
    onClose: () => void;
    examId: string;
    questionParentId: string;
    section: sections;
}) => {
    const [type, setType] = useState<"singleChoice" | "multiChoice" | "ordering">("singleChoice");

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>Add question to section {section}</Modal.Header>
            <Modal.Body>
                <FormControl as="select" value={type} onChange={(e) => setType(e.target.value as any)}>
                    <option>singleChoice</option>
                    <option>multiChoice</option>
                    <option>ordering</option>
                </FormControl>
                {type === "singleChoice" && (
                    <SingleChoiceForm handleSubmit={onClose} section={section} examId={examId} questionParentId={questionParentId} />
                )}
                {type === "multiChoice" && (
                    <MultiChoiceForm handleSubmit={onClose} section={section} examId={examId} questionParentId={questionParentId} />
                )}
                {type === "ordering" && (
                    <OrderingForm handleSubmit={onClose} section={section} examId={examId} questionParentId={questionParentId} />
                )}
            </Modal.Body>
        </Modal>
    );
};
