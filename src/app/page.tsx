"use client"
import styles from "./page.module.css";
import { useAppContext } from "@/context";
import Link from "next/link";

export default function Home() {
  const { turn, setTurn } = useAppContext()
  return (
    <section className={styles.container}>
      <h2 className={styles.containerTitle}>Tic Tac Toe</h2>
      <div className={styles.containerHeader}>
        <h3 className={styles.containerHeaderTitle}>pick player 1 mark</h3>
        <div className={styles.containerContentButtons}>
          <button className={turn === "x" ? styles.buttonSelected : "" } onClick={()=> setTurn("x")}>x</button>
          <button className={turn === "o" ? styles.buttonSelected : "" } onClick={()=> setTurn("o")}>o</button>
        </div>
        <span className={styles.goesFirst}>Remember {turn} goes first</span>
      </div>
      <div>
        <Link  href="/board" className={styles.startButton}>New game (vs player)</Link>
      </div>
    </section>
  );
}
