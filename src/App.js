import React, { useState } from "react";
import { UserInput, Hangman } from "./Hangman";

function App() {
  const [data, setData] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const handleClick = (userinput, isError) => {
    if (isError === ""){
      setData(userinput)
      setIsSubmit(true)
      console.log(isSubmit + ' error: ' + isError)
    }
  };

  return (
    <div>
      {isSubmit
        ? <Hangman data={data} />
        : <UserInput handleClick={handleClick} />}
    </div>
  );
}
export default App;
