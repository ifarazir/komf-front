import { Container } from "react-bootstrap";
import { RouteComponentProps } from "@reach/router";
import TinyEditor from "../components/Editor";

export default function ExamAdmin(props: RouteComponentProps) {
    return (
        <Container fluid className="mt-2">
            <h3>Exam</h3>
            <TinyEditor />
        </Container>
    );
}
