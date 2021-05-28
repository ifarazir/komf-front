import React from "react";
import { Button, Modal } from "react-bootstrap";

import ExamForm from "./Forms";

export default function ExamModal({ show, onClose }: { show: boolean; onClose: () => void }) {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>Exam</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ExamForm />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
