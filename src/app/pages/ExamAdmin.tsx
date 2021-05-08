import { Container } from "react-bootstrap";
import { RouteComponentProps } from "@reach/router";

import ExamIndex from "../features/exam";

export default function ExamAdmin(props: RouteComponentProps) {
    return (
        <Container fluid className="mt-2">
            <ExamIndex />
        </Container>
    );
}
