 
import React from "react";

interface Props {
    comparisonResult: string;
}

const ComparisonResult: React.FC<Props> = ({ comparisonResult }) => {
    return (
        <div className="bg-white text-black rounded-lg mt-4 p-4">
            <h2 className="text-xl text-black font-bold mb-2">Comparison Result</h2>
            <div className="result-area" style={{ maxHeight: "200px", overflowY: "auto", minHeight: "100px" }} dangerouslySetInnerHTML={{ __html: comparisonResult }} />
        </div>
    );
};

export default ComparisonResult;
