import { FormControl, Modal, Button, FormGroup, FormLabel } from "react-bootstrap";
import useSWR, { mutate } from "swr";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { createLesson, lessonRequest, lessonType, updateLesson } from "../../logic/lesson";
import { fetcher } from "../../logic";

export default function LessonModal({
    show,
    handleClose,
    selectedLesson,
    onDone,
}: {
    show: boolean;
    selectedLesson?: lessonType;
    handleClose: () => void;
    onDone?: () => void;
}) {
    const { data } = useSWR("/courses", fetcher);
    const courses = data?.data;

    const schema = Yup.object().shape({
        title: Yup.string().required(),
        course_id: Yup.number().required(),
    });

    const handleSubmit = async (data: lessonRequest) => {
        try {
            if (selectedLesson && selectedLesson.id) {
                const resp = await updateLesson(selectedLesson.id, data);
                mutate("/lessons");
                onDone && onDone();

                handleClose();
            } else {
                const resp = await createLesson(data);
                if (resp.status === "success") {
                    mutate("/lessons");
                    onDone && onDone();

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
                <Modal.Title>{selectedLesson ? "Update lesson" : "Add new lesson"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={selectedLesson ? (selectedLesson as any) : ({} as lessonRequest)}
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
                                <FormLabel>Course:</FormLabel>
                                <FormControl
                                    as="select"
                                    name="course_id"
                                    defaultValue="1"
                                    value={values.course_id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    {courses.map((c: any) => (
                                        <option value={c.id}>{c.title}</option>
                                    ))}
                                </FormControl>
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
