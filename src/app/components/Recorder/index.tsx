import { useState } from "react";
import { useVoiceRecorder } from "use-voice-recorder";

function Recorder() {
    // const [file, setFile] = useState<string>();
    // const { isRecording, stop, start } = useVoiceRecorder((blob) => {
    //     // setFile(URL.createObjectURL(blob));
    //     console.log(blob);
    // });

    return (
        <div>
            {/* {file && (
                <audio controls>
                    <source src={file} />
                    Your browser does not support the audio element.
                </audio>
            )} */}
            {/* ؟  <div>On air: {isRecording ? "on" : "off"}</div>
            <button onClick={start}>Start</button>
            <button onClick={stop}>Stop</button> */}
        </div>
    );
}

export default Recorder;
