import './App.css';
import {useEffect, useState} from 'react'
function App() {
  const [orig, setOrig] = useState("")
  const [redact, setRedact] = useState("")
  const [guess, setGuess] = useState("")
  const [guessCt, setGCt] = useState(0)
  const [qa, setQA] = useState({q: "What is foo(3, 4)?", a: "5"})
  const [aGuess, setAG] = useState("")
  const blurCode = (str) => {
    let lines = str.split('\n')
    let r = ""
    lines.forEach((line, ind) => {
      if(ind == 0) {r += line + '\n'} else {
      let nLine = ""
      let words = line.split(' ')
      words.forEach((word, ind) => {
        if(["{", "}", ")", "("].indexOf(word) == -1) {
          for(let i = 0; i < word.length; i++){nLine += "\u25A0"}
          if(ind < words.length - 1){nLine += " "}
        } else {
          nLine += word
        }
      })
      r += nLine + "\n"
    }
    })
    setRedact(r)
  }
  const guessOutput = () => {
    if(aGuess == qa.a) {
      //Correct
      setRedact(orig)
    } else {
      setGCt(guessCt + 5)
      setAG("")
    }
  }
  
  const guessWord = () => {
    console.log(guess)
    let lines = orig.split('\n')
    let rLines = redact.split('\n')
    let r = ""
    for(let l = 0; l < lines.length; l++) {
      let words = lines[l].split(" ")
      let rWords = rLines[l].split(" ")

      let nLine = ""
      for(let wInd = 0; wInd < words.length; wInd++) {
        if(guess == words[wInd]) {
          rWords[wInd] = words[wInd]
        }
        nLine += rWords[wInd] + " "

      }
      console.log(words)
      console.log(rWords)
      console.log("_____")

      r += nLine + '\n'
    }
    setRedact(r)
    setGuess("")
    setGCt(guessCt + 1)
    console.log(r)
  }
  useEffect(() => {
    const url = "https://gist.githubusercontent.com/LiorB-D/0ac6b96cec3fdecc0bebd1fa51dbd1db/raw/e7830e299a2ac05c8b105f9add926b8470b100a2/problemOne"
    fetch(url).then((response) => response.text()).then((response) => {
      setOrig(response)

      blurCode(response)
    })
  }, [])

  return (
    <div className="App">
      <h1>Algo-Wordle {'\u25A0'}</h1>
      <pre>{redact}</pre>
      <input type="text" placeholder="Guess" onChange={e => setGuess(e.target.value)} value = {guess}></input>
      <button onClick={guessWord}>Guess Word</button>
      <p>Guesses: {guessCt}</p>
      <p>{qa.q}</p>
      <input type = "text" placeholder = "" onChange={e => setAG(e.target.value)} value = {aGuess}></input>
      <button onClick = {guessOutput}>Guess Output</button>
    </div>
  );
}

export default App;
