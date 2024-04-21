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
import Link from "next/link";

const investments = [
  {
    id: 1,
    name: "Ethereum",
    value: 1,
    icon: <FaEthereum size={32} color="var(--primary)" />,
    time: "10 minutes ago",
  },
];

const transactions = [
  {
    id: 1,
    name: "ETH",
    type: "Investment",
    value: -1,
  },
  {
    id: 2,
    name: "Received from 0xB...C4a",
    type: "Income",
    value: 10,
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
        <h2>$9.00</h2>
      </div>
      <div className={styles.investments}>
        <Link href="/newInvestment" className={styles.addInvestment}>
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
        </Link>
        {investments.map((investment) => (
          <InvestmentCard
            key={uuidv4()}
            investment={{
              id: investment.id,
              name: investment.name,
              value: investment.value,
              icon: investment.icon,
              time: investment.time,
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
