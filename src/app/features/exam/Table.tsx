import { Button, Table } from "react-bootstrap";

import SearchForm from "../../components/Ribbons/SearchForm";
import Card from "../../components/Card";

export default function LessonTable() {
    return (
        <div className="mt-4">
            <Card>
                <SearchForm />
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>title</td>
                        </tr>
                    </tbody>
                </Table>
            </Card>
        </div>
    );
}
