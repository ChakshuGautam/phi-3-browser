 
import React from "react";

interface Props {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<Props> = ({ value, onChange }) => {
    return (
        <div className="bg-white text-black rounded-lg mt-4 p-4">
            <h1 className="font-bold">Text Area</h1>
            <textarea
                value={value}
                onChange={onChange}
                className="w-full h-24 border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter text for verification..."
            />
        </div>
    );
};

export default TextArea;
