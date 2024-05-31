import { useRef, useEffect, useState } from "react";
import { TranscriberData } from "../hooks/useTranscriber";

interface Props {
    transcribedData: TranscriberData | undefined;
}

export default function Transcript({ transcribedData }: Props) {
    const [transcript, setTranscript] = useState<string>("");
    const [comparisonResult, setComparisonResult] = useState<string>("");
    const [verificationText, setVerificationText] = useState<string>("");
    const divRef = useRef<HTMLDivElement>(null);

    const saveBlob = (blob: Blob, filename: string) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    };

    const exportTXT = () => {
        const blob = new Blob([transcript], { type: "text/plain" });
        saveBlob(blob, "transcript.txt");
    };

    const exportJSON = () => {
        let jsonData = JSON.stringify(transcribedData?.chunks ?? [], null, 2);
        const regex = /(    "timestamp": )\[\s+(\S+)\s+(\S+)\s+\]/gm;
        jsonData = jsonData.replace(regex, "$1[$2 $3]");
        const blob = new Blob([jsonData], { type: "application/json" });
        saveBlob(blob, "transcript.json");
    };

    const handleVerificationTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setVerificationText(event.target.value);
    };

    useEffect(() => {
        if (transcribedData) {
            const chunks = transcribedData.chunks.map((chunk) => chunk.text);
            const updatedTranscript = chunks.join(" ").trim();
            setTranscript(updatedTranscript);

            // Scroll to bottom to show the latest transcript
            if (divRef.current) {
                divRef.current.scrollTop = divRef.current.scrollHeight;
            }

            // Compare transcribed text with verification text (ignoring case)
            const verificationWords = verificationText.toLowerCase().split(/\s+/);
            const transcribedWords = updatedTranscript.toLowerCase().split(/\s+/);

            let resultHTML = "";

            verificationWords.forEach((word, index) => {
                if (transcribedWords[index] === word) {
                    resultHTML += `<span style="color: green">${word} </span>`;
                } else {
                    resultHTML += `<span style="color: red">${word} </span>`;
                }
            });

            setComparisonResult(resultHTML);
        }
    }, [transcribedData, verificationText]);

    return (
        <div className="w-full flex flex-col my-2 p-4 max-h-[20rem] overflow-hidden shadow-md">
            {transcribedData && (
                <div className="bg-white rounded-lg">
                    <p ref={divRef} className="text-black p-4">
                        {transcript}
                    </p>
                </div>
            )}
            {transcribedData && !transcribedData.isBusy && (
                <div className="w-full text-right">
                    <button
                        onClick={exportTXT}
                        className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 inline-flex items-center"
                    >
                        Export TXT
                    </button>
                    <button
                        onClick={exportJSON}
                        className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 inline-flex items-center"
                    >
                        Export JSON
                    </button>
                </div>
            )}
            <div className="bg-white text-black rounded-lg mt-4 p-4">
                <h1 className="font-bold">Text Area</h1>
                <textarea
                    value={verificationText}
                    onChange={handleVerificationTextChange}
                    className="w-full h-24 border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Enter text for verification..."
                />
                <h2 className="text-xl text-black font-bold mb-2">Comparison Result</h2>
                <div dangerouslySetInnerHTML={{ __html: comparisonResult }} />
            </div>
        </div>
    );
}
