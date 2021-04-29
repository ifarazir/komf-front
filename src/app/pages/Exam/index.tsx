import { Link, RouteComponentProps, useLocation, useMatch } from "@reach/router";

export default function Exam(props: RouteComponentProps) {
    const location = useLocation();
    const match = useMatch(location.pathname);

    return (
        <div className="text-center p-4">
            <Link to="/panel">Back</Link>
        </div>
    );
}
