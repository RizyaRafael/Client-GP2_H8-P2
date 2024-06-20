import React from "react";

const WordComponent = ({ clue }) => {
  const word = clue.word || "";
  return (
    <div className="flex gap-5 border-2 rounded-md py-5 px-5 justify-center">
      {word.split("").map((char, index) => (
        <div
          key={index}
          className="w-28 h-32 text-4xl font-bold rounded-md bg-slate-100 text-center"
          style={{ lineHeight: "8rem" }}
        >
          {"_"}
        </div>
      ))}
    </div>
  );
};

export default WordComponent;
