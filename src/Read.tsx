import React from "react";
import { useNavigate } from "react-router-dom";
 

function Read() {
  const navigate = useNavigate();

  const handleLanguageChange = (e: { target: { value: any; }; }) => {
    const selectedLanguage = e.target.value;
    navigate("/read-along/whisper", { state: { language: selectedLanguage } });
  };

  return (
    <div className="flex flex-col h-screen mx-auto items justify-end text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900">
      <div className="h-full overflow-auto scrollbar-thin flex justify-center items-center flex-col relative">
        <h1 className="text-4xl font-bold mb-1">Whisper OpenAI</h1>
        <h2 className="font-semibold">Choose your Language to Read Along</h2>
         <select
    onChange={handleLanguageChange}
    className="py-2 px-4 text-lg flex flex-col justify-center items-center rounded bg-white shadow-xl shadow-black/5 ring-1 ring-slate-700/10 text-black"
>
    <option value="Hindi">Hindi</option>
    <option value="English">English</option>
</select>

      </div>
    </div>
  );
}

export default Read;
