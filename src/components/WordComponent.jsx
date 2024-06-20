
import { useContext } from "react"
import { WordsContext } from "../contexts/wordContext"
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import socket from "../socket";


const WordComponent = ({
  clue,
  jawabanP1,
  jawabanP2,
  currentPlayer,
  handleSwitchPlayer,
  users,
  jawaban
}) => {
  const [scorePlayer1, setScorePlayer1] = useState(0);
  const [scorePlayer2, setScorePlayer2] = useState(0);
  const [isWordComplete, setIsWordComplete] = useState(false)
  const word = clue?.word || "";
  // console.log(users[0]?.username, "index 0");

  useEffect(() => {
    let score1 = 0
    let score2 = 0
    if (word) {
      word.split("").forEach(huruf => {
        if (jawabanP1.includes(huruf)) {
          score1++
        }
        if (jawabanP2.includes(huruf)) {
          score2++
          console.log("DIA JALAN DI JAWABAN P2 BROH");
        }
      })
      setScorePlayer1(score1);
      setScorePlayer2(score2);
      console.log(word, "INI WORD YANG DITANYA");
      console.log(jawabanP1 + jawabanP2, "<<<<INI JAWABAN GABUNGAN");
      if ([...word].every((huruf) => jawaban.includes(huruf))) {
        console.log("DIA JALAN GES");
        setIsWordComplete(true)
      }
    }
  }, [jawabanP1, jawabanP2, word]);

  useEffect(() => {
    console.log("useEffect winning jalan");
  console.log(isWordComplete, "<<<< word complete");

    if (isWordComplete === true) {
    console.log("useEffect winning IF JALAN!!!!");

      if (scorePlayer1 > scorePlayer2) {
        Swal.fire({
          title: `Pemain ${users[0]?.username} Menang!`,
          text: `Skor: ${scorePlayer1}`,
          icon: "success",
        });
      } else if (scorePlayer2 > scorePlayer1) {
        Swal.fire({
          title: `Pemain ${users[1]?.username} Menang!`,
          text: `Skor: ${scorePlayer2}`,
          icon: "success",
        });

      } else if (scorePlayer2 === scorePlayer1 && scorePlayer2 !== 0 && scorePlayer1 !== 0) {
        Swal.fire({
          title: "Seri!",
          text: `Skor sama: ${scorePlayer1}`,
          icon: "info",

        });

      }
      // setIsWordComplete(false)
    }
  }, [isWordComplete])

  useEffect(() => {
    socket.emit("current:score", {
      scorePlayer1, scorePlayer2
    })
  }, [scorePlayer1, scorePlayer2])

  useEffect(() => {
    socket.on("terima:score", (score) => {
      // console.log(score, "ini score");
      if (scorePlayer1 !== score.scorePlayer1 || scorePlayer2 !== score.scorePlayer2) {
        setScorePlayer1(score.scorePlayer1)
        setScorePlayer2(score.scorePlayer2)
      }
    }, [scorePlayer1, scorePlayer2])
  })

  return (
    <div>
      <div className="flex gap-5 border-2 rounded-md py-5 px-5 justify-center">
        {word.split("").map((char, index) => (
          <div
            key={index}
            className="w-28 h-32 text-4xl font-bold rounded-md bg-slate-100 text-center"
            style={{ lineHeight: "8rem" }}
          >
            {jawaban.includes(char)
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
            <h1 className="text-3xl text-white">{el.username} {el.username === localStorage.username ? "(You)" : null}</h1>
          </div>
        ))}
      </div>
      <div className="mt-5 text-center"></div>
    </div>
  );
};

export default WordComponent;
