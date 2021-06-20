import React, { useState } from "react";
import { FormControl, Button, FormGroup, FormLabel, Alert, FormText } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Select from "react-select";

import { createExamQuestion, questionType, sections } from "../../logic/question";
import TinyEditor from "../../components/Editor";
import { mutate } from "swr";

export const QuestionBodyForm = ({
    handleSubmit,
    examId,
    section,
}: {
    handleSubmit: () => void;
    section: sections;
    examId: string;
}) => {
    const [error, setError] = useState<any>();

    return (
        <Formik
            initialValues={{ part: "1" } as any}
            onSubmit={async (d) => {
                try {
                    const resp = await createExamQuestion({
                        examId,
                        questionParentId: null,
                        type: "body",
                        content: d.content,
                        questionNumber: null,
                        section,
                        part: d.part,
                        options: null,
                        answer: null,
                    });
                    if (resp && resp.status === 200) {
                        handleSubmit();
                        mutate(`/admin/questions?examId=${examId}&section=${section}`);
                    }
                } catch (error) {
                    setError(error);
                    console.log(error);
                }
            }}
        >
            {({ values, handleChange, handleBlur, setFieldValue }) => (
                <Form>
                    {error && (
                        <Alert className="my-1" variant="danger">
                            {error}
                        </Alert>
                    )}
                    <FormGroup>
                        <FormLabel>Part: </FormLabel>
                        <FormControl
                            as="select"
                            name="part"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.part}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Content: </FormLabel>
                        <TinyEditor handleChange={(v) => setFieldValue("content", v)} height={200} />
                    </FormGroup>
                    <Button className="mt-2" type="submit" variant="success">
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export const SingleChoiceForm = ({
    examId,
    section,
    questionParentId,
    handleSubmit,
}: {
    examId: string;
    section: sections;
    questionParentId: string;
    handleSubmit: () => void;
}) => {
    const handleSubmitForm = async (d: any) => {
        try {
            // console.log(d);
            const resp = await createExamQuestion({
                examId,
                questionParentId,
                type: "singleChoice",
                content: d.content,
                questionNumber: d.questionNumber,
                section: null,
                part: null,
                options: {
                    A: d.A,
                    B: d.B,
                    C: d.C,
                    D: d.D,
                },
                answer: [d.answer],
            });
            if (resp && resp.status === 200) {
                handleSubmit();
                mutate(`/admin/questions?examId=${examId}&section=${section}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Formik initialValues={{ answer: "A" } as any} onSubmit={handleSubmitForm}>
            {({ values, handleChange, handleBlur, setFieldValue }) => (
                <Form className="my-2">
                    <FormGroup>
                        <FormLabel>Content: </FormLabel>
                        <TinyEditor height={150} handleChange={(v) => setFieldValue("content", v)} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Question number: </FormLabel>
                        <FormControl
                            name="questionNumber"
                            value={values.questionNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Answer: </FormLabel>
                        <Select
                            name="answer"
                            className="basic-single mt-2"
                            classNamePrefix="select"
                            options={[
                                { label: "A", value: "A" },
                                { label: "B", value: "B" },
                                { label: "C", value: "C" },
                                { label: "D", value: "D" },
                            ]}
                            onChange={(v) => setFieldValue("answer", v?.value)}
                            onBlur={handleBlur}
                        />
                    </FormGroup>
                    <div className="my-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1em" }}>
                        <FormControl
                            name="A"
                            value={values.options?.A}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="A"
                        />
                        <FormControl
                            name="B"
                            value={values.options?.B}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="B"
                        />
                        <FormControl
                            name="C"
                            value={values.options?.C}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="C"
                        />
                        <FormControl
                            name="D"
                            value={values.options?.D}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="D"
                        />
                    </div>
                    <Button className="mt-2" type="submit" variant="success">
                        Save
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export const MultiChoiceForm = ({
    examId,
    section,
    questionParentId,
    handleSubmit,
}: {
    examId: string;
    section: sections;
    questionParentId: string;
    handleSubmit: () => void;
}) => {
    const handleSubmitForm = async (d: any) => {
        try {
            const resp = await createExamQuestion({
                examId,
                questionParentId,
                type: "multiChoice",
                content: d.content,
                questionNumber: d.questionNumber,
                section: null,
                part: null,
                options: {
                    A: d.A,
                    B: d.B,
                    C: d.C,
                    D: d.D,
                    E: d.E,
                },
                answer: d.answer.split(",").map((c: string) => c.toUpperCase()),
            });
            if (resp && resp.status === 200) {
                handleSubmit();
                mutate(`/admin/questions?examId=${examId}&section=${section}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Formik initialValues={{} as any} onSubmit={handleSubmitForm}>
            {({ values, handleChange, handleBlur, setFieldValue }) => (
                <Form className="my-2">
                    <FormGroup>
                        <FormLabel>Content: </FormLabel>
                        <TinyEditor height={150} handleChange={(v) => setFieldValue("content", v)} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Question number: </FormLabel>
                        <FormControl name="questionNumber" onChange={handleChange} onBlur={handleBlur} required />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Answers: </FormLabel>
                        <Select
                            name="answer"
                            className="basic-single mt-2"
                            classNamePrefix="select"
                            isMulti
                            options={[
                                { label: "A", value: "A" },
                                { label: "B", value: "B" },
                                { label: "C", value: "C" },
                                { label: "D", value: "D" },
                            ]}
                            onChange={(v) => setFieldValue("answer", v.map((a) => a.value).join(","))}
                            onBlur={handleBlur}
                        />
                    </FormGroup>
                    <div className="my-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1em" }}>
                        <FormControl
                            name="A"
                            value={values.options?.A}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="A"
                        />
                        <FormControl
                            name="B"
                            value={values.options?.B}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="B"
                        />
                        <FormControl
                            name="C"
                            value={values.options?.C}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="C"
                        />
                        <FormControl
                            name="D"
                            value={values.options?.D}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="D"
                        />
                        <FormControl
                            name="E"
                            value={values.options?.E}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="E"
                        />
                    </div>
                    <Button className="mt-2" type="submit" variant="success">
                        Save
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export const OrderingForm = ({
    examId,
    section,
    questionParentId,
    handleSubmit,
}: {
    examId: string;
    section: sections;
    questionParentId: string;
    handleSubmit: () => void;
}) => {
    const handleSubmitForm = async (d: any) => {
        try {
            const resp = await createExamQuestion({
                examId,
                questionParentId,
                type: "ordering",
                content: d.content,
                questionNumber: d.questionNumber,
                section: null,
                part: null,
                options: {
                    A: d.A,
                    B: d.B,
                    C: d.C,
                    D: d.D,
                    E: d.E,
                },
                answer: d.answer.split(",").map((c: string) => c.toUpperCase()),
            });
            if (resp && resp.status === 200) {
                handleSubmit();
                mutate(`/admin/questions?examId=${examId}&section=${section}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Formik initialValues={{} as any} onSubmit={handleSubmitForm}>
            {({ values, handleChange, handleBlur, setFieldValue }) => (
                <Form className="my-2">
                    <FormGroup>
                        <FormLabel>Content: </FormLabel>
                        <TinyEditor height={150} handleChange={(v) => setFieldValue("content", v)} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Question number: </FormLabel>
                        <FormControl name="questionNumber" onChange={handleChange} onBlur={handleBlur} required />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Answers: </FormLabel>
                        <Select
                            name="answer"
                            className="basic-single mt-2"
                            classNamePrefix="select"
                            isMulti
                            options={[
                                { label: "A", value: "A" },
                                { label: "B", value: "B" },
                                { label: "C", value: "C" },
                                { label: "D", value: "D" },
                            ]}
                            onChange={(v) => setFieldValue("answer", v.map((a) => a.value).join(","))}
                            onBlur={handleBlur}
                        />
                        <FormText>
                            <strong>Order is important</strong>
                        </FormText>
                    </FormGroup>
                    <div className="my-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1em" }}>
                        <FormControl
                            name="A"
                            value={values.options?.A}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="A"
                        />
                        <FormControl
                            name="B"
                            value={values.options?.B}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="B"
                        />
                        <FormControl
                            name="C"
                            value={values.options?.C}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="C"
                        />
                        <FormControl
                            name="D"
                            value={values.options?.D}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="D"
                        />
                        <FormControl
                            name="E"
                            value={values.options?.E}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="E"
                        />
                    </div>
                    <Button className="mt-2" type="submit" variant="success">
                        Save
                    </Button>
                </Form>
            )}
        </Formik>
    );
};
