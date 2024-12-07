import React, { useState } from "react";
import "./App.css"
const App = () => {
  const [text, setText] = useState("");
  const [prompt,setPrompt]=useState("");
  const [size,setSize]=useState(300);
  const [summary, setSummary] = useState("");
  const [loading,setLoading]=useState(false)
  const submit = async (e) => {
    setSummary("");
    e.preventDefault();
    setLoading(true)
    const response = await fetch(`${import.meta.env.VITE_SERVER}/textSummarizer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text,prompt,size }),
    });
    const res = await response.json();
    if(res){
      setLoading(false);
      setSummary(res);
     
    }
    
  };
  return (
    <div className="p-4">
      <h1 className="font-extrabold text-center text-5xl text-lime-600 ">
        Text Summarizer
      </h1>

      <div className="border-2 bg-lime-600 h-[90vh] m-4 rounded-lg w-[60vw] mx-auto shadow-neutral-900 shadow-md">
        <div className="bg-neutral-100 p-2 h-20  m-4 rounded-lg flex flex-row justify-between items-center shadow-neutral-600 shadow-md">
          <div className="h-full flex flex-col w-1/2 ">

         
          <label className="font-bold">Text</label>
          <input
            type="text"
            className="border-2 rounded-lg h-full px-2 shadow-neutral-600 shadow-md"
            placeholder="Enter your text here"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></input> 
          </div>
           <div className="h-full flex flex-col w-1/2 mx-2">

         
           <label className="font-bold">Prompt</label>
           <input
            type="text"
            className=" border-2 rounded-lg h-full px-2 shadow-neutral-600 shadow-md"
            placeholder="What you wnat from text"
            name="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></input> </div>
 <div className="h-full flex flex-col w-1/2 ">

         
<label className="font-bold">Number of words</label>
<input
  type="number"
  className="border-2 rounded-lg h-full px-2 shadow-neutral-600 shadow-md"
  placeholder="Enter number of words"
  name="size"
  value={size}
  onChange={(e) => setSize(e.target.value)}
></input> 
</div>
          <button onClick={submit} className="mx-2 shadow-neutral-900 shadow-md bg-lime-600 hover:scale-105 font-bold duration-700 py-1 w-20 rounded-lg">
            Submit
          </button>
        </div>

        <div className="h-5/6 m-4 rounded-lg bg-neutral-100 text-justify p-4 overflow-y-scroll flex items-center justify-center shadow-neutral-900 shadow-md">
      {
        loading &&<div class="three-body">
  
        <div class="three-body__dot"></div>
        <div class="three-body__dot"></div>
        <div class="three-body__dot"></div>
        </div>
      }

          {summary}
        </div>
      </div>
    </div>
  );
};

export default App;
