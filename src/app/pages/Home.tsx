import { ReactNode } from "react";
import { Redirect, RouteComponentProps } from "@reach/router";
import { useSelector } from "react-redux";

import Drawer from "../components/Drawer";
import { selectSession } from "../features/session/sessionsSlice";
import { useTheme } from "../theme";

interface IHome extends RouteComponentProps {
    children?: ReactNode;
}

export default function Home(props: IHome) {
    const session = useSelector(selectSession);
    const theme = useTheme();

    return session ? (
        <div>
            <Drawer />
            <div style={{ marginLeft: 290 }}>{props.children}</div>
        </div>
    ) : (
        <Redirect noThrow to="/auth" />
    );
}
