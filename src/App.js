import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'
import './App.css'
import Letter from './Letter'
import Keyboard from './Keyboard'
import Counter from './Counter'

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const DICTIONNARY = ['hello', 'friend', 'love', 'happy', 'enjoy', 'fiesta', 'dance', 'family', 'sport']

class App extends Component {

  state = {
    wordToGuess: this.generateLetters(),
    alphabetLetters: this.generateKeyboard(),
    selection : [],
    gameState : "en cours",
  }

  generateLetters() {
    const candidates = shuffle(DICTIONNARY)
    const word = candidates.pop()
    const letters = word.toUpperCase().split('')
    return letters
  }

  generateKeyboard() {
    const letters = ALPHABET.split('')
    return letters
  }

  handleClick = letter => {
    const { selection, gameState } = this.state
    if(gameState == "en cours") {
      this.setState({selection: [...selection, letter]}, this.updateGameState)
      console.log(selection, gameState)
    }
  }

  trying = () => {
    const {alphabetLetters, selection} = this.state
    return selection.filter(elt => !alphabetLetters.includes(elt)).length
  }

  getFeedback(letter) {
    const { selection } = this.state
    return selection.includes(letter)
  }

  updateGameState = () => {
    const {wordToGuess, selection} = this.state
    const lastTests = 10 - this.trying()
    const findWord = wordToGuess.filter(elt => selection.includes(elt)).length === wordToGuess.length
    if (lastTests > 0 && findWord) {
      this.setState({gameState : "gagnée"})
    } else if (lastTests > 0 ) {
      return
    } else {
      this.setState({gameState : "perdue"})
    }
  }

  newGame = () => {
    this.setState({selection: [], alphabetLetters: this.generateKeyboard(), wordToGuess: this.generateLetters(), gameState : "en cours" })
  }

  render() {
    const { wordToGuess, alphabetLetters, gameState} = this.state

    const Game = (
      <div className="game">
          <div className="word">
            { wordToGuess.map( (letter, index) => 
              <Letter 
              letter={letter} 
              feedback={this.getFeedback(letter) ? "visible" : "hidden"}
              key={index}/>
              )}
          </div>
          <div className="keyboard">
            { alphabetLetters.map( (letter, index) => 
              <Keyboard 
              letter={letter} 
              feedback={this.getFeedback(letter) ? "white" : "grey" }
              key={index} 
              onClick={this.handleClick}/>
              )}
          </div>
          <Counter
              counter = {this.trying()}
              gameState = {this.state.gameState}
              />
        </div>
    )
    return (
      <div className="hangman">

        <div className="header">
          <h1 className="title">Hangman</h1>
          <button className="btn btn-info" onClick={this.newGame}>New game</button>
        </div>

      { gameState == "gagnée" ? null : Game}
        
      </div>
    )
  }
}

export default App