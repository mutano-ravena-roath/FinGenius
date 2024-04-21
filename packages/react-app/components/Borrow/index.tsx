/** react */
import { FC, useState } from "react";

/** external libs */
import { v4 as uuidv4 } from "uuid";

/** styles */
import styles from "./styles.module.scss";
///////////////////////////////////////////////////////////////////////////////////

interface Props {}

const Borrow = () => {
  const [myLoans, setMyLoans] = useState<
    {
      amount: number;
      term: string;
      interest: number;
    }[]
  >([]);

  const [amount, setAmount] = useState(0);
  const [term, setTerm] = useState("");
  const [interest, setInterest] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!amount || !term || !interest) return;

    const loan = {
      amount,
      term,
      interest,
    };



    setMyLoans([...myLoans, loan]);

    console.log("myLoans", myLoans);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3>Request Loan</h3>

        <div className={styles.field}>
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            className={styles.input}
            placeholder="Amount Asked"
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="term">Term</label>
          <input
            id="term"
            type="date"
            className={styles.input}
            placeholder="Term"
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="interest">Interest</label>
          <input
            id="interest"
            type="number"
            className={styles.input}
            placeholder="Interest"
            onChange={(e) => setInterest(parseInt(e.target.value))}
          />
        </div>
        <button className={styles.submit}>Submit</button>
      </form>
      <div className={styles.myLoans}>
        <div className={styles.loansHeader}>
          <h3>My Loans</h3>
        </div>
        <ul className={styles.loans}>
          {myLoans.map((loan) => (
            <li key={uuidv4()} className={styles.loanCard}>
              <p>
                <span>Amount:</span> <br /> $ {loan.amount}
              </p>
              <p>
                <span>Duration:</span> <br />{" "}
                {(
                  Math.abs(
                    new Date(loan.term).getTime() - new Date().getTime()
                  ) /
                  (1000 * 60 * 60 * 24)
                ).toFixed(0)}{" "}
                days
              </p>
              <p>
                <span>Interest:</span> <br /> {loan.interest}% per year
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Borrow;
