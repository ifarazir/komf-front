import { RouteComponentProps } from "@reach/router";
import { Col, Container, Image, ProgressBar, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

import Card from "../components/Card";
import { selectSession } from "../features/session/sessionsSlice";

import samp from "../assets/samp.jpg";

export default function ProfilePage(props: RouteComponentProps) {
    const profile = useSelector(selectSession);

    if (!profile) {
        return (
            <div className="my-2">
                <Spinner animation="border" />
            </div>
        );
    }

    return (
        <Container fluid className="mt-2">
            <Row>
                <Col xs={12} sm={6}>
                    <Card>
                        <div className="d-flex">
                            {/* <Image
                                src={samp}
                                fluid
                                style={{ flex: 1, objectFit: "cover", width: "100%" }}
                                rounded
                                alt={`${profile.fname} ${profile.lname}`}
                            /> */}
                            <div className="align-items-start ml-2" style={{ flex: 2 }}>
                                <h6>{`${profile.fname} ${profile.lname}`}</h6>
                                <p className="text-muted">{profile.email}</p>
                                <p className="text-muted">{profile.phone}</p>
                                <p className="text-muted">{profile.role}</p>
                                {/* {profile.role === "user" && <ProgressBar now={60} />} */}
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
