
import React, { useContext, useEffect} from 'react';
import Swal from 'sweetalert2'
// import { io } from "socket.io-client";
// const socket = io("http://localhost:3000");


// import React, { useState } from "react";
import WordComponent from "../components/WordComponent";
import { WordsContext } from '../contexts/wordContext';

export default function GamePage() {
  const {huruf,toggleAlphabet,stringToArray,score} = useContext(WordsContext)
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  // };
 

  useEffect(() => {
    // socket.on("message", (inimessage) => {
    //   console.log({ inimessage });
    // })
    // return () => {
    //   socket.off('message')
    // }
    stringToArray()
  }, [])

  return (

    <>
      {/* container */}
      <div className="container-100 h-screen flex flex-col items-center justify-center bg-slate-700">
        {/* clue */}

        <div className="container-sm bg-slate-500 mb-5 rounded-md">
          <h1
            className="mb-5 text-2xl text-white w-46 px-2 inline"
          >
            clue: lorem ipsum color amet dic asoks laqk looan
          </h1>
        </div>
        {/* end clue */}

        {/* Word Component */}
        <WordComponent/>
        {/* end WOrd Component */}

        {/* form */}
        <form
          className="flex items-center justify-center w-screen gap-2 h-48 mb-10"
          // onSubmit={handleSubmit}
        >
          {huruf.map((el,id)=>
          <button
            
            key={id}
            onClick={(e)=>{toggleAlphabet(e,el)}}
            type="submit" 
          
            className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-3xl w-96 sm:w-auto px-10 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-md"
          >
            {el.huruf}
          </button>


          )}
        </form>
          
        {/* end form */}

        <div className="guest flex justify-evenly w-screen px-5">
          <div>

            <h1 className="text-3xl text-white">Guest: {score}</h1>
          </div>
          <div>

          <h1 className="text-3xl text-white">Guest: {0}</h1>

          </div>

        </div>
      </div>
      {/* end container */}
    </>
  );
}
