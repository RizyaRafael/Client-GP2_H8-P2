import { useContext } from "react"
import { WordsContext } from "../contexts/wordContext"

const WordComponent = () => {
  const{updatedDisplay} = useContext(WordsContext)
    return (
        <div className="flex gap-5 border-2 rounded-md py-5 px-5 justify-center">
          {
          updatedDisplay.map(el=>
          <div
            className="w-28 h-32 text-4xl font-bold rounded-md bg-slate-100 text-center"
            style={{ lineHeight: "8rem" }}
          >
            {el}
          </div> 
          )}
        </div>
    )
}

export default WordComponent