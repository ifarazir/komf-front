import { Redirect, RouteComponentProps } from "@reach/router";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { selectSession } from "../features/session/sessionsSlice";

interface IHome extends RouteComponentProps {
    children?: ReactNode;
}

export default function Home(props: IHome) {
    const session = useSelector(selectSession);

    return session.role ? (
        <>
            <h1>Home</h1>
            {props.children}
        </>
    ) : (
        <Redirect noThrow to="login" />
    );
}
