import { useState, useEffect, useRef, useCallback } from "react";
import { formatAudioTimestamp } from "../utils/AudioUtils";
import { webmFixDuration } from "../utils/BlobFix";

function getMimeType() {
    const types = [
        "audio/webm",
        "audio/mp4",
        "audio/ogg",
        "audio/wav",
        "audio/aac",
    ];
    for (let type of types) {
        if (MediaRecorder.isTypeSupported(type)) {
            return type;
        }
    }
    return undefined;
}

export default function AudioRecorder(props: { onTranscriptionComplete: (transcription: string) => void; }) {
    const [recording, setRecording] = useState(false);
    const [duration, setDuration] = useState(0);

    const streamRef = useRef<MediaStream | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const startRecording = useCallback(async () => {
        try {
            if (!streamRef.current) {
                streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
            }

            const mimeType = getMimeType();
            if (!mimeType) throw new Error("No supported audio MIME type found");

            const mediaRecorder = new MediaRecorder(streamRef.current, { mimeType });
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.addEventListener("dataavailable", (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            });

            mediaRecorder.start();
            setRecording(true);
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    }, []);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
            setRecording(false);
        }
    }, []);

    const sendForTranscription = async (blob: Blob) => {
        const formData = new FormData();
        formData.append('file', blob, 'audio.webm');

        try {
            const response = await fetch('/transcribe', {
                method: 'POST',
                body: formData,
            });
            const transcription = await response.json();
            props.onTranscriptionComplete(transcription);
        } catch (error) {
            console.error("Transcription error:", error);
        }
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (recording) {
            timer = setInterval(async () => {
                if (chunksRef.current.length > 0) {
                    const blob = new Blob(chunksRef.current, { type: mediaRecorderRef.current?.mimeType });
                    chunksRef.current = [];
                    await sendForTranscription(blob);
                }
                setDuration((prev) => prev + 1);
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [recording]);

    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    const handleToggleRecording = () => {
        if (recording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    return (
        <div className='flex flex-col justify-center items-center'>
            <button
                type='button'
                className={`m-2 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 transition-all duration-200 ${
                    recording ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                }`}
                onClick={handleToggleRecording}
            >
                {recording ? `Stop Recording (${formatAudioTimestamp(duration)})` : "Start Recording"}
            </button>

            {recording && (
                <audio className='w-full' ref={audioRef} controls autoPlay>
                    <source src={URL.createObjectURL(new Blob(chunksRef.current, { type: 'audio/webm' }))} type='audio/webm' />
                </audio>
            )}
        </div>
    );
}
