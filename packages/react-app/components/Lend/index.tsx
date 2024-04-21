/** react */
import { FC, useEffect, useState } from "react";

/** external libs */
import { v4 as uuidv4 } from "uuid";

/** styles */
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useWeb3 } from "@/context/useWeb3";
///////////////////////////////////////////////////////////////////////////////////

interface Props {}

const loans = [
  {
    id: 1,
    requester: "0xD...931",
    amount: 5,
    duration: 30,
    interest: 10,
  },
];

const Lend = () => {
  const { address, getUserAddress, sendCUSD, signTransaction } = useWeb3();
  const [cUSDLoading, setCUSDLoading] = useState(false);
  const [nftLoading, setNFTLoading] = useState(false);
  const [signingLoading, setSigningLoading] = useState(false);
  const [userOwnedNFTs, setUserOwnedNFTs] = useState<string[]>([]);
  const [tx, setTx] = useState<any>(undefined);

  useEffect(() => {
    getUserAddress();
  }, []);

  async function sendingCUSD() {
    if (address) {
      setSigningLoading(true);
      try {
        const tx = await sendCUSD(address, "5");
        setTx(tx);
      } catch (error) {
        console.log(error);
      } finally {
        setSigningLoading(false);
      }
    }
  }

  const submitHandler = async () => {
    await sendingCUSD();
  }

  return (
    <ul className={styles.loanList}>
      {loans.map((loan) => (
        <li key={uuidv4()} className={styles.loanCard}>
          <div className={styles.infos}>
            <p>
              <span>Requester:</span> <br /> {loan.requester}
            </p>
            <p>
              <span>Amount:</span> <br /> $ {loan.amount}
            </p>
            <p>
              <span>Duration:</span> <br /> {loan.duration} days
            </p>
            <p>
              <span>Interest:</span> <br /> {loan.interest}% per year
            </p>
          </div>
          <button onClick={submitHandler}>Lend</button>
        </li>
      ))}
    </ul>
  );
};

export default Lend;
