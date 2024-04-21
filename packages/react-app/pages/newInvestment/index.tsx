/** react */
import { FC, useEffect, useState } from "react";

/** external libs */
import { v4 as uuidv4 } from "uuid";

/** styles */
import styles from "./styles.module.scss";
import Link from "next/link";
import { useWeb3 } from "@/context/useWeb3";
import { useRouter } from "next/router";
///////////////////////////////////////////////////////////////////////////////////

interface Props {}

const NewInvestmentPage = () => {
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
        const tx = await sendCUSD(address, "2");
        setTx(tx);
      } catch (error) {
        console.log(error);
      } finally {
        setSigningLoading(false);
      }
    }
  }

  const router = useRouter();

  const submitHandler = async () => {
    await sendingCUSD();

    router.push("/home");


  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h3>New Investment</h3>

        <div className={styles.field}>
          <label htmlFor="asset">Asset</label>
          <select id="asset" className={styles.input}>
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
            <option value="dogecoin">USDC</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="Value">Value</label>
          <input
            id="Value"
            type="number"
            className={styles.input}
            placeholder="How much in dollars do you want to invest"
          />
        </div>
        <button onClick={submitHandler} className={styles.submit}>
          Create
        </button>
      </div>
    </div>
  );
};

export default NewInvestmentPage;
