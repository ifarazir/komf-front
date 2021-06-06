import React from "react";
import { FormControl, Button, Row, Col, FormGroup, FormLabel } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { createExam, examType } from "../../logic/exam";
import { mutate } from "swr";

export default function ExamForm({ onSubmit }: { onSubmit: () => void }) {
    const handleSubmit = async (d: any) => {
        try {
            // console.log({
            //     description: d.description,
            //     duration: { reading: d.reading, speaking: d.speaking, listening: d.listening, writing: d.writing },
            // });
            const resp = await createExam({
                description: d.description,
                duration: { reading: d.reading, speaking: d.speaking, listening: d.listening, writing: d.writing },
            });
            if (resp.message === "Exam created successfully") {
                mutate("/admin/exams");
                onSubmit();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Formik initialValues={{} as examType} onSubmit={handleSubmit}>
            {({ values, handleChange, handleBlur }) => (
                <Form>
                    <Row>
                        <Col xs={12}>
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
