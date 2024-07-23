"use client";
import { useAppContext } from "@/context";
import styles from "./page.module.css";
import { GrPowerReset } from "react-icons/gr";
import { useEffect, useState } from "react";
import Link from "next/link";

type score = {
  x: number,
  o: number,
  ties: number
}

export default function Board() {
  const [scoreBoard, setScoreBoard] = useState<score>({x: 0, o: 0, ties: 0})
  const [lastWinner, setLastWinner] = useState<string>("")
  const [hasWinner, setHasWinner] = useState<boolean>(false);
  const [hasTie, setHasTie] = useState<boolean>(false);
  const [winnerPositions, setWinnerPositions] = useState<number[] | null>();
  const { turn, setTurn } = useAppContext();
  const [squares, setSquares] = useState([...Array(9)].fill(null));

  const handleReset = () => {
    setSquares([...Array(9)].fill(null));
    setHasWinner(false)
    setHasTie(false)
    setWinnerPositions(null)
    setLastWinner("")
  };

  const handlePlay = (square: string, i: number) => {
    if (squares[i]) return;
    let newSquare = [...squares];
    newSquare[i] = square;
    setSquares(newSquare);

    let newTurn = turn === "x" ? "o" : "x";
    setTurn(newTurn);
  };


  // check if anyone wins
  useEffect(() => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winConditions.length; i++) {
      let [a, b, c] = winConditions[i];
      if (squares[a] && squares[a] == squares[b] && squares[b] == squares[c]) {
        setLastWinner(squares[a])
        setWinnerPositions([a, b, c])
        setHasWinner(true)
        break;
      }else{
        if(squares.every((value: string) => value !== null)){
          setHasTie(true)
        } 
      }
    }
  }, [squares]);


  // update scoreBoard
  useEffect(() => {
    setScoreBoard(prevScore => ({
      ...prevScore,
      ties: hasTie && lastWinner === "" ? prevScore.ties + 1 : prevScore.ties,
      x: lastWinner === "x" ? prevScore.x + 1 : prevScore.x,
      o: lastWinner === "o" ? prevScore.o + 1 : prevScore.o
    }));
  }, [hasTie, lastWinner]);

  return (
    <>
     <div className={styles.container}>
        <div className={styles.containerHeader}>
          <div className={styles.containerPlayers}>
            <span className={styles.playerX}>x</span>
            <span className={styles.playerO}>o</span>
          </div>
          <span className={styles.turn}>
            <b>{turn}</b> Turn
          </span>
          <button onClick={handleReset} className={styles.reset}>
            <GrPowerReset />
          </button>
        </div>
        <div className={styles.board}>
          {squares.map((square: string, i: number) => (
            <button
              disabled={hasWinner}
              className={`
                  ${styles.square} 
                  ${square === "x" ? styles.playerX : styles.playerO}
                  ${winnerPositions?.includes(i) && styles.winnerPosition}    
              `}
              key={i}
              onClick={() => handlePlay(turn, i)}
            >
              {square}
            </button>
          ))}
        </div>
        <div className={styles.scores}>
          <div className={`${styles.score} ${styles.scoreX}`}>
            <span>x wins</span>
            {scoreBoard.x}
          </div>
          <div className={`${styles.score} ${styles.scoreTies}`}>
            <span>ties</span>
            {scoreBoard.ties}
          </div>
          <div className={`${styles.score} ${styles.scoreO}`}>
            <span>o wins</span>
            {scoreBoard.o}
          </div>
        </div>
      </div>
      
      {(hasTie || hasWinner) &&
        <div className={styles.winnerOverlay}>
          <div className={styles.winnerWrapper}>
            <h3 className={styles.winnerTitle}>{hasWinner? "You won!" : "Tie"}</h3>
            <span
              className={`${lastWinner === "x" ? styles.playerX : styles.playerO} ${ hasTie && lastWinner === ""? styles.tie : styles.winner}`}
            >
              {hasWinner? lastWinner + " Takes the round" : "the round was tied"}
            </span>
            <div className={styles.winnerButtons}>
              <Link className={styles.winnerButtonQuit} href="/">Quit</Link>
              <button onClick={handleReset} className={styles.winnerButtonNext}>Next round</button>
            </div>
          </div>
        </div>
      }
      
    </>
  );
}
