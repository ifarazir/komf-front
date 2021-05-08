import { CardDeck, Container } from "react-bootstrap";
import { RouteComponentProps } from "@reach/router";

import LatestCourse from "../features/course/LatestCourse";

export default function UserPage(props: RouteComponentProps) {
    return (
        <Container fluid className="mt-2">
            <CardDeck>
                <LatestCourse />
            </CardDeck>
        </Container>
    );
}
