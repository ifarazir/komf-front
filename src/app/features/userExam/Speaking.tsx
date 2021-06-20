import { Button } from "react-bootstrap";

import Recorder from "../../components/Recorder";

function Speaking() {
    return (
        <div className="text-center">
            <Recorder />
            <Button size="lg">UPLOAD</Button>
        </div>
    );
}

export default Speaking;
