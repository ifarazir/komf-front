import { Button, Table } from "react-bootstrap";
import { IVocab } from "../../logic/vocab";

import Card from "../../components/Card";
import SearchForm from "../../components/Ribbons/SearchForm";

export default function VocabsTable({
    vocabs,
    onVocabSelected,
    handleVocabDelete,
}: {
    vocabs: IVocab[];
    handleVocabDelete: (a: IVocab) => void;
    onVocabSelected: (a: IVocab) => void;
}) {
    return (
        <div className="mt-4">
            <Card>
                <SearchForm />
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
