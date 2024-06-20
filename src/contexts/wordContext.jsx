import { createContext, useState } from 'react';
import {Alphabet} from './alphabetData'
import Swal from 'sweetalert2';
import instance from '../axiosInstance';
export const WordsContext = createContext(null);

export default function WordProvider({children}){
    const [huruf,setHuruf] = useState(Alphabet)
    const [soal, setSoal] = useState('')
    async function getSoal() {
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
    return(
        <WordsContext.Provider value={{huruf, getSoal, soal}}>
            {children}
        </WordsContext.Provider>
    )
}