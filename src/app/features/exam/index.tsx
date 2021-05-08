import { Button } from "react-bootstrap";
import Table from "./Table";

export default function ExamIndex() {
    return (
        <div>
            <div className="my-2 d-flex justify-content-between align-items-center">
                <div>
                    <h6>Exam</h6>
                    <span className="text-muted">Exam managment panel</span>
                </div>
                <Button>Create</Button>
            </div>
            <Table />
        </div>
    );
}
