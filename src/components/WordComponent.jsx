import React from "react";

const WordComponent = ({ clue, jawaban }) => {
  const word = clue.word || "";
  jawaban = jawaban.split("")
  console.log(jawaban, "ini di wordComp");
  return (
    <div className="flex gap-5 border-2 rounded-md py-5 px-5 justify-center">
      {word.split("").map((char, index) => (
        <div
          key={index}
          className="w-28 h-32 text-4xl font-bold rounded-md bg-slate-100 text-center"
          style={{ lineHeight: "8rem" }}
        >
          {jawaban.includes(char) ? char.toUpperCase() : "_"}
          
        </div>
      ))}
    </div>
  );
};

export default WordComponent;
