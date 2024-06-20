import React, { useState, useEffect } from "react";

const WordComponent = ({
  clue,
  jawabanP1,
  jawabanP2,
  currentPlayer,
  handleSwitchPlayer,
  users,
}) => {
  const [scorePlayer1, setScorePlayer1] = useState(0);
  const [scorePlayer2, setScorePlayer2] = useState(0);
  const word = clue.word || "";
  // console.log(users[0]?.username, "index 0");

  useEffect(() => {
    let newScoreP1 = 0;
    let newScoreP2 = 0;

    word.split("").forEach((char) => {
      if (jawabanP1.includes(char)) {
        newScoreP1++;
      }
      if (jawabanP2.includes(char)) {
        newScoreP2++;
      }
    });

    setScorePlayer1(newScoreP1);
    setScorePlayer2(newScoreP2);
  }, [jawabanP1, jawabanP2, word]);

  return (
    <div>
      <div className="flex gap-5 border-2 rounded-md py-5 px-5 justify-center">
        {word.split("").map((char, index) => (
          <div
            key={index}
            className="w-28 h-32 text-4xl font-bold rounded-md bg-slate-100 text-center"
            style={{ lineHeight: "8rem" }}
          >
            {jawabanP1.includes(char) || jawabanP2.includes(char)
              ? char.toUpperCase()
              : "_"}
          </div>
        ))}
      </div>
      <div className="mt-5 text-2xl font-bold text-center">
        <div>
          Skor Pemain {users[0]?.username} : {scorePlayer1}
        </div>
        <div>
          Skor Pemain {users[1]?.username}: {scorePlayer2}
        </div>
        <div>Pemain Saat Ini: {currentPlayer}</div>
      </div>

      {/* {users[0].username} */}

      <div className="guest flex justify-evenly w-screen px-5">
        {users.map((el, i) => (
          <div key={i}>
            <h1 className="text-3xl text-white">{el.username}</h1>
            {console.log(el, "<></>")}
          </div>
        ))}
      </div>
      <div className="mt-5 text-center"></div>
    </div>
  );
};

export default WordComponent;
