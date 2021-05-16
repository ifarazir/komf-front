import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useQuery } from "react-query";

import Confirm from "../../components/Confirm";
import VocabTable from "./Table";
import VocabModal from "./Modals";
import { IVocab, getVocabs, deleteVocab } from "../../logic/vocab";

export default function VocabIndex() {
    const { data, isLoading, refetch } = useQuery("vocabs", getVocabs);
    const [selectedVocab, setSelectedVocab] = useState<IVocab>();

    const [confirm, setConfirm] = useState(false);
    const [vocabModal, setVocabModal] = useState(false);

    const handleDelete = async () => {
        try {
            if (selectedVocab) {
                const resp = await deleteVocab(selectedVocab.id);
                if (resp.status === "success") {
                    refetch();
                    setConfirm(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) {
        return <Spinner animation="border" />;
    }

    return (
        <div>
            <Confirm
                show={confirm}
                onClose={() => setConfirm(false)}
                onConfirm={handleDelete}
                text={`You are going to delete vocab ${selectedVocab?.word} forever`}
            />

            <VocabModal show={vocabModal} handleClose={() => setVocabModal(false)} selectedVocab={selectedVocab} onDone={refetch} />

            <div className="my-2 d-flex justify-content-between align-items-center">
                <div>
                    <h6>Vocab</h6>
                    <span className="text-muted">Vocab managment panel</span>
                </div>
                <Button
                    onClick={() => {
                        setVocabModal(true);
                        setSelectedVocab(undefined);
                    }}
                >
                    Create
                </Button>
            </div>
            <VocabTable
                vocabs={data.data}
                handleVocabDelete={(d) => {
                    setSelectedVocab(d);
                    setConfirm(true);
                }}
                onVocabSelected={(d) => {
                    setSelectedVocab(d);
                    setVocabModal(true);
                }}
            />
        </div>
    );
}
