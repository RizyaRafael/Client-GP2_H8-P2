import { createContext, useState } from 'react';


export const WordsContext = createContext(null);

export default function WordProvider({children}){
    const[word,setWord] = useState('light')
    const [huruf,setHuruf] = useState(["A","B","C","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"])
    const toggleAlphabet = (value)=>{
        
    }
    const fetchHandler = ()=>{
        
    }

    return(
        <WordsContext.Provider value={{huruf,word,fetchHandler,toggleAlphabet,}}>
            {children}
        </WordsContext.Provider>
    )
}