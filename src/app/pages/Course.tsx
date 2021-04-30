import { Container } from "react-bootstrap";
import { RouteComponentProps } from "@reach/router";

import CourseIndex from "../features/course";

export default function Course(props: RouteComponentProps) {
    return (
        <Container fluid className="mt-2">
            <CourseIndex />
        </Container>
    );
}
