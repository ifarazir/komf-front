import { useState } from "react";
import { Alert, Spinner, Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "@reach/router";
import useSWR from "swr";

import SearchForm from "../../components/Ribbons/SearchForm";
import Card from "../../components/Card";
import Confirm from "../../components/Confirm";

import { nodeFetcher } from "../../logic";
import { examType } from "../../logic/exam";
import { startExam } from "../../logic/takeExam";

export default function UserExamTable() {
    const [confirm, setConfirm] = useState(false);
    const [examId, setExamId] = useState<string>();
    const [error, setError] = useState<string>();
    const { data: exams, error: examsError } = useSWR("/student/exams/", nodeFetcher);

    const navigate = useNavigate();

    if (examsError) {
        return <Alert variant="danger">{String(examsError)}</Alert>;
    }

    if (!exams) {
        return <Spinner animation="border" />;
    }

    const handleStartExam = async () => {
        try {
            if (examId) {
                await startExam(examId);
                navigate(`/exam/start/${examId}`);
            }
        } catch (error) {
            setError(error.response.data.msgEn);
            console.log(error.response.data.msgEn);
        }
    };

    return (
        <div className="mt-4">
            {examId && (
                <Confirm show={confirm} onClose={() => setConfirm(false)} onConfirm={handleStartExam} text={error} />
            )}

            <Card>
                {error && <Alert variant="danger">{error}</Alert>}
                <SearchForm />
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Duration reading</th>
                            <th>Duration writing</th>
                            <th>Duration listening</th>
                            <th>Duration speaking</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {exams.data.exams.map((exam: examType) => (
                            <tr key={exam._id}>
                                <td>{exam.description}</td>
                                <td>{exam.duration.reading}</td>
                                <td>{exam.duration.writing}</td>
                                <td>{exam.duration.listening}</td>
                                <td>{exam.duration.speaking}</td>
                                <td>
                                    <a
                                        href="#"
                                        onClick={() => {
                                            setError(undefined);
                                            setExamId(exam._id);
                                            setConfirm(true);
                                        }}
                                    >
                                        Start
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </div>
    );
}
