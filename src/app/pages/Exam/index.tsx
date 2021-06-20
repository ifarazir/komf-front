import { RouteComponentProps } from "@reach/router";
import ExamList from "../../features/exam/List";

export default function Exam(props: RouteComponentProps) {
    return (
        <div className="text-center p-4">
            <ExamList />
        </div>
    );
}
