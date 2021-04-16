import { Container } from "react-bootstrap";
import { RouteComponentProps } from "@reach/router";

import LessonIndex from "../features/lesson";

export default function Lesson(props: RouteComponentProps) {
    return (
        <Container fluid className="mt-2">
            <h3>Lessons</h3>
            <LessonIndex />
        </Container>
    );
}
