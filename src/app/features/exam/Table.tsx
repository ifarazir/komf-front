import { Spinner, Table } from "react-bootstrap";
import useSWR from "swr";

import SearchForm from "../../components/Ribbons/SearchForm";
import Card from "../../components/Card";
import { nodeFetcher } from "../../logic";
import { examType } from "../../logic/exam";
import { Link } from "@reach/router";

export default function LessonTable() {
    const { data: exams } = useSWR("/admin/exams", nodeFetcher);

    if (!exams) {
        return <Spinner animation="border" />;
    }

    return (
        <div className="mt-4">
            <Card>
                <SearchForm />
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Duration reading</th>
                            <th>Duration writing</th>
                            <th>Duration listening</th>
                            <th>Duration speaking</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exams.data.exams.map((exam: examType) => (
                            <tr key={exam._id}>
                                <td>
                                    <Link to={`${exam._id}`}>{exam.description}</Link>
                                </td>
                                <td>{exam.duration.reading}</td>
                                <td>{exam.duration.writing}</td>
                                <td>{exam.duration.listening}</td>
                                <td>{exam.duration.speaking}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </div>
    );
}
