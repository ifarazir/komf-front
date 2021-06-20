import { useState } from "react";
import { FormControl, Button, Row, Col, FormGroup, FormLabel, Alert } from "react-bootstrap";
import { Formik, Form } from "formik";

import { createExam, examType } from "../../logic/exam";
import { mutate } from "swr";

export default function ExamForm({ onSubmit }: { onSubmit: () => void }) {
    const [isSucess, setIsSucess] = useState(true);
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState("");

    const handleSubmit = async (d: any) => {
        try {
            const resp = await createExam({
                description: d.description,
                duration: { reading: d.reading, speaking: d.speaking, listening: d.listening, writing: d.writing },
                status: d.status ? d.status : "active",
            });

            setMsg(resp.data.message);
            setIsSucess(true);

            mutate("/admin/exams");
            onSubmit();
        } catch (error) {
            setMsg(String(error.response.data.errorDetail.details.map((e: any) => e.message)));
            setIsSucess(false);
        } finally {
            setShowMsg(true);
        }
    };

    return (
        <Formik initialValues={{} as examType} onSubmit={handleSubmit}>
            {({ values, handleChange, handleBlur }) => (
                <Form>
                    <Row>
                        <Col xs={12}>
                            {showMsg && <Alert variant={isSucess ? "success" : "danger"}>{msg}</Alert>}
                            <FormGroup>
                                <FormLabel>Description:</FormLabel>
                                <FormControl
                                    required
                                    as="textarea"
                                    name="description"
                                    placeholder="Description"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs={12}>
                            <FormGroup>
                                <FormLabel>Status:</FormLabel>
                                <FormControl
                                    required
                                    as="select"
                                    name="status"
                                    placeholder="Status"
                                    value={values.status}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option value="active">active</option>
                                    <option value="draft">draft</option>
                                    <option value="close">close</option>
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col xs={3}>
                            <FormGroup>
                                <FormLabel>Reading duration:</FormLabel>
                                <FormControl
                                    required
                                    name="reading"
                                    placeholder="Reading duration"
                                    value={values.duration?.reading}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs={3}>
                            <FormGroup>
                                <FormLabel>Writing duration:</FormLabel>
                                <FormControl
                                    required
                                    name="writing"
                                    placeholder="Writing duration"
                                    value={values.duration?.writing}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs={3}>
                            <FormGroup>
                                <FormLabel>Speaking duration:</FormLabel>
                                <FormControl
                                    required
                                    name="speaking"
                                    placeholder="Speaking duration"
                                    value={values.duration?.speaking}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs={3}>
                            <FormGroup>
                                <FormLabel>listening duration:</FormLabel>
                                <FormControl
                                    required
                                    name="listening"
                                    placeholder="Listening duration"
                                    value={values.duration?.listening}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button className="mt-2" type="submit">
                        Save
                    </Button>
                </Form>
            )}
        </Formik>
    );
}
