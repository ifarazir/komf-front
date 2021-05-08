import { Button, Spinner } from "react-bootstrap";
import { useQuery } from "react-query";

import { getCourses } from "../../logic/course";
import MyCard from "../../components/Card";

export default function LatestCourse() {
    const { data, isLoading } = useQuery("courses", getCourses);

    let content;
    if (isLoading) {
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
