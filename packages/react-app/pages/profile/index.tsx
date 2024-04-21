/** react */
import { FC } from "react";

/** styles */
import styles from "./styles.module.scss";
import { FaCopy } from "react-icons/fa6";
///////////////////////////////////////////////////////////////////////////////////

interface Props {}

const ProfilePage = () => {
  return (
    <div className={styles.container}>
      <h1>Profile Page</h1>
      <h2>Welcome to your profile page</h2>
      <h3>
        Wallet: 0xD...131{" "}
        <FaCopy
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigator.clipboard.writeText("0xD...131");
          }}
        />
      </h3>
      <p>
        We encourage you to realize the KYC process. This will improve your
        borrowing and lending experience.
        <br />
        <br />
        <button>Complete KYC</button>
      </p>
    </div>
  );
};

export default ProfilePage;
