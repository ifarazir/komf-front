import { Modal, Button } from "react-bootstrap";

export default function Confirm({
    show,
    text,
    onClose,
    onConfirm,
}: {
    show: boolean;
    text?: string;
    onClose: () => void;
    onConfirm: () => void;
}) {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure?</p>
                {text && <span className="text-muted">{text}</span>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onConfirm}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
