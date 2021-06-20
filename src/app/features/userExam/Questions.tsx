import { Button, FormCheck } from "react-bootstrap";
import { questionType } from "../../logic/question";

export const SubQuestion = ({ question }: { question: questionType }) => {
    let options = [];
    switch (question.type) {
        case "singleChoice":
            (question.options as any).map((o: any) => options.push(<Button>{o}</Button>));
            break;
        case "multiChoice":
            (question.options as any).map((o: any) => options.push(<FormCheck label={o} />));
            break;

        default:
            break;
    }

    return (
        <div>
            <p dangerouslySetInnerHTML={{ __html: question.content }} />
        </div>
    );
};
