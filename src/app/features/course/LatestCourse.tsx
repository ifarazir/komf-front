import { Button, Spinner } from "react-bootstrap";
import useSWR from "swr";

import { getCourses } from "../../logic/course";
import MyCard from "../../components/Card";
import { fetcher } from "../../logic";

export default function LatestCourse() {
    const { data, error } = useSWR("/courses");

    let content;
    if (!data) {
        content = <Spinner animation="border" />;
    } else {
        content = (
            <>
                <hr />
                <h5>{data.data[0].title}</h5>
                <p>{data.data[0].description}</p>
                <Button>Enroll now for {data.data[0].price} $</Button>
            </>
        );
    }

    return <MyCard title="Latest course">{content}</MyCard>;
}
