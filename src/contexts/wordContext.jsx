import { createContext, useState } from 'react';
import {Alphabet} from './alphabetData'

export const WordsContext = createContext(null);

export default function WordProvider({children}){
    const[word,setWord] = useState([])
    const[updatedDisplay,setUpdateDisplay] = useState([])
    const[guestList,setGuestList] = useState([])
    const [huruf,setHuruf] = useState(Alphabet)
    const [score,setScore] = useState(0)            
    const toggleAlphabet = (e,value)=>{
        e.preventDefault()
        let display = ''         
        const kata2 = word
        if(guestList.includes(value.huruf)){
            console.log(value.huruf,'kembaran');
        }
        guestList.push(value.huruf)
        console.log(guestList,"<<<<<<,seblm for"); 
        for (let i = 0; i < kata2.length; i++) { 
            if(guestList.includes(kata2[i])) { 
                display += kata2[i] + ''
            }else { 
                display+='_'
                 
            } 
        }
        let con = display.split('')
        console.log(guestList);
        console.log(con);
        setUpdateDisplay(con)
    }
   
    function stringToArray(){
        const kata = 'JAVASCRIPT'
        let conversi = []
        for (let i = 0; i < kata.length; i++) {
            conversi.push(kata[i])
        }
        
         setWord(conversi)
         let wordDisplay = []
        for (let i = 0; i < kata.length; i++) {
            wordDisplay.push('_')
        }
        setUpdateDisplay(wordDisplay)
         
    }

    return(
        <WordsContext.Provider value={{updatedDisplay,score,stringToArray,huruf,toggleAlphabet,}}>
            {children}
        </WordsContext.Provider>
    )
}