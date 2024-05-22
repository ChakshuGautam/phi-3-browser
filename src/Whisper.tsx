import { AudioManager } from "./components/AudioManager";
import Transcript from "./components/Transcript";
import { useTranscriber } from "./hooks/useTranscriber";

function Whisper() {
    const transcriber = useTranscriber();

    return (
        <div className='flex flex-col h-screen mx-auto items justify-end text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900'>
            <div className='h-full overflow-auto scrollbar-thin flex justify-center items-center flex-col relative'>
                <h1 className='text-4xl font-bold mb-1'>
                    Whisper OpenAI
                </h1>
                <h2 className="font-semibold">
                    ML-powered speech recognition directly in your browser
                </h2>
                <AudioManager transcriber={transcriber} />
                <Transcript transcribedData={transcriber.output} />
            </div>
        </div>
    );
}

export default Whisper;
