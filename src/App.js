
//CSS
import './App.css';
//React
import {  useCallback, useEffect, useState } from 'react';

//data
import { wordsList } from './data/words'

//Componentes
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver'

const stages =  [ {id: 1, name: "start"},
                  {id: 2, name: "game"},
                  {id: 3, name: "end"} 
                ]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)
  
  const guessesAmount = 3
  const [pickedWord, setPicketWord] = useState("")
  const [pickedCategory, setPicketCategory] = useState("")
  const [letters, setLetters] = useState([])
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesAmount)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = () => {
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    
    const word = words[category][Math.floor(Math.random() * Object.keys(words[category]).length)]
    console.log(word)
    return {word, category}
  }

  const startGame = () => {
    const {word, category} = pickWordAndCategory()
    let wordLetters = word.toLowerCase().split("")

    setPicketCategory(category)
    setPicketWord(word)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }

  const verifyLetter = (letter) => {
    console.log(letter)
    const normalizedLetter = letter.toLowerCase()

    if (guessedLetters.includes(normalizedLetter)
        || wrongLetters.includes(normalizedLetter))
        {
          return;
        }

    if (letters.includes(normalizedLetter))
    {
       setGuessedLetters((guessedLetters) => 
                        [...guessedLetters, normalizedLetter]) 
    }else {
      setWrongLetters((wrongLetters) => 
                      [...wrongLetters, normalizedLetter]) 
      setGuesses(guesses-1)
    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(() => {
    if (guesses <= 0)
    {
      clearLetterStates()
      setGameStage(stages[2].name)
    }
  }, [guesses])

  const retry = () => {
    setScore(0)
    setGuesses(guessesAmount)
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame}/>}
      {gameStage === "game" && <Game verifyLetter={verifyLetter}
                                     pickedWord={pickedWord}
                                     pickedCategory={pickedCategory}
                                     letters={letters}
                                     guessedLetters={guessedLetters}
                                     wrongLetters={wrongLetters}
                                     guesses={guesses}
                                     score={score}/>}
      {gameStage === "end" && <GameOver retry={retry}/>}
    </div>
  );
}

export default App;
