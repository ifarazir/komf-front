import { FormControl, Modal, Button, FormGroup, FormLabel } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { IBaseVocab, createVocab, updateVocab, IVocab } from "../../logic/vocab";
import { lessonType } from "../../logic/lesson";

export default function VocabModal({
    show,
    handleClose,
    selectedVocab,
    selectedLesson,
    onDone,
}: {
    show: boolean;
    selectedLesson: lessonType;
    selectedVocab?: IVocab;
    handleClose: () => void;
    onDone: () => void;
}) {
    const schema = Yup.object().shape({
        word: Yup.string().required(),
        syn: Yup.string().required(),
        def: Yup.string().required(),
    });

    const handleSubmit = async (data: IBaseVocab) => {
        try {
            if (selectedVocab && selectedVocab.id) {
                const resp = await updateVocab(selectedVocab.id, data);
                if (resp.status === "success") {
                    onDone();
                    handleClose();
                }
            } else {
                const resp = await createVocab(String(selectedLesson.id), data);
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
                <Modal.Title>{selectedVocab ? "Update vocab" : "Add new vocab"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={selectedVocab ? selectedVocab : ({} as IBaseVocab)}
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, handleBlur }) => (
                        <Form>
                            <FormGroup>
                                <FormLabel>Word:</FormLabel>
                                <FormControl
                                    name="word"
                                    value={values.word}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Synonym:</FormLabel>
                                <FormControl
                                    name="syn"
                                    value={values.syn}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Definition:</FormLabel>
                                <FormControl
                                    as="textarea"
                                    name="def"
                                    value={values.def}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Example 1:</FormLabel>
                                <FormControl
                                    name="ex1"
                                    value={values.ex1}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Example 2:</FormLabel>
                                <FormControl
                                    name="ex2"
                                    value={values.ex2}
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
