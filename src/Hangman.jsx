import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

export function Hangman(props) {
  let word = props.data.toUpperCase();
  console.log("word: " + word);
  const alphabets = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [counter, setCounter] = useState(0);
  const [won, setWon] = useState(false);

  const increase = (index) => {
    if (!word.includes(alphabets[index])) {
      setCounter((count) => count + 1);
    }
  };
  const disableAll = (wonOrLost) => {
    alphabets.map((alphabet, index) => {
      disableButton(index);
    });
    if (wonOrLost === "lost") {
      return (
        <p>
          You lost! <br></br>The word was: <b>{word}</b>
        </p>
      );
    }
    return <p>You won!</p>;
  };

  const disableButton = (index) => {
    const button = document.getElementById("button" + index);
    button.disabled = true;
    button.style.transform = "none";
    button.style.backgroundColor = "rgb(191, 210, 255 ,0.6)";
    button.style.transform = 0;
  };

  const maskedWord = word
    .split("")
    .map((letter) => (correctGuesses.includes(letter) ? letter : "_"))
    .join(" ");
  return (
    <div>
      <h1>Hang Man</h1>
      <p style={{ fontSize: 25 }}>{maskedWord}</p>
      {alphabets.map((alphabet, index) => (
        <button
          key={index}
          id={"button" + index}
          onClick={() => {
            if (correctGuesses.length === word.length) {
              setWon(true);
            }
            if (word.includes(alphabet)) {
              setCorrectGuesses([...correctGuesses, alphabet]);
            } else {
              increase();
            }
            if (won) {
              console.log("you won!");
            }
            disableButton(index);
          }}
        >
          {alphabet}
        </button>
      ))}
      {counter > 5
        ? disableAll("lost")
        : !maskedWord.includes("_") && disableAll("won")}
      <p className="counter__output">mistakes: {counter}/6</p>
      <button id="playAgain" onClick={refreshPage}>
        Play Again
      </button>
    </div>
  );
}

export function refreshPage() {
  window.location.reload(false);
}

export function UserInput({ handleClick }) {
  const [state, setState] = useState("");

  const handleChange = (event) => {
    const re = /^[A-Za-z]+$/;
    if (re.test(event.target.value)) {
      setState(event.target.value.toUpperCase());
    }
    if (event.key === "Backspace") {
      setState("");
    }
    if (state.length < minLength) {
      setError(`Input must be at least ${minLength} characters long.`);
    } else {
      setError("");
    }
  };

  const minLength = 3;
  const [error, setError] = useState();
  const handleBlur = () => {
    if (state.length < minLength) {
      setError(`Input must be at least ${minLength} characters long.`);
    } else {
      setError("");
    }
  };

  window.addEventListener("keydown", function (e) {
    if (e.key === "Backspace") {
      setState("");
    }
  });

  return (
    <div>
      <h1>User Input</h1>
      <p>Enter a word for the hangman game</p>
      <form>
        <label>
          <div class="container">
            <div class="webflow-style-input">
              <input
                id={"userinput"}
                name="userInput"
                type="text"
                maxLength={25}
                value={state}
                placeholder={"Enter the word"}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
              <button
                type="submit"
                onClick={(event) => handleClick(state, error)}
                id={"isSubmitBtn"}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </label>
        {error && <p id="error">{error}</p>}
      </form>
    </div>
  );
}
