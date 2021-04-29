import { Col, Row } from "react-bootstrap";

import { UsersLineChartCard, ExamsBarChartCard } from "./Cards";

export default function Dashboard() {
    return (
        <Row>
            <Col lg="4" md="6" sm="12">
                <ExamsBarChartCard />
            </Col>
            <Col lg="4" md="6" sm="12">
                <UsersLineChartCard />
            </Col>
        </Row>
    );
}
