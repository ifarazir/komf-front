import { Container } from "react-bootstrap";
import { RouteComponentProps } from "@reach/router";

import VocabIndex from "../../features/vocab";

export default function VocabAdmin(props: RouteComponentProps) {
    return (
        <Container fluid className="mt-2">
            <VocabIndex />
        </Container>
    );
}
