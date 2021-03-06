import React, { useState } from "react";
import { Button } from "react-bootstrap";

import Table from "./Table";
import ExamModal from "./Modals";

export default function ExamIndex() {
    const [examModal, setExamModal] = useState(false);

    return (
        <div>
            <ExamModal show={examModal} onClose={() => setExamModal(false)} />

            <div className="my-2 d-flex justify-content-between align-items-center">
                <div>
                    <h6>Exam</h6>
                    <span className="text-muted">Exam managment panel</span>
                </div>
                <Button onClick={() => setExamModal(true)}>+ Create</Button>
            </div>
            <Table />
        </div>
    );
}
