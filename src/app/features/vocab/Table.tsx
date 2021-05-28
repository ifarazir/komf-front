import { Button, Form, Table } from "react-bootstrap";
import { IVocab } from "../../logic/vocab";

import Card from "../../components/Card";

export default function VocabsTable({
    vocabs,
    onVocabSelected,
    handleVocabDelete,
    handleAddNewVocab,
}: {
    vocabs: IVocab[];
    onVocabSelected: (a: IVocab) => void;
    handleVocabDelete: (a: IVocab) => void;
    handleAddNewVocab: () => void;
}) {
    return (
        <div className="mt-4">
            <Card>
                <Form inline>
                    <Form.Control className="mb-2 mr-sm-2" name="search" placeholder="Search for..." />
                    <Button className="mb-2">Search</Button>
                    <Button className="mb-2 ml-auto" onClick={handleAddNewVocab}>
                        +
                    </Button>
                </Form>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Word</th>
                            <th>Synonym</th>
                            <th>Definition</th>
                            <th>Example 1</th>
                            <th>Example 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vocabs.map((c) => (
                            <tr key={c.id}>
                                <td>{c.word}</td>
                                <td>{c.syn}</td>
                                <td>{c.def}</td>
                                <td>{c?.ex1}</td>
                                <td>{c?.ex2}</td>
                                <td>
                                    <Button variant="outline-warning" onClick={() => onVocabSelected(c)}>
                                        <i className="bi bi-pencil" />
                                    </Button>
                                </td>
                                <td>
                                    <Button variant="outline-danger" onClick={() => handleVocabDelete(c)}>
                                        <i className="bi bi-trash" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </div>
    );
}
