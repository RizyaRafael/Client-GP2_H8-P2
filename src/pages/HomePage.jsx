import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate()
  const [usernameForm,setUsernameForm] = useState({
    username:''
  })

  const changeHandler = (e)=>{
    const {name,value} = e.target
    setUsernameForm({...usernameForm,[name]:value});

  }
  const submitHandler = (e)=>{
    e.preventDefault()  
    navigate('/games')
    
  }
  return (
    <div className="container-100 h-screen flex items-center justify-center bg-slate-700">

    <form className="lg:w-1/4 bg-slate-500 py-3 px-3 rounded-md md:w-2/4" onSubmit={submitHandler}>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Input Your Name
        </label>
        <input
          type="text"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 px-4 dark:focus:border-blue-500"
          placeholder="Ex. seto"
          required=""
          name="username"
          onChange={changeHandler}
        />
      </div>
      <button
      style={{width: '100%'}}
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      
      >
        Submit
      </button>
    </form>
    </div>

  );
}
