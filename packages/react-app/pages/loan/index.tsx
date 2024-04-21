/** react */
import { FC, useState } from "react";

/** components */
import Borrow from "@/components/Borrow";
import Lend from "@/components/Lend";

/** styles */
import styles from "./styles.module.scss";
///////////////////////////////////////////////////////////////////////////////////

interface Props {}

const LoanPage = () => {
  const [isBorrow, setIsBorrow] = useState(true);

  return (
    <div>
      <div className={styles.loanNav}>
        <button
          onClick={() => setIsBorrow(true)}
          className={isBorrow ? styles.active : ""}
        >
          Borrow
        </button>
        <button
          onClick={() => setIsBorrow(false)}
          className={!isBorrow ? styles.active : ""}
        >
          Lend
        </button>
      </div>
      {isBorrow ? <Borrow /> : <Lend />}
    </div>
  );
};

export default LoanPage;
