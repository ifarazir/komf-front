import { FormControl, Modal, Button, FormGroup, FormLabel } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { IQuizQuestion, createQuizQuesion, updateQuizQuestion } from "../../logic/quiz";
import { useQuery } from "../../common/hooks";
import { lessonType, getLessons } from "../../logic/lesson";
import TinyEditor from "../../components/Editor";

export default function QuizQuestionModal({
    show,
    handleClose,
    selectedQuestion,
    onDone,
}: {
    show: boolean;
    selectedQuestion?: IQuizQuestion;
    handleClose: () => void;
    onDone: () => void;
}) {
    const { data } = useQuery<lessonType>(getLessons);
    const lessons = data;

    const schema = Yup.object().shape({
        title: Yup.string().required(),
        q1: Yup.string().required(),
        q2: Yup.string().required(),
        q3: Yup.string().required(),
        q4: Yup.string().required(),
        lesson_id: Yup.number().required(),
    });

    const handleSubmit = async (data: IQuizQuestion) => {
        try {
            if (selectedQuestion && selectedQuestion.id) {
                const resp = await updateQuizQuestion(String(selectedQuestion.id), { ...data, answer: data.q1 });
                onDone();
                handleClose();
            } else {
                const resp = await createQuizQuesion({ ...data, answer: data.q1 });
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
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{selectedQuestion ? "Update question" : "Add new question"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={selectedQuestion ? (selectedQuestion as any) : ({} as IQuizQuestion)}
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, handleBlur, setFieldValue }) => (
                        <Form>
                            <div className="d-flex">
                                <FormGroup>
                                    <FormLabel>Title:</FormLabel>
                                    {/* <FormControl name="title" value={values.title} onChange={handleChange} onBlur={handleBlur} /> */}
                                    <TinyEditor handleChange={(v) => setFieldValue("title", v)} height={460} />
                                </FormGroup>
                                <div className="ml-2">
                                    <FormGroup>
                                        <FormLabel>Answer:</FormLabel>
                                        <FormControl
                                            as="select"
                                            name="answer"
                                            defaultValue="1"
                                            value={values.answer}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Option 1:</FormLabel>
                                        <FormControl name="q1" value={values.q1} onChange={handleChange} onBlur={handleBlur} />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Option 2:</FormLabel>
                                        <FormControl name="q2" value={values.q2} onChange={handleChange} onBlur={handleBlur} />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Option 3:</FormLabel>
                                        <FormControl name="q3" value={values.q3} onChange={handleChange} onBlur={handleBlur} />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Option 4:</FormLabel>
                                        <FormControl name="q4" value={values.q4} onChange={handleChange} onBlur={handleBlur} />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Course:</FormLabel>
                                        <FormControl
                                            as="select"
                                            name="lesson_id"
                                            defaultValue="1"
                                            value={values.lesson_id}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            {lessons.map((c) => (
                                                <option value={c.id}>{c.title}</option>
                                            ))}
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            </div>
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
