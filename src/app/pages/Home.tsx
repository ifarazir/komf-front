import { ReactNode } from "react";
import { Redirect, RouteComponentProps } from "@reach/router";
import { useSelector } from "react-redux";

import TopNavbar from "../components/TopNavbar";
import { selectSession } from "../features/session/sessionsSlice";
import {useTheme} from "../theme";

interface IHome extends RouteComponentProps {
    children?: ReactNode;
}

export default function Home(props: IHome) {
    const session = useSelector(selectSession);
    const theme = useTheme();

    return session ? (
        <>
            <TopNavbar />
            <div style={{padding:2, backgroundColor:theme.mainColor}} />
            {props.children}
        </>
    ) : (
        <Redirect noThrow to="/auth" />
    );
}
