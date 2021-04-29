import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { IVocab, getVocabs, deleteVocab } from "../../logic/vocab";

import Confirm from "../../components/Confirm";
import VocabTable from "./Table";
import VocabModal from "./Modals";
import { useQuery } from "../../common/hooks";

export default function VocabIndex() {
    const { data, error, loading, refreshData } = useQuery<IVocab>(getVocabs);
    const [selectedVocab, setSelectedVocab] = useState<IVocab>();

    const [confirm, setConfirm] = useState(false);
    const [vocabModal, setVocabModal] = useState(false);

    const handleDelete = async () => {
        try {
            if (selectedVocab) {
                const resp = await deleteVocab(selectedVocab.id);
                if (resp.status === "success") {
                    refreshData();
                    setConfirm(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
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

            <VocabModal show={vocabModal} handleClose={() => setVocabModal(false)} selectedVocab={selectedVocab} onDone={refreshData} />

            <div className="my-2">
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
                vocabs={data}
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
