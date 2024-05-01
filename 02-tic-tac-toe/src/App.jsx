import { useState } from 'react'
import confetti from "canvas-confetti"
import { Square } from './components/Square.jsx';
import {Turns, winnableComb} from './constants.js'
import { WinnerModal } from './components/WinnerModal.jsx';
import './App.css'
//  39


function App() {
  const [board, setBoard] = useState(()=>{
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage){
      return JSON.parse(boardFromStorage)
    }
    return Array(9).fill(null)
  })
  const [ turn, setTurn] =useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn')
    if(turnFromStorage){
      return turnFromStorage;
    }
    return Turns.X
  })
  const [winner,setWinner]= useState(null)
  
  const checkWinner=(boardToCheck)=>{
    for(const combo of winnableComb){
      const [a,b,c]=combo
      if (boardToCheck[a] && boardToCheck[a] == boardToCheck[b] && boardToCheck[a]== boardToCheck[c]){
        return boardToCheck[a]
      }
    }
    return null
  }

  const resetGame =() =>{

    setBoard(Array(9).fill(null))
    setTurn(Turns.X)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }


  const chekEndGame=(newBoard)=>{
    return newBoard.every((square)=> square != null)
  }

  const updateBoard=(index) =>{
   if(board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] =turn
    setBoard(newBoard)
    const newTurn =turn === Turns.X ? Turns.O : Turns.X
    setTurn(newTurn)
    
    window.localStorage.setItem('board',JSON.stringify(newBoard))
    window.localStorage.setItem('turn',newTurn)
    
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }else if(chekEndGame(newBoard)){
      setWinner(false)
    }
  }
  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <section className='game'>{
        board.map((_,index)=>{
          return(
            <Square 
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {board[index]}
            </Square>
          )
        })
      }
      </section>
      <section className='turn'>
        <Square isSelected={turn=== Turns.X}>{Turns.X}</Square>
        <Square isSelected={turn=== Turns.O}>{Turns.O}</Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner}/>
     

    </main>
  )
}

export default App
