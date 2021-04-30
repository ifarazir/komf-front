import { Button, Form } from "react-bootstrap";

export default function Ribbon() {
    return (
        <Form inline>
            <Form.Control className="mb-2 mr-sm-2" name="search" placeholder="Search for..." />
            <Button className="mb-2">Search</Button>
        </Form>
    );
}
