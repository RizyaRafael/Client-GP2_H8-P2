import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

import WordComponent from "../components/WordComponent";
import socket from "../socket";
import instance from "../axiosInstance";
import WordProvider from "../contexts/wordContext";
import { WordsContext } from '../contexts/wordContext';

export default function GamePage() {
  const [users, setUsers] = useState([]);
  const [jawaban, setJawaban] = useState("")
  const [clue, setClue] = useState("");
  const {huruf} = useContext(WordsContext)

  
  const [jawabanP1, setJawabanP1] = useState("");
  // console.log(jawabanP1, "ini jawaban player 1");
  const [jawabanP2, setJawabanP2] = useState("");
  // console.log(jawabanP2, "ini jawaban player 2");

  const [currentPlayer, setCurrentPlayer] = useState("");
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

  const alphabet = huruf


  const clickHandler = (e) => {
    const value = jawaban + e.target.value
    setJawaban(value)

    console.log(users[0]?.username, "INI USERNAME");
    
    if (currentPlayer === users[0]?.username) {
      console.log("MASUK IF 1");
      let pilihan = jawabanP1 + e.target.value
      console.log(pilihan, "INI pilihan player 1");
      setJawabanP1(pilihan);
    } else {
 
      console.log("MASUK IF 2");

      let pilihan = jawabanP2 + e.target.value
      console.log(pilihan, "INI pilihan player 2");

      setJawabanP2(pilihan);
    }
    if (!disabledLetters.includes(value)) {
      
  
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
  }


  const handleSwitchPlayer = () => {
    console.log(users);
    users.map(e => {
      if (e.username !== currentPlayer) {
        console.log(e);
        setCurrentPlayer(e.username);
        socket.emit("change:player", e.username)
      }
    })
  };
  // console.log(currentPlayer, "ini pemain sekarang");
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
      if (newUsers.length > 0 && !currentPlayer) {
        setCurrentPlayer(newUsers[0].username);
      }
    });
    return () => {
      socket.off("users:online");
    };
  }, []);

  useEffect(() => {
    if (clue !== question || !clue) {
      socket.emit("kirim:clue", clue)
    }
  }, [clue])

  useEffect(() => {
    socket.on("terima:clue", (terimaQuestion) => {
      setQuestion(terimaQuestion)
      setClue(terimaQuestion)
    })
    socket.on("terima:username", (username) => {
      setCurrentPlayer(username)
    })

    return () => {
      socket.off("terima:clue")
      socket.off("terima:username")
    }


  }, [])

  useEffect(() => {
    socket.on("terima:jawaban", (terimaJawaban, terimajawabanP1, terimajawabanP2 ) => {
      if (jawaban !== terimaJawaban) {
        setJawaban(terimaJawaban)
      }
      if (jawabanP1 !== terimajawabanP1 && terimajawabanP1) {
        setJawabanP1(terimajawabanP1)
      }
      if (jawabanP2 !== terimajawabanP2 && terimajawabanP2) {
        setJawabanP2(terimajawabanP2)
      }
    })
    return () => {
      socket.off("terima:jawaban")
    }
  }, [jawaban])

  useEffect(() => {
    socket.emit("pilihan:jawaban", jawaban, jawabanP1, jawabanP2)
  }, [jawaban, jawabanP1, jawabanP2])

  useEffect(() => {
    getClue()
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
          jawaban={jawaban}
          users={users}
        />

        <form


          className="flex flex-wrap items-center justify-center w-screen gap-2 h-48 mb-10"
          onSubmit={handleSubmit}
        >
          {alphabet.map(char => (
            jawaban.toUpperCase().includes(char) ? null : <button
              type="button"
              value={char.toLowerCase()}
              onClick={clickHandler}
              disabled={localStorage.username === currentPlayer ? false : true}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-3xl w-96 sm:w-auto px-10 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-md"
            >
              {char} 
            </button>

          ))}

        </form>
      </div>
    </>
  )
}
