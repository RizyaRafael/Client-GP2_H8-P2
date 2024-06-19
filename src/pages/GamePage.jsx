import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");


export default function GamePage() {
  const [guess, setGuess] = useState('');
  // const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (guess.toLowerCase() === 'denis') {
      Swal.fire("Selamat jawaban anda benar !");
    } else {
      Swal.fire("Ya salah :)")
    }
  };

  useEffect(() => {
    socket.on("message", (inimessage) => {
      console.log({ inimessage });
    })
    return () => {
      socket.off('message')
    }
  }, [])

  return (
    <div className="container-100 h-screen flex flex-col items-center justify-center bg-slate-700">
      <h1 className="text-4xl text-white mb-8">Tebak Kata</h1>
      <p className="text-xl text-white mb-5">Kata yang harus ditebak memiliki 5 huruf, namanya kayak alat kelamin depan diganti d</p>

      <form
        className="lg:w-1/4 bg-slate-500 py-5 px-5 rounded-md md:w-2/4"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 px-4 dark:focus:border-blue-500"
            placeholder="Masukkan tebakan"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
        </div>
        <button
          style={{ width: '100%' }}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>

    </div>
  );
}
