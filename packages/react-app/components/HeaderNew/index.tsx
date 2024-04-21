/** react */
import { PiStarFourFill } from "react-icons/pi";

/** styles */
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
///////////////////////////////////////////////////////////////////////////////////

interface Props {}

const HeaderNew = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <PiStarFourFill color="var(--primary)" size={32} />
      <h1>
        Fin Genius |{" "}
        {router.pathname === "/home"
          ? "Home"
          : router.pathname === "/chatbot"
          ? "Chatbot"
          : router.pathname === "/loan"
          ? "Loan"
          : "Profile"}
      </h1>
    </header>
  );
};

export default HeaderNew;
