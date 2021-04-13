import { FormControl, Modal, Button, FormGroup, FormLabel } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { courseRequest, courseType, createCourse, updateCourse } from "../../logic/course";

export default function CourseModal({
    show,
    handleClose,
    selectedCourse,
    onDone,
}: {
    show: boolean;
    selectedCourse?: courseType;
    handleClose: () => void;
    onDone: () => void;
}) {
    const schema = Yup.object().shape({
        title: Yup.string().required(),
    });

    const handleSubmit = async (data: courseRequest) => {
        try {
            if (selectedCourse && selectedCourse.id) {
                const resp = await updateCourse(selectedCourse.id, data);
                if (resp.status === "success") {
                    onDone();
                    handleClose();
                }
            } else {
                const resp = await createCourse(data);
                if (resp.status === "success") {
                    onDone();
                    handleClose();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{selectedCourse ? "Update course" : "Add new course"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={selectedCourse ? selectedCourse : ({} as courseRequest)}
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, handleBlur }) => (
                        <Form>
                            <FormGroup>
                                <FormLabel>Title:</FormLabel>
                                <FormControl name="title" value={values.title} onChange={handleChange} onBlur={handleBlur} />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Price:</FormLabel>
                                <FormControl name="price" value={values.price} onChange={handleChange} onBlur={handleBlur} />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Description:</FormLabel>
                                <FormControl
                                    as="textarea"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </FormGroup>
                            <Button type="submit" variant="success">
                                Save
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
