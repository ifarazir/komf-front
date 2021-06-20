import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Forms from "../Forms";

const sampleError = {
    msgFa: "ورودی معتبر نیست",
    msgEn: "Input is not valid",
    status: 409,
    errorDetail: {
        details: [
            {
                message: '"duration" is required',
            },
        ],
    },
    time: "2021-06-12T06:35:30.653Z",
};

const server = setupServer(
    rest.post("/admin/exams", (req, res, ctx) => {
        return res(ctx.json({ message: "Exam created successfully", details: req.body }));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("show success mesage on sucessfuly create exam", async () => {
    render(<Forms onSubmit={() => {}} />);

    fireEvent.change(screen.getByPlaceholderText("Description"), { target: { value: "unit-test description value" } });
    fireEvent.change(screen.getByPlaceholderText("Reading duration"), { target: { value: "10" } });
    fireEvent.change(screen.getByPlaceholderText("Writing duration"), { target: { value: "20" } });
    fireEvent.change(screen.getByPlaceholderText("Speaking duration"), { target: { value: "30" } });
    fireEvent.change(screen.getByPlaceholderText("Listening duration"), { target: { value: "40" } });
    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => screen.getByRole("alert"));

    expect(screen.getByRole("alert")).toHaveTextContent("Exam created successfully");
    expect(screen.getByRole("alert")).toHaveClass("alert-success");
});

test("show error on invalid inputs", async () => {
    server.use(
        rest.post("/admin/exams", (req, res, ctx) => {
            return res(ctx.status(409), ctx.json(sampleError));
        })
    );

    render(<Forms onSubmit={() => {}} />);

    fireEvent.change(screen.getByPlaceholderText("Description"), { target: { value: "unit-test description value" } });
    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => screen.getByRole("alert"));

    expect(screen.getByRole("alert")).toHaveTextContent('"duration" is required');
    expect(screen.getByRole("alert")).toHaveClass("alert-danger");
});
