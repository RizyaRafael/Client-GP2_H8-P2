import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import WordComponent from "../components/WordComponent";
import socket from "../socket";
import instance from "../axiosInstance";

export default function GamePage() {
  const [users, setUsers] = useState([]);
  const [jawabanP1, setJawabanP1] = useState("");
  const [jawabanP2, setJawabanP2] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(users[0]?.username);
  const [clue, setClue] = useState({
    word: "kucing",
    hint: "oyen",
  });
  const [question, setQuestion] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]); // State untuk huruf yang telah ditekan

  // State untuk username pemain
  const [usernameP1, setUsernameP1] = useState("Player 1");
  const [usernameP2, setUsernameP2] = useState("Player 2");

  async function getClue() {
    try {
      const { data } = await instance.get("/word");
      setClue(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  }

  const clickHandler = (e) => {
    const value = e.target.value;
    if (!disabledLetters.includes(value)) {
      if (currentPlayer === users[0]?.username) {
        setJawabanP1((prev) => prev + value);
      } else {
        setJawabanP2((prev) => prev + value);
      }
      setDisabledLetters((prev) => [...prev, value]); // Tambahkan huruf ke daftar yang dinonaktifkan

      // Check if current player's guess is incorrect
      const currentAnswer =
        currentPlayer === users[0]?.username ? jawabanP1 : jawabanP2;
      const wordSet = new Set(clue.word);
      const currentAnswerSet = new Set(currentAnswer);

      // If the guess is incorrect, switch player
      if (!wordSet.has(currentAnswerSet)) {
        handleSwitchPlayer();
      }
    }
  };

  const handleSwitchPlayer = () => {
    setCurrentPlayer((prevPlayer) =>
      prevPlayer === users[0]?.username
        ? users[1]?.username
        : users[0]?.username
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    socket.auth = {
      username: localStorage.username,
    };

    socket.disconnect().connect();
  }, []);

  useEffect(() => {
    socket.on("users:online", (newUsers) => {
      setUsers(newUsers);
      if (newUsers.length > 0) setUsernameP1(newUsers[0].username);
      if (newUsers.length > 1) setUsernameP2(newUsers[1].username);
    });

    return () => {
      socket.off("users:online");
    };
  }, []);

  useEffect(() => {
    if (clue !== question || !clue) {
      socket.emit("kirim:clue", clue);
    }
  }, [clue]);

  useEffect(() => {
    socket.on("terima:clue", (terimaQuestion) => {
      setQuestion(terimaQuestion);
      setClue(terimaQuestion);
    });
  }, []);

  useEffect(() => {
    getClue();
  }, []);

  return (
    <>
      <div className="container-100 h-screen flex flex-col items-center justify-center bg-slate-700">
        <div className="container-sm bg-slate-500 mb-5 rounded-md">
          <h1 className="mb-5 text-2xl text-white w-46 px-2 inline">
            clue: {clue.hint}
          </h1>
        </div>

        <WordComponent
          clue={clue}
          jawabanP1={jawabanP1}
          jawabanP2={jawabanP2}
          currentPlayer={currentPlayer}
          handleSwitchPlayer={handleSwitchPlayer}
          users={users}
        />

        <form
          className="flex items-center justify-center w-screen gap-2 h-48 mb-10"
          onSubmit={handleSubmit}
        >
          {["k", "u", "x", "g"].map((char) => (
            <button
              type="button"
              key={char}
              value={char}
              onClick={clickHandler}
              disabled={disabledLetters.includes(char)} // Menonaktifkan tombol jika sudah ditekan
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-3xl w-96 sm:w-auto px-10 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-md"
            >
              {char.toUpperCase()}
            </button>
          ))}
        </form>
      </div>
    </>
  );
}
