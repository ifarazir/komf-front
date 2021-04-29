import { ReactNode } from "react";
import { Redirect, RouteComponentProps } from "@reach/router";
import { useMediaQuery } from "react-responsive";

import Drawer from "../components/Drawer";
import TopNavBar from "../components/TopNavbar";

import { getSavedToken } from "../logic/auth";

interface IHome extends RouteComponentProps {
    children?: ReactNode;
}

export default function Home(props: IHome) {
    const isLargeScreen = useMediaQuery({ query: "(min-width: 800px)" });

    return getSavedToken() ? (
        <div>
            {isLargeScreen && <Drawer />}
            {!isLargeScreen && <TopNavBar />}
            <div style={{ marginLeft: isLargeScreen ? 290 : 0, paddingTop: "1em" }}>{props.children}</div>
        </div>
    ) : (
        <Redirect noThrow to="/auth" />
    );
}
