"use client"
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [first, setFirst] = useState<string>("x");
  return (
    <section className={styles.container}>
      <h2 className={styles.containerTitle}>Tic Tac Toe</h2>
      <div className={styles.containerHeader}>
        <h3 className={styles.containerHeaderTitle}>Pick player 1's mark</h3>
        <div className={styles.containerContentButtons}>
          <button className={first === "x" ? styles.buttonSelected : "" } onClick={()=> setFirst("x")}>x</button>
          <button className={first === "o" ? styles.buttonSelected : "" } onClick={()=> setFirst("o")}>o</button>
        </div>
        <span className={styles.goesFirst}>Remember {first} goes first</span>
      </div>
      <div>
        <button className={styles.startButton}>New game (vs player)</button>
      </div>
    </section>
  );
}
