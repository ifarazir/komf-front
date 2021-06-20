import { Container } from "react-bootstrap";
import { RouteComponentProps } from "@reach/router";

import DashbaordIndex from "../../features/dashboard";

export default function Admin(props: RouteComponentProps) {
    return (
        <Container fluid className="mt-2">
            <DashbaordIndex />
        </Container>
    );
}
