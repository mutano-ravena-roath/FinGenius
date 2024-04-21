/** next */
import { useRouter } from "next/router";

/** react */
import { use, useEffect, useState } from "react";

/** external libs */
import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

/** services */
import authService from "@/services/auth";

/** icons */
import { PiStarFourFill } from "react-icons/pi";
import { GoArrowRight } from "react-icons/go";

/** styles */
import styles from "./styles.module.scss";
////////////////////////////////////////////////////////////////////////////////////////////////////

const signup = async (
  wallet: string,
  setNewUser: (newUser: boolean) => void
) => {
  try {
    const response = await authService.signUp({ wallet });

    setNewUser(response.newUser);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export default function AuthPage() {
  const [isMounted, setIsMounted] = useState(false);

  const { address, isConnected } = useAccount();
  const { connect } = useConnect();

  const [newUser, setNewUser] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      signup(address, setNewUser);
    }
  }, [address, isConnected]);

  if (!isMounted) {
    return null;
  }

  const handleConnect = () => {
    connect({ connector: injected({ target: "metaMask" }) });

    setTimeout(() => {
      if (isConnected && address) {
        router.push("/home");
      }
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>
          <PiStarFourFill color="var(--primary)" size={32} />
          Fin Genius
        </h2>
        <h1>
          Finance become <br />
          <span>Genius!</span>
        </h1>
        <p>{newUser ? "Welcome to Fin Genius" : "Welcome back!"}</p>
      </div>

      <div className={styles.actions}>
        <button onClick={handleConnect}>
          {window.ethereum && window.ethereum.isMiniPay
            ? "Continue"
            : "Connect Wallet"}
          <GoArrowRight color="var(--secondary)" size={24} />
        </button>
      </div>
    </div>
  );
}
