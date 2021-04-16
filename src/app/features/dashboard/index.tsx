import { Col, Row } from "react-bootstrap";

import { UsersLineChartCard, ExamsBarChartCard } from "./Cards";

export default function Dashboard() {
    return (
        <Row>
            <Col md="3" sm="4" xs="12">
                <UsersLineChartCard />
            </Col>
            <Col md="3" sm="4" xs="12">
                <ExamsBarChartCard />
            </Col>
        </Row>
    );
}
