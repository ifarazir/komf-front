import React from "react";
import { FormControl, Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { examType } from "../../logic/exam";

export default function ExamForm() {
    return (
        <Formik initialValues={{} as examType} onSubmit={(d) => console.log(d)}>
            {({ values, handleChange, handleBlur, errors }) => (
                <Form>
                    <FormControl as="textarea" name="description" placeholder="Description" onChange={handleChange} onBlur={handleBlur} />
                    <Button className="mt-2" type="submit">
                        Save
                    </Button>
                </Form>
            )}
        </Formik>
    );
}
