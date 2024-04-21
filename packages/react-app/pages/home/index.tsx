import Navbar from "@/components/Navbar";
import styles from "./styles.module.scss";
////////////////////////////////////////////////////////////////////////////////////////////////////

import { PiStarFourFill } from "react-icons/pi";

const investments = [
  {
    id: 1,
    name: "Bitcoin",
    amount: 0.0001,
    value: 1000,
  },
  {
    id: 2,
    name: "Ethereum",
    amount: 0.001,
    value: 300,
  },
  {
    id: 3,
    name: "Dogecoin",
    amount: 100,
    value: 0.3,
  },
]

export default function Home() {
  return (
    <div>
      <h1>
        <PiStarFourFill color="var(--primary)" size={32} />
        Fin Genius
      </h1>
      <div className={styles.totalBalance}>
        <p>Total Balance</p>
        <h2>$0.00</h2>
      </div>
      <div className={styles.investments}></div>
      <div className={styles.trasactions}></div>
      <Navbar />
    </div>
  );
}
