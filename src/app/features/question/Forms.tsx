import React, { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { questionType } from "../../logic/question";
import TinyEditor from "../../components/Editor";

export const QuestionBodyForm = ({ handleCancel, handleNext }: { handleCancel: () => void; handleNext: () => void }) => {
    return (
        <Formik
            initialValues={{} as questionType}
            onSubmit={(d) => {
                handleNext();
                console.log(d);
            }}
        >
            {({ values, handleChange, handleBlur, errors }) => (
                <Form>
                    <TinyEditor handleChange={() => {}} />
                    <div className="d-flex">
                        <Button className="mt-2" variant="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <div className="mr-auto" />
                        <Button className="mt-2" type="submit" variant="success">
                            Next
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export const SingleChoiceForm = () => {
    return (
        <Formik
            initialValues={{} as questionType}
            onSubmit={(d) => {
                console.log(d);
            }}
        >
            {({ values, handleChange, handleBlur, errors }) => (
                <Form className="my-2">
                    <TinyEditor height={150} handleChange={() => {}} />
                    <FormControl className="mt-2" as="select">
                        {["A", "B", "C", "D"].map((choice) => (
                            <option key={choice} value={choice}>
                                {choice}
                            </option>
                        ))}
                    </FormControl>
                    <div className="my-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1em" }}>
                        <FormControl placeholder="Option 1" />
                        <FormControl placeholder="Option 2" />
                        <FormControl placeholder="Option 3" />
                        <FormControl placeholder="Option 4" />
                    </div>
                    <Button className="mt-2" type="submit" variant="success">
                        Save
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export const SubQuestionForm = () => {
    const [questionType, setQuestionType] = useState<"singleChoice" | "multiChoice" | "ordering">();

    return (
        <>
            <div className="d-flex justify-content-between">
                <Button onClick={() => setQuestionType("singleChoice")}>+ Single choice</Button>
                <Button onClick={() => setQuestionType("multiChoice")}>+ Multi choice</Button>
                <Button onClick={() => setQuestionType("ordering")}>+ Ordering</Button>
            </div>
            {questionType === "singleChoice" && <SingleChoiceForm />}
            {questionType === "multiChoice" && <h1>Multi choice</h1>}
            {questionType === "ordering" && <h1>Ordering</h1>}
        </>
    );
};
