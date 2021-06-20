import TinyEditor from "../../components/Editor";

export default function Writing({ onChange }: { onChange: (value: string) => void }) {
    return <TinyEditor handleChange={onChange} />;
}
