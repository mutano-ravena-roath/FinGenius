/** external libs */
import { v4 as uuidv4 } from "uuid";

/** components */
import Navbar from "@/components/Navbar";

/** icons */
import {
  IoArrowUpCircleOutline,
  IoArrowDownCircleOutline,
} from "react-icons/io5";
import {
  FaBitcoin,
  FaDollarSign,
  FaEuroSign,
  FaMoneyBillWave,
  FaEthereum,
} from "react-icons/fa";
import { SiSolana } from "react-icons/si";

/** styles */
import styles from "./styles.module.scss";
////////////////////////////////////////////////////////////////////////////////////////////////////

import { PiStarFourFill } from "react-icons/pi";
import InvestmentCard from "@/components/InvestmentCard";
import { useEffect, useState } from "react";
import HeaderNew from "@/components/HeaderNew";

const investments = [
  {
    id: 1,
    name: "Bitcoin",
    amount: 0.0001,
    value: 1000,
    icon: <FaBitcoin size={32} color="var(--primary)" />,
  },
  {
    id: 2,
    name: "Ethereum",
    amount: 0.001,
    value: 300,
    icon: <FaEthereum size={32} color="var(--primary)" />,
  },
  {
    id: 3,
    name: "Dogecoin",
    amount: 100,
    value: 0.3,
    icon: <SiSolana size={32} color="var(--primary)" />,
  },
];

const transactions = [
  {
    id: 1,
    name: "Salary",
    type: "Salary",
    value: 1000,
  },
  {
    id: 2,
    name: "Netflix",
    type: "Subscription",
    value: -10,
  },
  {
    id: 3,
    name: "McDonalds",
    type: "Food",
    value: -5,
  },
];

const HomePage = () => {
  const [trasactionFullScreen, setTrasactionFullScreen] = useState(false);

  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const icons = [
    <FaBitcoin size={42} color="var(--primary)" />,
    <FaDollarSign size={42} color="var(--primary)" />,
    <FaEuroSign size={42} color="var(--primary)" />,
    <FaMoneyBillWave size={42} color="var(--primary)" />,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex(
        (currentIconIndex) => (currentIconIndex + 1) % icons.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.totalBalance}>
        <p>Total Balance</p>
        <h2>$0.00</h2>
      </div>
      <div className={styles.investments}>
        <button className={styles.addInvestment}>
          <div className={styles.iconContainer}>
            {icons.map((icon, index) => (
              <div
                key={index}
                className={`${styles.icon} ${
                  index === currentIconIndex ? styles.visible : styles.hidden
                }`}
              >
                {icon}
              </div>
            ))}
          </div>
          <p>Add Investment</p>
        </button>
        {investments.map((investment) => (
          <InvestmentCard
            key={uuidv4()}
            investment={{
              id: investment.id,
              name: investment.name,
              amount: investment.amount,
              value: investment.value,
              icon: investment.icon,
            }}
          />
        ))}
      </div>
      <div
        className={`${styles.transactions} ${
          trasactionFullScreen ? styles.transactionsFullScreen : ""
        }`}
      >
        <div className={styles.trasactionsHeader}>
          <h3>Transactions</h3>
          <button
            onClick={() => setTrasactionFullScreen(!trasactionFullScreen)}
          >
            {trasactionFullScreen ? "Minimize" : "See all"}
          </button>
        </div>
        <div>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div key={uuidv4()} className={styles.transactionLine}>
                <div className={styles.transactionLeftSide}>
                  <div className={styles.trasactionIcon}>
                    {transaction.value < 0 ? (
                      <IoArrowUpCircleOutline color="var(--error)" size={24} />
                    ) : (
                      <IoArrowDownCircleOutline
                        color="var(--success)"
                        size={24}
                      />
                    )}
                  </div>
                  <div className={styles.trasactionInfo}>
                    <p>{transaction.name}</p>
                    <span>{transaction.type}</span>
                  </div>
                </div>
                <p className={styles.transactionRightSide}>
                  {transaction.value}
                </p>
              </div>
            ))
          ) : (
            <p>No transactions</p>
          )}
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default HomePage;
