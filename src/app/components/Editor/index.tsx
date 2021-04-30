import { Editor } from "@tinymce/tinymce-react";

export default function TinyEditor() {
    const handleEditorChange = (e: any) => {
        console.log("Content was updated:", e.target.getContent());
    };

    return (
        <Editor
            apiKey="2qg5sl58q16in9tr36a90vjugtsajkt4gmb40nvvewo64q7j"
            initialValue="<p>Initial content</p>"
            init={{
                height: 500,
                menubar: false,
                plugins: [
                    "advlist autolink lists link image",
                    "charmap print preview anchor help",
                    "searchreplace visualblocks code",
                    "insertdatetime media table paste wordcount",
                ],
                toolbar:
                    "undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help",
            }}
            onChange={handleEditorChange}
        />
    );
}
