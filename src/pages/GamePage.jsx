import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import WordComponent from "../components/WordComponent";
import socket from "../socket";
import instance from "../axiosInstance";

export default function GamePage() {
  const [users, setUsers] = useState([]);
  const [jawaban, setJawaban] = useState("")
  const [jawabanUser1, setJawabanUser1] = useState("")

  const [jawabanUser2, setJawabanUser2] = useState("")
  const [clue, setClue] = useState("");
  console.log(clue, 'ini clue');
  console.log(jawaban, "ini jawaban di client");
  const [question, setQuestion] = useState("")
  // console.log(clue);
  // console.log(question);
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

  const alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'
  ]


  const clickHandler = (e) => {
    console.log(e.target.value, "click handler jalan");
    const value = jawaban + e.target.value
    setJawaban(value)
    socket.emit("pilihan:jawaban", value)
  }

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
    });

    return () => {
      socket.off("users:online");
    };
  }, []);

  useEffect(() => {
    console.log(clue, question, "ini clue tidaksama question");
    if (clue !== question || !clue ) {
      socket.emit("kirim:clue", clue)
    }
  }, [clue])

  useEffect(() => {
    socket.on("terima:clue", (terimaQuestion) => {
      console.log(terimaQuestion,"ini socket terima");
      setQuestion(terimaQuestion)
      setClue(terimaQuestion)
    })
    socket.on("terima:jawaban", (terimaJawaban) => {
      setJawaban(terimaJawaban)
    })

    return () => {
      socket.off("terima:clue")
      socket.off("terima:jawaban")
    }

  }, [])



  useEffect(() => {
      getClue()
  }, []);
  return (
    <>
      {/* container */}
      <div className="container-100 h-screen flex flex-col items-center justify-center bg-slate-700">
        {/* clue */}

        <div className="container-sm bg-slate-500 mb-5 rounded-md">
          <h1 className="mb-5 text-2xl text-white w-46 px-2 inline">
            clue: {clue.hint}
          </h1>
        </div>
        {/* end clue */}

        {/* Word Component */}
        <WordComponent clue={clue} jawaban={jawaban} />
        {/* end WOrd Component */}

        {/* form */}
        <form
          className="flex flex-wrap items-center justify-center w-screen gap-2 h-48 mb-10"
          onSubmit={handleSubmit}
        >
          {alphabet.map(char => (
            jawaban.toUpperCase().includes(char) ? null : <button
              type="button"
              value={char.toLowerCase()}
              onClick={clickHandler}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-3xl w-96 sm:w-auto px-10 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-md"
            >
              {char}
            </button>
            

          ))}

        </form>
        {/* end form */}

        <div className="guest flex justify-evenly w-screen px-5">
          {users.map((el, i) => {
            return (
              <div key={i}>
                <h1 className="text-3xl text-white">
                  {el.username}: {0}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
      {/* end container */}
    </>
  );
}
